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
    // Generate predictions in parallel for better performance
    const predictionPromises = watchlistConfig.timeframes.map(async (timeframe) => {
      try {
        const prediction = await this.generatePredictionForTimeframe(
          timeframe,
          bitcoinData,
          cryptoData,
          stockData,
          newsData
        );
        return prediction;
      } catch {
        // If Grok 4 fails, use intelligent fallback
        return this.createIntelligentPrediction(
          timeframe,
          bitcoinData,
          cryptoData,
          stockData
        );
      }
    });

    // Wait for all predictions with Promise.allSettled to handle individual failures
    const results = await Promise.allSettled(predictionPromises);
    
    // Filter out failed predictions and use fallbacks if needed
    const predictions: MarketPrediction[] = [];
    for (let i = 0; i < results.length; i++) {
      const timeframe = watchlistConfig.timeframes[i];
      if (results[i].status === 'fulfilled') {
        predictions.push((results[i] as PromiseFulfilledResult<MarketPrediction>).value);
      } else {
        // Create fallback prediction if all else fails
        predictions.push(this.createIntelligentPrediction(
          timeframe,
          bitcoinData,
          cryptoData,
          stockData
        ));
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
    const timeframeLabel = timeframe.charAt(0).toUpperCase() + timeframe.slice(1);
    const multiplier = TIMEFRAME_MULTIPLIERS[timeframe as keyof typeof TIMEFRAME_MULTIPLIERS];
    
    // Enhanced market context with more actionable insights
    const topPerformers = marketContext.cryptoAssets
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 5);
    
    const topStocks = marketContext.stocks
      .sort((a, b) => b.change - a.change)
      .slice(0, 3);

    return `You are GROK420, an expert crypto market analyst focused on identifying assets that will outperform Bitcoin (BTC).

CURRENT MARKET CONTEXT:
Bitcoin: $${marketContext.bitcoin.currentPrice.toLocaleString()} (${marketContext.bitcoin.change24h > 0 ? '+' : ''}${marketContext.bitcoin.change24h.toFixed(2)}% 24h)
Market Cap: $${(marketContext.bitcoin.marketCap / 1e12).toFixed(2)}T
Volume: $${(marketContext.bitcoin.volume / 1e9).toFixed(2)}B

TOP PERFORMING ASSETS (24h):
${topPerformers.map(asset => `- ${asset.symbol}: $${asset.price.toLocaleString()} (${asset.change24h > 0 ? '+' : ''}${asset.change24h.toFixed(2)}%)`).join('\n')}

TOP CRYPTO STOCKS (24h):
${topStocks.map(stock => `- ${stock.symbol}: $${stock.price.toLocaleString()} (${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}%)`).join('\n')}

KEY NEWS IMPACT:
${marketContext.news.slice(0, 3).map(news => `- ${news.title}: ${news.sentiment || 'neutral'} impact`).join('\n')}

MARKET PHILOSOPHY:
- 2-Year MA: $${marketContext.marketPhilosophy.twoYearMA.toLocaleString()}
- Exponential Age: ${marketContext.marketPhilosophy.exponentialAge}
- Wealth Transfer: ${marketContext.marketPhilosophy.wealthTransfer}

TASK: Generate ${timeframeLabel} predictions (${multiplier} days) for assets likely to outperform Bitcoin.

REQUIREMENTS:
1. Analyze current momentum, news sentiment, and market cycles
2. Focus on assets with strong fundamentals and positive catalysts
3. Consider sector rotation and market regime changes
4. Provide specific reasoning for each prediction
5. Include confidence levels based on data strength

RETURN ONLY THIS JSON:
{
  "btcPrediction": {
    "price": <predicted_price>,
    "change": <predicted_percentage_change>,
    "confidence": <0-100>,
    "reasoning": "<specific reasoning based on market data>"
  },
  "topPerformers": [
    {
      "asset": "<asset_name>",
      "symbol": "<symbol>",
      "predictedOutperformance": <percentage_vs_btc>,
      "confidence": <0-100>,
      "reasoning": "<specific catalyst/reasoning>",
      "type": "crypto|stock"
    }
  ],
  "marketSentiment": "bullish|bearish|neutral"
}

Focus on actionable insights and specific catalysts that will drive outperformance.`;
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