"use client";

import { useLiveCryptoPrices } from '@/hooks/useLiveCryptoPrices';
import { useEffect, useState } from 'react';

export default function LiveTradingSignals() {
  const [isClient, setIsClient] = useState(false);
  const { BTC, ETH, isLoading, error, retry } = useLiveCryptoPrices();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">Live Trading Signals</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">Live Trading Signals</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Loading market data...
          </p>
        </div>
      </div>
    );
  }

  // Strategy thresholds
  const BTC_ENTRY_THRESHOLD = 119425;
  const ETH_ENTRY_THRESHOLD = 4500;

  // Determine entry signals
  const getBTCEntrySignal = () => {
    if (isLoading) return 'LOADING...';
    if (error || !BTC?.price) return 'ERROR';
    return BTC.price > BTC_ENTRY_THRESHOLD ? 'READY' : 'WAITING';
  };

  const getETHEntrySignal = () => {
    if (isLoading) return 'LOADING...';
    if (error || !ETH?.price) return 'ERROR';
    return ETH.price > ETH_ENTRY_THRESHOLD ? 'READY' : 'WAITING';
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'READY':
        return 'text-green-400';
      case 'WAITING':
        return 'text-yellow-400';
      case 'ERROR':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Live Trading Signals</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Real-time entry signals based on CoinGecko market data and strategy thresholds
        </p>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-400">Error fetching live prices: {error}</span>
            </div>
            <button
              onClick={retry}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* BTC Trading Signal */}
        <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 p-6 rounded-lg border border-yellow-500/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">BTC</h3>
            <p className="text-sm text-gray-300 mb-3">Entry Signal</p>
            <div className={`text-3xl font-bold mb-2 ${getSignalColor(getBTCEntrySignal())}`}>
              {getBTCEntrySignal()}
            </div>
            <p className="text-sm text-white">
              Target: ${BTC_ENTRY_THRESHOLD.toLocaleString()}
            </p>
            {BTC?.price && (
              <p className="text-xs text-gray-400 mt-2">
                Current: ${BTC.price.toLocaleString()}
              </p>
            )}
            {BTC?.change24h !== undefined && (
              <p className={`text-xs mt-1 ${BTC.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                24h: {BTC.change24h >= 0 ? '+' : ''}{BTC.change24h.toFixed(2)}%
              </p>
            )}
          </div>
        </div>

        {/* ETH Trading Signal */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-blue-500/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">ETH</h3>
            <p className="text-sm text-gray-300 mb-3">Entry Signal</p>
            <div className={`text-3xl font-bold mb-2 ${getSignalColor(getETHEntrySignal())}`}>
              {getETHEntrySignal()}
            </div>
            <p className="text-sm text-white">
              Target: ${ETH_ENTRY_THRESHOLD.toLocaleString()}
            </p>
            {ETH?.price && (
              <p className="text-xs text-gray-400 mt-2">
                Current: ${ETH.price.toLocaleString()}
              </p>
            )}
            {ETH?.change24h !== undefined && (
              <p className={`text-xs mt-1 ${ETH.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                24h: {ETH.change24h >= 0 ? '+' : ''}{ETH.change24h.toFixed(2)}%
              </p>
            )}
          </div>
        </div>

        {/* Market Status */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-lg border border-green-500/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-2">Status</h3>
            <p className="text-sm text-gray-300 mb-3">Market Condition</p>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {isLoading ? 'LOADING...' : 'MONITORING'}
            </div>
            <p className="text-sm text-white">Liquidation levels</p>
            <p className="text-xs text-gray-400 mt-2">Strategy active</p>
            {BTC?.lastUpdated && (
              <p className="text-xs text-gray-500 mt-2">
                Updated: {BTC.lastUpdated}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Strategy Details */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-yellow-500 mb-4">Strategy Parameters</h3>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Entry Strategy:</span> 
                <span className="text-yellow-400"> Wait for BTC &gt; ${BTC_ENTRY_THRESHOLD.toLocaleString()} and ETH &gt; ${ETH_ENTRY_THRESHOLD.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Risk Management:</span> 
                <span className="text-orange-400"> 5-10x leverage, 2-3% stop loss</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Profit Strategy:</span> 
                <span className="text-red-400"> 25% take profit, 25% to spot on dips</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Position Sizing:</span> 
                <span className="text-green-400"> Dynamic based on portfolio (10% max per position)</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-white">Additional Assets:</span> 
                <span className="text-blue-400"> SOL & SUI for higher ATH potential</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
            <div className="text-4xl font-bold text-yellow-400 mb-2">🔥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Live Trading Dashboard</h3>
            <p className="text-gray-300 text-sm">
              Monitor liquidation levels, manage positions, and track performance in real-time
            </p>
            <div className="mt-4 text-xs text-gray-400">
              Data: Live from CoinGecko
            </div>
            {isLoading && (
              <div className="mt-2 text-xs text-yellow-400">
                Refreshing prices every 30s...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
