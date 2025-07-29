import { NextRequest, NextResponse } from 'next/server';
import { MarketDataService } from '@/services/market-data';
import { PredictionEngine } from '@/services/prediction-engine';
import { MarketPrediction } from '@/types/watchlist';

// Configure timeout for this API route
export const maxDuration = 20; // Reduced from 30s to 20s for faster day/week predictions

// Simple in-memory cache for predictions
const predictionsCache = new Map<string, { data: MarketPrediction[]; timestamp: number; ttl: number }>();

// Performance monitoring
const performanceMetrics = {
  totalRequests: 0,
  cacheHits: 0,
  grok4Success: 0,
  grok4Failures: 0,
  averageResponseTime: 0
};

// Generate predictions using the service layer with caching and parallel processing
const generatePredictions = async (): Promise<MarketPrediction[]> => {
  const startTime = Date.now();
  performanceMetrics.totalRequests++;
  
  const cacheKey = 'predictions_day_week_default'; // Cache for default day/week predictions
  const cached = predictionsCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    performanceMetrics.cacheHits++;
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

    // Update performance metrics
    const responseTime = Date.now() - startTime;
    performanceMetrics.averageResponseTime = 
      (performanceMetrics.averageResponseTime * (performanceMetrics.totalRequests - 1) + responseTime) / performanceMetrics.totalRequests;
    performanceMetrics.grok4Success++;

    return predictions;
  } catch {
    performanceMetrics.grok4Failures++;
    // Return empty array on error
    return [];
  }
};

// Generate single timeframe prediction for lazy loading
const generateSingleTimeframePrediction = async (timeframe: string): Promise<MarketPrediction | null> => {
  const startTime = Date.now();
  
  try {
    // Fetch all data in parallel
    const [bitcoinData, cryptoData, stockData, newsData] = await Promise.all([
      MarketDataService.getBitcoinData(),
      MarketDataService.getCryptoData(),
      MarketDataService.getStockData(),
      MarketDataService.getNewsData()
    ]);

    // Generate single prediction for the requested timeframe
    const prediction = await PredictionEngine.generateSingleTimeframePrediction(
      timeframe,
      bitcoinData,
      cryptoData,
      stockData,
      newsData
    );

    // Update performance metrics
    const responseTime = Date.now() - startTime;
    performanceMetrics.totalRequests++;
    performanceMetrics.averageResponseTime = 
      (performanceMetrics.averageResponseTime * (performanceMetrics.totalRequests - 1) + responseTime) / performanceMetrics.totalRequests;
    performanceMetrics.grok4Success++;

    return prediction;
  } catch {
    performanceMetrics.grok4Failures++;
    return null;
  }
};

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedTimeframe = searchParams.get('timeframe');
    
    // If specific timeframe requested, generate only that one
    if (requestedTimeframe && ['month', 'year'].includes(requestedTimeframe)) {
      const singlePrediction = await generateSingleTimeframePrediction(requestedTimeframe);
      
      if (singlePrediction) {
        return NextResponse.json({
          success: true,
          data: [singlePrediction],
          timestamp: new Date().toISOString(),
          source: `Grok 4 AI Market Analysis (${requestedTimeframe} prediction)`,
          performance: {
            cacheHitRate: '0',
            grok4SuccessRate: '100',
            averageResponseTime: 0,
            totalRequests: 1
          }
        });
      }
    }
    
    // Default: generate day and week predictions
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
      source: 'Grok 4 AI Market Analysis (Day/Week Focus)',
      performance: {
        cacheHitRate: performanceMetrics.totalRequests > 0 ? (performanceMetrics.cacheHits / performanceMetrics.totalRequests * 100).toFixed(1) : '0',
        grok4SuccessRate: performanceMetrics.totalRequests > 0 ? (performanceMetrics.grok4Success / performanceMetrics.totalRequests * 100).toFixed(1) : '0',
        averageResponseTime: Math.round(performanceMetrics.averageResponseTime),
        totalRequests: performanceMetrics.totalRequests
      }
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to generate market predictions',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 