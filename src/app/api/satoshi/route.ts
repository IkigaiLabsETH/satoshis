import { NextRequest, NextResponse } from 'next/server';
import { SATOSHI_PERSONAS } from '@/services/satoshi/personas';
import { routeToPersona } from '@/services/satoshi/router';
import { postProcessLLMOutput } from '@/services/satoshi/postprocess';
import { Grok4Service, getMarketData, enhancedWebSearch, getXSentiment } from '../grok4/grok4';
import { BRAND_DNA_PROMPT } from '@/services/satoshi/brand-dna';
import { getMarketDataWithSatoshiContext } from '@/services/satoshi/enhancedCryptoPrice';
import { getFinnhubQuote, getInsiderSentiment, getCompanyEarnings, getIPOCalendar, getCompanyNews } from '@/services/market/finnhub';
import { getAnalystRecommendations, getPriceTarget } from '@/services/market/finnhub';

// Timing helpers
function logDuration(label: string, start: number, end: number) {
  const duration = end - start;
  // eslint-disable-next-line no-console
  console.log(`${label} took ${duration}ms`);
  if (duration > 2000) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️ ${label} is slow: ${duration}ms`);
  }
}

function extractSymbol(input: string): string {
  // Simple regex to extract a likely stock symbol (all caps, 1-5 letters)
  const match = input.match(/\b([A-Z]{1,5})\b/);
  return match ? match[1] : 'MSTR';
}

function detectDataSource(input: string): Array<
  'coingecko' | 'finnhub' | 'web' | 'finnhub-insider' | 'finnhub-earnings' | 'finnhub-ipo' | 'finnhub-news' | 'finnhub-analyst' | 'finnhub-price-target'
> {
  const lower = input.toLowerCase();
  const sources: Array<string> = [];
  if (/(btc|bitcoin|eth|sol|altcoin|crypto|token|defi|nft|ratio|market cap|volume|gainer|loser|hash rate|gas fee|staking|yield|tvl|floor price|on-chain|wallet|address|mvrv|whale|liquidation|vault|makerdao|uniswap|lido|rocket pool|pancake|curve|sushiswap|opensea|blur|mint|airdrop)/.test(lower)) sources.push('coingecko');
  if (/(stock|equity|nasdaq|sp500|s&p|mstr|nvda|aapl|msft|tesla|price to earnings|pe ratio|sharpe|company|public company|etf|fund|institutional|holding|microstrategy|apple|microsoft|tesla|nvda|nvidea|earnings|dividend|ytd|quarter|fomc|fed|cpi|unemployment|macro|dxy|dollar index|coinbase|coin)/.test(lower)) sources.push('finnhub');
  if (/(insider sentiment|insider activity)/.test(lower)) sources.push('finnhub-insider');
  if (/(earnings|eps|quarterly results)/.test(lower)) sources.push('finnhub-earnings');
  if (/(ipo|initial public offering)/.test(lower)) sources.push('finnhub-ipo');
  if (/(company news|stock news|press release)/.test(lower)) sources.push('finnhub-news');
  if (/(analyst|recommendation|target price|price target|buy|hold|sell)/.test(lower)) sources.push('finnhub-analyst');
  if (/(price target|target price)/.test(lower)) sources.push('finnhub-price-target');
  if (/(news|sentiment|twitter|x.com|headline|trending|regulation|sec|catalyst|event|conference|upgrade|decision|google trends|meme|retweet|shared|trending|reddit|forum|breaking|update)/.test(lower)) sources.push('web');
  if (sources.length === 0) sources.push('web');
  return Array.from(new Set(sources)) as Array<
    'coingecko' | 'finnhub' | 'web' | 'finnhub-insider' | 'finnhub-earnings' | 'finnhub-ipo' | 'finnhub-news' | 'finnhub-analyst' | 'finnhub-price-target'
  >;
}

function isPortfolioSimQuery(input: string): boolean {
  return /simulate a portfolio with/i.test(input);
}

function isEarningsComparisonQuery(input: string): boolean {
  return /latest earnings.*nvda.*compare.*btc|nvda.*earnings.*btc/i.test(input);
}

// LLM timeout constant
const LLM_TIMEOUT = 15000;

function normalizePersonaMode(mode: string | undefined): string {
  if (!mode) return 'multimodal';
  const m = mode.toLowerCase();
  if (
    m === 'multimodal' ||
    m === 'multi-modal' ||
    m === 'multi_modal' ||
    m.includes('multi-modal') ||
    m.includes('multimodal')
  ) {
    return 'multimodal';
  }
  // Convert snake_case or lower to PascalCase or known keys
  // e.g., 'viral_creator' -> 'ViralCreator', 'analyst' -> 'Analyst'
  return mode
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
}

// Helper to trim/summarize context blocks
function trimContextBlock(block: string, maxLines: number = 2): string {
  const lines = block.split('\n');
  if (lines.length <= maxLines + 1) return block;
  return lines.slice(0, maxLines + 1).join('\n') + '\n...';
}

process.on('unhandledRejection', (reason, promise) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    // Defensive logging
    // eslint-disable-next-line no-console
    console.log('Satoshi API received body:', body);
    const { input, mode } = body;
    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }
    let persona: string;
    if (!mode || mode === 'Multi-Modal' || mode === 'Multi-Modal (Auto-detect)') {
      persona = routeToPersona(input);
    } else {
      persona = normalizePersonaMode(mode);
    }
    const personaPrompt = SATOSHI_PERSONAS[persona];
    if (!personaPrompt) {
      const bitcoinNarrative = 'Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.';
      return NextResponse.json({
        persona,
        prompt: '',
        processed: `${bitcoinNarrative}\n\n**Warning:** Unknown persona: ${persona}. Partial data is available.`,
        dataSourceUsed: []
      }, { status: 200 });
    }

    // --- Dynamic Data Source Selection ---
    try {
      const sources = detectDataSource(input);
      const symbol = extractSymbol(input);
      let marketData = '';
      let webSearch = '';
      let xSentiment = '';
      let satoshiMarket = '';
      let insiderSentimentData = '';
      let earningsData = '';
      let ipoData = '';
      let companyNewsData = '';
      let btcQuote = '';
      let analystData = '';
      let priceTargetData = '';
      const used: string[] = [];
      // Only call APIs that are needed for the detected query type
      // If only crypto price is needed, skip all Finnhub, news, and web search calls
      const isSimpleCryptoQuery = sources.length === 1 && sources[0] === 'coingecko';
      const isSimpleStockQuery = sources.length === 1 && sources[0] === 'finnhub';
      const isNewsQuery = sources.includes('web') && sources.length === 1;
      const apiCalls: Promise<unknown>[] = [];
      // Always fetch BTC price for benchmarking (in parallel)
      apiCalls.push(Promise.race([
        getMarketData(['BTC']),
        new Promise((_, reject) => setTimeout(() => reject(new Error('CoinGecko BTC price timeout')), 5000))
      ]));
      if (!isSimpleCryptoQuery && !isSimpleStockQuery && !isNewsQuery) {
        // Complex or multi-source query: call all detected sources as before
        apiCalls.push(
          sources.includes('coingecko') ? Promise.race([
            getMarketData(['BTC', 'ETH', 'SOL']),
            new Promise((_, reject) => setTimeout(() => reject(new Error('CoinGecko timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('web') ? Promise.race([
            enhancedWebSearch(input),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Web search timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('web') ? Promise.race([
            getXSentiment(input),
            new Promise((_, reject) => setTimeout(() => reject(new Error('X sentiment timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('finnhub') ? Promise.race([
            getFinnhubQuote(symbol),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub quote timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('finnhub-insider') ? Promise.race([
            getInsiderSentiment(symbol),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub insider timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('finnhub-earnings') ? Promise.race([
            getCompanyEarnings(symbol),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub earnings timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('finnhub-ipo') ? Promise.race([
            getIPOCalendar(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub IPO timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('finnhub-news') ? Promise.race([
            getCompanyNews(symbol),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub news timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('finnhub-analyst') ? Promise.race([
            getAnalystRecommendations(symbol),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub analyst timeout')), 5000))
          ]) : Promise.resolve(null),
          sources.includes('finnhub-price-target') ? Promise.race([
            getPriceTarget(symbol),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub price target timeout')), 5000))
          ]) : Promise.resolve(null),
          Promise.race([
            getMarketDataWithSatoshiContext(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Satoshi market context timeout')), 5000))
          ])
        );
      } else if (isSimpleCryptoQuery) {
        // Only call CoinGecko
        apiCalls.push(Promise.race([
          getMarketData(['BTC', 'ETH', 'SOL']),
          new Promise((_, reject) => setTimeout(() => reject(new Error('CoinGecko timeout')), 5000))
        ]));
      } else if (isSimpleStockQuery) {
        // Only call Finnhub quote
        apiCalls.push(Promise.race([
          getFinnhubQuote(symbol),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub quote timeout')), 5000))
        ]));
      } else if (isNewsQuery) {
        // Only call web search
        apiCalls.push(Promise.race([
          enhancedWebSearch(input),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Web search timeout')), 5000))
        ]));
      }
      // Timed API calls
      const timings: { label: string; duration: number }[] = [];
      const apiCallWrappers = apiCalls.map((call, idx) => {
        const label = `API call ${idx}`;
        const start = Date.now();
        return call.then((result) => {
          const end = Date.now();
          timings.push({ label, duration: end - start });
          logDuration(label, start, end);
          return result;
        });
      });
      const results = await Promise.allSettled(apiCallWrappers);
      // Map results to context variables
      let warning = '';
      // BTC price for benchmarking is always results[0]
      if (results[0].status === 'fulfilled' && typeof results[0].value === 'string') {
        btcQuote = `\nBTC Price Benchmark:\n${results[0].value}`;
      } else {
        warning += '⚠️ CoinGecko BTC price fetch failed or timed out. ';
        btcQuote = '\n(Failed to fetch BTC price)';
      }
      // Shift all other results by 1
      const shiftedResults = results.slice(1);
      shiftedResults.forEach((result, idx) => {
        if (result.status === 'rejected') {
          // eslint-disable-next-line no-console
          console.error(`API call ${idx + 1} failed:`, result.reason);
          warning += `⚠️ API call ${idx + 1} failed: ${result.reason} `;
        }
      });
      // The rest of the mapping logic (marketData, webSearch, etc.) should use shiftedResults[idx] instead of results[idx]
      if (shiftedResults[0].status === 'fulfilled' && typeof shiftedResults[0].value === 'string') {
        marketData = shiftedResults[0].value;
        used.push('Coingecko');
      } else if (sources.includes('coingecko')) {
        warning += '⚠️ CoinGecko price fetch failed or timed out. ';
      }
      if (shiftedResults[1].status === 'fulfilled' && typeof shiftedResults[1].value === 'string') {
        webSearch = shiftedResults[1].value;
        used.push('Web Search');
      } else if (sources.includes('web')) {
        warning += '⚠️ Web search failed or timed out. ';
      }
      if (shiftedResults[2].status === 'fulfilled' && typeof shiftedResults[2].value === 'string') {
        xSentiment = shiftedResults[2].value;
      } else if (sources.includes('web')) {
        warning += '⚠️ X sentiment fetch failed or timed out. ';
      }
      if (shiftedResults[3].status === 'fulfilled' && shiftedResults[3].value && typeof shiftedResults[3].value === 'object' && 'c' in shiftedResults[3].value) {
        const q = shiftedResults[3].value as { c?: number; o?: number; h?: number; l?: number };
        marketData += `\n${symbol}: $${q.c} (Open: $${q.o}, High: $${q.h}, Low: $${q.l})`;
        used.push('Finnhub');
      } else if (sources.includes('finnhub')) {
        warning += `⚠️ Finnhub quote for ${symbol} failed or timed out. `;
      }
      if (shiftedResults[4].status === 'fulfilled' && shiftedResults[4].value && typeof shiftedResults[4].value === 'object' && 'data' in shiftedResults[4].value) {
        const sentiment = shiftedResults[4].value as { data?: Array<{ mspr?: number; month?: string; year?: string }> };
        if (sentiment && sentiment.data && sentiment.data.length > 0) {
          const latest = sentiment.data[sentiment.data.length - 1];
          insiderSentimentData = `\nInsider Sentiment for ${symbol}: MSPR=${latest.mspr}, Month=${latest.month}, Year=${latest.year}`;
        } else {
          insiderSentimentData = `\nNo recent insider sentiment data for ${symbol}.`;
        }
        used.push('Finnhub (Insider Sentiment)');
      } else if (sources.includes('finnhub-insider')) {
        warning += `⚠️ Finnhub insider sentiment for ${symbol} failed or timed out. `;
      }
      if (shiftedResults[5].status === 'fulfilled' && Array.isArray(shiftedResults[5].value)) {
        const earnings = shiftedResults[5].value;
        if (earnings && earnings.length > 0) {
          const latest = earnings[0];
          earningsData = `\nEarnings for ${symbol}: EPS=${latest.epsActual}, Estimate=${latest.epsEstimate}, Date=${latest.date}`;
        } else {
          earningsData = `\nNo recent earnings data for ${symbol}.`;
        }
        used.push('Finnhub (Earnings)');
      } else if (sources.includes('finnhub-earnings')) {
        warning += `⚠️ Finnhub earnings for ${symbol} failed or timed out. `;
      }
      if (shiftedResults[6].status === 'fulfilled' && shiftedResults[6].value && typeof shiftedResults[6].value === 'object' && 'ipoCalendar' in shiftedResults[6].value) {
        const ipo = shiftedResults[6].value as { ipoCalendar?: Array<{ name?: string; symbol?: string; date?: string }> };
        if (ipo && ipo.ipoCalendar && ipo.ipoCalendar.length > 0) {
          const nextIpo = ipo.ipoCalendar[0];
          ipoData = `\nUpcoming IPO: ${nextIpo.name} (${nextIpo.symbol}) on ${nextIpo.date}`;
        } else {
          ipoData = '\nNo upcoming IPOs found.';
        }
        used.push('Finnhub (IPO Calendar)');
      } else if (sources.includes('finnhub-ipo')) {
        warning += '⚠️ Finnhub IPO calendar failed or timed out. ';
      }
      if (shiftedResults[7].status === 'fulfilled' && Array.isArray(shiftedResults[7].value)) {
        const news = shiftedResults[7].value;
        if (news && news.length > 0) {
          const topNews = news.slice(0, 2).map((n: { headline: string; datetime: string }) => `- ${n.headline} (${n.datetime})`).join('\n');
          companyNewsData = `\nLatest News for ${symbol}:\n${topNews}`;
        } else {
          companyNewsData = `\nNo recent news for ${symbol}.`;
        }
        used.push('Finnhub (Company News)');
      } else if (sources.includes('finnhub-news')) {
        warning += '⚠️ Finnhub company news failed or timed out. ';
      }
      if (shiftedResults[8].status === 'fulfilled' && Array.isArray(shiftedResults[8].value)) {
        const analyst = shiftedResults[8].value;
        if (analyst && analyst.length > 0) {
          const latest = analyst[0];
          analystData = `\nAnalyst Recommendations for ${symbol}: Buy: ${latest.buy}, Hold: ${latest.hold}, Sell: ${latest.sell}, Strong Buy: ${latest.strongBuy}, Strong Sell: ${latest.strongSell}, Target Price: $${latest.targetPrice ?? 'N/A'}`;
        } else {
          analystData = `\nNo recent analyst recommendations for ${symbol}.`;
        }
        used.push('Finnhub (Analyst Recommendations)');
      } else if (sources.includes('finnhub-analyst')) {
        warning += '⚠️ Finnhub analyst recommendations failed or timed out. ';
      }
      if (shiftedResults[9].status === 'fulfilled' && shiftedResults[9].value && typeof shiftedResults[9].value === 'object' && 'targetHighPrice' in shiftedResults[9].value) {
        const pt = shiftedResults[9].value as { targetHighPrice?: number; targetLowPrice?: number; targetMeanPrice?: number; targetMedianPrice?: number };
        if (pt && pt.targetHighPrice !== undefined) {
          priceTargetData = `\nPrice Target for ${symbol}: High: $${pt.targetHighPrice}, Low: $${pt.targetLowPrice}, Mean: $${pt.targetMeanPrice}, Median: $${pt.targetMedianPrice}`;
        } else {
          priceTargetData = `\nNo price target data for ${symbol}.`;
        }
        used.push('Finnhub (Price Target)');
      } else if (sources.includes('finnhub-price-target')) {
        warning += '⚠️ Finnhub price target failed or timed out. ';
      }
      if (shiftedResults[10].status === 'fulfilled' && typeof shiftedResults[10].value === 'string') {
        satoshiMarket = shiftedResults[10].value;
      } else {
        warning += '⚠️ Satoshi market context fetch failed or timed out. ';
      }

      // Compose context block
      let realtimeContext = `\n# Real-Time Market Data\n${btcQuote}${marketData}${insiderSentimentData}${earningsData}${ipoData}${companyNewsData}${analystData}${priceTargetData}\n\n# Latest Web Search\n${webSearch}\n\n# X Sentiment\n${xSentiment}\n\n# Satoshi Market Context\n${satoshiMarket}\n`;
      // If the context is too long, trim each block
      const MAX_PROMPT_CHARS = 4000;
      if (realtimeContext.length > MAX_PROMPT_CHARS) {
        realtimeContext = `\n# Real-Time Market Data\n${trimContextBlock(btcQuote)}${trimContextBlock(marketData)}${trimContextBlock(insiderSentimentData)}${trimContextBlock(earningsData)}${trimContextBlock(ipoData)}${trimContextBlock(companyNewsData)}${trimContextBlock(analystData)}${trimContextBlock(priceTargetData)}\n\n# Latest Web Search\n${trimContextBlock(webSearch)}\n\n# X Sentiment\n${trimContextBlock(xSentiment)}\n\n# Satoshi Market Context\n${trimContextBlock(satoshiMarket)}`;
        // eslint-disable-next-line no-console
        console.warn('Prompt context trimmed for LLM size limit.');
      }
      // Prepend context to prompt
      const fullPrompt = `${realtimeContext}\n\n${BRAND_DNA_PROMPT}\n\n${personaPrompt}`;

      // Helper: get Jan 1 price for BTC, ETH, NVDA (hardcoded for now, can be improved with historical API)
      const JAN1_PRICES = {
        BTC: 45000, // Replace with actual Jan 1 price
        ETH: 2300,  // Replace with actual Jan 1 price
        NVDA: 480   // Replace with actual Jan 1 price
      };

      if (isPortfolioSimQuery(input)) {
        // Fetch current prices with timeout and error handling
        let cgDataRaw = '';
        let cgWarning = '';
        try {
          cgDataRaw = await Promise.race([
            getMarketData(['BTC', 'ETH']),
            new Promise((_, reject) => setTimeout(() => reject(new Error('CoinGecko timeout')), 5000))
          ]) as string;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('CoinGecko price fetch failed:', e);
          cgWarning = '⚠️ CoinGecko price fetch failed or timed out.';
          cgDataRaw = '';
        }
        // Parse prices from cgDataRaw (very basic extraction)
        const btcMatch = cgDataRaw.match(/BTC:\n💰 Price: \$([\d,\.]+)/);
        const ethMatch = cgDataRaw.match(/ETH:\n💰 Price: \$([\d,\.]+)/);
        const btcNow = btcMatch ? parseFloat(btcMatch[1].replace(/,/g, '')) : undefined;
        const ethNow = ethMatch ? parseFloat(ethMatch[1].replace(/,/g, '')) : undefined;
        // Finnhub for NVDA with timeout
        let nvdaNow: number | undefined = undefined;
        let nvdaWarning = '';
        try {
          const nvdaQuote = await Promise.race([
            getFinnhubQuote('NVDA'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub timeout')), 5000))
          ]) as { c?: number; o?: number; h?: number; l?: number };
          if (nvdaQuote && typeof nvdaQuote === 'object' && 'c' in nvdaQuote) {
            nvdaNow = nvdaQuote.c;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('NVDA price fetch failed:', e);
          nvdaWarning = '⚠️ NVDA price fetch failed or timed out.';
        }
        // Use hardcoded Jan 1 prices
        const btcJan = JAN1_PRICES.BTC;
        const ethJan = JAN1_PRICES.ETH;
        const nvdaJan = JAN1_PRICES.NVDA;
        // Calculate YTD returns
        const btcYtd = btcNow && btcJan ? ((btcNow - btcJan) / btcJan) : undefined;
        const ethYtd = ethNow && ethJan ? ((ethNow - ethJan) / ethJan) : undefined;
        const nvdaYtd = nvdaNow && nvdaJan ? ((nvdaNow - nvdaJan) / nvdaJan) : undefined;
        // Portfolio math (assume $100k)
        const initial = 100000;
        const btcAlloc = 0.5, nvdaAlloc = 0.25, ethAlloc = 0.25;
        const btcFinal = btcYtd !== undefined ? initial * btcAlloc * (1 + btcYtd) : undefined;
        const nvdaFinal = nvdaYtd !== undefined ? initial * nvdaAlloc * (1 + nvdaYtd) : undefined;
        const ethFinal = ethYtd !== undefined ? initial * ethAlloc * (1 + ethYtd) : undefined;
        const totalFinal = [btcFinal, nvdaFinal, ethFinal].every(x => x !== undefined)
          ? (btcFinal! + nvdaFinal! + ethFinal!) : undefined;
        const portYtd = totalFinal !== undefined ? (totalFinal - initial) / initial : undefined;
        // Format answer
        let answer = '### Portfolio Simulation: 50% BTC, 25% NVDA, 25% ETH (YTD)\n\n';
        answer += '#### 1. Asset Performance\n';
        answer += `- BTC: Jan 1: $${btcJan}, Now: $${btcNow ?? 'N/A'} → YTD: ${btcYtd !== undefined ? (btcYtd * 100).toFixed(2) + '%' : 'N/A'}\n`;
        answer += `- NVDA: Jan 1: $${nvdaJan}, Now: $${nvdaNow ?? 'N/A'} → YTD: ${nvdaYtd !== undefined ? (nvdaYtd * 100).toFixed(2) + '%' : 'N/A'}\n`;
        answer += `- ETH: Jan 1: $${ethJan}, Now: $${ethNow ?? 'N/A'} → YTD: ${ethYtd !== undefined ? (ethYtd * 100).toFixed(2) + '%' : 'N/A'}\n\n`;
        answer += '#### 2. Portfolio Calculation (Initial $100,000)\n';
        answer += `- BTC: $50,000 × (1 + YTD) = $${btcFinal !== undefined ? btcFinal.toFixed(2) : 'N/A'}\n`;
        answer += `- NVDA: $25,000 × (1 + YTD) = $${nvdaFinal !== undefined ? nvdaFinal.toFixed(2) : 'N/A'}\n`;
        answer += `- ETH: $25,000 × (1 + YTD) = $${ethFinal !== undefined ? ethFinal.toFixed(2) : 'N/A'}\n`;
        answer += `- **Total Value:** $${totalFinal !== undefined ? totalFinal.toFixed(2) : 'N/A'}\n`;
        answer += `- **Portfolio YTD Return:** ${portYtd !== undefined ? (portYtd * 100).toFixed(2) + '%' : 'N/A'}\n\n`;
        answer += '#### 3. Risk & Context\n- Crypto allocation increases volatility.\n- Past performance ≠ future results.\n\n';
        if (cgWarning || nvdaWarning) {
          answer += `**Warning:** ${cgWarning} ${nvdaWarning}\n`;
        }
        answer += '**Summary:** This simulated portfolio returned ' + (portYtd !== undefined ? (portYtd * 100).toFixed(2) + '%' : 'N/A') + ' YTD.\n';
        return NextResponse.json({ persona, prompt: fullPrompt, processed: answer, dataSourceUsed: used });
      }

      if (isEarningsComparisonQuery(input)) {
        // Fetch latest NVDA earnings
        let earnings = [];
        let earningsWarning = '';
        try {
          earnings = await Promise.race([
            getCompanyEarnings('NVDA'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub earnings timeout')), 5000))
          ]);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('NVDA earnings fetch failed:', e);
          earningsWarning = '⚠️ Failed to fetch NVDA earnings.';
        }
        const latestEarnings = earnings && earnings.length > 0 ? earnings[0] : undefined;
        // Fetch current prices for NVDA and BTC
        let cgDataRaw = '';
        let cgWarning = '';
        try {
          cgDataRaw = await Promise.race([
            getMarketData(['BTC']),
            new Promise((_, reject) => setTimeout(() => reject(new Error('CoinGecko timeout')), 5000))
          ]) as string;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('CoinGecko price fetch failed:', e);
          cgWarning = '⚠️ CoinGecko price fetch failed or timed out.';
          cgDataRaw = '';
        }
        // Parse BTC price
        const btcMatch = cgDataRaw.match(/BTC:\n💰 Price: \$([\d,\.]+)/);
        const btcNow = btcMatch ? parseFloat(btcMatch[1].replace(/,/g, '')) : undefined;
        // Finnhub for NVDA price
        let nvdaNow: number | undefined = undefined;
        let nvdaWarning = '';
        try {
          const nvdaQuote = await Promise.race([
            getFinnhubQuote('NVDA'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub timeout')), 5000))
          ]) as { c?: number };
          if (nvdaQuote && typeof nvdaQuote === 'object' && 'c' in nvdaQuote) {
            nvdaNow = nvdaQuote.c;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('NVDA price fetch failed:', e);
          nvdaWarning = '⚠️ NVDA price fetch failed or timed out.';
        }
        // Use hardcoded Jan 1 prices
        const btcJan = JAN1_PRICES.BTC;
        const nvdaJan = JAN1_PRICES.NVDA;
        // Calculate YTD returns
        const btcYtd = btcNow && btcJan ? ((btcNow - btcJan) / btcJan) : undefined;
        const nvdaYtd = nvdaNow && nvdaJan ? ((nvdaNow - nvdaJan) / nvdaJan) : undefined;
        // Format answer
        let answer = '### Latest NVDA Earnings vs BTC Performance\n\n';
        answer += '#### NVDA Latest Earnings\n';
        if (latestEarnings) {
          answer += `- Date: ${latestEarnings.date || 'N/A'}\n`;
          answer += `- EPS: $${latestEarnings.epsActual ?? 'N/A'} (Estimate: $${latestEarnings.epsEstimate ?? 'N/A'})\n`;
          answer += `- Revenue: $${latestEarnings.revenueActual ?? 'N/A'} (Estimate: $${latestEarnings.revenueEstimate ?? 'N/A'})\n`;
          answer += `- Surprise: ${latestEarnings.epsSurprise !== undefined ? latestEarnings.epsSurprise + '%' : 'N/A'}\n`;
        } else {
          answer += 'Earnings data not available.\n';
        }
        answer += '\n#### YTD Performance (2024)\n';
        answer += `- NVDA: Jan 1: $${nvdaJan}, Now: $${nvdaNow ?? 'N/A'} → YTD: ${nvdaYtd !== undefined ? (nvdaYtd * 100).toFixed(2) + '%' : 'N/A'}\n`;
        answer += `- BTC: Jan 1: $${btcJan}, Now: $${btcNow ?? 'N/A'} → YTD: ${btcYtd !== undefined ? (btcYtd * 100).toFixed(2) + '%' : 'N/A'}\n\n`;
        if (earningsWarning || cgWarning || nvdaWarning) {
          answer += `**Warning:** ${earningsWarning} ${cgWarning} ${nvdaWarning}\n`;
        }
        answer += '**Summary:** NVDA earnings: ';
        if (latestEarnings) {
          answer += `EPS $${latestEarnings.epsActual ?? 'N/A'} (est. $${latestEarnings.epsEstimate ?? 'N/A'}), Revenue $${latestEarnings.revenueActual ?? 'N/A'} (est. $${latestEarnings.revenueEstimate ?? 'N/A'}). `;
        }
        answer += `YTD: NVDA ${nvdaYtd !== undefined ? (nvdaYtd * 100).toFixed(2) + '%' : 'N/A'}, BTC ${btcYtd !== undefined ? (btcYtd * 100).toFixed(2) + '%' : 'N/A'}.`;
        return NextResponse.json({ persona, prompt: fullPrompt, processed: answer, dataSourceUsed: used });
      }

      // Special case: analyst recommendations and compare COIN to BTC
      const isAnalystCompareQuery = /analyst recommendations.*compare.*coin.*btc|compare.*coin.*btc.*analyst recommendations/i.test(input);
      if (isAnalystCompareQuery) {
        // Fetch only Finnhub analyst recommendations and BTC price
        let analystData = '';
        let btcQuote = '';
        try {
          const analyst = await Promise.race([
            getAnalystRecommendations('COIN'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Finnhub analyst timeout')), 5000))
          ]);
          if (analyst && analyst.length > 0) {
            const latest = analyst[0];
            analystData = `\nAnalyst Recommendations for COIN: Buy: ${latest.buy}, Hold: ${latest.hold}, Sell: ${latest.sell}, Strong Buy: ${latest.strongBuy}, Strong Sell: ${latest.strongSell}, Target Price: $${latest.targetPrice ?? 'N/A'}`;
          } else {
            analystData = `\nNo recent analyst recommendations for COIN.`;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Analyst recommendations fetch failed:', e);
          analystData = `\n(Failed to fetch analyst recommendations for COIN from Finnhub)`;
        }
        try {
          const btc = await Promise.race([
            getMarketData(['BTC']),
            new Promise((_, reject) => setTimeout(() => reject(new Error('CoinGecko timeout')), 5000))
          ]);
          btcQuote = `\nBTC Price Benchmark:\n${btc}`;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('BTC price fetch failed:', e);
          btcQuote = '\n(Failed to fetch BTC price)';
        }
        const minimalContext = `\n# Analyst Recommendations\n${analystData}\n\n# BTC Price\n${btcQuote}`;
        const fullPrompt = `${minimalContext}\n\n${BRAND_DNA_PROMPT}\n\n${personaPrompt}`;
        const llmStart = Date.now();
        let fallbackLLMResponse;
        let llmTimedOut = false;
        try {
          fallbackLLMResponse = await Promise.race([
            Grok4Service.generateViralResponse(input, fullPrompt),
            new Promise((_, reject) => setTimeout(() => reject(new Error('LLM timeout')), LLM_TIMEOUT))
          ]);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('LLM response failed:', e);
          llmTimedOut = true;
        }
        const llmEnd = Date.now();
        logDuration('LLM response', llmStart, llmEnd);
        let fallbackProcessedString: string;
        if (llmTimedOut) {
          fallbackProcessedString = `Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.\n\n**Warning:** LLM timed out after 15 seconds. Partial data shown.\n\n*Suggestions:*\n- Try a more focused question.\n- Wait a moment and try again if the system is busy.`;
        } else {
          const fallbackProcessed = postProcessLLMOutput(persona, String(fallbackLLMResponse)) as string | { content?: string; text?: string; [key: string]: unknown };
          fallbackProcessedString = typeof fallbackProcessed === 'string'
            ? fallbackProcessed
            : (fallbackProcessed.content || fallbackProcessed.text) ?? JSON.stringify(fallbackProcessed, null, 2);
        }
        return NextResponse.json({ persona, prompt: fullPrompt, processed: fallbackProcessedString, dataSourceUsed: ['Finnhub', 'CoinGecko'] });
      }

      // Fallback: always answer with whatever data is available
      const fallbackPrompt = `${realtimeContext}\n\n${BRAND_DNA_PROMPT}\n\n${personaPrompt}`;
      const llmStart = Date.now();
      let fallbackLLMResponse;
      let llmTimedOut = false;
      try {
        fallbackLLMResponse = await Promise.race([
          Grok4Service.generateViralResponse(input, fallbackPrompt),
          new Promise((_, reject) => setTimeout(() => reject(new Error('LLM timeout')), LLM_TIMEOUT))
        ]);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('LLM response failed:', e);
        llmTimedOut = true;
      }
      const llmEnd = Date.now();
      logDuration('LLM response', llmStart, llmEnd);
      timings.push({ label: 'LLM response', duration: llmEnd - llmStart });
      // Print slowest step
      const slowest = timings.reduce((a, b) => (a.duration > b.duration ? a : b), { label: '', duration: 0 });
      // eslint-disable-next-line no-console
      console.log('Slowest step:', slowest.label, slowest.duration, 'ms');
      let fallbackProcessedString: string;
      if (llmTimedOut) {
        fallbackProcessedString = `Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.\n\n**Warning:** LLM timed out after 15 seconds. Partial data shown.\n\n*Suggestions:*\n- Try a more focused question.\n- Wait a moment and try again if the system is busy.`;
      } else {
        const fallbackProcessed = postProcessLLMOutput(persona, String(fallbackLLMResponse)) as string | { content?: string; text?: string; [key: string]: unknown };
        fallbackProcessedString = typeof fallbackProcessed === 'string'
          ? fallbackProcessed
          : (fallbackProcessed.content || fallbackProcessed.text) ?? JSON.stringify(fallbackProcessed, null, 2);
      }
      if (warning) {
        fallbackProcessedString = `Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.\n\n**Warning:** ${warning}\n\n${fallbackProcessedString}`;
      }
      return NextResponse.json({ persona, prompt: fallbackPrompt, processed: fallbackProcessedString, dataSourceUsed: used });
    } catch (apiError) {
      // If any API call fails unexpectedly, return a 200 with a warning and partial data
      let warningMsg: string;
      if (typeof apiError === 'string') warningMsg = apiError;
      else if (apiError instanceof Error) warningMsg = apiError.message;
      else warningMsg = String(apiError);
      const suggestions = `\n\n*Suggestions:*\n- Try your request again in a few moments.\n- Rephrase your question for a more focused answer.\n- If this issue persists, please let us know!`;
      const bitcoinNarrative = 'Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.';
      return NextResponse.json({
        persona,
        prompt: '',
        processed: `${bitcoinNarrative}\n\n**Warning:** An error occurred while fetching data: ${warningMsg}\n\nPartial or no data is available at this time.${suggestions}`,
        dataSourceUsed: []
      }, { status: 200 });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Satoshi API error:', e);
    const errorMsg = e instanceof Error ? e.message : String(e);
    const bitcoinNarrative = 'Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.';
    return NextResponse.json({ error: 'Malformed request or server error', details: `${bitcoinNarrative}\n${errorMsg}` }, { status: 400 });
  }
}

// Healthcheck endpoint for monitoring
export async function GET(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith('/health')) {
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() }, { status: 200 });
  }
  return NextResponse.json({
    modes: {
      validator: 'Validate crypto projects using Satoshi frameworks',
      analyst: 'Analyze stocks with Bitcoin-first perspective',
      educator: 'Simplify complex concepts with analogies',
      designer: 'Provide UX/UI critique with Bitcoin principles',
      interviewer: 'Generate insightful interview questions',
      consultant: 'Write strategic whitepapers',
      researcher: 'Conduct academic research',
      content_creator: 'Create general content with Satoshi voice',
      viral_creator: 'Create viral content with enhanced writing style for X/Twitter',
      enhanced_viral_creator: 'Create viral content with platform-specific psychology and natural writing',
      platform_adaptation: 'Adapt existing content for different platforms',
      multi_platform_strategy: 'Create comprehensive multi-platform content strategy',
      crypto_price: 'Get crypto prices with Satoshi commentary',
      x_sentiment: 'Analyze X sentiment with Satoshi perspective',
      market_data: 'Get market data with Satoshi context',
      multimodal: 'Automatically determine best persona (default)'
    },
    capabilities: [
      'Multi-modal personality switching',
      'Bitcoin-first analysis',
      'Cryptographic validation',
      'Educational simplification',
      'Design critique',
      'Interview question generation',
      'Whitepaper writing',
      'Academic research',
      'Content creation with Satoshi voice',
      'Viral content creation with enhanced writing style',
      'Enhanced viral content with platform-specific psychology',
      'Platform-specific content adaptation',
      'Multi-platform content strategy',
      'Enhanced crypto price data',
      'X sentiment analysis',
      'Market data with context'
    ],
    examples: {
      validator: 'POST /api/satoshi {"message": "Validate this DeFi protocol", "mode": "validator"}',
      analyst: 'POST /api/satoshi {"message": "Analyze MSTR", "mode": "analyst"}',
      educator: 'POST /api/satoshi {"message": "Explain Lightning Network", "mode": "educator"}',
      viral_creator: 'POST /api/satoshi {"message": "Bitcoin ETF flows", "mode": "viral_creator", "options": {"platform": "X", "content_type": "thread"}}',
      enhanced_viral_creator: 'POST /api/satoshi {"message": "Bitcoin ETF flows", "mode": "enhanced_viral_creator", "options": {"platform": "X", "content_type": "thread", "business_context": {"industry": "Crypto", "targetAudience": "Bitcoin investors", "mainGoal": "Education"}}}',
      platform_adaptation: 'POST /api/satoshi {"message": "Your content here", "mode": "platform_adaptation", "options": {"target_platform": "LinkedIn", "content_type": "post"}}',
      multi_platform_strategy: 'POST /api/satoshi {"message": "Bitcoin adoption", "mode": "multi_platform_strategy", "options": {"platforms": ["X", "LinkedIn", "Instagram"], "business_context": {"industry": "Crypto", "mainGoal": "Education"}}}',
      multimodal: 'POST /api/satoshi {"message": "What do you think about this new crypto project?"}'
    },
    platforms: {
      'X': 'Twitter/X platform with thread and tweet optimization',
      'LinkedIn': 'Professional platform with thought leadership focus',
      'Instagram': 'Visual platform with story and post optimization',
      'TikTok': 'Short-form video platform with trend integration',
      'YouTube': 'Long-form video platform with title and description optimization'
    }
  });
} 