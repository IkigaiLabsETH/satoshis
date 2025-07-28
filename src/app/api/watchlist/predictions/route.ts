import { NextRequest, NextResponse } from 'next/server';
import { MarketDataService } from '@/services/market-data';
import { PredictionEngine } from '@/services/prediction-engine';
import { MarketPrediction } from '@/types/watchlist';

// Configure timeout for this API route
export const maxDuration = 30; // 30 seconds max duration

// Simple in-memory cache for predictions
const predictionsCache = new Map<string, { data: MarketPrediction[]; timestamp: number; ttl: number }>();

// Generate predictions using the service layer with caching and parallel processing
const generatePredictions = async (): Promise<MarketPrediction[]> => {
  const cacheKey = 'predictions_all_timeframes';
  const cached = predictionsCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data;
  }

  try {
    // Fetch all data in parallel using static methods
    const [bitcoinData, cryptoData, stockData, newsData] = await Promise.all([
      MarketDataService.getBitcoinData(),
      MarketDataService.getCryptoData(),
      MarketDataService.getStockData(),
      MarketDataService.getNewsData()
    ]);

    // Generate predictions with parallel processing using static method
    const predictions = await PredictionEngine.generatePredictions(
      bitcoinData,
      cryptoData,
      stockData,
      newsData
    );

    // Cache the results for 5 minutes
    predictionsCache.set(cacheKey, {
      data: predictions,
      timestamp: Date.now(),
      ttl: 5 * 60 * 1000
    });

    return predictions;
  } catch {
    // Return empty array on error
    return [];
  }
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