"use client";

import { useState } from 'react';
import { useLiveCryptoPrices } from '@/hooks/useLiveCryptoPrices';

export default function PositionManager() {
  const { BTC, ETH, isLoading, error } = useLiveCryptoPrices();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock position data with live prices
  const btcPosition = {
    asset: 'BTC',
    size: 0.018403,
    entryPrice: 119425,
    currentPrice: BTC.price || 119425,
    leverage: 8,
    pnl: BTC.price ? ((BTC.price - 119425) / 119425) * 8 * 0.018403 * BTC.price : 0,
    pnlPercent: BTC.price ? ((BTC.price - 119425) / 119425) * 100 : 0,
    stopLoss: 116897,
    takeProfit: 149281,
    marginUsed: 211.95,
    status: 'pending' as const
  };

  const ethPosition = {
    asset: 'ETH',
    size: 0.5,
    entryPrice: 3200,
    currentPrice: ETH.price || 3200,
    leverage: 8,
    pnl: ETH.price ? ((ETH.price - 3200) / 3200) * 8 * 0.5 * ETH.price : 0,
    pnlPercent: ETH.price ? ((ETH.price - 3200) / 3200) * 100 : 0,
    stopLoss: 3136,
    takeProfit: 4000,
    marginUsed: 200,
    status: 'pending' as const
  };

  // Calculate totals
  const totalEquity = 521.95;
  const totalPnl = btcPosition.pnl + ethPosition.pnl;
  const totalPnlPercent = totalEquity > 0 ? (totalPnl / totalEquity) * 100 : 0;

  const refreshPositions = () => {
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
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Position Manager
          </h2>
        </div>
        <button
          onClick={refreshPositions}
          disabled={isRefreshing || isLoading}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-600 disabled:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-2"
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

      {/* Active Positions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* BTC Position */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-orange-400">Bitcoin (BTC)</h3>
            <span className="px-2 py-1 rounded text-xs font-medium bg-gray-500/20 text-gray-400">
              {btcPosition.status.toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Position Size:</span>
              <span className="text-white font-semibold">{btcPosition.size} BTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Entry Price:</span>
              <span className="text-white font-semibold">${btcPosition.entryPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Price:</span>
              <span className="text-white font-semibold">
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  `$${btcPosition.currentPrice.toLocaleString()}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Leverage:</span>
              <span className="text-white font-semibold">{btcPosition.leverage}x</span>
            </div>
          </div>

          {/* P&L Display */}
          <div className={`p-3 rounded-none border ${
            btcPosition.pnl >= 0 ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Unrealized P&L:</span>
              <span className={`font-bold text-lg ${
                btcPosition.pnl >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {isLoading ? (
                  <span className="animate-pulse">--</span>
                ) : (
                  `${btcPosition.pnl >= 0 ? '+' : ''}$${btcPosition.pnl.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-400">P&L %:</span>
              <span className={`font-semibold ${
                btcPosition.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {isLoading ? (
                  <span className="animate-pulse">--</span>
                ) : (
                  `${btcPosition.pnlPercent >= 0 ? '+' : ''}${btcPosition.pnlPercent.toFixed(2)}%`
                )}
              </span>
            </div>
          </div>

          {/* Risk Management */}
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
            <h4 className="text-yellow-400 font-semibold mb-2">Risk Management</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Stop Loss:</span>
                <span className="text-red-400">${btcPosition.stopLoss.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Take Profit:</span>
                <span className="text-green-400">${btcPosition.takeProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Margin Used:</span>
                <span className="text-white">${btcPosition.marginUsed.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ETH Position */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-blue-400">Ethereum (ETH)</h3>
            <span className="px-2 py-1 rounded text-xs font-medium bg-gray-500/20 text-gray-400">
              {ethPosition.status.toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Position Size:</span>
              <span className="text-white font-semibold">{ethPosition.size} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Entry Price:</span>
              <span className="text-white font-semibold">${ethPosition.entryPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Price:</span>
              <span className="text-white font-semibold">
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  `$${ethPosition.currentPrice.toLocaleString()}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Leverage:</span>
              <span className="text-white font-semibold">{ethPosition.leverage}x</span>
            </div>
          </div>

          {/* P&L Display */}
          <div className={`p-3 rounded-none border ${
            ethPosition.pnl >= 0 ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Unrealized P&L:</span>
              <span className={`font-bold text-lg ${
                ethPosition.pnl >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {isLoading ? (
                  <span className="animate-pulse">--</span>
                ) : (
                  `${ethPosition.pnl >= 0 ? '+' : ''}$${ethPosition.pnl.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-400">P&L %:</span>
              <span className={`font-semibold ${
                ethPosition.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {isLoading ? (
                  <span className="animate-pulse">--</span>
                ) : (
                  `${ethPosition.pnlPercent >= 0 ? '+' : ''}${ethPosition.pnlPercent.toFixed(2)}%`
                )}
              </span>
            </div>
          </div>

          {/* Risk Management */}
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
            <h4 className="text-yellow-400 font-semibold mb-2">Risk Management</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Stop Loss:</span>
                <span className="text-red-400">${ethPosition.stopLoss.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Take Profit:</span>
                <span className="text-green-400">${ethPosition.takeProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Margin Used:</span>
                <span className="text-white">${ethPosition.marginUsed.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Portfolio Summary</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">${totalEquity.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Total Equity</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${
              totalPnl >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                `${totalPnl >= 0 ? '+' : ''}$${totalPnl.toFixed(2)}`
              )}
            </div>
            <div className="text-sm text-gray-400">Total P&L</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${
              totalPnlPercent >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                `${totalPnlPercent >= 0 ? '+' : ''}${totalPnlPercent.toFixed(2)}%`
              )}
            </div>
            <div className="text-sm text-gray-400">Total P&L %</div>
          </div>
        </div>
      </div>

      {/* Position Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => {/* Add position logic */}}
          className="p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 text-white font-semibold flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Open New Position</span>
        </button>
        <button
          onClick={() => {/* Close all positions logic */}}
          className="p-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white font-semibold flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Close All Positions</span>
        </button>
      </div>

      {/* Risk Warnings */}
      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-none">
        <h4 className="text-red-400 font-semibold mb-2">⚠️ Risk Warnings</h4>
        <div className="text-sm text-gray-300 space-y-1">
          <p>• Perpetuals trading involves substantial risk of loss</p>
          <p>• Leverage amplifies both gains and losses</p>
          <p>• Always maintain adequate margin to avoid liquidation</p>
          <p>• Monitor positions regularly and adjust risk management as needed</p>
        </div>
      </div>
    </div>
  );
}
