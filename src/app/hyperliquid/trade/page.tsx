"use client";

import TradingStrategy from '@/components/hyperliquid/TradingStrategy';
import LiquidationTracker from '@/components/hyperliquid/LiquidationTracker';
import PositionManager from '@/components/hyperliquid/PositionManager';
import TradingChart from '@/components/hyperliquid/TradingChart';
import LiveMetrics from '@/components/hyperliquid/LiveMetrics';
import LiveTradingSignals from '@/components/hyperliquid/LiveTradingSignals';
import CoinGlassLiquidationModal from '@/components/hyperliquid/CoinGlassLiquidationModal';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function HyperliquidTradePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLiquidationModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black">
          <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
              <a href="/" className="hover:text-white transition-colors duration-200">
                Home
              </a>
              <span>/</span>
              <a href="/hyperliquid" className="hover:text-white transition-colors duration-200">
                Hyperliquid
              </a>
              <span>/</span>
              <span className="text-yellow-400">Trading Strategy</span>
            </nav>

            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                  Hyperliquid Trading
                </h1>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Professional perpetuals trading strategy with real-time liquidation monitoring,
                risk management, and position tracking for BTC and ETH
              </p>
            </div>

            {/* Core Strategy Statement */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">🎯 Core Trading Strategy</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Professional perpetuals trading approach with liquidation level analysis,
                  risk management, and profit optimization strategies
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <p className="text-xl text-white leading-relaxed mb-6">
                  <span className="text-yellow-400 font-bold">Follow liquidation levels long when the red and yellow lines are cleared.</span> 
                  Set stop losses (don&apos;t be me) and take profit at 25%. 
                  <span className="text-green-400 font-bold"> Rinse-repeat and put the 25% profit into spot on the dip.</span>
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-300 text-sm leading-relaxed">
                      <span className="font-semibold">Personal Philosophy:</span> I&apos;m of the same camp as Marty and the only long rn. The market is too hot and I&apos;m also trading SOL and SUI. I know they are destined for higher ATH (when, idk). So when the high leveraged longs get liquidated as they come down (follow Marty&apos;s liquidation chart), and the reds, yellow and sometimes blue lines get cleared- that&apos;s when Binance seems to allow the price to pump again.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 text-sm leading-relaxed">
                      <span className="font-semibold">Advanced Strategy Guidance:</span> Keep a spreadsheet of your trades and review monthly to the high timeframe chart. Make revisions to position size and leverage, practice taking 80% profit at 25%+ and leave the 20% in for further upside in a bull market. The more bullish the more you leave, always take 50% profit at 25%. Build your bags with almost zero risk. Just takes time and hard work - patience and discipline, the ninja skills in trading.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-300 mb-6">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Liquidation Level Breakouts</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Risk Management</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Profit Recycling</span>
                </div>
                
                <button
                  onClick={openLiquidationModal}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg transition-all duration-200 text-white font-semibold flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span>Open Liquidation Heatmap</span>
                </button>
              </div>
            </div>

            {/* Live Trading Signals */}
            <LiveTradingSignals />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Trading Strategy */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Trading Strategy</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive overview of our perpetuals trading approach with entry points,
                risk management, and profit strategies
              </p>
            </div>
            <TradingStrategy />
          </section>

          {/* Liquidation Tracker */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Liquidation Levels</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real-time monitoring of liquidation zones with direct access to CoinGlass
                professional liquidation heatmaps
              </p>
            </div>
            <LiquidationTracker />
          </section>

          {/* Position Manager */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Position Management</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Track entry/exit points, manage risk levels, and monitor position performance
                with real-time updates
              </p>
            </div>
            <PositionManager />
          </section>

          {/* Trading Chart */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Price Charts</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Visualize price action with liquidation levels, trading signals, and
                professional charting tools from CoinGlass
              </p>
            </div>
            <TradingChart />
          </section>

          {/* Live Metrics */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Live Metrics</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real-time account overview, margin status, and market conditions
                for informed trading decisions
              </p>
            </div>
            <LiveMetrics />
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-[#1c1f26] p-12 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Trade?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Access professional liquidation data, advanced charting tools, and real-time
                market analytics to execute your trading strategy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.coinglass.com/pro/futures/LiquidationHeatMap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 rounded-xl transition-all duration-200 text-white font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  🔥 Open CoinGlass Pro
                </a>
                <a
                  href="/hyperliquid"
                  className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-200 text-white font-semibold text-lg"
                >
                  ← Back to Hyperliquid
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-gray-400">
              Trading involves substantial risk of loss. This dashboard is for educational and
              informational purposes only. Always consult with a financial advisor before trading.
            </p>
          </div>
        </div>
      </footer>

      {/* CoinGlass Liquidation Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CoinGlassLiquidationModal />
      </Modal>
    </div>
  );
}
