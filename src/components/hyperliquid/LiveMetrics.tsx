"use client";

import { useState, useEffect } from 'react';
import { useLiveCryptoPrices } from '@/hooks/useLiveCryptoPrices';

interface Metrics {
  totalEquity: number;
  availableMargin: number;
  usedMargin: number;
  marginRatio: number;
  fundingRate: number;
  openInterest: number;
}

export default function LiveMetrics() {
  const { BTC, ETH, isLoading, error } = useLiveCryptoPrices();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mock metrics data - Updated to match realistic calculations
  const metrics: Metrics = {
    totalEquity: 30000,
    availableMargin: 9000, // 30% of portfolio (30000 * 0.30)
    usedMargin: 21000, // 70% of portfolio (30000 * 0.70)
    marginRatio: 70.0, // 70% allocated
    fundingRate: 0.0125,
    openInterest: 1250000
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const refreshMetrics = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Live Trading Metrics
          </h2>
        </div>
        <button
          onClick={refreshMetrics}
          disabled={isRefreshing || isLoading}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-2"
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

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-none">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-400">Error fetching live prices: {error}</span>
          </div>
        </div>
      )}

      {/* Live Price Status */}
      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400">
              {isLoading ? 'Loading live prices from CoinGecko...' : 'Live prices from CoinGecko API'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Auto-refresh every 30s
          </div>
        </div>
      </div>

      {/* CoinGlass Integration */}
      <div className="mb-8 p-6 bg-black/50 rounded-none border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">📊 Enhanced Market Data</h3>
            <p className="text-gray-300 mb-4">
              Access real-time liquidation data, funding rates, and market analytics from CoinGlass
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>• Live liquidation heatmaps</span>
              <span>• Real-time funding rates</span>
              <span>• Market sentiment data</span>
            </div>
          </div>
          <a
            href="https://www.coinglass.com/pro/futures/LiquidationHeatMap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200 text-white font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Open CoinGlass</span>
          </a>
        </div>
      </div>

      {/* Account Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Equity</h3>
          <div className="text-3xl font-bold text-white mb-1">${metrics.totalEquity.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Available for trading</div>
        </div>
        
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Available Margin</h3>
          <div className="text-3xl font-bold text-green-400 mb-1">${metrics.availableMargin.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Ready to deploy</div>
        </div>
        
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Used Margin</h3>
          <div className="text-3xl font-bold text-orange-400 mb-1">${metrics.usedMargin.toFixed(2)}</div>
          <div className="text-sm text-gray-400">Currently deployed</div>
        </div>
      </div>

      {/* Market Prices */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* BTC Price */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-orange-400">Bitcoin (BTC)</h3>
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              BTC.change24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                `${BTC.change24h >= 0 ? '+' : ''}${BTC.change24h.toFixed(2)}%`
              )}
            </div>
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
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              ETH.change24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                `${ETH.change24h >= 0 ? '+' : ''}${ETH.change24h.toFixed(2)}%`
              )}
            </div>
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
              <div className="text-sm text-gray-400">
                {isClient ? `Last updated: ${ETH.lastUpdated}` : 'Loading...'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Market Conditions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Funding Rate */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Funding Rate</h3>
          <div className={`text-3xl font-bold mb-1 ${
            metrics.fundingRate >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {metrics.fundingRate >= 0 ? '+' : ''}{(metrics.fundingRate * 100).toFixed(4)}%
          </div>
          <div className="text-sm text-gray-400">
            {metrics.fundingRate >= 0 ? 'Longs pay shorts' : 'Shorts pay longs'}
          </div>
          <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
            <div className="text-xs text-yellow-400">
              <strong>Strategy:</strong> {metrics.fundingRate >= 0 ? 'Consider short positions' : 'Consider long positions'}
            </div>
          </div>
        </div>

        {/* Open Interest */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Open Interest</h3>
          <div className="text-3xl font-bold text-white mb-1">
            ${(metrics.openInterest / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-400">Total market exposure</div>
          <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded-none">
            <div className="text-xs text-blue-400">
              <strong>Market:</strong> High liquidity available
            </div>
          </div>
        </div>
      </div>

      {/* Margin Status */}
      <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Margin Status</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-yellow-400 mb-3">Current Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Margin Ratio:</span>
                <span className={`font-semibold ${
                  metrics.marginRatio > 50 ? 'text-green-400' : 
                  metrics.marginRatio > 30 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {metrics.marginRatio.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Risk Level:</span>
                <span className={`font-semibold ${
                  metrics.marginRatio > 50 ? 'text-green-400' : 
                  metrics.marginRatio > 30 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {metrics.marginRatio > 50 ? 'LOW' : 
                   metrics.marginRatio > 30 ? 'MEDIUM' : 'HIGH'}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-yellow-400 mb-3">Risk Management</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Safe Zone:</span>
                <span className="text-green-400 font-semibold">&gt; 50%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Warning Zone:</span>
                <span className="text-yellow-400 font-semibold">30-50%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Danger Zone:</span>
                <span className="text-red-400 font-semibold">&lt; 30%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Current: {metrics.marginRatio.toFixed(1)}%</span>
            <span>Target: &gt; 50%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                metrics.marginRatio > 50 ? 'bg-green-500' : 
                metrics.marginRatio > 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(metrics.marginRatio, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => {/* Add margin logic */}}
          className="p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 text-white font-semibold flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Margin</span>
        </button>
        
        <button
          onClick={() => {/* Withdraw margin logic */}}
          className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-white font-semibold flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Withdraw Margin</span>
        </button>
        
        <button
          onClick={() => {/* Risk check logic */}}
          className="p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors duration-200 text-white font-semibold flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Risk Check</span>
        </button>
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

