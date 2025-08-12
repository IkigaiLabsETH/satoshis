"use client";

import TradingStrategy from '@/components/hyperliquid/TradingStrategy';
import LiquidationTracker from '@/components/hyperliquid/LiquidationTracker';
import PositionManager from '@/components/hyperliquid/PositionManager';
import TradingChart from '@/components/hyperliquid/TradingChart';
import LiveMetrics from '@/components/hyperliquid/LiveMetrics';

export default function HyperliquidTradePage() {
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
            <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border-2 border-yellow-500 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">🎯 Core Trading Strategy</h2>
                <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/30">
                  <p className="text-xl text-white leading-relaxed mb-4">
                    <span className="text-yellow-400 font-bold">Follow liquidation levels long when the red and yellow lines are cleared.</span> 
                    Set stop losses (don&apos;t be me) and take profit at 25%. 
                    <span className="text-green-400 font-bold"> Rinse-repeat and put the 25% profit into spot on the dip.</span>
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Liquidation Level Breakouts</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Risk Management</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Profit Recycling</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Overview Card */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] mb-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-yellow-500 mb-4">Trading Strategy Overview</h2>
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-white">Entry Strategy:</span> Wait for BTC &gt; $119,425 and ETH &gt; $3,200
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-white">Risk Management:</span> 5-10x leverage, 2-3% stop loss
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-white">Profit Strategy:</span> 25% take profit, 25% to spot on dips
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-white">Position Sizing:</span> BTC (0.018403), ETH (0.5) with margin management
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
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
}
