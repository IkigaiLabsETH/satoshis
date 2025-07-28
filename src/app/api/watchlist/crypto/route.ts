import { NextRequest, NextResponse } from 'next/server';
import { MarketDataService } from '@/services/market-data';
import { CryptoData } from '@/types/watchlist';
import { marketDataCache } from '@/utils/cache';
import { measureApiResponse } from '@/utils/performance';

export const dynamic = 'force-dynamic';

const getCryptoData = async (period: string): Promise<CryptoData[]> => {
  const cacheKey = `crypto_data_${period}`;
  const cached = marketDataCache.get(cacheKey);
  if (cached) {
    return cached as unknown as CryptoData[];
  }

  const cryptoData = await measureApiResponse(
    'crypto_data_fetch',
    async () => {
      return await MarketDataService.getCryptoData();
    },
    { period }
  );

  marketDataCache.set(cacheKey, cryptoData as unknown as Record<string, unknown>);
  return cryptoData;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';
    
    const cryptoData = await getCryptoData(period);

    return NextResponse.json({
      success: true,
      data: cryptoData,
      period: period,
      timestamp: new Date().toISOString(),
      source: 'MarketDataService'
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch crypto data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 