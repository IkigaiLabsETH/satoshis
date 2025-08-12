import { NextRequest, NextResponse } from 'next/server';
import supermemoryService, { SupermemoryApiError } from '@/services/supermemory';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SUPERMEMORY_API_KEY) {
      return NextResponse.json(
        { error: 'Supermemory not configured (missing SUPERMEMORY_API_KEY)' },
        { status: 503 }
      );
    }
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

      case 'storeOutperformWatchlist':
        const watchlistResult = await supermemoryService.storeOutperformWatchlist(data.list);
        return NextResponse.json(watchlistResult);

      case 'getOutperformWatchlists':
        const watchlists = await supermemoryService.getOutperformWatchlists();
        return NextResponse.json(watchlists);

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (err) {
    // Surface upstream status/details when available
    if (err instanceof SupermemoryApiError) {
      return NextResponse.json(
        { error: err.message, details: err.details },
        { status: err.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!process.env.SUPERMEMORY_API_KEY) {
      return NextResponse.json(
        { error: 'Supermemory not configured (missing SUPERMEMORY_API_KEY)' },
        { status: 503 }
      );
    }
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
  } catch (err) {
    if (err instanceof SupermemoryApiError) {
      return NextResponse.json(
        { error: err.message, details: err.details },
        { status: err.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 