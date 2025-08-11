import { NextRequest, NextResponse } from 'next/server';
import {
  getFinnhubQuote,
  getFinnhubEarnings,
  getFinnhubInsiderSentiment,
  getFinnhubRecommendation,
  getFinnhubPriceTarget,
  getFinnhubCompanyNews,
} from '@/services/market/finnhub';

type EarningsItem = {
  period?: string;
  actual?: number;
  estimate?: number;
  surprise?: number;
};

type RecommendationItem = {
  period?: string;
  buy?: number;
  hold?: number;
  sell?: number;
  strongBuy?: number;
  strongSell?: number;
};

type PriceTarget = {
  targetHigh?: number;
  targetLow?: number;
  targetMean?: number;
  targetMedian?: number;
  lastUpdated?: string;
};

type InsiderSentiment = {
  month?: string;
  score?: number;
  mspr?: number; // Monthly share purchase ratio
};

export async function POST(req: NextRequest) {
  try {
    const { symbol } = (await req.json()) as { symbol?: string };
    const ticker = (symbol || 'TSLA').toUpperCase();

    // Parallel fetches (free Finnhub endpoints)
    const quoteP = getFinnhubQuote(ticker);
    const earningsP = getFinnhubEarnings(ticker);
    const insiderP = getFinnhubInsiderSentiment(ticker);
    const recP = getFinnhubRecommendation(ticker);
    const ptP = getFinnhubPriceTarget(ticker);

    // News (best-effort, free): last 7 days
    const now = new Date();
    const to = now.toISOString().slice(0, 10);
    const from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const newsP = getFinnhubCompanyNews(ticker, from, to);

    const [quote, earningsRaw, insiderRaw, recRaw, ptRaw, newsRaw] = await Promise.all([
      quoteP,
      earningsP,
      insiderP,
      recP,
      ptP,
      newsP,
    ]);

    // Quote
    const price = Number(quote.c || 0);
    const prevClose = Number(quote.pc || 0);
    const dayChgPct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

    // Earnings (take latest item)
    const earnings = (Array.isArray(earningsRaw) ? earningsRaw[0] : undefined) as EarningsItem | undefined;
    const epsActual = earnings?.actual;
    const epsEst = earnings?.estimate;
    const epsSurprise = earnings?.surprise;
    const epsLine = typeof epsActual === 'number' && typeof epsEst === 'number'
      ? epsActual === epsEst
        ? `met EPS ${epsActual.toFixed(2)}`
        : epsActual > epsEst
          ? `beat EPS ${epsActual.toFixed(2)} vs ${epsEst.toFixed(2)}`
          : `missed EPS ${epsActual.toFixed(2)} vs ${epsEst.toFixed(2)}`
      : 'recent EPS update mixed';

    // Insider sentiment (aggregate latest)
    const insiderArr = Array.isArray(insiderRaw) ? insiderRaw as InsiderSentiment[] : [];
    const lastInsider = insiderArr[0];
    const insiderTone = typeof lastInsider?.score === 'number' ? (lastInsider.score > 0 ? 'supportive' : lastInsider.score < 0 ? 'cautious' : 'neutral') : 'neutral';

    // Analyst recommendations (take latest period)
    const recArr = Array.isArray(recRaw) ? recRaw as RecommendationItem[] : [];
    const rec = recArr[0];
    const buys = (rec?.strongBuy ?? 0) + (rec?.buy ?? 0);
    const holds = rec?.hold ?? 0;
    const sells = (rec?.sell ?? 0) + (rec?.strongSell ?? 0);
    const recLine = buys || holds || sells ? `${buys} buy / ${holds} hold / ${sells} sell` : 'consensus mixed';

    // Price targets
    const pt = (ptRaw as PriceTarget) || {};
    const ptLine = typeof pt.targetMean === 'number'
      ? `PT mean ${pt.targetMean.toFixed(0)} (H ${pt.targetHigh?.toFixed?.(0) ?? '—'} / L ${pt.targetLow?.toFixed?.(0) ?? '—'})`
      : 'PT consensus unavailable';

    // News one-liner
    const news = Array.isArray(newsRaw) ? newsRaw : [];
    const headline = news.find((n: { headline?: string }) => n?.headline)?.headline as string | undefined;
    const newsLine = headline ? `Latest: ${headline}` : 'No major headlines this week.';

    // Compose single paragraph
    const parts: string[] = [];
    parts.push(`${ticker} $${price.toFixed(2)} (${dayChgPct.toFixed(1)}% 24h).`);
    parts.push(`Earnings: ${epsLine}${typeof epsSurprise === 'number' ? ` (surprise ${epsSurprise.toFixed(2)})` : ''}.`);
    parts.push(`Analyst consensus: ${recLine}. ${ptLine}.`);
    parts.push(`Insiders: ${insiderTone}.`);
    parts.push(newsLine);
    parts.push('Framing: favor momentum on high-volume strength; avoid chasing post-earnings whipsaws. Use clear invalidations.');

    const text = parts.join(' ');
    return NextResponse.json({ success: true, data: text });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error)?.message ?? 'Failed to build stock brief' },
      { status: 500 }
    );
  }
}


