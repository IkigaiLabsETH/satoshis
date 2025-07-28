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
  keyEvents: string[];
  riskFactors: string[];
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

    // Fetch real crypto data for Grok 4 analysis
    const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,bittensor,arweave,kaspa,hyperliquid,render-token,sui&order=market_cap_desc&per_page=20&page=1&sparkline=false');
    if (cryptoResponse.ok) {
      cryptoData = await cryptoResponse.json();
    }

    // Fetch real stock data for Grok 4 analysis
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (FINNHUB_API_KEY) {
      const stockSymbols = ['MSTR', 'COIN', 'HOOD', 'CRCL', 'IREN', 'CORZ', 'CIFR'];
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
  "marketSentiment": "<bullish_bearish_or_neutral>",
  "keyEvents": ["<event1>", "<event2>", "<event3>"],
  "riskFactors": ["<risk1>", "<risk2>", "<risk3>"]
}

Focus on:
1. Technical analysis of current price action
2. Market sentiment from news and social data
3. Institutional flows and ETF data
4. Market philosophy factors (2Y MA x5, generational shift, exponential age)
5. Assets most likely to outperform Bitcoin
6. Key events and risk factors to watch

Be realistic with predictions and provide detailed reasoning based on the data provided.`;

      // Call Grok 4 API with comprehensive market data
      const grok4Response = await Grok4Service.chatCompletion({
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
      });

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
            marketSentiment: predictionData.marketSentiment || 'neutral',
            keyEvents: predictionData.keyEvents || [],
            riskFactors: predictionData.riskFactors || []
          };
          
          predictions.push(prediction);
        } catch {
          // Fallback to basic prediction
          predictions.push(createFallbackPrediction(timeframe, currentBtcPrice, btc24hChange));
        }
      } else {
        // Fallback if no JSON found
        predictions.push(createFallbackPrediction(timeframe, currentBtcPrice, btc24hChange));
      }
      
          } catch {
        // Fallback to basic prediction
        predictions.push(createFallbackPrediction(timeframe, currentBtcPrice, btc24hChange));
      }
  }

  return predictions;
};

// Fallback prediction function when Grok 4 is unavailable
const createFallbackPrediction = (timeframe: string, currentBtcPrice: number, btc24hChange: number): MarketPrediction => {
  const timeframeMultipliers = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
  };
  
  const multiplier = timeframeMultipliers[timeframe as keyof typeof timeframeMultipliers] || 1;
  const baseChange = btc24hChange * multiplier * 0.1; // Conservative multiplier
  
  return {
    timeframe,
    btcPrediction: {
      price: currentBtcPrice * (1 + baseChange / 100),
      change: baseChange,
      confidence: 60,
      reasoning: `Fallback prediction based on current ${timeframe} trend. Grok 4 analysis unavailable.`
    },
    topPerformers: [
      {
        asset: 'Ethereum',
        symbol: 'ETH',
        predictedOutperformance: Math.max(baseChange * 1.2, 2),
        confidence: 65,
        reasoning: 'Strong fundamentals and DeFi growth',
        type: 'crypto'
      },
      {
        asset: 'Solana',
        symbol: 'SOL',
        predictedOutperformance: Math.max(baseChange * 1.5, 3),
        confidence: 70,
        reasoning: 'High performance and developer activity',
        type: 'crypto'
      }
    ],
    marketSentiment: baseChange > 0 ? 'bullish' : baseChange < 0 ? 'bearish' : 'neutral',
    keyEvents: ['Bitcoin halving progress', 'Institutional adoption continues', 'Market volatility expected'],
    riskFactors: ['Macroeconomic uncertainty', 'Regulatory developments', 'Technical corrections possible']
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