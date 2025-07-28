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
    
    // Define crypto-related stocks to track - including mining sector
    const symbols = ['COIN', 'MSTR', 'HOOD', 'CRCL', 'IREN', 'CORZ', 'CIFR', 'RIOT', 'CLSK', 'WULF', 'HUT', 'MARA', 'GLXY', 'SQ', 'TSLA', 'NVDA', 'AMD'];
    
    // Get Finnhub API key from environment
    const finnhubApiKey = process.env.FINNHUB_API_KEY;
    
    if (!finnhubApiKey) {
      // FINNHUB_API_KEY not found in environment variables
      // Return mock data if API key is not available
      const mockStockData: StockData[] = [
        {
          symbol: 'COIN',
          current_price: 245.50,
          change_percent: 3.2,
          high: 250.00,
          low: 240.00,
          volume: 15000000
        },
        {
          symbol: 'MSTR',
          current_price: 1850.00,
          change_percent: 2.8,
          high: 1900.00,
          low: 1800.00,
          volume: 500000
        },
        {
          symbol: 'SQ',
          current_price: 85.30,
          change_percent: 1.5,
          high: 87.00,
          low: 84.00,
          volume: 8000000
        },
        {
          symbol: 'TSLA',
          current_price: 245.80,
          change_percent: 2.1,
          high: 250.00,
          low: 240.00,
          volume: 45000000
        },
        {
          symbol: 'NVDA',
          current_price: 890.50,
          change_percent: 4.2,
          high: 900.00,
          low: 880.00,
          volume: 25000000
        },
        {
          symbol: 'AMD',
          current_price: 165.40,
          change_percent: 1.8,
          high: 168.00,
          low: 163.00,
          volume: 35000000
        }
      ];

      return NextResponse.json({
        success: true,
        data: mockStockData,
        period: period,
        timestamp: new Date().toISOString(),
        note: 'Using mock data - FINNHUB_API_KEY not configured'
      });
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
    // Error handling for stock data fetching
    
    // Return mock data if API fails
    const mockData: StockData[] = [
      {
        symbol: 'COIN',
        current_price: 245.50,
        change_percent: 3.2,
        high: 250.00,
        low: 240.00,
        volume: 15000000
      },
      {
        symbol: 'MSTR',
        current_price: 1850.00,
        change_percent: 2.8,
        high: 1900.00,
        low: 1800.00,
        volume: 500000
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