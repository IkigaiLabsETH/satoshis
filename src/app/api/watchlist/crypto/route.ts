import { NextRequest, NextResponse } from 'next/server';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d?: number;
  price_change_percentage_30d?: number;
  high_24h?: number;
  low_24h?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  ath?: number;
  ath_change_percentage?: number;
  atl?: number;
  atl_change_percentage?: number;
  image?: string;
}

interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d: number | null;
  price_change_percentage_30d: number | null;
  high_24h: number | null;
  low_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  atl: number | null;
  atl_change_percentage: number | null;
  image: string | null;
}

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';
    
    // Define coins to track - focusing on crypto page and altcoins page assets
    const coins = ['bitcoin', 'ethereum', 'bittensor', 'arweave', 'kaspa', 'qubetics', 'peaq', 'radix', 'nervos-network', 'ocean-protocol', 'fetch-ai', 'hyperliquid', 'render-token', 'sui', 'solana', 'ripple', 'cardano', 'avalanche', 'polygon', 'chainlink', 'aave', 'injective-protocol', 'sei-network'];
    
    // Fetch data from CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform data to match our interface
    const cryptoData: CryptoData[] = data.map((coin: CoinGeckoCoin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_24h: coin.price_change_percentage_24h || 0,
      price_change_percentage_7d: coin.price_change_percentage_7d,
      price_change_percentage_30d: coin.price_change_percentage_30d,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      ath: coin.ath,
      ath_change_percentage: coin.ath_change_percentage,
      atl: coin.atl,
      atl_change_percentage: coin.atl_change_percentage,
      image: coin.image
    }));

    return NextResponse.json({
      success: true,
      data: cryptoData,
      period: period,
      timestamp: new Date().toISOString()
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch crypto data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 