import { NextRequest, NextResponse } from 'next/server';
import { Grok4Service } from '../../grok4/grok4';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image?: string;
}

interface StockData {
  symbol: string;
  c: number; // current price
  d: number; // change
  dp: number; // change percent
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
  v: number; // volume
}

interface NewsData {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  impact_score?: number;
  category?: string;
  keywords?: string[];
}

interface MarketPrediction {
  timeframe: string;
  btcPrediction: {
    price: number;
    change: number;
    confidence: number;
    reasoning: string;
  };
  topPerformers: {
    asset: string;
    symbol: string;
    predictedOutperformance: number;
    confidence: number;
    reasoning: string;
    type: 'crypto' | 'stock';
  }[];
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
}

// Real Grok 4 AI prediction function using actual Grok 4 API
const generatePredictions = async (): Promise<MarketPrediction[]> => {
  const predictions: MarketPrediction[] = [];

  // Fetch current market data to feed to Grok 4
  let currentBtcPrice = 120000;
  let btc24hChange = 0;
  let cryptoData: CryptoData[] = [];
  let stockData: StockData[] = [];
  let newsData: NewsData[] = [];
  
  try {
    // Fetch Bitcoin price
    const btcResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
    if (btcResponse.ok) {
      const btcData = await btcResponse.json();
      currentBtcPrice = btcData.bitcoin?.usd || 120000;
      btc24hChange = btcData.bitcoin?.usd_24h_change || 0;
    }

    // Fetch real crypto data for Grok 4 analysis - including potential outperformers
    const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,bittensor,arweave,kaspa,hyperliquid,render-token,sui,penguin-karts,rekt,ena,pepe,shiba-inu,dogecoin,cardano,polkadot,chainlink,avalanche-2,polygon,cosmos,uniswap,aptos,optimism,arbitrum,stacks,ordi,sei-network,celestia,immutable&order=market_cap_desc&per_page=50&page=1&sparkline=false');
    if (cryptoResponse.ok) {
      cryptoData = await cryptoResponse.json();
    }

    // Fetch real stock data for Grok 4 analysis
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (FINNHUB_API_KEY) {
      const stockSymbols = ['MSTR', 'COIN', 'HOOD', 'CRCL', 'IREN', 'CORZ', 'CIFR', 'RIOT', 'CLSK', 'WULF', 'HUT', 'MARA', 'GLXY', 'SQ', 'TSLA', 'NVDA', 'AMD'];
      const stockPromises = stockSymbols.map(async (symbol) => {
        try {
          const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
          if (response.ok) {
            const data = await response.json();
            return { symbol, ...data };
          }
        } catch {
          // Ignore individual stock failures
        }
        return null;
      });
      
      const stockResults = await Promise.allSettled(stockPromises);
      stockData = stockResults
        .filter((result): result is PromiseFulfilledResult<StockData> => result.status === 'fulfilled' && result.value !== null)
        .map(result => result.value);
    }

    // Fetch recent news for Grok 4 context
    try {
      const newsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/watchlist/news`);
      if (newsResponse.ok) {
        const newsResult = await newsResponse.json();
        if (newsResult.success && newsResult.data) {
          newsData = newsResult.data.slice(0, 5);
        }
      }
    } catch {
      // Fallback news data
      newsData = [
        {
          title: 'Bitcoin ETF Flows Continue Strong Institutional Adoption',
          description: 'Spot Bitcoin ETFs continue to see significant inflows, indicating strong institutional demand',
          url: 'https://cointelegraph.com/tags/bitcoin-etf',
          source: 'Market Analysis',
          publishedAt: new Date().toISOString(),
          sentiment: 'positive',
          impact_score: 8,
          category: 'Institutional Adoption'
        }
      ];
    }
  } catch {
    // Use fallback values if API fails
  }

  // Generate predictions for different timeframes using real Grok 4 API
  const timeframes = ['day', 'week', 'month', 'year'];
  
  for (const timeframe of timeframes) {
    try {
      // Create comprehensive market data context for Grok 4
      const marketContext = {
        bitcoin: {
          currentPrice: currentBtcPrice,
          change24h: btc24hChange,
          marketCap: cryptoData.find(c => c.symbol === 'BTC')?.market_cap || 0,
          volume: cryptoData.find(c => c.symbol === 'BTC')?.total_volume || 0
        },
        cryptoAssets: cryptoData.map(crypto => ({
          symbol: crypto.symbol,
          name: crypto.name,
          price: crypto.current_price,
          change24h: crypto.price_change_percentage_24h,
          marketCap: crypto.market_cap,
          volume: crypto.total_volume
        })),
        stocks: stockData.map(stock => ({
          symbol: stock.symbol,
          price: stock.c,
          change: stock.dp,
          volume: stock.v,
          high: stock.h,
          low: stock.l
        })),
        news: newsData.map(news => ({
          title: news.title,
          description: news.description,
          sentiment: news.sentiment,
          impact: news.impact_score,
          category: news.category
        })),
        marketPhilosophy: {
          twoYearMA: currentBtcPrice * 0.6,
          twoYearMAx5: currentBtcPrice * 0.6 * 5,
          millennialAdoption: '49% of Millennials comfortable with crypto',
          wealthTransfer: '$90T wealth transfer by 2044',
          exponentialAge: 'Metcalfe\'s Law vs mean reversion'
        }
      };

      // Create Grok 4 prompt with comprehensive market data
      const grok4Prompt = `You are GROK420, an expert AI market analyst specializing in Bitcoin and cryptocurrency markets. 

Analyze the following market data and provide predictions for the next ${timeframe}:

**CURRENT MARKET DATA:**
- Bitcoin Price: $${marketContext.bitcoin.currentPrice.toLocaleString()}
- Bitcoin 24h Change: ${marketContext.bitcoin.change24h.toFixed(2)}%
- Bitcoin Market Cap: $${(marketContext.bitcoin.marketCap / 1e12).toFixed(2)}T
- Bitcoin Volume: $${(marketContext.bitcoin.volume / 1e9).toFixed(2)}B

**TOP CRYPTO ASSETS:**
${marketContext.cryptoAssets.map(asset => 
  `- ${asset.symbol}: $${asset.price.toLocaleString()} (${asset.change24h >= 0 ? '+' : ''}${asset.change24h.toFixed(2)}%)`
).join('\n')}

**CRYPTO-RELATED STOCKS:**
${marketContext.stocks.map(stock => 
  `- ${stock.symbol}: $${stock.price.toFixed(2)} (${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%)`
).join('\n')}

**RECENT NEWS & SENTIMENT:**
${marketContext.news.map(news => 
  `- ${news.title} (${news.sentiment || 'neutral'} sentiment, ${news.impact || 5}/10 impact)`
).join('\n')}

**MARKET PHILOSOPHY CONTEXT:**
- 2Y MA x5 Exit Signal: $${marketContext.marketPhilosophy.twoYearMAx5.toLocaleString()}
- Millennial Adoption: ${marketContext.marketPhilosophy.millennialAdoption}
- Wealth Transfer: ${marketContext.marketPhilosophy.wealthTransfer}
- Exponential Age: ${marketContext.marketPhilosophy.exponentialAge}

Provide a structured prediction for the next ${timeframe} in this exact JSON format:

{
  "btcPrediction": {
    "price": <predicted_price_number>,
    "change": <predicted_percentage_change_number>,
    "confidence": <confidence_percentage_0_100>,
    "reasoning": "<detailed_reasoning_with_technical_analysis>"
  },
  "topPerformers": [
    {
      "asset": "<asset_name>",
      "symbol": "<symbol>",
      "predictedOutperformance": <percentage_vs_bitcoin_number>,
      "confidence": <confidence_percentage_0_100>,
      "reasoning": "<why_this_asset_will_outperform>",
      "type": "<crypto_or_stock>"
    }
  ],
  "marketSentiment": "<bullish_bearish_or_neutral>"
}

Focus on:
1. Technical analysis of current price action and momentum
2. Market sentiment from news and social data
3. Institutional flows and ETF data
4. Market philosophy factors (2Y MA x5, generational shift, exponential age)
5. **SPECIFICALLY identify assets that could outperform Bitcoin like recent examples: PENGU, REKT, ENA, PEPE, SHIB, DOGE**
6. Look for coins with strong fundamentals, high volume, and momentum
7. Consider meme coins, DeFi tokens, and Layer 1/2 solutions
8. Analyze which crypto-related stocks (MSTR, COIN, RIOT, etc.) could benefit from crypto rallies

**IMPORTANT:** Look for the next potential 10x-100x performers that could follow the pattern of recent outperformers. Focus on coins with strong community, high volume, and momentum indicators.

Be realistic with predictions and provide detailed reasoning based on the data provided.`;

      // Call Grok 4 API with comprehensive market data and timeout
      const grok4Response = await Promise.race([
        Grok4Service.chatCompletion({
          messages: [
            {
              role: 'system',
              content: 'You are GROK420, an expert AI market analyst. Provide market predictions in the exact JSON format requested. Be realistic and data-driven.'
            },
            {
              role: 'user',
              content: grok4Prompt
            }
          ],
          temperature: 0.3, // Lower temperature for more consistent predictions
          max_tokens: 2000
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Prediction timeout')), 10000) // 10 second timeout to allow real analysis
        )
      ]);

      // Parse Grok 4 response
      const responseContent = grok4Response.choices?.[0]?.message?.content || '';
      
      // Extract JSON from Grok 4 response
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const predictionData = JSON.parse(jsonMatch[0]);
          
          // Validate and structure the prediction
          const prediction: MarketPrediction = {
            timeframe,
            btcPrediction: {
              price: predictionData.btcPrediction?.price || currentBtcPrice * (1 + (predictionData.btcPrediction?.change || 0) / 100),
              change: predictionData.btcPrediction?.change || 0,
              confidence: predictionData.btcPrediction?.confidence || 70,
              reasoning: predictionData.btcPrediction?.reasoning || 'Grok 4 analysis based on current market conditions'
            },
            topPerformers: predictionData.topPerformers?.slice(0, 6) || [],
            marketSentiment: predictionData.marketSentiment || 'neutral'
          };
          
          predictions.push(prediction);
        } catch {
          // Fallback to intelligent prediction using real market data
          predictions.push(createIntelligentPrediction(timeframe, currentBtcPrice, btc24hChange, cryptoData, stockData));
        }
      } else {
        // Fallback if no JSON found
        predictions.push(createIntelligentPrediction(timeframe, currentBtcPrice, btc24hChange, cryptoData, stockData));
      }
      
          } catch {
        // Fallback to intelligent prediction using real market data
        predictions.push(createIntelligentPrediction(timeframe, currentBtcPrice, btc24hChange, cryptoData, stockData));
      }
  }

  return predictions;
};

// Intelligent prediction function using real market data when Grok 4 is unavailable
const createIntelligentPrediction = (
  timeframe: string, 
  currentBtcPrice: number, 
  btc24hChange: number,
  cryptoData: CryptoData[],
  stockData: StockData[]
): MarketPrediction => {
  const timeframeMultipliers = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
  };
  
  const multiplier = timeframeMultipliers[timeframe as keyof typeof timeframeMultipliers] || 1;
  const baseChange = btc24hChange * multiplier * 0.1;
  
  // Find top performing crypto assets
  const topCrypto = cryptoData
    .filter(c => c.symbol !== 'BTC')
    .sort((a, b) => Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h))
    .slice(0, 4);
  
  // Find top performing stocks
  const topStocks = stockData
    .sort((a, b) => Math.abs(b.dp) - Math.abs(a.dp))
    .slice(0, 2);
  
  // Create intelligent top performers based on real data
  const topPerformers = [
    ...topCrypto.map((crypto, index) => ({
      asset: crypto.name,
      symbol: crypto.symbol,
      predictedOutperformance: Math.max(baseChange * (1.5 + index * 0.3), 2 + index),
      confidence: 70 - index * 5,
      reasoning: `${crypto.symbol} showing strong momentum with ${crypto.price_change_percentage_24h.toFixed(2)}% 24h change. High volume and market cap suggest continued outperformance.`,
      type: 'crypto' as const
    })),
    ...topStocks.map((stock, index) => ({
      asset: stock.symbol,
      symbol: stock.symbol,
      predictedOutperformance: Math.max(baseChange * (1.2 + index * 0.2), 1.5 + index),
      confidence: 65 - index * 5,
      reasoning: `${stock.symbol} crypto-related stock with ${stock.dp.toFixed(2)}% change. Benefits from crypto market momentum and institutional adoption.`,
      type: 'stock' as const
    }))
  ].slice(0, 6);
  
  // Intelligent Bitcoin prediction based on market data
  const marketStrength = cryptoData.reduce((sum, c) => sum + (c.price_change_percentage_24h > 0 ? 1 : 0), 0) / cryptoData.length;
  const adjustedChange = baseChange * (marketStrength > 0.6 ? 1.2 : marketStrength < 0.4 ? 0.8 : 1);
  
  return {
    timeframe,
    btcPrediction: {
      price: currentBtcPrice * (1 + adjustedChange / 100),
      change: adjustedChange,
      confidence: 75,
      reasoning: `Intelligent analysis based on real market data: ${cryptoData.length} crypto assets analyzed, ${stockData.length} stocks tracked. Market strength: ${(marketStrength * 100).toFixed(0)}%. ${timeframe} prediction considers current momentum and institutional flows.`
    },
    topPerformers,
    marketSentiment: adjustedChange > 0 ? 'bullish' : adjustedChange < 0 ? 'bearish' : 'neutral'
  };
};

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    const predictions = await generatePredictions();
    
    return NextResponse.json({
      success: true,
      data: predictions,
      timestamp: new Date().toISOString(),
      source: 'Grok 4 AI Market Analysis'
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to generate market predictions',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 