import { NextResponse } from 'next/server';

interface CryptoCompareResponse {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: Record<string, unknown>;
  Data: {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: {
      time: number;
      high: number;
      low: number;
      open: number;
      volumefrom: number;
      volumeto: number;
      close: number;
      conversionType: string;
      conversionSymbol: string;
    }[];
  };
}

interface ChartData {
  date: string;
  price: number;
  twoYearMA: number | null;
  twoYearMAx5: number | null;
}

const MOVING_AVERAGE_DAYS = 365 * 2;

async function calculateMovingAverage(prices: { time: number; close: number }[]): Promise<ChartData[]> {
  const chartData: ChartData[] = [];

  for (let i = 0; i < prices.length; i++) {
    const { time, close } = prices[i];

    let twoYearMA: number | null = null;
    let twoYearMAx5: number | null = null;

    if (i >= MOVING_AVERAGE_DAYS - 1) {
      const window = prices.slice(i - (MOVING_AVERAGE_DAYS - 1), i + 1);
      const sum = window.reduce((acc, p) => acc + p.close, 0);
      twoYearMA = sum / MOVING_AVERAGE_DAYS;
      twoYearMAx5 = twoYearMA * 5;
    }

    chartData.push({
      date: new Date(time * 1000).toISOString().split('T')[0],
      price: close,
      twoYearMA,
      twoYearMAx5,
    });
  }

  return chartData;
}

export async function GET() {
  try {
    const response = await fetch(
      'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&allData=true',
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`CryptoCompare API request failed with status ${response.status}. Body: ${errorBody}`);
    }

    const data: CryptoCompareResponse = await response.json();

    if (data.Response !== 'Success' || !data.Data || !data.Data.Data) {
      throw new Error('Invalid data structure from CryptoCompare API.');
    }

    const chartData = await calculateMovingAverage(data.Data.Data);

    return NextResponse.json(chartData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { error: 'Failed to process request.', details: errorMessage },
      { status: 500 }
    );
  }
}


