"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamic imports for Vercel compatibility
const LiveTradingSignals = dynamic(() => import('@/components/hyperliquid/LiveTradingSignals'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Live Trading Signals</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Loading trading signals...
        </p>
      </div>
    </div>
  )
});

const TradingStrategy = dynamic(() => import('@/components/hyperliquid/TradingStrategy'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Trading Strategy</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Loading strategy component...
        </p>
      </div>
    </div>
  )
});

const LiquidationTracker = dynamic(() => import('@/components/hyperliquid/LiquidationTracker'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Liquidation Tracker</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Loading liquidation tracker...
        </p>
      </div>
    </div>
  )
});

const PositionManager = dynamic(() => import('@/components/hyperliquid/PositionManager'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Position Manager</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Loading position manager...
        </p>
      </div>
    </div>
  )
});

const LiveMetrics = dynamic(() => import('@/components/hyperliquid/LiveMetrics'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Live Metrics</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Loading live metrics...
        </p>
      </div>
    </div>
  )
});

const TradingChart = dynamic(() => import('@/components/hyperliquid/TradingChart'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)] mb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Trading Chart</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Loading trading chart...
        </p>
      </div>
    </div>
  )
});

const Modal = dynamic(() => import('@/components/Modal'), {
  ssr: false
});

export default function HyperliquidTradePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const _openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Clear Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent mb-8">
              $1000/Day PnL Model
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Trading ETH/BTC on Hyperliquid with 7x leverage
            </p>
            
            {/* Liquidation Modal Button */}
            <div className="mt-8">
              <button
                onClick={_openModal}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl transition-all duration-200 text-white font-bold text-lg shadow-lg hover:shadow-xl border-2 border-yellow-500/50 hover:border-yellow-500"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔥</span>
                  <span>Liquidation Heatmap</span>
                </div>
              </button>
            </div>
          </div>

          {/* Core Strategy - Crystal Clear */}
          <div className="bg-gradient-to-br from-[#1c1f26] to-[#2a2f3a] p-10 rounded-2xl border-2 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] mb-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-yellow-500 mb-8">The Model</h2>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {/* Left Column - Strategy */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Strategy</h3>
                  <div className="space-y-4 text-gray-300">
                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                      <span className="text-yellow-400 font-bold">Entry:</span> Long ETH/BTC when liquidation levels clear
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <span className="text-green-400 font-bold">Exit:</span> 25% take profit, 25% stop loss
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <span className="text-blue-400 font-bold">Leverage:</span> 7x max
                    </div>
                  </div>
                </div>

                {/* Right Column - Why ETH */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Why ETH?</h3>
                  <div className="space-y-4 text-gray-300">
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <span className="text-purple-400 font-bold">$BMNR:</span> $20.5B dry powder = 4.5M ETH
                    </div>
                    <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                      <span className="text-orange-400 font-bold">$ATNF:</span> 82K ETH + $238M cash
                    </div>
                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                      <span className="text-red-400 font-bold">Peter Thiel:</span> Invested in both
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Example */}
              <div className="mt-12 bg-black/60 p-8 rounded-xl border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Example: $1000/Day PnL</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">$30K</div>
                    <div className="text-gray-300">Portfolio</div>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">7x</div>
                    <div className="text-gray-300">Leverage</div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">$1000</div>
                    <div className="text-gray-300">Daily Target</div>
                  </div>
                </div>
                <div className="mt-6 text-gray-300 text-center">
                  <p>10% daily move × 7x leverage = $2100 potential</p>
                  <p>Target: $1000/day with 25% stop loss protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Trading Signals */}
          <div className="mb-20">
            <LiveTradingSignals />
          </div>

          {/* Main Trading Components - Each on its own line with enhanced spacing */}
          <div className="mb-20">
            <TradingStrategy />
          </div>

          <div className="mb-20">
            <LiquidationTracker onOpenModal={_openModal} />
          </div>

          <div className="mb-20">
            <PositionManager />
          </div>

          <div className="mb-20">
            <LiveMetrics />
          </div>

          {/* Trading Chart */}
          <div className="mb-20">
            <TradingChart />
          </div>

          {/* Enhanced Liquidation Modal with CoinGlass Embed */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="p-8 bg-gradient-to-br from-[#1c1f26] to-[#2a2f3a] rounded-2xl border-2 border-yellow-500 max-w-7xl w-full">
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-yellow-500/20 rounded-full border border-yellow-500/40 mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Live Liquidation Heatmap</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              
              {/* CoinGlass Liquidation Heatmap Embed */}
              <div className="bg-black/50 rounded-xl border border-yellow-500/30 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 border-b border-yellow-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-yellow-400 font-semibold">Real-time Liquidation Data</span>
                    </div>
                    <a 
                      href="https://www.coinglass.com/pro/futures/LiquidationHeatMap" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 underline"
                    >
                      Open in CoinGlass →
                    </a>
                  </div>
                </div>
                
                {/* Embedded CoinGlass Liquidation Heatmap */}
                <div className="w-full h-[600px] bg-black">
                  <iframe
                    src="https://www.coinglass.com/pro/futures/LiquidationHeatMap"
                    className="w-full h-full border-0"
                    title="CoinGlass Liquidation Heatmap"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              
              {/* Strategy Notes */}
              <div className="mt-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">📊 Liquidation Strategy Notes:</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>• <strong>Red Zones:</strong> High liquidation levels - potential reversal points</p>
                  <p>• <strong>Yellow Zones:</strong> Medium liquidation levels - watch for breakouts</p>
                  <p>• <strong>Green Zones:</strong> Low liquidation levels - accumulation opportunities</p>
                  <p>• <strong>Strategy:</strong> Enter long when liquidation levels are cleared (red→yellow→green)</p>
                  <p>• <strong>Risk Management:</strong> Use 25% stop loss and 25% take profit with 7x leverage</p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
