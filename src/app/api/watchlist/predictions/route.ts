import { NextRequest, NextResponse } from 'next/server';
import { MarketDataService } from '@/services/market-data';
import { PredictionEngine } from '@/services/prediction-engine';
import { MarketPrediction } from '@/types/watchlist';

// Generate predictions using the service layer
const generatePredictions = async (): Promise<MarketPrediction[]> => {
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
};

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    const predictions = await generatePredictions();
    
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