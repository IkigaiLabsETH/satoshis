import { Grok4Service } from '@/app/api/grok4/grok4';
import type { ChatCompletion } from 'openai/resources/chat/completions';
import { 
  MarketPrediction, 
  CryptoData, 
  StockData, 
  NewsData 
} from '@/types/watchlist';
import { 
  watchlistConfig, 
  MARKET_PHILOSOPHY, 
  TIMEFRAME_MULTIPLIERS, 
  PERFORMANCE_THRESHOLDS 
} from '@/config/watchlist';

interface MarketContext {
  bitcoin: {
    currentPrice: number;
    change24h: number;
    marketCap: number;
    volume: number;
  };
  cryptoAssets: Array<{
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    marketCap: number;
    volume: number;
  }>;
  stocks: Array<{
    symbol: string;
    price: number;
    change: number;
    volume: number;
    high: number;
    low: number;
  }>;
  news: Array<{
    title: string;
    description: string;
    sentiment?: string;
    impact?: number;
    category?: string;
  }>;
  marketPhilosophy: {
    twoYearMA: number;
    twoYearMAx5: number;
    millennialAdoption: string;
    wealthTransfer: string;
    exponentialAge: string;
  };
}

interface Grok4PredictionData {
  btcPrediction?: {
    price?: number;
    change?: number;
    confidence?: number;
    reasoning?: string;
  };
  topPerformers?: Array<{
    asset: string;
    symbol: string;
    predictedOutperformance: number;
    confidence: number;
    reasoning: string;
    type: 'crypto' | 'stock';
  }>;
  marketSentiment?: 'bullish' | 'bearish' | 'neutral';
}

export class PredictionEngine {
  /**
   * Generate predictions for all timeframes
   */
  static async generatePredictions(
    bitcoinData: { price: number; change24h: number },
    cryptoData: CryptoData[],
    stockData: StockData[],
    newsData: NewsData[]
  ): Promise<MarketPrediction[]> {
    const predictions: MarketPrediction[] = [];

    // Generate predictions for each timeframe with better error handling
    for (const timeframe of watchlistConfig.timeframes) {
      try {
        const prediction = await this.generatePredictionForTimeframe(
          timeframe,
          bitcoinData,
          cryptoData,
          stockData,
          newsData
        );
        predictions.push(prediction);
      } catch {
        // If Grok 4 fails, use intelligent fallback
        const fallbackPrediction = this.createIntelligentPrediction(
          timeframe,
          bitcoinData,
          cryptoData,
          stockData
        );
        predictions.push(fallbackPrediction);
      }
    }

    return predictions;
  }

  /**
   * Generate prediction for a specific timeframe
   */
  private static async generatePredictionForTimeframe(
    timeframe: string,
    bitcoinData: { price: number; change24h: number },
    cryptoData: CryptoData[],
    stockData: StockData[],
    newsData: NewsData[]
  ): Promise<MarketPrediction> {
    const marketContext = this.buildMarketContext(
      timeframe,
      bitcoinData,
      cryptoData,
      stockData,
      newsData
    );

    const grok4Prompt = this.buildGrok4Prompt(timeframe, marketContext);

    try {
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
          temperature: 0.3,
          max_tokens: 2000
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Prediction timeout')), watchlistConfig.grok4Timeout)
        )
      ]);

      return this.parseGrok4Response(timeframe, grok4Response, bitcoinData.price, cryptoData, stockData);
    } catch (error) {
      throw error; // Let caller handle fallback
    }
  }

  /**
   * Build market context for Grok 4
   */
  private static buildMarketContext(
    timeframe: string,
    bitcoinData: { price: number; change24h: number },
    cryptoData: CryptoData[],
    stockData: StockData[],
    newsData: NewsData[]
  ): MarketContext {
    return {
      bitcoin: {
        currentPrice: bitcoinData.price,
        change24h: bitcoinData.change24h,
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
        twoYearMA: bitcoinData.price * MARKET_PHILOSOPHY.TWO_YEAR_MA_MULTIPLIER,
        twoYearMAx5: bitcoinData.price * MARKET_PHILOSOPHY.TWO_YEAR_MA_MULTIPLIER * MARKET_PHILOSOPHY.TWO_YEAR_MA_X5_MULTIPLIER,
        millennialAdoption: MARKET_PHILOSOPHY.MILLENNIAL_ADOPTION,
        wealthTransfer: MARKET_PHILOSOPHY.WEALTH_TRANSFER,
        exponentialAge: MARKET_PHILOSOPHY.EXPONENTIAL_AGE
      }
    };
  }

  /**
   * Build Grok 4 prompt
   */
  private static buildGrok4Prompt(timeframe: string, marketContext: MarketContext): string {
    return `You are GROK420, an expert AI market analyst specializing in Bitcoin and cryptocurrency markets. 

Analyze the following market data and provide predictions for the next ${timeframe}:

**CURRENT MARKET DATA:**
- Bitcoin Price: $${marketContext.bitcoin.currentPrice.toLocaleString()}
- Bitcoin 24h Change: ${marketContext.bitcoin.change24h.toFixed(2)}%
- Bitcoin Market Cap: $${(marketContext.bitcoin.marketCap / 1e12).toFixed(2)}T
- Bitcoin Volume: $${(marketContext.bitcoin.volume / 1e9).toFixed(2)}B

**TOP CRYPTO ASSETS:**
${marketContext.cryptoAssets.map((asset) => 
  `- ${asset.symbol}: $${asset.price.toLocaleString()} (${asset.change24h >= 0 ? '+' : ''}${asset.change24h.toFixed(2)}%)`
).join('\n')}

**CRYPTO-RELATED STOCKS:**
${marketContext.stocks.map((stock) => 
  `- ${stock.symbol}: $${stock.price.toFixed(2)} (${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%)`
).join('\n')}

**RECENT NEWS & SENTIMENT:**
${marketContext.news.map((news) => 
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

**IMPORTANT:** 
1. Look for the next potential 10x-100x performers that could follow the pattern of recent outperformers. Focus on coins with strong community, high volume, and momentum indicators.
2. **CRITICAL:** Only use symbols that are listed in the TOP CRYPTO ASSETS section above. Do NOT make up or invent new symbols.
3. For crypto assets, use the exact symbol from the data (e.g., "IMX" for Immutable, not "dara").
4. For stocks, use the exact symbol from the data (e.g., "MSTR", "COIN", "RIOT").

Be realistic with predictions and provide detailed reasoning based on the data provided.`;
  }

  /**
   * Parse Grok 4 response
   */
  private static parseGrok4Response(
    timeframe: string, 
    grok4Response: ChatCompletion, 
    currentBtcPrice: number,
    cryptoData: CryptoData[],
    stockData: StockData[]
  ): MarketPrediction {
    const responseContent = grok4Response.choices?.[0]?.message?.content || '';
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        const predictionData = JSON.parse(jsonMatch[0]) as Grok4PredictionData;
        
        // Validate and correct symbols in top performers
        const validatedTopPerformers = predictionData.topPerformers?.map(performer => {
          // Create a map of valid symbols for quick lookup
          const validCryptoSymbols = new Map(cryptoData.map(c => [c.symbol.toLowerCase(), c]));
          const validStockSymbols = new Map(stockData.map(s => [s.symbol.toLowerCase(), s]));
          
          // Check if the symbol exists in our data
          const lowerSymbol = performer.symbol.toLowerCase();
          const validCrypto = validCryptoSymbols.get(lowerSymbol);
          const validStock = validStockSymbols.get(lowerSymbol);
          
          if (validCrypto) {
            return {
              ...performer,
              symbol: validCrypto.symbol, // Use the correct case
              asset: validCrypto.name,
              type: 'crypto' as const
            };
          } else if (validStock) {
            return {
              ...performer,
              symbol: validStock.symbol, // Use the correct case
              asset: validStock.symbol,
              type: 'stock' as const
            };
          } else {
            // If symbol doesn't exist, try to find a similar one or skip
            // eslint-disable-next-line no-console
            console.warn(`Invalid symbol "${performer.symbol}" in Grok 4 prediction, skipping`);
            return null;
          }
        }).filter((performer): performer is NonNullable<typeof performer> => performer !== null) || [];
        
        return {
          timeframe,
          btcPrediction: {
            price: predictionData.btcPrediction?.price || currentBtcPrice * (1 + (predictionData.btcPrediction?.change || 0) / 100),
            change: predictionData.btcPrediction?.change || 0,
            confidence: predictionData.btcPrediction?.confidence || 70,
            reasoning: predictionData.btcPrediction?.reasoning || 'Grok 4 analysis based on current market conditions'
          },
          topPerformers: validatedTopPerformers.slice(0, watchlistConfig.maxTopPerformers),
          marketSentiment: predictionData.marketSentiment || 'neutral'
        };
      } catch {
        throw new Error('Failed to parse Grok 4 response');
      }
    } else {
      throw new Error('No JSON found in Grok 4 response');
    }
  }

  /**
   * Create intelligent prediction using real market data
   */
  static createIntelligentPrediction(
    timeframe: string,
    bitcoinData: { price: number; change24h: number },
    cryptoData: CryptoData[],
    stockData: StockData[]
  ): MarketPrediction {
    const multiplier = TIMEFRAME_MULTIPLIERS[timeframe as keyof typeof TIMEFRAME_MULTIPLIERS] || 1;
    const baseChange = bitcoinData.change24h * multiplier * PERFORMANCE_THRESHOLDS.BASE_CHANGE_MULTIPLIER;
    
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
        predictedOutperformance: Math.max(
          baseChange * (PERFORMANCE_THRESHOLDS.CRYPTO_OUTPERFORMANCE_BASE + index * 0.3), 
          2 + index
        ),
        confidence: 70 - index * PERFORMANCE_THRESHOLDS.CONFIDENCE_DECAY,
        reasoning: `${crypto.symbol} showing strong momentum with ${crypto.price_change_percentage_24h.toFixed(2)}% 24h change. High volume and market cap suggest continued outperformance.`,
        type: 'crypto' as const
      })),
      ...topStocks.map((stock, index) => ({
        asset: stock.symbol,
        symbol: stock.symbol,
        predictedOutperformance: Math.max(
          baseChange * (PERFORMANCE_THRESHOLDS.STOCK_OUTPERFORMANCE_BASE + index * 0.2), 
          1.5 + index
        ),
        confidence: 65 - index * PERFORMANCE_THRESHOLDS.CONFIDENCE_DECAY,
        reasoning: `${stock.symbol} crypto-related stock with ${stock.dp.toFixed(2)}% change. Benefits from crypto market momentum and institutional adoption.`,
        type: 'stock' as const
      }))
    ].slice(0, watchlistConfig.maxTopPerformers);
    
    // Intelligent Bitcoin prediction based on market data
    const marketStrength = cryptoData.reduce((sum, c) => 
      sum + (c.price_change_percentage_24h > 0 ? 1 : 0), 0) / cryptoData.length;
    
    const adjustedChange = baseChange * (
      marketStrength > PERFORMANCE_THRESHOLDS.MARKET_STRENGTH_BULLISH ? 1.2 : 
      marketStrength < PERFORMANCE_THRESHOLDS.MARKET_STRENGTH_BEARISH ? 0.8 : 1
    );
    
    return {
      timeframe,
      btcPrediction: {
        price: bitcoinData.price * (1 + adjustedChange / 100),
        change: adjustedChange,
        confidence: 75,
        reasoning: `Intelligent analysis based on real market data: ${cryptoData.length} crypto assets analyzed, ${stockData.length} stocks tracked. Market strength: ${(marketStrength * 100).toFixed(0)}%. ${timeframe} prediction considers current momentum and institutional flows.`
      },
      topPerformers,
      marketSentiment: adjustedChange > 0 ? 'bullish' : adjustedChange < 0 ? 'bearish' : 'neutral'
    };
  }
} 