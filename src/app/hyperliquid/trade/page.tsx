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
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <div className="inline-block p-3 bg-yellow-500/10 rounded-full border border-yellow-500/30 mb-6">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent mb-8">
              Hyperliquid Trading
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Professional perpetuals trading strategy with real-time liquidation monitoring,
              risk management, and position tracking for BTC and ETH
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-400">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Live Data</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Real-time</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Professional</span>
              </div>
            </div>
          </div>

          {/* Enhanced Core Strategy Statement */}
          <div className="bg-gradient-to-br from-[#1c1f26] to-[#2a2f3a] p-10 rounded-2xl border-2 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] mb-20">
            <div className="text-center">
              <div className="inline-block p-4 bg-yellow-500/20 rounded-full border border-yellow-500/40 mb-8">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-5xl font-bold text-white mb-8">Core Trading Strategy</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Professional perpetuals trading approach with liquidation level analysis,
                risk management, and profit optimization strategies
              </p>
              
              <div className="bg-gradient-to-br from-black/60 to-gray-900/60 p-8 rounded-xl border border-yellow-500/30 mt-12">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <h3 className="text-3xl font-bold text-yellow-400">Trading Philosophy</h3>
                      <div className="ml-4 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></div>
                    </div>
                    <div className="space-y-4 text-gray-300 max-w-2xl mx-auto">
                      <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-lg">
                          <span className="text-yellow-400 font-bold">Follow liquidation levels long</span> when the red and yellow lines are cleared
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-lg">
                          <span className="text-green-400 font-bold">Set stop losses</span> (don&apos;t be me) and take profit at 25%
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-lg">
                          <span className="text-blue-400 font-bold">Rinse-repeat</span> and put the 25% profit into spot on the dip
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <h3 className="text-3xl font-bold text-yellow-400">Risk Management</h3>
                      <div className="ml-4 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></div>
                    </div>
                    <div className="space-y-4 text-gray-300 max-w-2xl mx-auto">
                      <div className="flex items-start space-x-4 p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-lg">
                          <span className="text-red-400 font-bold">Never risk more than 2%</span> of your portfolio on any single trade
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-lg">
                          <span className="text-orange-400 font-bold">Use proper position sizing</span> based on account balance and volatility
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-lg">
                          <span className="text-purple-400 font-bold">Monitor funding rates</span> and adjust positions accordingly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Trading Signals */}
          <div className="mb-20">
            <LiveTradingSignals />
          </div>

          {/* Enhanced Strategy Overview Card */}
          <div className="bg-gradient-to-br from-[#1c1f26] to-[#2a2f3a] p-10 rounded-2xl border-2 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] mb-20">
            <div className="space-y-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-yellow-500 mb-4">Trading Strategy Overview</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Strategy Parameters</h3>
                  <div className="space-y-4 text-gray-300 max-w-3xl mx-auto">
                    <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-lg">
                        <span className="font-semibold text-white">Entry Strategy:</span> Wait for BTC {'>'} $119,425 and ETH {'>'} $4,500
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-lg">
                        <span className="font-semibold text-white">Exit Strategy:</span> Take profit at 25% gains, stop loss at 15% loss
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-lg">
                        <span className="font-semibold text-white">Position Sizing:</span> 2% max risk per trade, scale in on dips
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-8 rounded-xl border border-yellow-500/30">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Current Market Status</h3>
                  <div className="space-y-4 text-lg max-w-md mx-auto">
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-300">BTC Entry Signal:</span>
                      <span className="text-yellow-400 font-bold text-xl">WAITING</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-300">ETH Entry Signal:</span>
                      <span className="text-yellow-400 font-bold text-xl">WAITING</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-300">Market Trend:</span>
                      <span className="text-green-400 font-bold text-xl">BULLISH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Trading Components - Each on its own line with enhanced spacing */}
          <div className="mb-20">
            <TradingStrategy />
          </div>

          <div className="mb-20">
            <LiquidationTracker />
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

          {/* Enhanced Liquidation Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="p-8 bg-gradient-to-br from-[#1c1f26] to-[#2a2f3a] rounded-2xl border-2 border-yellow-500">
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-yellow-500/20 rounded-full border border-yellow-500/40 mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Liquidation Analysis</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Monitor liquidation levels and market conditions for optimal entry points.
              </p>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
                <p className="text-yellow-300 text-base leading-relaxed">
                  <span className="font-semibold">Strategy:</span> Wait for liquidation level breakouts 
                  when red and yellow lines are cleared for optimal long entries.
                </p>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
