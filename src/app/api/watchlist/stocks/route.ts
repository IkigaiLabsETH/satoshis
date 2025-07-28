import { NextRequest, NextResponse } from 'next/server';
import { MarketDataService } from '@/services/market-data';
import { StockData } from '@/types/watchlist';
import { marketDataCache } from '@/utils/cache';
import { measureApiResponse } from '@/utils/performance';

interface EnhancedStockData extends StockData {
  volume_ratio?: number;
  price_range?: number;
  volatility?: number;
  momentum_score?: number;
  sector?: string;
}

export const dynamic = 'force-dynamic';

const getStockData = async (period: string): Promise<EnhancedStockData[]> => {
  const cacheKey = `stock_data_${period}`;
  const cached = marketDataCache.get(cacheKey);
  if (cached) {
    return cached as unknown as EnhancedStockData[];
  }

  const stockData = await measureApiResponse(
    'stock_data_fetch',
    async () => {
      return await MarketDataService.getStockData();
    },
    { period }
  );

  marketDataCache.set(cacheKey, stockData as unknown as Record<string, unknown>);
  return stockData;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';
    
    const stockData = await getStockData(period);

    return NextResponse.json({
      success: true,
      data: stockData,
      period: period,
      timestamp: new Date().toISOString(),
      source: 'MarketDataService'
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch stock data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 