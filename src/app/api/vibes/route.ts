import { NextRequest, NextResponse } from 'next/server';

interface MemoryVibeData {
  id: string;
  content: string;
  source: string;
  userId: string;
  category: string;
  timestamp: string;
}

// Simple in-memory storage for vibes (fallback when database is not available)
const vibesStorage = new Map<string, MemoryVibeData>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'addVibes':
        // Use in-memory storage for now
        const vibeId = Date.now().toString();
        const vibeData = {
          id: vibeId,
          content: data.content,
          source: data.source || 'user',
          userId: data.userId || 'default',
          category: data.category || 'personality_influence',
          timestamp: new Date().toISOString(),
        };
        
        vibesStorage.set(vibeId, vibeData);
        
        return NextResponse.json({ success: true, id: vibeId, source: 'memory' });

      case 'getVibes':
        // Use in-memory storage for now
        const vibes = Array.from(vibesStorage.values());
        return NextResponse.json({ vibes, source: 'memory' });

      case 'removeVibes':
        // Use in-memory removal for now
        if (data.id) {
          vibesStorage.delete(data.id);
        }
        return NextResponse.json({ success: true, message: 'Vibes removed from memory' });

      case 'searchVibes':
        // Use in-memory search for now
        const vibesForSearch = Array.from(vibesStorage.values())
          .filter(vibe => vibe.content.toLowerCase().includes(data.query.toLowerCase()));
        return NextResponse.json({ vibes: vibesForSearch, source: 'memory' });

      case 'getVibeStats':
        // Use in-memory stats for now
        const vibesForStats = Array.from(vibesStorage.values());
        const stats = {
          total: vibesForStats.length,
          active: vibesForStats.length,
          byCategory: vibesForStats.reduce((acc, vibe) => {
            acc[vibe.category] = (acc[vibe.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        };
        return NextResponse.json({ stats, source: 'memory' });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch {
    // Vibes API error
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
    const _userId = searchParams.get('userId') || 'default';

    if (action === 'getVibes') {
      // Use in-memory storage for now
      const vibesForGet = Array.from(vibesStorage.values());
      return NextResponse.json({ vibes: vibesForGet, source: 'memory' });
    }

    if (action === 'getVibeStats') {
      // Use in-memory stats for now
      const vibesForStats = Array.from(vibesStorage.values());
      const stats = {
        total: vibesForStats.length,
        active: vibesForStats.length,
        byCategory: vibesForStats.reduce((acc, vibe) => {
          acc[vibe.category] = (acc[vibe.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      };
      return NextResponse.json({ stats, source: 'memory' });
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  } catch {
    // Vibes API error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 