'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Year2030Page() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                2030
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-epilogue">
                Bitcoin&apos;s Decade of Dominance
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                A speculative journey into Bitcoin&apos;s potential future and the evolution of digital assets
              </p>
            </div>
          </div>

          {/* Bitcoin 2030 Projections */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🚀 Bitcoin 2030 Projections
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Price Targets</h4>
                  <div className="space-y-3 text-white/90">
                    <div className="flex justify-between">
                      <span>Conservative:</span>
                      <span className="text-yellow-400 font-bold">$420K - $690K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moderate:</span>
                      <span className="text-yellow-400 font-bold">$690K - $1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimistic:</span>
                      <span className="text-yellow-400 font-bold">$1.2M - $2.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parabolic:</span>
                      <span className="text-yellow-400 font-bold">$2.5M+</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Evolution</h4>
                  <ul className="space-y-3 text-white/90">
                    <li>• Institutional adoption reaches 80%+</li>
                    <li>• Bitcoin becomes global reserve asset</li>
                    <li>• Lightning Network processes 1M+ TPS</li>
                    <li>• CBDCs integrate with Bitcoin rails</li>
                    <li>• Mining becomes 100% renewable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Evolution */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              ⚡ Technology Evolution
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-lg font-bold text-yellow-500 mb-3">Layer 2 Solutions</h4>
                <p className="text-white/80 text-sm">
                  Lightning Network, Liquid, and emerging L2s handle 95% of daily transactions, 
                  making Bitcoin the fastest and cheapest payment network globally.
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-lg font-bold text-yellow-500 mb-3">AI Integration</h4>
                <p className="text-white/80 text-sm">
                  AI-powered trading, custody solutions, and market analysis become standard, 
                  with Bitcoin serving as the foundation for decentralized AI networks.
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-lg font-bold text-yellow-500 mb-3">Quantum Resistance</h4>
                <p className="text-white/80 text-sm">
                  Bitcoin implements quantum-resistant cryptography, ensuring security 
                  against future quantum computing threats while maintaining decentralization.
                </p>
              </div>
            </div>
          </div>

          {/* Global Impact */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🌍 Global Impact
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Financial System</h4>
                  <ul className="space-y-2 text-white/90">
                    <li>• Bitcoin replaces gold as primary reserve asset</li>
                    <li>• Central banks hold Bitcoin reserves</li>
                    <li>• Cross-border payments become instant and free</li>
                    <li>• Remittance industry revolutionized</li>
                    <li>• Banking becomes optional for most people</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Societal Changes</h4>
                  <ul className="space-y-2 text-white/90">
                    <li>• Financial inclusion reaches 95% globally</li>
                    <li>• Inflation becomes a choice, not inevitability</li>
                    <li>• Energy markets align with Bitcoin mining</li>
                    <li>• Privacy and sovereignty restored to individuals</li>
                    <li>• New economic models emerge</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Strategy */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              💎 2030 Investment Strategy
            </h3>
            <div className="space-y-6">
              <div className="bg-yellow-500/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Long-term Positioning</h4>
                <p className="text-white/90 mb-4">
                  By 2030, Bitcoin will likely be the most important asset in your portfolio. 
                  The key is maintaining conviction through volatility and continuing to accumulate 
                  during bear markets while taking profits during bull runs.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-black/50 p-4 rounded border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-bold mb-2">Accumulation Phase</h5>
                    <p className="text-white/80 text-sm">
                      Continue stacking sats during bear markets. By 2030, 
                      your 2024-2025 accumulation will look like genius.
                    </p>
                  </div>
                  <div className="bg-black/50 p-4 rounded border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-bold mb-2">Distribution Phase</h5>
                    <p className="text-white/80 text-sm">
                      Take profits strategically during bull markets. 
                      Consider selling 5-10% at each major resistance level.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Link href="/bitcoin-cycles">
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                ← Bitcoin Cycles
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 