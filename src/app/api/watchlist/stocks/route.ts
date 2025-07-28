import { NextRequest, NextResponse } from 'next/server';

// Helper function to classify stocks by sector
const getStockSector = (symbol: string): string => {
  const sectorMap: { [key: string]: string } = {
    // Major crypto stocks
    'COIN': 'Crypto Exchange',
    'MSTR': 'Crypto Treasury',
    'HOOD': 'Crypto Exchange',
    'TSLA': 'Crypto Adjacent',
    'NVDA': 'Crypto Adjacent',
    'AMD': 'Crypto Adjacent',
    // Bitcoin mining stocks
    'IREN': 'Bitcoin Mining',
    'RIOT': 'Bitcoin Mining',
    'MARA': 'Bitcoin Mining',
    'CLSK': 'Bitcoin Mining',
    'HUT': 'Bitcoin Mining',
    'CORZ': 'Bitcoin Mining',
    'CIFR': 'Bitcoin Mining',
    'WULF': 'Bitcoin Mining',
    // Crypto infrastructure
    'SQ': 'Crypto Infrastructure',
    'GLXY': 'Crypto Infrastructure',
    // PriceTicker assets
    'STRF': 'Crypto Treasury',
    'STRK': 'Crypto Infrastructure',
    'BMNR': 'Bitcoin Mining ETF',
    'CRCL': 'Crypto Infrastructure',
    'SBET': 'Crypto Gaming',
    'SQNS': 'Crypto Infrastructure',
    'MBAV': 'Crypto Infrastructure'
  };
  
  return sectorMap[symbol] || 'Crypto Related';
};

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
  current_price: number;
  change_percent: number;
  high: number;
  low: number;
  volume: number;
  // Enhanced fields calculated from available data
  volume_ratio?: number; // Volume relative to average
  price_range?: number; // High - Low range
  volatility?: number; // Calculated volatility
  momentum_score?: number; // Calculated momentum
  sector?: string; // Crypto-related sector classification
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';
    
    // Define crypto-related stocks to track - optimized for Finnhub free tier (60 calls/min)
    // Prioritized by importance and trading volume
    const symbols = [
      // Major crypto stocks (high priority)
      'COIN', 'MSTR', 'HOOD', 'TSLA', 'NVDA', 'AMD',
      // Bitcoin mining stocks
      'IREN', 'RIOT', 'MARA', 'CLSK', 'HUT', 'CORZ', 'CIFR', 'WULF',
      // Crypto infrastructure
      'SQ', 'GLXY',
      // PriceTicker assets (if API calls available)
      'STRF', 'STRK', 'BMNR', 'CRCL', 'SBET', 'SQNS', 'MBAV'
    ];
    
    // Get Finnhub API key from environment
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    
    if (!finnhubApiKey) {
      return NextResponse.json({
        success: false,
        error: 'FINNHUB_API_KEY not configured',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Fetch data from Finnhub for each symbol (optimized for free tier)
    const stockData: StockData[] = [];
    
    // Calculate average volume for ratio calculations
    let totalVolume = 0;
    let volumeCount = 0;
    
    // First pass: collect basic data and calculate average volume
    for (const symbol of symbols) {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.c && data.v) {
            totalVolume += data.v;
            volumeCount++;
          }
        }
        
        // Rate limiting for free tier (60 calls/min = 1 call/sec)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch {
        // Error fetching data for symbol
      }
    }
    
    const averageVolume = volumeCount > 0 ? totalVolume / volumeCount : 0;
    
    // Second pass: add enhanced calculations
    for (const symbol of symbols) {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          
          // Calculate enhanced metrics from available data
          const volumeRatio = averageVolume > 0 ? data.v / averageVolume : 1;
          const priceRange = data.h - data.l;
          const volatility = data.c > 0 ? (priceRange / data.c) * 100 : 0;
          const momentumScore = data.dp * volumeRatio; // Price change weighted by volume
          
          // Determine sector based on symbol
          const sector = getStockSector(symbol);
          
          stockData.push({
            symbol: symbol,
            c: data.c,
            d: data.d,
            dp: data.dp,
            h: data.h,
            l: data.l,
            o: data.o,
            pc: data.pc,
            v: data.v,
            current_price: data.c,
            change_percent: data.dp,
            high: data.h,
            low: data.l,
            volume: data.v,
            volume_ratio: volumeRatio,
            price_range: priceRange,
            volatility: volatility,
            momentum_score: momentumScore,
            sector: sector
          });
        }
        
        // Rate limiting for free tier
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch {
        // Error fetching data for symbol
      }
    }

    return NextResponse.json({
      success: true,
      data: stockData,
      period: period,
      timestamp: new Date().toISOString()
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch stock data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 