import { NextRequest, NextResponse } from 'next/server';
import supermemoryService from '@/services/supermemory';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'addMemory':
        const result = await supermemoryService.addMemory(data.content, data.metadata);
        return NextResponse.json(result);

      case 'searchMemories':
        const searchResult = await supermemoryService.searchMemories(data.query, data.limit);
        return NextResponse.json(searchResult);

      case 'storeUserPreference':
        const preferenceResult = await supermemoryService.storeUserPreference(data.userId, data.preferences);
        return NextResponse.json(preferenceResult);

      case 'storeAnalysisPattern':
        const analysisResult = await supermemoryService.storeAnalysisPattern(data.analysis);
        return NextResponse.json(analysisResult);

      case 'storeMarketEvent':
        const eventResult = await supermemoryService.storeMarketEvent(data.event);
        return NextResponse.json(eventResult);

      case 'storeChartInteraction':
        const chartResult = await supermemoryService.storeChartInteraction(data.chartData);
        return NextResponse.json(chartResult);

      case 'getRelevantContext':
        const contextResult = await supermemoryService.getRelevantContext(data.query);
        return NextResponse.json(contextResult);

      case 'getUserPreferences':
        const userPrefsResult = await supermemoryService.getUserPreferences(data.userId);
        return NextResponse.json(userPrefsResult);

      case 'getAnalysisHistory':
        const historyResult = await supermemoryService.getAnalysisHistory(data.symbol);
        return NextResponse.json(historyResult);

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch {
    // Supermemory API error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query');
    const limit = searchParams.get('limit');

    if (action === 'searchMemories' && query) {
      const result = await supermemoryService.searchMemories(query, parseInt(limit || '5'));
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  } catch {
    // Supermemory API error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 