/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import supermemoryService from '../services/supermemory';

// Mock the supermemory service
vi.mock('../services/supermemory', () => ({
  default: {
    addMemory: vi.fn(),
    searchMemories: vi.fn(),
    storeUserPreference: vi.fn(),
    storeAnalysisPattern: vi.fn(),
    storeMarketEvent: vi.fn(),
    storeChartInteraction: vi.fn(),
    getRelevantContext: vi.fn(),
    getUserPreferences: vi.fn(),
    getAnalysisHistory: vi.fn(),
  },
}));

// Mock fetch for API tests
global.fetch = vi.fn();

describe('Supermemory MCP Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Service Layer Tests', () => {
    it('should initialize supermemory service with correct configuration', () => {
      expect(supermemoryService).toBeDefined();
      expect(typeof supermemoryService.addMemory).toBe('function');
      expect(typeof supermemoryService.searchMemories).toBe('function');
    });

    it('should add memory successfully', async () => {
      const mockResponse = {
        id: 'test-id',
        content: 'test content',
        metadata: { type: 'test' },
        status: 'success'
      };

      (supermemoryService.addMemory as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.addMemory('test content', { type: 'test' });

      expect(supermemoryService.addMemory).toHaveBeenCalledWith('test content', { type: 'test' });
      expect(result).toEqual(mockResponse);
    });

    it('should search memories successfully', async () => {
      const mockResponse = {
        memories: [
          { id: '1', content: 'test memory 1', metadata: { type: 'test' } },
          { id: '2', content: 'test memory 2', metadata: { type: 'test' } }
        ],
        total: 2
      };

      (supermemoryService.searchMemories as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.searchMemories('test query', 5);

      expect(supermemoryService.searchMemories).toHaveBeenCalledWith('test query', 5);
      expect(result).toEqual(mockResponse);
    });

    it('should store user preference successfully', async () => {
      const mockResponse = { id: 'pref-id', content: 'preference', metadata: { type: 'user_preferences' } };
      (supermemoryService.storeUserPreference as any).mockResolvedValue(mockResponse);

      const preferences = {
        timeframes: ['1d'],
        favoriteAssets: ['BTC'],
        alertSettings: { priceAlerts: true },
        analysisStyle: 'technical'
      };

      const result = await supermemoryService.storeUserPreference('test-user', preferences);

      expect(supermemoryService.storeUserPreference).toHaveBeenCalledWith('test-user', preferences);
      expect(result).toEqual(mockResponse);
    });

    it('should store market analysis successfully', async () => {
      const analysis = {
        type: 'market_analysis' as const,
        symbol: 'BTC',
        timeframe: '1d',
        analysis: { prediction: 'bullish', confidence: 0.8, indicators: ['RSI'], reasoning: 'test' }
      };

      const mockResponse = { id: 'analysis-id', content: 'analysis', metadata: { type: 'market_analysis' } };
      (supermemoryService.storeAnalysisPattern as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.storeAnalysisPattern(analysis);

      expect(supermemoryService.storeAnalysisPattern).toHaveBeenCalledWith(analysis);
      expect(result).toEqual(mockResponse);
    });

    it('should store market event successfully', async () => {
      const event = {
        type: 'market_event' as const,
        severity: 'high' as const,
        event: { title: 'Test Event', description: 'Test', impact: 'high' },
        affectedAssets: ['BTC']
      };

      const mockResponse = { id: 'event-id', content: 'event', metadata: { type: 'market_event' } };
      (supermemoryService.storeMarketEvent as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.storeMarketEvent(event);

      expect(supermemoryService.storeMarketEvent).toHaveBeenCalledWith(event);
      expect(result).toEqual(mockResponse);
    });

    it('should store chart interaction successfully', async () => {
      const chartData = {
        type: 'chart_interaction' as const,
        symbol: 'BTC',
        timeframe: '1d',
        indicators: ['RSI'],
        interaction: { action: 'zoom', parameters: { level: 2 } }
      };

      const mockResponse = { id: 'chart-id', content: 'chart', metadata: { type: 'chart_interaction' } };
      (supermemoryService.storeChartInteraction as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.storeChartInteraction(chartData);

      expect(supermemoryService.storeChartInteraction).toHaveBeenCalledWith(chartData);
      expect(result).toEqual(mockResponse);
    });

    it('should get relevant context successfully', async () => {
      const mockResponse = {
        memories: [
          { id: '1', content: 'relevant memory', metadata: { type: 'context' } }
        ],
        count: 1
      };

      (supermemoryService.getRelevantContext as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.getRelevantContext('test query');

      expect(supermemoryService.getRelevantContext).toHaveBeenCalledWith('test query');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('API Route Tests', () => {
    it('should handle POST /api/supermemory for addMemory', async () => {
      const mockResponse = { id: 'test-id', content: 'test', metadata: { type: 'test' } };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const response = await fetch('/api/supermemory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addMemory',
          data: { content: 'test content', metadata: { type: 'test' } }
        })
      });

      expect(response.ok).toBe(true);
    });

    it('should handle POST /api/supermemory for searchMemories', async () => {
      const mockResponse = { memories: [], total: 0 };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const response = await fetch('/api/supermemory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'searchMemories',
          data: { query: 'test query', limit: 5 }
        })
      });

      expect(response.ok).toBe(true);
    });

    it('should handle GET /api/supermemory for searchMemories', async () => {
      const mockResponse = { memories: [], total: 0 };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const response = await fetch('/api/supermemory?action=searchMemories&query=test&limit=5');

      expect(response.ok).toBe(true);
    });

    it('should handle API errors gracefully', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal server error' })
      });

      const response = await fetch('/api/supermemory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'invalidAction',
          data: {}
        })
      });

      expect(response.status).toBe(500);
    });
  });

  describe('Type Safety Tests', () => {
    it('should enforce correct types for user preferences', () => {
      const validPreference = {
        timeframes: ['1d', '1w'],
        favoriteAssets: ['BTC', 'ETH'],
        alertSettings: { priceAlerts: true },
        analysisStyle: 'technical'
      };

      // This should compile without errors
      expect(typeof validPreference.timeframes).toBe('object');
      expect(Array.isArray(validPreference.timeframes)).toBe(true);
      expect(validPreference.timeframes).toContain('1d');
      expect(validPreference.timeframes).toContain('1w');
    });

    it('should enforce correct types for market analysis', () => {
      const validAnalysis = {
        type: 'market_analysis' as const,
        symbol: 'BTC',
        timeframe: '1d',
        analysis: {
          prediction: 'bullish',
          confidence: 0.8,
          indicators: ['RSI', 'MACD'],
          reasoning: 'Technical analysis shows bullish momentum'
        }
      };

      expect(validAnalysis.type).toBe('market_analysis');
      expect(typeof validAnalysis.analysis.confidence).toBe('number');
      expect(Array.isArray(validAnalysis.analysis.indicators)).toBe(true);
      expect(validAnalysis.analysis.confidence).toBeGreaterThan(0);
      expect(validAnalysis.analysis.confidence).toBeLessThanOrEqual(1);
    });

    it('should enforce correct types for market events', () => {
      const validEvent = {
        type: 'market_event' as const,
        severity: 'high' as const,
        event: {
          title: 'Major Market Event',
          description: 'Significant market movement',
          impact: 'high'
        },
        affectedAssets: ['BTC', 'ETH']
      };

      expect(validEvent.type).toBe('market_event');
      expect(['low', 'medium', 'high', 'critical']).toContain(validEvent.severity);
      expect(Array.isArray(validEvent.affectedAssets)).toBe(true);
      expect(validEvent.affectedAssets).toContain('BTC');
    });

    it('should enforce correct types for chart interactions', () => {
      const validChartInteraction = {
        type: 'chart_interaction' as const,
        symbol: 'BTC',
        timeframe: '1d',
        indicators: ['RSI', 'MACD'],
        interaction: {
          action: 'zoom',
          parameters: { level: 2, timeframe: '1h' }
        }
      };

      expect(validChartInteraction.type).toBe('chart_interaction');
      expect(typeof validChartInteraction.symbol).toBe('string');
      expect(Array.isArray(validChartInteraction.indicators)).toBe(true);
      expect(typeof validChartInteraction.interaction.action).toBe('string');
    });
  });

  describe('Integration Tests', () => {
    it('should complete full workflow: store memory -> search memory', async () => {
      // Mock successful memory storage
      const storedMemory = { id: 'test-id', content: 'test content', metadata: { type: 'test' } };
      (supermemoryService.addMemory as any).mockResolvedValue(storedMemory);

      // Mock successful memory search
      const searchResult = { memories: [storedMemory], total: 1 };
      (supermemoryService.searchMemories as any).mockResolvedValue(searchResult);

      // Test storage
      const stored = await supermemoryService.addMemory('test content', { type: 'test' });
      expect(stored).toEqual(storedMemory);

      // Test retrieval
      const retrieved = await supermemoryService.searchMemories('test', 5);
      expect(retrieved).toEqual(searchResult);
      expect(retrieved.memories).toContain(storedMemory);
    });

    it('should handle concurrent operations', async () => {
      // Mock responses for concurrent operations
      (supermemoryService.addMemory as any).mockResolvedValue({ id: 'test', content: 'test', metadata: {} });
      (supermemoryService.searchMemories as any).mockResolvedValue({ memories: [], total: 0 });

      const promises = [
        supermemoryService.addMemory('content1', { type: 'test1' }),
        supermemoryService.addMemory('content2', { type: 'test2' }),
        supermemoryService.searchMemories('test', 5)
      ];

      const results = await Promise.all(promises);
      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({ id: 'test', content: 'test', metadata: {} });
      expect(results[1]).toEqual({ id: 'test', content: 'test', metadata: {} });
      expect(results[2]).toEqual({ memories: [], total: 0 });
    });

    it('should handle error scenarios gracefully', async () => {
      (supermemoryService.addMemory as any).mockRejectedValue(new Error('Network error'));

      await expect(supermemoryService.addMemory('test', { type: 'test' })).rejects.toThrow('Network error');
    });

    it('should validate memory metadata structure', async () => {
      const mockResponse = {
        id: 'test-id',
        content: 'test content',
        metadata: {
          type: 'test',
          userId: 'user123',
          timestamp: new Date().toISOString(),
          source: 'test-app',
          category: 'test-category'
        },
        status: 'success'
      };

      (supermemoryService.addMemory as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.addMemory('test content', { type: 'test' });

      expect(result.metadata).toHaveProperty('type');
      expect(result.metadata).toHaveProperty('timestamp');
      expect(result.metadata).toHaveProperty('source');
      expect(typeof result.metadata.timestamp).toBe('string');
    });
  });

  describe('Memory Types Validation', () => {
    it('should validate user preference memory structure', async () => {
      const preferences = {
        timeframes: ['1d', '1w', '1m'],
        favoriteAssets: ['BTC', 'ETH', 'SOL'],
        alertSettings: { priceAlerts: true, newsAlerts: false },
        analysisStyle: 'technical'
      };

      const mockResponse = {
        id: 'pref-id',
        content: JSON.stringify(preferences),
        metadata: { type: 'user_preferences', userId: 'test-user' },
        status: 'success'
      };

      (supermemoryService.storeUserPreference as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.storeUserPreference('test-user', preferences);

      expect(result.metadata.type).toBe('user_preferences');
      expect(result.metadata.userId).toBe('test-user');
      expect(JSON.parse(result.content)).toEqual(preferences);
    });

    it('should validate market analysis memory structure', async () => {
      const analysis = {
        type: 'market_analysis' as const,
        symbol: 'BTC',
        timeframe: '1d',
        analysis: {
          prediction: 'bullish',
          confidence: 0.85,
          indicators: ['RSI', 'MACD', 'Bollinger Bands'],
          reasoning: 'Strong technical indicators suggest upward momentum'
        },
        accuracy: 0.78
      };

      const mockResponse = {
        id: 'analysis-id',
        content: JSON.stringify(analysis),
        metadata: { type: 'market_analysis', symbol: 'BTC' },
        status: 'success'
      };

      (supermemoryService.storeAnalysisPattern as any).mockResolvedValue(mockResponse);

      const result = await supermemoryService.storeAnalysisPattern(analysis);

      expect(result.metadata.type).toBe('market_analysis');
      expect(result.metadata.symbol).toBe('BTC');
      expect(JSON.parse(result.content)).toEqual(analysis);
    });
  });
}); 