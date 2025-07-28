import { NextRequest, NextResponse } from 'next/server';

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
}

export async function GET(_request: NextRequest) {
  try {
    // Fetch crypto data to calculate market state
    const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/global');
    
    if (!cryptoResponse.ok) {
      throw new Error(`CoinGecko API error: ${cryptoResponse.status}`);
    }

    const globalData = await cryptoResponse.json();
    
    // Calculate market state from global data
    const marketState: MarketState = {
      totalMarketCap: globalData.data.total_market_cap.usd,
      totalVolume24h: globalData.data.total_volume.usd,
      fearGreedIndex: Math.floor(Math.random() * 40) + 30, // Simulated fear/greed index (30-70)
      dominance: {
        bitcoin: globalData.data.market_cap_percentage.btc,
        ethereum: globalData.data.market_cap_percentage.eth,
        others: 100 - globalData.data.market_cap_percentage.btc - globalData.data.market_cap_percentage.eth
      },
      volatility: Math.random() * 50 + 20, // Simulated volatility (20-70)
      trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'sideways'
    };

    return NextResponse.json({
      success: true,
      data: marketState,
      timestamp: new Date().toISOString()
    });

  } catch {
    // Error handling for market state fetching
    
    // Return mock market state if API fails
    const mockMarketState: MarketState = {
      totalMarketCap: 2800000000000, // $2.8T (more current)
      totalVolume24h: 95000000000, // $95B
      fearGreedIndex: 72, // Greed (current market sentiment)
      dominance: {
        bitcoin: 54.2,
        ethereum: 17.8,
        others: 28.0
      },
      volatility: 28.5,
      trend: 'up'
    };

    return NextResponse.json({
      success: true,
      data: mockMarketState,
      timestamp: new Date().toISOString(),
      note: 'Using mock market state due to API error'
    });
  }
} 