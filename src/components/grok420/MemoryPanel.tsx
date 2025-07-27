"use client";

import { useState, useEffect } from 'react';
import { useSupermemory } from './SupermemoryIntegration';
import { SupermemoryMemory } from '@/types/supermemory';
import { Brain, Clock, Search, X, RefreshCw } from 'lucide-react';

interface MemoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoryPanel({ isOpen, onClose }: MemoryPanelProps) {
  const { getRelevantContext, getUserPreferences, getAnalysisHistory } = useSupermemory();
  const [memories, setMemories] = useState<SupermemoryMemory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'recent' | 'preferences' | 'analysis' | 'search'>('recent');

  useEffect(() => {
    if (isOpen) {
      const loadMemories = async () => {
        setIsLoading(true);
        try {
          const result = await getRelevantContext('recent interactions');
          setMemories(result.memories || []);
        } catch {
          // Failed to load recent memories
        } finally {
          setIsLoading(false);
        }
      };
      loadMemories();
    }
  }, [isOpen, getRelevantContext]);

  const loadRecentMemories = async () => {
    setIsLoading(true);
    try {
      const result = await getRelevantContext('recent interactions');
      setMemories(result.memories || []);
    } catch {
      // Failed to load recent memories
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await getRelevantContext(searchQuery);
      setMemories(result.memories || []);
      setActiveTab('search');
    } catch {
      // Failed to search memories
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserPreferences = async () => {
    setIsLoading(true);
    try {
      const result = await getUserPreferences('default-user');
      setMemories(result.memories || []);
      setActiveTab('preferences');
    } catch {
      // Failed to load user preferences
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalysisHistory = async () => {
    setIsLoading(true);
    try {
      const result = await getAnalysisHistory('BTC');
      setMemories(result.memories || []);
      setActiveTab('analysis');
    } catch {
      // Failed to load analysis history
    } finally {
      setIsLoading(false);
    }
  };

  const formatMemoryContent = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === 'object') {
        return JSON.stringify(parsed, null, 2);
      }
    } catch {
      // If not JSON, return as is
    }
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  };

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'user_preferences':
        return '👤';
      case 'market_analysis':
        return '📊';
      case 'market_event':
        return '📈';
      case 'chart_interaction':
        return '📉';
      default:
        return '💾';
    }
  };

  const getMemoryTitle = (memory: SupermemoryMemory) => {
    const type = memory.metadata?.type || 'unknown';
    switch (type) {
      case 'user_preferences':
        return 'User Preferences';
      case 'market_analysis':
        return `Analysis: ${memory.metadata?.asset || 'Unknown Asset'}`;
      case 'market_event':
        return `Event: ${memory.metadata?.severity || 'Unknown'} Impact`;
      case 'chart_interaction':
        return `Chart: ${memory.metadata?.symbol || 'Unknown Symbol'}`;
      default:
        return 'Memory';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1c1f26] border-2 border-yellow-500 rounded-lg shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-500/20">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-yellow-400">Supermemory Panel</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors"
          >
            <X className="h-5 w-5 text-yellow-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-yellow-500/20">
          <button
            onClick={() => {
              setActiveTab('recent');
              loadRecentMemories();
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'recent'
                ? 'text-yellow-400 border-b-2 border-yellow-500'
                : 'text-yellow-400/60 hover:text-yellow-400'
            }`}
          >
            Recent
          </button>
          <button
            onClick={loadUserPreferences}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'preferences'
                ? 'text-yellow-400 border-b-2 border-yellow-500'
                : 'text-yellow-400/60 hover:text-yellow-400'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={loadAnalysisHistory}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'analysis'
                ? 'text-yellow-400 border-b-2 border-yellow-500'
                : 'text-yellow-400/60 hover:text-yellow-400'
            }`}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'search'
                ? 'text-yellow-400 border-b-2 border-yellow-500'
                : 'text-yellow-400/60 hover:text-yellow-400'
            }`}
          >
            Search
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === 'search' && (
          <div className="p-4 border-b border-yellow-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memories..."
                className="flex-1 bg-black/60 border border-yellow-500/30 rounded-lg px-3 py-2 text-white placeholder-yellow-400/50 focus:border-yellow-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 text-black font-bold rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
                <span className="text-yellow-400">Loading memories...</span>
              </div>
            </div>
          ) : memories.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Brain className="h-12 w-12 text-yellow-500/50 mx-auto mb-4" />
                <p className="text-yellow-400/60 text-lg font-medium">No memories found</p>
                <p className="text-white/40 text-sm mt-2">
                  {activeTab === 'search' 
                    ? 'Try a different search query'
                    : 'Start interacting with Grok420 to build your memory'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="bg-black/40 border border-yellow-500/20 rounded-lg p-4 hover:border-yellow-500/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getMemoryIcon(memory.metadata?.type || '')}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-yellow-400 font-medium">
                          {getMemoryTitle(memory)}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-yellow-400/60">
                          <Clock className="h-3 w-3" />
                          {new Date(memory.metadata?.timestamp || '').toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-black/60 rounded p-3 text-sm text-white/80 font-mono">
                        <pre className="whitespace-pre-wrap break-words">
                          {formatMemoryContent(memory.content)}
                        </pre>
                      </div>
                      {memory.metadata?.category && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                            {memory.metadata.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-yellow-500/20">
          <div className="flex items-center justify-between text-sm text-yellow-400/60">
            <span>{memories.length} memories loaded</span>
            <button
              onClick={loadRecentMemories}
              className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 hover:bg-yellow-500/20 rounded transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 