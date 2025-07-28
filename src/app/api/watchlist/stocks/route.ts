import { NextRequest, NextResponse } from 'next/server';

interface StockData {
  symbol: string;
  current_price: number;
  change_percent: number;
  high: number;
  low: number;
  volume: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';
    
    // Define crypto-related stocks to track - including mining sector and PriceTicker assets
    const symbols = ['COIN', 'MSTR', 'STRF', 'STRK', 'MTPLF', 'BMNR', 'CRCL', 'HOOD', 'SBET', 'SQNS', 'MBAV', 'IREN', 'CORZ', 'CIFR', 'RIOT', 'CLSK', 'WULF', 'HUT', 'MARA', 'GLXY', 'SQ', 'TSLA', 'NVDA', 'AMD'];
    
    // Get Finnhub API key from environment
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    
    if (!finnhubApiKey) {
      return NextResponse.json({
        success: false,
        error: 'FINNHUB_API_KEY not configured',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Fetch data from Finnhub for each symbol
    const stockData: StockData[] = [];
    
    for (const symbol of symbols) {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          stockData.push({
            symbol: symbol,
            current_price: data.c,
            change_percent: ((data.c - data.pc) / data.pc) * 100,
            high: data.h,
            low: data.l,
            volume: data.v
          });
        }
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