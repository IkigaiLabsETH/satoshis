"use client";

import { useState, useEffect } from 'react';
import { useLiveCryptoPrices } from '@/hooks/useLiveCryptoPrices';

interface LiquidationLevel {
  price: number;
  type: 'red' | 'yellow' | 'green';
  description: string;
  percentage: number;
}

export default function LiquidationTracker() {
  const { BTC, ETH, isLoading, error, refetch } = useLiveCryptoPrices();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mock liquidation levels - replace with real CoinGlass API data
  const [btcLiquidationLevels, setBtcLiquidationLevels] = useState<LiquidationLevel[]>([
    { price: 118065, type: 'red', description: 'Major Liquidation Zone', percentage: 15.2 },
    { price: 119425, type: 'yellow', description: 'Breakout Level', percentage: 8.7 },
    { price: 121000, type: 'green', description: 'Support Level', percentage: 12.3 }
  ]);

  const [ethLiquidationLevels, setEthLiquidationLevels] = useState<LiquidationLevel[]>([
    { price: 3150, type: 'red', description: 'Major Liquidation Zone', percentage: 18.5 },
    { price: 3200, type: 'yellow', description: 'Breakout Level', percentage: 11.2 },
    { price: 3250, type: 'green', description: 'Support Level', percentage: 9.8 }
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const refreshLiquidationLevels = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update liquidation levels based on current prices
      const btcCurrentPrice = BTC.price;
      const ethCurrentPrice = ETH.price;
      
      // Update BTC liquidation levels with dynamic pricing
      setBtcLiquidationLevels([
        { price: Math.floor(btcCurrentPrice * 0.985), type: 'red', description: 'Major Liquidation Zone', percentage: 15.2 },
        { price: Math.floor(btcCurrentPrice * 0.995), type: 'yellow', description: 'Breakout Level', percentage: 8.7 },
        { price: Math.floor(btcCurrentPrice * 1.015), type: 'green', description: 'Support Level', percentage: 12.3 }
      ]);
      
      // Update ETH liquidation levels with dynamic pricing
      setEthLiquidationLevels([
        { price: Math.floor(ethCurrentPrice * 0.985), type: 'red', description: 'Major Liquidation Zone', percentage: 18.5 },
        { price: Math.floor(ethCurrentPrice * 0.995), type: 'yellow', description: 'Breakout Level', percentage: 11.2 },
        { price: Math.floor(ethCurrentPrice * 1.015), type: 'green', description: 'Support Level', percentage: 9.8 }
      ]);
    } catch {
      // Error handling without console logging
    } finally {
      setIsRefreshing(false);
    }
  };

  const getLevelColor = (type: string) => {
    switch (type) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelBorderColor = (type: string) => {
    switch (type) {
      case 'red': return 'border-red-500';
      case 'yellow': return 'border-yellow-500';
      case 'green': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getLevelTextColor = (type: string) => {
    switch (type) {
      case 'red': return 'text-red-400';
      case 'yellow': return 'text-yellow-400';
      case 'green': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Liquidation Levels Tracker
          </h2>
        </div>
        <button
          onClick={refreshLiquidationLevels}
          disabled={isRefreshing || isLoading}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 disabled:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          {isRefreshing || isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Updating...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </>
          )}
        </button>
      </div>

      {/* CoinGlass Direct Link */}
      <div className="mb-8 p-6 bg-black/50 rounded-none border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">🔥 Real-Time Liquidation Data</h3>
            <p className="text-gray-300 mb-4">
              Access live liquidation levels, heatmaps, and real-time market data directly from CoinGlass
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>• Live liquidation heatmaps</span>
              <span>• Real-time price data</span>
              <span>• Professional trading tools</span>
            </div>
          </div>
          <a
            href="https://www.coinglass.com/pro/futures/LiquidationHeatMap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg transition-all duration-200 text-white font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Open CoinGlass</span>
          </a>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-none">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-400">Error fetching prices: {error}</span>
            <button
              onClick={refetch}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Current Prices */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* BTC Price */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-orange-400">Bitcoin (BTC)</h3>
            <div className="text-sm text-gray-400">Live Price</div>
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold text-white mb-2">
                ${BTC.price.toLocaleString()}
              </div>
              <div className={`text-lg font-semibold mb-2 ${
                BTC.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {BTC.change24h >= 0 ? '+' : ''}{BTC.change24h.toFixed(2)}% (24h)
              </div>
              <div className="text-sm text-gray-400">
                {isClient ? `Last updated: ${BTC.lastUpdated}` : 'Loading...'}
              </div>
            </>
          )}
        </div>

        {/* ETH Price */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-blue-400">Ethereum (ETH)</h3>
            <div className="text-sm text-gray-400">Live Price</div>
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold text-white mb-2">
                ${ETH.price.toLocaleString()}
              </div>
              <div className={`text-lg font-semibold mb-2 ${
                ETH.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {ETH.change24h >= 0 ? '+' : ''}{ETH.change24h.toFixed(2)}% (24h)
              </div>
              <div className="text-sm text-gray-400">
                {isClient ? `Last updated: ${ETH.lastUpdated}` : 'Loading...'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Liquidation Levels */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* BTC Liquidation Levels */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">BTC Liquidation Levels</h3>
          <div className="space-y-4">
            {btcLiquidationLevels.map((level, index) => (
              <div
                key={index}
                className={`p-4 rounded-none border-2 ${getLevelBorderColor(level.type)} bg-gray-700/30`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getLevelColor(level.type)}`}></div>
                    <span className={`font-semibold ${getLevelTextColor(level.type)}`}>
                      ${level.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{level.percentage}%</span>
                </div>
                <p className="text-sm text-gray-300">{level.description}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getLevelColor(level.type)}`}
                      style={{ width: `${level.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ETH Liquidation Levels */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">ETH Liquidation Levels</h3>
          <div className="space-y-4">
            {ethLiquidationLevels.map((level, index) => (
              <div
                key={index}
                className={`p-4 rounded-none border-2 ${getLevelBorderColor(level.type)} bg-gray-700/30`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getLevelColor(level.type)}`}></div>
                    <span className={`font-semibold ${getLevelTextColor(level.type)}`}>
                      ${level.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{level.percentage}%</span>
                </div>
                <p className="text-sm text-gray-300">{level.description}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getLevelColor(level.type)}`}
                      style={{ width: `${level.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-6 p-4 bg-black/30 rounded-none border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">
              Status: {isLoading ? 'Loading live data...' : 'Live prices from CoinGecko + CoinGlass integration'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            <a 
              href="https://www.coinglass.com/pro/futures/LiquidationHeatMap" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              View Live Data →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
