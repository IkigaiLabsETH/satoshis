"use client";

import { useState, createContext, useContext, ReactNode } from 'react';
import { 
  UserPreference, 
  MarketAnalysis, 
  MarketEvent, 
  ChartInteraction,
  SupermemorySearchResponse,
  OutperformWatchlist
} from '../../types/supermemory';

interface SupermemoryContextType {
  // User preferences
  storeUserPreference: (userId: string, preferences: UserPreference['preferences']) => Promise<void>;
  getUserPreferences: (userId: string) => Promise<SupermemorySearchResponse>;
  
  // Market analysis
  storeAnalysisPattern: (analysis: MarketAnalysis) => Promise<void>;
  getAnalysisHistory: (symbol: string) => Promise<SupermemorySearchResponse>;
  
  // Market events
  storeMarketEvent: (event: MarketEvent) => Promise<void>;
  
  // Chart interactions
  storeChartInteraction: (chartData: ChartInteraction) => Promise<void>;
  
  // Context retrieval
  getRelevantContext: (query: string) => Promise<SupermemorySearchResponse>;
  
  // Watchlist
  storeOutperformWatchlist: (list: OutperformWatchlist) => Promise<void>;
  getOutperformWatchlists: () => Promise<SupermemorySearchResponse>;
  
  // State
  isLoading: boolean;
  error: string | null;
  lastMemoryId: string | null;
}

const SupermemoryContext = createContext<SupermemoryContextType | undefined>(undefined);

export const useSupermemory = () => {
  const context = useContext(SupermemoryContext);
  if (!context) {
    throw new Error('useSupermemory must be used within a SupermemoryProvider');
  }
  return context;
};

interface SupermemoryProviderProps {
  children: ReactNode;
}

export const SupermemoryProvider = ({ children }: SupermemoryProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMemoryId, setLastMemoryId] = useState<string | null>(null);

  // Helper to call our Next.js API route so secrets remain server-side
  const callApi = async <T,>(action: string, data: Record<string, unknown>): Promise<T> => {
    const res = await fetch('/api/supermemory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data }),
    });
    if (!res.ok) {
      throw new Error(`Supermemory API error: ${res.status}`);
    }
    return (await res.json()) as T;
  };

  const handleError = (error: unknown) => {
    // Supermemory error
    setError(error instanceof Error ? error.message : 'An error occurred with Supermemory');
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  };

  const storeUserPreference = async (userId: string, preferences: UserPreference['preferences']) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<{ id: string }>('storeUserPreference', { userId, preferences });
      setLastMemoryId(result.id);
      // User preference stored
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPreferences = async (userId: string): Promise<SupermemorySearchResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<SupermemorySearchResponse>('getUserPreferences', { userId });
      return result;
    } catch (err) {
      handleError(err);
      return { memories: [], total: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  const storeAnalysisPattern = async (analysis: MarketAnalysis) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<{ id: string }>('storeAnalysisPattern', { analysis });
      setLastMemoryId(result.id);
      // Analysis pattern stored
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAnalysisHistory = async (symbol: string): Promise<SupermemorySearchResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<SupermemorySearchResponse>('getAnalysisHistory', { symbol });
      return result;
    } catch (err) {
      handleError(err);
      return { memories: [], total: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  const storeMarketEvent = async (event: MarketEvent) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<{ id: string }>('storeMarketEvent', { event });
      setLastMemoryId(result.id);
      // Market event stored
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const storeChartInteraction = async (chartData: ChartInteraction) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<{ id: string }>('storeChartInteraction', { chartData });
      setLastMemoryId(result.id);
      // Chart interaction stored
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRelevantContext = async (query: string): Promise<SupermemorySearchResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<SupermemorySearchResponse>('getRelevantContext', { query });
      return result;
    } catch (err) {
      handleError(err);
      return { memories: [], total: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  const storeOutperformWatchlist = async (list: OutperformWatchlist) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi<{ id: string }>('storeOutperformWatchlist', { list });
      setLastMemoryId(result.id);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getOutperformWatchlists = async (): Promise<SupermemorySearchResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      return await callApi<SupermemorySearchResponse>('getOutperformWatchlists', {});
    } catch (err) {
      handleError(err);
      return { memories: [], total: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  const value: SupermemoryContextType = {
    storeUserPreference,
    getUserPreferences,
    storeAnalysisPattern,
    getAnalysisHistory,
    storeMarketEvent,
    storeChartInteraction,
    getRelevantContext,
    storeOutperformWatchlist,
    getOutperformWatchlists,
    isLoading,
    error,
    lastMemoryId
  };

  return (
    <SupermemoryContext.Provider value={value}>
      {children}
      {/* Error notification */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          <p className="text-sm">{error}</p>
        </div>
      )}
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed bottom-4 left-4 bg-yellow-500 text-black px-4 py-2 rounded shadow-lg z-50">
          <p className="text-sm">Syncing with Supermemory...</p>
        </div>
      )}
    </SupermemoryContext.Provider>
  );
};

// Hook for chart interactions
export const useChartMemory = () => {
  const { storeChartInteraction } = useSupermemory();
  
  const handleChartInteraction = async (chartData: {
    symbol: string;
    timeframe: string;
    indicators: string[];
    action: string;
    parameters: Record<string, unknown>;
  }) => {
    const chartInteraction: ChartInteraction = {
      type: 'chart_interaction',
      symbol: chartData.symbol,
      timeframe: chartData.timeframe,
      indicators: chartData.indicators,
      interaction: {
        action: chartData.action,
        parameters: chartData.parameters
      }
    };
    
    await storeChartInteraction(chartInteraction);
  };

  return { handleChartInteraction };
};

// Hook for market analysis
export const useMarketMemory = () => {
  const { storeAnalysisPattern, getAnalysisHistory } = useSupermemory();
  
  const storeAnalysis = async (analysis: MarketAnalysis) => {
    await storeAnalysisPattern(analysis);
  };

  const getHistory = async (symbol: string) => {
    return await getAnalysisHistory(symbol);
  };

  return { storeAnalysis, getHistory };
};

// Hook for user preferences
export const useUserMemory = () => {
  const { storeUserPreference, getUserPreferences } = useSupermemory();
  
  const storePreferences = async (userId: string, preferences: UserPreference['preferences']) => {
    await storeUserPreference(userId, preferences);
  };

  const getPreferences = async (userId: string) => {
    return await getUserPreferences(userId);
  };

  return { storePreferences, getPreferences };
}; 