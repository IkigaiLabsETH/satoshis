import { NextResponse } from 'next/server';
import { decideBtcTargetAllocation } from '@/services/advisor/btc/decide';
import type { DecisionInput } from '@/services/advisor/btc/types';

const CG_BASE = 'https://api.coingecko.com/api/v3';

async function fetchJson<T>(url: string, timeoutMs = 8000): Promise<T> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: controller.signal,
      headers: {
        'accept': 'application/json',
        'user-agent': 'btc-advisor/1.0 (+cheeseburger)'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}

function percentChange(first: number, last: number): number {
  if (first === 0) return 0;
  return (last - first) / first;
}

export async function GET() {
  try {
    // 1) BTC prices 400d for 200D MA and 30d momentum
    const btcChart = await fetchJson<{ prices: [number, number][] }>(
      `${CG_BASE}/coins/bitcoin/market_chart?vs_currency=usd&days=400&interval=daily`
    );
    const prices = btcChart.prices.map((p) => p[1]);
    const lastPrice = prices[prices.length - 1];
    const smaWindow = 200;
    const smaStart = Math.max(0, prices.length - smaWindow);
    const smaPrices = prices.slice(smaStart);
    const sma200 = smaPrices.reduce((a, b) => a + b, 0) / Math.max(1, smaPrices.length);
    const priceVs200D = (lastPrice - sma200) / Math.max(1, sma200);
    const m30Start = Math.max(0, prices.length - 30);
    const m30Change = percentChange(prices[m30Start], lastPrice);

    // 2) Stablecoin caps (USDT + USDC) 30d slope
    const [usdt, usdc] = await Promise.all([
      fetchJson<{ market_caps: [number, number][] }>(`${CG_BASE}/coins/tether/market_chart?vs_currency=usd&days=30&interval=daily`),
      fetchJson<{ market_caps: [number, number][] }>(`${CG_BASE}/coins/usd-coin/market_chart?vs_currency=usd&days=30&interval=daily`),
    ]);
    const usdtCaps = usdt.market_caps.map((x) => x[1]);
    const usdcCaps = usdc.market_caps.map((x) => x[1]);
    const stFirst = (usdtCaps[0] ?? 0) + (usdcCaps[0] ?? 0);
    const stLast = (usdtCaps[usdtCaps.length - 1] ?? 0) + (usdcCaps[usdcCaps.length - 1] ?? 0);
    const stChange = percentChange(stFirst, stLast);

    // 3) BTC dominance (current level as coarse proxy)
    let dominanceAdj = 0;
    try {
      const global = await fetchJson<{ data?: { market_cap_percentage?: { btc?: number } } }>(`${CG_BASE}/global`);
      const btcDom = global?.data?.market_cap_percentage?.btc ?? 0;
      if (btcDom > 55) dominanceAdj = 1; else if (btcDom < 45) dominanceAdj = -1; else dominanceAdj = 0;
    } catch {}

    // 4) Macro via Finnhub economic series (optional)
    const FH = process.env.FINNHUB_API_KEY;
    let realSlope = 0;
    let dxySlope = 0;
    if (FH) {
      const base = 'https://finnhub.io/api/v1/economic?token=' + FH + '&indicator=';
      type EconPoint = { date?: string; time?: string; datetime?: string; t?: number; value?: number; v?: number };
      type EconResponse = { data?: EconPoint[] } | EconPoint[];
      const [dgs10, cpi, dxy] = await Promise.allSettled([
        fetchJson<EconResponse>(base + 'DGS10'),
        fetchJson<EconResponse>(base + 'CPIAUCSL'),
        fetchJson<EconResponse>(base + 'DTWEXBGS'),
      ]);
      const norm = (x: EconResponse): { t: number; v: number }[] => {
        const arr = (x as { data?: EconPoint[] })?.data ?? (Array.isArray(x) ? (x as EconPoint[]) : []);
        return arr
          .map((p) => ({ t: +new Date((p?.date || p?.time || p?.datetime || (p?.t as number)) ?? 0), v: Number(p?.value ?? p?.v) }))
          .filter((p) => Number.isFinite(p.v));
      };
      const s10 = dgs10.status === 'fulfilled' ? norm(dgs10.value) : [];
      const scpi = cpi.status === 'fulfilled' ? norm(cpi.value) : [];
      const sx = dxy.status === 'fulfilled' ? norm(dxy.value) : [];
      // Real yield approx: 10Y - CPI YoY (compute YoY from index)
      let cpiYoy = 0;
      if (scpi.length > 13) {
        scpi.sort((a,b)=>a.t-b.t);
        const last = scpi[scpi.length-1].v;
        const prev12 = scpi[scpi.length-13].v;
        if (prev12) cpiYoy = ((last - prev12) / prev12) * 100;
      }
      if (s10.length > 21) {
        s10.sort((a,b)=>a.t-b.t);
        const last = s10[s10.length-1].v;
        const prev20 = s10[s10.length-21].v;
        const realNow = last - cpiYoy;
        const realPrev = prev20 - cpiYoy; // crude, monthly CPI changes slowly
        realSlope = realNow - realPrev; // positive = rising real yields
      }
      if (sx.length > 21) {
        sx.sort((a,b)=>a.t-b.t);
        const last = sx[sx.length-1].v;
        const prev20 = sx[sx.length-21].v;
        dxySlope = (last - prev20) / Math.max(1e-9, prev20);
      }
    }

    // 5) On-chain via Blockchain.com charts: hash-rate and n-transactions (30d)
    let onchainScore = 0;
    let hrChg = 0, txChg = 0;
    try {
      type ChainSeries = { values?: Array<{ x?: number; y?: number }> };
      const [hr, ntx] = await Promise.all([
        fetchJson<ChainSeries>('https://api.blockchain.info/charts/hash-rate?timespan=30days&rollingAverage=7days&format=json'),
        fetchJson<ChainSeries>('https://api.blockchain.info/charts/n-transactions?timespan=30days&rollingAverage=7days&format=json'),
      ]);
      const hrVals: number[] = (hr?.values ?? []).map((v) => Number(v?.y)).filter((n) => Number.isFinite(n));
      const txVals: number[] = (ntx?.values ?? []).map((v) => Number(v?.y)).filter((n) => Number.isFinite(n));
      if (hrVals.length > 5 && txVals.length > 5) {
        hrChg = percentChange(hrVals[0], hrVals[hrVals.length - 1]);
        txChg = percentChange(txVals[0], txVals[txVals.length - 1]);
        const pos = (hrChg > 0.02 ? 1 : 0) + (txChg > 0.02 ? 1 : 0);
        const neg = (hrChg < -0.02 ? 1 : 0) + (txChg < -0.02 ? 1 : 0);
        onchainScore = pos >= 2 ? 1 : neg >= 2 ? -1 : 0;
      }
    } catch {}

    // 6) Sentiment via Fear & Greed Index (Alternative.me)
    let sentimentScore = 0;
    let fngVal = 50;
    try {
      const fng = await fetchJson<any>('https://api.alternative.me/fng/?limit=2&format=json');
      const val = Number((fng?.data?.[0]?.value as string) ?? '50');
      if (Number.isFinite(val)) {
        fngVal = val;
        sentimentScore = val >= 60 ? 1 : val <= 40 ? -1 : 0;
      }
    } catch {}

    // Map to discrete scores {-1,0,+1}
    let macroScore = lastPrice > sma200 ? 1 : -1;
    const structureScore = (m30Change > 0.05 ? 1 : m30Change < -0.05 ? -1 : 0) + dominanceAdj;
    const stableScore = stChange > 0.01 ? 1 : stChange < -0.01 ? -1 : 0;
    if (realSlope > 0.2) macroScore = Math.max(-1, macroScore - 1);
    if (realSlope < -0.2) macroScore = Math.min(1, macroScore + 1);
    if (dxySlope > 0.01) macroScore = Math.max(-1, macroScore - 1);
    if (dxySlope < -0.01) macroScore = Math.min(1, macroScore + 1);

    const input: DecisionInput = {
      currentPct: 25,
      basePct: 25,
      user: { profile: 'balanced', minPct: 5, maxPct: 25 },
      scores: {
        macro: macroScore,
        onchain: onchainScore,
        structure: structureScore,
        stable: stableScore,
        sentiment: sentimentScore,
        penalties: 0,
      },
      ctx: {
        regime: 'neutral',
        atr30Pct: Math.min(Math.max(Math.abs(m30Change) * 100, 2), 12),
        lastChangeHrs: 72,
        priceVs200D: priceVs200D,
        realYieldSlopeSig: realSlope,
      },
    };

    const decision = decideBtcTargetAllocation(input);
    return NextResponse.json({ success: true, data: decision, meta: { price: lastPrice, sma200, m30Change, stChange, dominanceAdj, realSlope, dxySlope, onchainScore, sentimentScore, hrChg, txChg, fngVal } });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to compute live decision';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


