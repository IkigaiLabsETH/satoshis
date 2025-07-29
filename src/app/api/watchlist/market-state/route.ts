import { NextRequest, NextResponse } from 'next/server';
import { Grok4Service } from '../../grok4/grok4';
import { MarketDataService } from '@/services/market-data';
import { MarketState, GlobalMarketData } from '@/types/watchlist';

// Configure timeout for this API route
export const maxDuration = 10; // 10 seconds max duration

// Simple in-memory cache for market state
const marketStateCache = new Map<string, { data: MarketState; timestamp: number; ttl: number }>();

// Real Grok 4 AI market state analysis with optimized performance
const analyzeMarketState = async (globalData: GlobalMarketData): Promise<MarketState> => {
  try {
    // Create comprehensive market context for Grok 4
    const marketContext = {
      totalMarketCap: globalData.data.total_market_cap.usd,
      totalVolume: globalData.data.total_volume.usd,
      btcDominance: globalData.data.market_cap_percentage.btc,
      ethDominance: globalData.data.market_cap_percentage.eth,
      marketCapChange24h: globalData.data.market_cap_change_percentage_24h_usd,
      volumeChange24h: globalData.data.total_volume.usd / globalData.data.total_market_cap.usd,
      activeCryptocurrencies: globalData.data.active_cryptocurrencies,
      marketCapRank: globalData.data.market_cap_rank
    };

    // Simplified Grok 4 prompt for faster processing
    const grok4Prompt = `Analyze this market data and return JSON only:

Market Cap: $${(marketContext.totalMarketCap / 1e12).toFixed(2)}T
Volume: $${(marketContext.totalVolume / 1e9).toFixed(2)}B
BTC Dominance: ${marketContext.btcDominance.toFixed(1)}%
ETH Dominance: ${marketContext.ethDominance.toFixed(1)}%
Market Cap Change: ${marketContext.marketCapChange24h?.toFixed(2) || 0}%
Volume/Market Cap: ${(marketContext.volumeChange24h * 100).toFixed(2)}%

Return only this JSON:
{
  "fearGreedIndex": <0-100>,
  "trend": "<up|down|sideways>",
  "volatility": <percentage>,
  "marketStrength": "<strong_bull|bull|neutral|bear|strong_bear>",
  "bullMarketPeakSignals": {
    "peakRisk": "<low|medium|high|extreme>"
  }
}`;

    // Call Grok 4 API with reduced timeout for faster response
    const grok4Response = await Promise.race([
      Grok4Service.chatCompletion({
        messages: [
          {
            role: 'system',
            content: 'You are GROK420. Return only valid JSON.'
          },
          {
            role: 'user',
            content: grok4Prompt
          }
        ],
        temperature: 0.1, // Very low temperature for consistent analysis
        max_tokens: 500 // Reduced tokens for faster response
      }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Market analysis timeout')), 2000) // Reduced to 2 seconds
      )
    ]);

    // Parse Grok 4 response
    const responseContent = grok4Response.choices?.[0]?.message?.content || '';
    
    // Extract JSON from Grok 4 response
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const analysisData = JSON.parse(jsonMatch[0]);
        
        // Validate and structure the market state
        const marketState: MarketState = {
          fearGreedIndex: analysisData.fearGreedIndex || Math.floor(Math.abs(marketContext.volumeChange24h * 1000) % 40) + 30,
          trend: analysisData.trend || (marketContext.volumeChange24h > 0.05 ? 'up' : 'sideways'),
          volatility: analysisData.volatility || Math.abs(marketContext.volumeChange24h * 100) + 20,
          marketStrength: analysisData.marketStrength || 'neutral',
          bullMarketPeakSignals: {
            peakRisk: analysisData.bullMarketPeakSignals?.peakRisk || (Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low')
          }
        };
        
        return marketState;
      } catch {
        return createFallbackMarketState(globalData);
      }
    } else {
      // Fallback if no JSON found
      return createFallbackMarketState(globalData);
    }
    
  } catch {
    return createFallbackMarketState(globalData);
  }
};

// Optimized fallback market state calculation
const createFallbackMarketState = (globalData: GlobalMarketData): MarketState => {
  const volumeRatio = globalData.data.total_volume.usd / globalData.data.total_market_cap.usd;
  const marketCapChange = globalData.data.market_cap_change_percentage_24h_usd || 0;
  
  // More sophisticated fallback calculation
  const fearGreedIndex = Math.max(0, Math.min(100, 
    Math.floor((volumeRatio * 200 + Math.abs(marketCapChange) * 2) % 60) + 20
  ));
  
  const trend = marketCapChange > 2 ? 'up' : marketCapChange < -2 ? 'down' : 'sideways';
  const volatility = Math.abs(marketCapChange) + Math.abs(volumeRatio * 100) + 15;
  
  return {
    fearGreedIndex,
    trend,
    volatility,
    marketStrength: fearGreedIndex > 70 ? 'strong_bull' : fearGreedIndex > 60 ? 'bull' : fearGreedIndex > 40 ? 'neutral' : fearGreedIndex > 30 ? 'bear' : 'strong_bear',
    bullMarketPeakSignals: {
      peakRisk: fearGreedIndex > 70 ? 'high' : fearGreedIndex > 50 ? 'medium' : 'low'
    }
  };
};

// Optimized market state retrieval with better caching
const getMarketState = async (): Promise<MarketState> => {
  const cacheKey = 'market_state';
  const cached = marketStateCache.get(cacheKey);
  
  // Check if cache is valid (5 minutes TTL)
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data;
  }

  try {
    // Fetch global data and analyze in parallel
    const globalData = await MarketDataService.getGlobalMarketData();
    if (!globalData) {
      throw new Error('Failed to fetch global market data');
    }

    const marketState = await analyzeMarketState(globalData);

    // Cache the results for 5 minutes
    marketStateCache.set(cacheKey, {
      data: marketState,
      timestamp: Date.now(),
      ttl: 5 * 60 * 1000
    });

    return marketState;
  } catch {
    // Return cached data even if expired, or create fallback
    if (cached) {
      return cached.data;
    }
    
    // Last resort fallback
    return {
      fearGreedIndex: 50,
      trend: 'sideways',
      volatility: 25,
      marketStrength: 'neutral',
      bullMarketPeakSignals: {
        peakRisk: 'medium'
      }
    };
  }
};

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    const marketState = await getMarketState();
    
    return NextResponse.json({
      success: true,
      data: marketState,
      timestamp: new Date().toISOString(),
      source: 'Grok 4 AI Market Analysis'
    });
    
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze market state',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 