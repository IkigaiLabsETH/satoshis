"use client";

import ThesisSection from '@/components/hyperliquid/ThesisSection';
import OverviewSection from '@/components/hyperliquid/OverviewSection';
import KeyFeatures from '@/components/hyperliquid/KeyFeatures';
import StrengthsSection from '@/components/hyperliquid/StrengthsSection';
import PlatformComparison from '@/components/hyperliquid/PlatformComparison';
import EcosystemSection from '@/components/hyperliquid/EcosystemSection';
import FarmingSection from '@/components/hyperliquid/FarmingSection';
import CautionaryTale from '@/components/hyperliquid/CautionaryTale';
import ValuationSection from '@/components/hyperliquid/ValuationSection';
import CTASection from '@/components/hyperliquid/CTASection';

export default function HyperliquidPage() {
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
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                  Hyperliquid
                </h1>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Revolutionary perpetuals trading platform with zero fees, 
                advanced order types, and institutional-grade infrastructure
              </p>
            </div>

            {/* Trading Strategy CTA */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-yellow-500/30 rounded-2xl p-8 mb-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-yellow-400 mb-4">🔥 Live Trading Strategy</h2>
                  <p className="text-xl text-gray-300 mb-6">
                    Access our comprehensive perpetuals trading strategy with real-time liquidation monitoring, 
                    risk management, and position tracking for BTC and ETH
                  </p>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Entry Strategy: BTC &gt; $119,425, ETH &gt; $3,200</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Risk Management: 5-10x leverage, 2-3% stop loss</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Profit Strategy: 25% take profit, 25% to spot on dips</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-xl p-6 border border-yellow-500/50 mb-6">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">📊</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Trading Dashboard</h3>
                    <p className="text-gray-300 text-sm">
                      Real-time liquidation levels, position management, and professional charting tools
                    </p>
                  </div>
                  <a
                    href="/hyperliquid/trade"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 rounded-xl transition-all duration-200 text-white font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    🚀 Launch Trading Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          <ThesisSection />
          <OverviewSection />
          <KeyFeatures />
          <StrengthsSection />
          <PlatformComparison />
          <EcosystemSection />
          <FarmingSection />
          <CautionaryTale />
          <ValuationSection />
          <CTASection />
        </div>
      </div>
    </div>
  );
}
