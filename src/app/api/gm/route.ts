import { NextRequest, NextResponse } from 'next/server';
import { getFinnhubQuote } from '@/services/market/finnhub';

// Simple fetch with timeout
async function fetchWithTimeout(url: string, ms = 7000): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal, headers: { 'cache-control': 'no-store' } });
  } finally {
    clearTimeout(t);
  }
}

export async function POST(req: NextRequest) {
  try {
    const host = req.headers.get('host') ?? 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') ?? 'http';
    const baseUrl = `${proto}://${host}`;
    // 1) Core market snapshots in parallel
    const cgBtc = fetchWithTimeout(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
    );
    const cgMajors = fetchWithTimeout(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum,solana,binancecoin,chainlink,dogecoin&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
    );
    const cgEthSolBtc = fetchWithTimeout(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=btc&include_24hr_change=true'
    );
    const cgGlobal = fetchWithTimeout('https://api.coingecko.com/api/v3/global');
    const btcAdvisor = fetchWithTimeout(`${baseUrl}/api/advisor/btc/live`);
    const outperform24h = fetchWithTimeout(`${baseUrl}/api/cryptocompare/outperforming-btc`);

    // 2) Equity snapshots via Finnhub (free endpoints)
    const mstrQuoteP = getFinnhubQuote('MSTR');
    const nvdaQuoteP = getFinnhubQuote('NVDA');
    const tslaQuoteP = getFinnhubQuote('TSLA');

    // Await responses
    const [btcRes, majorsRes, globalRes, advisorRes, mstr, nvda, tsla, ethSolBtcRes, outperform24hRes] = await Promise.allSettled([
      cgBtc,
      cgMajors,
      cgGlobal,
      btcAdvisor,
      mstrQuoteP,
      nvdaQuoteP,
      tslaQuoteP,
      cgEthSolBtc,
      outperform24h,
    ]);

    // Parse CoinGecko
    const btc = btcRes.status === 'fulfilled' && btcRes.value.ok ? await btcRes.value.json() : { bitcoin: { usd: 0, usd_24h_change: 0 } };
    const majors = majorsRes.status === 'fulfilled' && majorsRes.value.ok ? await majorsRes.value.json() : [];
    const global = globalRes.status === 'fulfilled' && globalRes.value.ok ? await globalRes.value.json() : { data: { market_cap_change_percentage_24h_usd: 0, market_cap_percentage: { btc: 0 } } };

    // Parse BTC Advisor
    let advisor: any = { success: false };
    if (advisorRes.status === 'fulfilled') {
      try {
        advisor = await advisorRes.value.json();
      } catch {}
    }

    // Parse equities
    const mstrC = mstr.status === 'fulfilled' ? mstr.value.c : 0;
    const mstrPc = mstr.status === 'fulfilled' ? mstr.value.pc : 0;
    const nvdaC = nvda.status === 'fulfilled' ? nvda.value.c : 0;
    const nvdaPc = nvda.status === 'fulfilled' ? nvda.value.pc : 0;
    const tslaC = tsla.status === 'fulfilled' ? tsla.value.c : 0;
    const tslaPc = tsla.status === 'fulfilled' ? tsla.value.pc : 0;

    // Compute helpers
    const fmt = (n: number, d = 2) => (Number.isFinite(n) ? n.toFixed(d) : 'n/a');
    const pct = (n: number, d = 1) => (Number.isFinite(n) ? `${n.toFixed(d)}%` : 'n/a');
    const chgPct = (curr: number, prev: number) => (prev ? ((curr - prev) / prev) * 100 : 0);

    const btcUsd = btc.bitcoin?.usd ?? 0;
    const btcChg = btc.bitcoin?.usd_24h_change ?? 0;
    const ethSolBtc = ethSolBtcRes.status === 'fulfilled' && ethSolBtcRes.value.ok ? await ethSolBtcRes.value.json() : { ethereum: { btc_24h_change: 0 }, solana: { btc_24h_change: 0 } };
    const ethBtcChg = Number(ethSolBtc?.ethereum?.btc_24h_change ?? 0);
    const solBtcChg = Number(ethSolBtc?.solana?.btc_24h_change ?? 0);
    const dom = global.data?.market_cap_percentage?.btc ?? 0;
    const outperformData =
      outperform24hRes.status === 'fulfilled' && outperform24hRes.value.ok
        ? await outperform24hRes.value.json()
        : [];

    // Outperformers vs BTC (simple: 24h change vs BTC's 24h)
    const outperform = Array.isArray(majors)
      ? majors
          .map((c: any) => ({ id: c.id, symbol: c.symbol?.toUpperCase(), name: c.name, chg24h: c.price_change_percentage_24h_in_currency }))
          .filter((c: any) => typeof c.chg24h === 'number')
          .filter((c: any) => c.chg24h - btcChg > 1.0) // threshold 1% above BTC
          .sort((a: any, b: any) => b.chg24h - a.chg24h)
          .slice(0, 3)
      : [];

    // BTC Advisor stance line
    let stanceLine = '';
    if (advisor?.success && advisor?.data) {
      const st = advisor.data.summary?.stance ?? 'Neutral';
      const c = advisor.data.details?.contributions ?? [];
      const labelMap: Record<string, string> = {
        macro: 'macro/liquidity',
        onchain: 'on-chain health',
        structure: 'market structure',
        stable: 'stablecoins/liquidity',
        sentiment: 'narrative/sentiment',
      };
      const top = c
        .slice(0)
        .sort((a: any, b: any) => Math.abs(b.contribution) - Math.abs(a.contribution))
        .slice(0, 2)
        .map((r: any) => labelMap[r.key] ?? r.key)
        .join(' & ');
      stanceLine = `BTC Advisor: ${st}${top ? ` — driven by ${top}` : ''}`;
    }

    // Equity deltas
    const mstrChg = chgPct(mstrC, mstrPc);
    const nvdaChg = chgPct(nvdaC, nvdaPc);
    const tslaChg = chgPct(tslaC, tslaPc);

    // Compose brief (professional, concise, BTC-first)
    const lines: string[] = [];
    lines.push(`GM — BTC ${fmt(btcUsd, 0)} USD (${pct(btcChg, 1)} 24h), dominance ${pct(dom, 1)}.`);
    if (stanceLine) lines.push(stanceLine);
    const relPairs = `ETHBTC ${pct(ethBtcChg, 1)}, SOLBTC ${pct(solBtcChg, 1)}`;
    if (Array.isArray(outperformData) && outperformData.length > 0) {
      const top = outperformData
        .slice(0, 3)
        .map((c: any) => `${String(c.symbol).toUpperCase()} ${pct(c.price_change_percentage_24h, 1)} vs BTC`)
        .join(', ');
      lines.push(`Alts outperforming BTC (24h): ${relPairs}; also: ${top}.`);
    } else if (outperform.length > 0) {
      const list = outperform.map((c: any) => `${c.symbol} ${pct(c.chg24h - btcChg, 1)} vs BTC`).join(', ');
      lines.push(`Alts outperforming BTC: ${relPairs}; also: ${list}.`);
    } else {
      lines.push(`Alts: ${relPairs}; rotation selective.`);
    }
    lines.push(
      `Stocks: MSTR ${fmt(mstrC, 2)} (${pct(mstrChg, 1)}), NVDA ${fmt(nvdaC, 2)} (${pct(nvdaChg, 1)}), TSLA ${fmt(tslaC, 2)} (${pct(tslaChg, 1)}).`
    );
    lines.push('Idea: Favor strength vs BTC; scale on breakouts, cut below BTC-relative stops. Risks: liquidity, macro prints, policy shocks.');

    const body = lines.join('\n');
    return NextResponse.json({ success: true, data: body });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error)?.message ?? 'GM failed' },
      { status: 500 }
    );
  }
}


