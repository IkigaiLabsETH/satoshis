import { NextRequest, NextResponse } from 'next/server';
import { SATOSHI_PERSONAS } from '@/services/satoshi/personas';
import { routeToPersona } from '@/services/satoshi/router';
import { postProcessLLMOutput } from '@/services/satoshi/postprocess';
import { Grok4Service, getMarketData, enhancedWebSearch, getXSentiment } from '../grok4/grok4';
import { BRAND_DNA_PROMPT } from '@/services/satoshi/brand-dna';
import { getMarketDataWithSatoshiContext } from '@/services/satoshi/enhancedCryptoPrice';
import { getFinnhubQuote } from '@/services/market/finnhub';

function detectDataSource(input: string): Array<'coingecko' | 'finnhub' | 'web'> {
  const lower = input.toLowerCase();
  const sources: Array<'coingecko' | 'finnhub' | 'web'> = [];
  if (/(btc|bitcoin|eth|sol|altcoin|crypto|token|defi|nft|ratio|market cap|volume|gainer|loser|hash rate|gas fee|staking|yield|tvl|floor price|on-chain|wallet|address|mvrv|whale|liquidation|vault|makerdao|uniswap|lido|rocket pool|pancake|curve|sushiswap|opensea|blur|mint|airdrop)/.test(lower)) {
    sources.push('coingecko');
  }
  if (/(stock|equity|nasdaq|sp500|s&p|mstr|nvda|aapl|msft|tesla|price to earnings|pe ratio|sharpe|company|public company|etf|fund|institutional|holding|microstrategy|apple|microsoft|tesla|nvda|nvidea|earnings|dividend|ytd|quarter|fomc|fed|cpi|unemployment|macro|dxy|dollar index)/.test(lower)) {
    sources.push('finnhub');
  }
  if (/(news|sentiment|twitter|x.com|headline|trending|regulation|sec|catalyst|event|conference|upgrade|decision|google trends|meme|retweet|shared|trending|reddit|forum|breaking|update)/.test(lower)) {
    sources.push('web');
  }
  // Always at least one
  if (sources.length === 0) sources.push('web');
  return Array.from(new Set(sources));
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
    let marketData = '';
    let webSearch = '';
    let xSentiment = '';
    let satoshiMarket = '';
    const used: string[] = [];
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
        const mstrQuote = await getFinnhubQuote('MSTR');
        const nvdaQuote = await getFinnhubQuote('NVDA');
        marketData += `\nMSTR: $${mstrQuote.c} (Open: $${mstrQuote.o}, High: $${mstrQuote.h}, Low: $${mstrQuote.l})`;
        marketData += `\nNVDA: $${nvdaQuote.c} (Open: $${nvdaQuote.o}, High: $${nvdaQuote.h}, Low: $${nvdaQuote.l})`;
        used.push('Finnhub');
      } catch {
        marketData += '\n(Failed to fetch some stock data from Finnhub)';
      }
    }
    // Always add Satoshi market context
    satoshiMarket = await getMarketDataWithSatoshiContext();

    // Compose context block
    const realtimeContext = `
# Real-Time Market Data
${marketData}

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
    const processed = postProcessLLMOutput(persona, llmResponse);
    return NextResponse.json({ persona, prompt: fullPrompt, processed, dataSourceUsed: used });
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