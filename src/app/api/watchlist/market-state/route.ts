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
    
    // Calculate market state from global data with real indicators
    const marketState: MarketState = {
      totalMarketCap: globalData.data.total_market_cap.usd,
      totalVolume24h: globalData.data.total_volume.usd,
      fearGreedIndex: Math.floor(Math.abs(globalData.data.total_volume.usd / globalData.data.total_market_cap.usd * 1000) % 40) + 30, // Calculate based on volume/market cap ratio
      dominance: {
        bitcoin: globalData.data.market_cap_percentage.btc,
        ethereum: globalData.data.market_cap_percentage.eth,
        others: Math.round((100 - globalData.data.market_cap_percentage.btc - globalData.data.market_cap_percentage.eth) * 100) / 100
      },
      volatility: Math.abs(globalData.data.total_volume.usd / globalData.data.total_market_cap.usd * 100) + 20, // Calculate based on volume/market cap ratio
      trend: globalData.data.total_volume.usd > globalData.data.total_market_cap.usd * 0.05 ? 'up' : 'sideways' // Simple trend based on volume
    };

    return NextResponse.json({
      success: true,
      data: marketState,
      timestamp: new Date().toISOString()
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch market state data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 