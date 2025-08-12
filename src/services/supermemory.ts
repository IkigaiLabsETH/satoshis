import { 
  SupermemoryMemory, 
  SupermemorySearchResponse,
  UserPreference,
  MarketAnalysis,
  MarketEvent,
  ChartInteraction,
  OutperformWatchlist
} from '../types/supermemory';

export class SupermemoryApiError extends Error {
  status: number;
  details?: string;

  constructor(message: string, status: number, details?: string) {
    super(message);
    this.name = 'SupermemoryApiError';
    this.status = status;
    this.details = details;
  }
}

class SupermemoryService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.SUPERMEMORY_API_KEY || '';
    this.baseUrl = 'https://supermemory.ai/v3';
  }

  /**
   * Add a memory to Supermemory
   */
  async addMemory(content: unknown, metadata: Record<string, unknown> = {}): Promise<SupermemoryMemory> {
    try {
      const response = await fetch(`${this.baseUrl}/memories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: typeof content === 'string' ? content : JSON.stringify(content),
          metadata: {
            ...metadata,
            timestamp: new Date().toISOString(),
            source: 'grok420'
          }
        })
      });

      if (!response.ok) {
        let details: string | undefined;
        try {
          details = await response.text();
        } catch {
          // ignore
        }
        throw new SupermemoryApiError(`Supermemory API error: ${response.status}` , response.status, details);
      }

      return await response.json();
    } catch (error) {
      // Error adding memory to Supermemory
      throw error;
    }
  }

  /**
   * Search memories in Supermemory
   */
  async searchMemories(query: string, limit: number = 5): Promise<SupermemorySearchResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/memories/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          limit
        })
      });

      if (!response.ok) {
        let details: string | undefined;
        try {
          details = await response.text();
        } catch {
          // ignore
        }
        throw new SupermemoryApiError(`Supermemory API error: ${response.status}` , response.status, details);
      }

      return await response.json();
    } catch (error) {
      // Error searching memories in Supermemory
      throw error;
    }
  }

  /**
   * Store user preferences and interactions
   */
  async storeUserPreference(userId: string, preferences: UserPreference['preferences']): Promise<SupermemoryMemory> {
    return this.addMemory(preferences, {
      type: 'user_preferences',
      userId,
      category: 'grok420_preferences'
    });
  }

  /**
   * Store market analysis patterns
   */
  async storeAnalysisPattern(analysis: MarketAnalysis): Promise<SupermemoryMemory> {
    return this.addMemory(analysis, {
      type: 'market_analysis',
      asset: analysis.symbol,
      timeframe: analysis.timeframe,
      accuracy: analysis.accuracy,
      category: 'grok420_analysis'
    });
  }

  /**
   * Store market events
   */
  async storeMarketEvent(event: MarketEvent): Promise<SupermemoryMemory> {
    return this.addMemory(event, {
      type: 'market_event',
      severity: event.severity,
      assets: event.affectedAssets,
      category: 'grok420_events'
    });
  }

  /**
   * Store chart interactions
   */
  async storeChartInteraction(chartData: ChartInteraction): Promise<SupermemoryMemory> {
    return this.addMemory(chartData, {
      type: 'chart_interaction',
      symbol: chartData.symbol,
      timeframe: chartData.timeframe,
      indicators: chartData.indicators,
      category: 'grok420_charts'
    });
  }

  /**
   * Get relevant context for analysis
   */
  async getRelevantContext(query: string): Promise<SupermemorySearchResponse> {
    return this.searchMemories(query, 5);
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: string): Promise<SupermemorySearchResponse> {
    return this.searchMemories(`user preferences ${userId}`, 3);
  }

  /**
   * Get market analysis history
   */
  async getAnalysisHistory(symbol: string): Promise<SupermemorySearchResponse> {
    return this.searchMemories(`market analysis ${symbol}`, 5);
  }

  /**
   * Store BTC-relative outperform watchlist
   */
  async storeOutperformWatchlist(list: OutperformWatchlist): Promise<SupermemoryMemory> {
    return this.addMemory(list, {
      type: 'watchlist',
      base: list.base,
      horizon: list.horizon,
      category: 'grok420_watchlist'
    });
  }

  /**
   * Retrieve prior BTC-relative outperform watchlists
   */
  async getOutperformWatchlists(): Promise<SupermemorySearchResponse> {
    return this.searchMemories('watchlist BTC outperform', 5);
  }
}

export const supermemoryService = new SupermemoryService();
export default supermemoryService; 