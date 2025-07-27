import { 
  SupermemoryMemory, 
  SupermemorySearchResponse,
  UserPreference,
  MarketAnalysis,
  MarketEvent,
  ChartInteraction
} from '../types/supermemory';

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
        throw new Error(`Supermemory API error: ${response.status}`);
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
        throw new Error(`Supermemory API error: ${response.status}`);
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
}

export const supermemoryService = new SupermemoryService();
export default supermemoryService; 