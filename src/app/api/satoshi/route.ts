import { NextRequest, NextResponse } from 'next/server';
import { SATOSHI_PERSONAS } from '@/services/satoshi/personas';
import { routeToPersona } from '@/services/satoshi/router';
import { postProcessLLMOutput } from '@/services/satoshi/postprocess';
import { Grok4Service, getMarketData, enhancedWebSearch, getXSentiment } from '../grok4/grok4';
import { BRAND_DNA_PROMPT } from '@/services/satoshi/brand-dna';
import { getMarketDataWithSatoshiContext } from '@/services/satoshi/enhancedCryptoPrice';
import { getFinnhubQuote, getInsiderSentiment, getCompanyEarnings, getIPOCalendar, getCompanyNews } from '@/services/market/finnhub';

function extractSymbol(input: string): string {
  // Simple regex to extract a likely stock symbol (all caps, 1-5 letters)
  const match = input.match(/\b([A-Z]{1,5})\b/);
  return match ? match[1] : 'MSTR';
}

function detectDataSource(input: string): Array<
  'coingecko' | 'finnhub' | 'web' | 'finnhub-insider' | 'finnhub-earnings' | 'finnhub-ipo' | 'finnhub-news'
> {
  const lower = input.toLowerCase();
  const sources: Array<string> = [];
  if (/(btc|bitcoin|eth|sol|altcoin|crypto|token|defi|nft|ratio|market cap|volume|gainer|loser|hash rate|gas fee|staking|yield|tvl|floor price|on-chain|wallet|address|mvrv|whale|liquidation|vault|makerdao|uniswap|lido|rocket pool|pancake|curve|sushiswap|opensea|blur|mint|airdrop)/.test(lower)) sources.push('coingecko');
  if (/(stock|equity|nasdaq|sp500|s&p|mstr|nvda|aapl|msft|tesla|price to earnings|pe ratio|sharpe|company|public company|etf|fund|institutional|holding|microstrategy|apple|microsoft|tesla|nvda|nvidea|earnings|dividend|ytd|quarter|fomc|fed|cpi|unemployment|macro|dxy|dollar index)/.test(lower)) sources.push('finnhub');
  if (/(insider sentiment|insider activity)/.test(lower)) sources.push('finnhub-insider');
  if (/(earnings|eps|quarterly results)/.test(lower)) sources.push('finnhub-earnings');
  if (/(ipo|initial public offering)/.test(lower)) sources.push('finnhub-ipo');
  if (/(company news|stock news|press release)/.test(lower)) sources.push('finnhub-news');
  if (/(news|sentiment|twitter|x.com|headline|trending|regulation|sec|catalyst|event|conference|upgrade|decision|google trends|meme|retweet|shared|trending|reddit|forum|breaking|update)/.test(lower)) sources.push('web');
  if (sources.length === 0) sources.push('web');
  return Array.from(new Set(sources)) as Array<
    'coingecko' | 'finnhub' | 'web' | 'finnhub-insider' | 'finnhub-earnings' | 'finnhub-ipo' | 'finnhub-news'
  >;
}

function isPortfolioSimQuery(input: string): boolean {
  return /simulate a portfolio with/i.test(input);
}

function isEarningsComparisonQuery(input: string): boolean {
  return /latest earnings.*nvda.*compare.*btc|nvda.*earnings.*btc/i.test(input);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, mode } = body;
    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }
    let persona: string;
    if (!mode || mode === 'Multi-Modal' || mode === 'Multi-Modal (Auto-detect)') {
      persona = routeToPersona(input);
    } else {
      persona = mode;
    }
    const personaPrompt = SATOSHI_PERSONAS[persona];
    if (!personaPrompt) {
      return NextResponse.json({ error: `Unknown persona: ${persona}` }, { status: 400 });
    }

    // --- Dynamic Data Source Selection ---
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
    const used: string[] = [];
    // Always fetch BTC price for benchmarking
    try {
      const btc = await getMarketData(['BTC']);
      btcQuote = `\nBTC Price Benchmark:\n${btc}`;
    } catch {
      btcQuote = '\n(Failed to fetch BTC price)';
    }
    if (sources.includes('coingecko')) {
      marketData = await getMarketData(['BTC', 'ETH', 'SOL']);
      used.push('Coingecko');
    }
    if (sources.includes('web')) {
      webSearch = await enhancedWebSearch(input);
      xSentiment = await getXSentiment(input);
      used.push('Web Search/X');
    }
    if (sources.includes('finnhub')) {
      try {
        const quote = await getFinnhubQuote(symbol);
        marketData += `\n${symbol}: $${quote.c} (Open: $${quote.o}, High: $${quote.h}, Low: $${quote.l})`;
        used.push('Finnhub');
      } catch {
        marketData += `\n(Failed to fetch stock data for ${symbol} from Finnhub)`;
      }
    }
    if (sources.includes('finnhub-insider')) {
      try {
        const sentiment = await getInsiderSentiment(symbol);
        if (sentiment && sentiment.data && sentiment.data.length > 0) {
          const latest = sentiment.data[sentiment.data.length - 1];
          insiderSentimentData = `\nInsider Sentiment for ${symbol}: MSPR=${latest.mspr}, Month=${latest.month}, Year=${latest.year}`;
        } else {
          insiderSentimentData = `\nNo recent insider sentiment data for ${symbol}.`;
        }
        used.push('Finnhub (Insider Sentiment)');
      } catch {
        insiderSentimentData = `\n(Failed to fetch insider sentiment data for ${symbol} from Finnhub)`;
      }
    }
    if (sources.includes('finnhub-earnings')) {
      try {
        const earnings = await getCompanyEarnings(symbol);
        if (earnings && earnings.length > 0) {
          const latest = earnings[0];
          earningsData = `\nEarnings for ${symbol}: EPS=${latest.epsActual}, Estimate=${latest.epsEstimate}, Date=${latest.date}`;
        } else {
          earningsData = `\nNo recent earnings data for ${symbol}.`;
        }
        used.push('Finnhub (Earnings)');
      } catch {
        earningsData = `\n(Failed to fetch earnings data for ${symbol} from Finnhub)`;
      }
    }
    if (sources.includes('finnhub-ipo')) {
      try {
        const ipo = await getIPOCalendar();
        if (ipo && ipo.ipoCalendar && ipo.ipoCalendar.length > 0) {
          const nextIpo = ipo.ipoCalendar[0];
          ipoData = `\nUpcoming IPO: ${nextIpo.name} (${nextIpo.symbol}) on ${nextIpo.date}`;
        } else {
          ipoData = '\nNo upcoming IPOs found.';
        }
        used.push('Finnhub (IPO Calendar)');
      } catch {
        ipoData = '\n(Failed to fetch IPO calendar from Finnhub)';
      }
    }
    if (sources.includes('finnhub-news')) {
      try {
        const news = await getCompanyNews(symbol);
        if (news && news.length > 0) {
          const topNews = news.slice(0, 2).map((n: { headline: string; datetime: string }) => `- ${n.headline} (${n.datetime})`).join('\n');
          companyNewsData = `\nLatest News for ${symbol}:\n${topNews}`;
        } else {
          companyNewsData = `\nNo recent news for ${symbol}.`;
        }
        used.push('Finnhub (Company News)');
      } catch {
        companyNewsData = `\n(Failed to fetch company news for ${symbol} from Finnhub)`;
      }
    }
    // Always add Satoshi market context
    satoshiMarket = await getMarketDataWithSatoshiContext();

    // Compose context block
    const realtimeContext = `
# Real-Time Market Data
${btcQuote}${marketData}${insiderSentimentData}${earningsData}${ipoData}${companyNewsData}

# Latest Web Search
${webSearch}

# X Sentiment
${xSentiment}

# Satoshi Market Context
${satoshiMarket}
`;

    // Prepend context to prompt
    const fullPrompt = `${realtimeContext}\n\n${BRAND_DNA_PROMPT}\n\n${personaPrompt}`;
    const llmResponse = await Grok4Service.generateViralResponse(input, fullPrompt);
    // Language refinement will be applied in postProcessLLMOutput
    const processed = postProcessLLMOutput(persona, llmResponse) as string | { content?: string; text?: string; [key: string]: unknown };
    let processedString = '';
    if (typeof processed === 'string') {
      processedString = processed;
    } else if (processed && typeof processed === 'object' && (processed.content || processed.text)) {
      processedString = (processed.content || processed.text) ?? '';
    } else if (processed && typeof processed === 'object' && Object.keys(processed).length > 0) {
      processedString = JSON.stringify(processed, null, 2);
    } else {
      processedString = '';
    }

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
      } catch {
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
      } catch {
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
        earnings = await getCompanyEarnings('NVDA');
      } catch {
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
      } catch {
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
      } catch {
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

    return NextResponse.json({ persona, prompt: fullPrompt, processed: processedString, dataSourceUsed: used });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint for getting available modes and capabilities
export async function GET() {
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