import { NextRequest, NextResponse } from 'next/server';
import { MarketDataService } from '@/services/market-data';
import { PredictionEngine } from '@/services/prediction-engine';
import { MarketPrediction } from '@/types/watchlist';
import { predictionCache } from '@/utils/cache';
import { measureApiResponse } from '@/utils/performance';

// Generate predictions using the service layer with caching
const generatePredictions = async (): Promise<MarketPrediction[]> => {
  const cacheKey = 'predictions_all_timeframes';
  const cached = predictionCache.get(cacheKey);
  if (cached) {
    return cached as unknown as MarketPrediction[];
  }

  const predictions = await measureApiResponse(
    'predictions_generation',
    async () => {
      try {
        // Fetch all market data using the service layer
        const marketData = await MarketDataService.getAllMarketData();
        
        // Generate predictions using the prediction engine
        return await PredictionEngine.generatePredictions(
          marketData.bitcoin,
          marketData.crypto,
          marketData.stocks,
          marketData.news
        );
      } catch {
        return [];
      }
    }
  );

  // Cache the predictions for 5 minutes
  predictionCache.set(cacheKey, predictions as unknown as Record<string, unknown>);
  return predictions;
};

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    const predictions = await generatePredictions();
    
    if (predictions.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No predictions generated',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      data: predictions,
      timestamp: new Date().toISOString(),
      source: 'Grok 4 AI Market Analysis'
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to generate market predictions',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 