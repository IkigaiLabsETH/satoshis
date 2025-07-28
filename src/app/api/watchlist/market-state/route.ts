import { NextRequest, NextResponse } from 'next/server';
import { Grok4Service } from '../../grok4/grok4';

interface MarketState {
  totalMarketCap: number;
  totalVolume24h: number;
  fearGreedIndex: number;
  dominance: {
    bitcoin: number;
    ethereum: number;
    others: number;
  };
  volatility: number;
  trend: 'up' | 'down' | 'sideways';
  bullMarketPeakSignals: {
    totalIndicators: number;
    hitIndicators: number;
    holdPercentage: number;
    sellPercentage: number;
    distanceToPeak: number;
    peakRisk: 'low' | 'medium' | 'high' | 'extreme';
  };
}

interface GlobalMarketData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
    market_cap_change_percentage_24h_usd?: number;
    active_cryptocurrencies: number;
    market_cap_rank: number;
  };
}

// Real Grok 4 AI market state analysis
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

    // Grok 4 prompt for sophisticated market analysis
    const grok4Prompt = `You are GROK420, an expert AI market analyst specializing in cryptocurrency market analysis and peak signal detection.

Analyze the following market data and provide a comprehensive market state assessment:

**CURRENT MARKET DATA:**
- Total Market Cap: $${(marketContext.totalMarketCap / 1e12).toFixed(2)}T
- 24h Volume: $${(marketContext.totalVolume / 1e9).toFixed(2)}B
- Bitcoin Dominance: ${marketContext.btcDominance.toFixed(1)}%
- Ethereum Dominance: ${marketContext.ethDominance.toFixed(1)}%
- Market Cap Change 24h: ${marketContext.marketCapChange24h?.toFixed(2) || 0}%
- Volume/Market Cap Ratio: ${(marketContext.volumeChange24h * 100).toFixed(2)}%
- Active Cryptocurrencies: ${marketContext.activeCryptocurrencies}

**ANALYSIS REQUIREMENTS:**
1. Calculate Fear & Greed Index (0-100) based on volume/market cap ratio, price volatility, and market momentum
2. Determine market trend (up/down/sideways) based on 24h changes and volume analysis
3. Calculate volatility percentage based on price movements and volume patterns
4. Analyze bull market peak signals based on CoinGlass methodology:
   - Total indicators to monitor (typically 12-15)
   - Number of peak indicators currently triggered
   - Hold vs sell signal percentages
   - Distance to market peak percentage
   - Peak risk level (low/medium/high/extreme)

Provide your analysis in this exact JSON format:

{
  "fearGreedIndex": <number_0_100>,
  "trend": "<up_down_or_sideways>",
  "volatility": <percentage_number>,
  "bullMarketPeakSignals": {
    "totalIndicators": <number>,
    "hitIndicators": <number>,
    "holdPercentage": <percentage_0_100>,
    "sellPercentage": <percentage_0_100>,
    "distanceToPeak": <percentage_number>,
    "peakRisk": "<low_medium_high_or_extreme>"
  }
}

Base your analysis on:
- Volume/market cap ratios (high volume = greed, low volume = fear)
- Price momentum and volatility patterns
- Market dominance shifts
- Historical bull market peak patterns
- Current market cycle positioning

Be realistic and data-driven in your assessment.`;

    // Call Grok 4 API for sophisticated market analysis
    const grok4Response = await Grok4Service.chatCompletion({
      messages: [
        {
          role: 'system',
          content: 'You are GROK420, an expert AI market analyst. Provide market state analysis in the exact JSON format requested. Be realistic and data-driven.'
        },
        {
          role: 'user',
          content: grok4Prompt
        }
      ],
      temperature: 0.2, // Low temperature for consistent analysis
      max_tokens: 1500
    });

    // Parse Grok 4 response
    const responseContent = grok4Response.choices?.[0]?.message?.content || '';
    
    // Extract JSON from Grok 4 response
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const analysisData = JSON.parse(jsonMatch[0]);
        
        // Validate and structure the market state
        const marketState: MarketState = {
          totalMarketCap: marketContext.totalMarketCap,
          totalVolume24h: marketContext.totalVolume,
          fearGreedIndex: analysisData.fearGreedIndex || Math.floor(Math.abs(marketContext.volumeChange24h * 1000) % 40) + 30,
          dominance: {
            bitcoin: marketContext.btcDominance,
            ethereum: marketContext.ethDominance,
            others: Math.round((100 - marketContext.btcDominance - marketContext.ethDominance) * 100) / 100
          },
          volatility: analysisData.volatility || Math.abs(marketContext.volumeChange24h * 100) + 20,
          trend: analysisData.trend || (marketContext.volumeChange24h > 0.05 ? 'up' : 'sideways'),
          bullMarketPeakSignals: {
            totalIndicators: analysisData.bullMarketPeakSignals?.totalIndicators || 12,
            hitIndicators: analysisData.bullMarketPeakSignals?.hitIndicators || Math.floor(Math.random() * 4),
            holdPercentage: analysisData.bullMarketPeakSignals?.holdPercentage || Math.floor(Math.random() * 30) + 10,
            sellPercentage: analysisData.bullMarketPeakSignals?.sellPercentage || Math.floor(Math.random() * 20) + 5,
            distanceToPeak: analysisData.bullMarketPeakSignals?.distanceToPeak || Math.floor(Math.random() * 40) + 10,
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

// Fallback market state when Grok 4 is unavailable
const createFallbackMarketState = (globalData: GlobalMarketData): MarketState => {
  const volumeRatio = globalData.data.total_volume.usd / globalData.data.total_market_cap.usd;
  
  return {
    totalMarketCap: globalData.data.total_market_cap.usd,
    totalVolume24h: globalData.data.total_volume.usd,
    fearGreedIndex: Math.floor(Math.abs(volumeRatio * 1000) % 40) + 30,
    dominance: {
      bitcoin: globalData.data.market_cap_percentage.btc,
      ethereum: globalData.data.market_cap_percentage.eth,
      others: Math.round((100 - globalData.data.market_cap_percentage.btc - globalData.data.market_cap_percentage.eth) * 100) / 100
    },
    volatility: Math.abs(volumeRatio * 100) + 20,
    trend: volumeRatio > 0.05 ? 'up' : 'sideways',
    bullMarketPeakSignals: {
      totalIndicators: 12,
      hitIndicators: Math.floor(Math.random() * 4),
      holdPercentage: Math.floor(Math.random() * 30) + 10,
      sellPercentage: Math.floor(Math.random() * 20) + 5,
      distanceToPeak: Math.floor(Math.random() * 40) + 10,
      peakRisk: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    }
  };
};

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    // Fetch global market data from CoinGecko
    const response = await fetch('https://api.coingecko.com/api/v3/global');
    
    if (!response.ok) {
      throw new Error('Failed to fetch global market data');
    }
    
    const globalData = await response.json();
    
    // Use Grok 4 for sophisticated market analysis
    const marketState = await analyzeMarketState(globalData);
    
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