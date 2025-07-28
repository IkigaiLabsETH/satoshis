import { NextRequest, NextResponse } from 'next/server';

interface CryptoData {
  id: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';
    
    // Define coins to track - focusing on crypto page assets
    const coins = ['bitcoin', 'hyperliquid', 'render-token', 'sui', 'ethereum', 'solana', 'ripple', 'cardano', 'avalanche', 'polygon', 'chainlink', 'aave', 'injective-protocol', 'sei-network'];
    
    // Fetch data from CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform data to match our interface
    const cryptoData: CryptoData[] = data.map((coin: { id: string; symbol: string; current_price: number; market_cap: number; total_volume: number; price_change_percentage_24h: number; image?: string }) => ({
      id: coin.id,
      symbol: coin.symbol,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_24h: coin.price_change_percentage_24h || 0,
      image: coin.image
    }));

    return NextResponse.json({
      success: true,
      data: cryptoData,
      period: period,
      timestamp: new Date().toISOString()
    });

  } catch {
    // Error handling for crypto data fetching
    
    // Return mock data if API fails
    const mockData: CryptoData[] = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        current_price: 68000,
        market_cap: 1300000000000,
        total_volume: 25000000000,
        price_change_percentage_24h: 2.5,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        current_price: 3500,
        market_cap: 420000000000,
        total_volume: 15000000000,
        price_change_percentage_24h: 3.2,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
      },
      {
        id: 'solana',
        symbol: 'sol',
        current_price: 180,
        market_cap: 80000000000,
        total_volume: 3000000000,
        price_change_percentage_24h: 4.1,
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockData,
      period: 'daily',
      timestamp: new Date().toISOString(),
      note: 'Using mock data due to API error'
    });
  }
} 