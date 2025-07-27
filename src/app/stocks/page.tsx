"use client";

import StockMarket from "@/components/StockMarket";
import CryptoRelatedStocks from "@/components/stocks/CryptoRelatedStocks";
import InnovatingEquities from "@/components/stocks/InnovatingEquities";
import HighGrowthWatchlist from "@/components/stocks/HighGrowthWatchlist";
import BitcoinMiningSector from "@/components/stocks/BitcoinMiningSector";
import NuclearEnergyStocks from "@/components/stocks/NuclearEnergyStocks";

export default function StocksPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">
              Crypto-Related Equities
            </p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Tickers to Explore
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">
                Analysis for 2025
              </p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

          <div className="relative w-full mx-auto -mt-8">
            <StockMarket />
          </div>

          {/* Nominal vs Real Returns Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm font-light font-satoshi">
                Market Analysis
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-satoshi">
                The Hidden Truth About Stock Returns
              </h2>
              <p className="text-lg text-white/70 font-light font-satoshi">
                Understanding Nominal vs Real Returns
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-yellow-400 font-satoshi">
                  The Zimbabwe Lesson
                </h3>
                <div className="space-y-4">
                  <div className="bg-black/30 p-4 rounded border border-yellow-500/20">
                    <p className="text-sm text-yellow-500/80 mb-2 font-satoshi">Stock Market Returns (ZWL)</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>2020: 103%</span>
                      <span>2021: 312%</span>
                      <span>2022: 87%</span>
                      <span>2023: 449%</span>
                      <span className="text-yellow-400 font-semibold">2024: 903%</span>
                    </div>
                  </div>
                  <div className="bg-black/30 p-4 rounded border border-red-500/20">
                    <p className="text-sm text-red-500/80 mb-2 font-satoshi">M2 Money Supply Growth</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>2020: 475%</span>
                      <span>2021: 131%</span>
                      <span>2022: 250%</span>
                      <span>2023: 710%</span>
                      <span className="text-red-400 font-semibold">2024: 692%</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-sm font-satoshi">
                  The &ldquo;returns&rdquo; are primarily currency devaluation, not actual wealth creation.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-yellow-400 font-satoshi">
                  The US Market Reality
                </h3>
                <div className="space-y-4">
                  <div className="bg-black/30 p-4 rounded border border-blue-500/20">
                    <p className="text-sm text-blue-500/80 mb-2 font-satoshi">S&P 500 (2004-2020)</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>USD Returns:</span>
                        <span className="text-blue-400 font-semibold">7.8% CAGR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gold Returns:</span>
                        <span className="text-gray-400">Nearly Flat</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Money Supply Growth:</span>
                        <span className="text-yellow-400 font-semibold">7.33% CAGR</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-sm font-satoshi">
                  Most stock market gains are monetary illusion, not real wealth creation.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-black/40 rounded border border-yellow-500/30">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3 font-satoshi">
                Key Takeaway
              </h4>
              <p className="text-white/80 text-sm leading-relaxed font-satoshi">
                When analyzing any market, always distinguish between nominal returns (what you see) and real returns (inflation-adjusted). 
                True investment success comes from assets that outperform money supply growth, not from riding the wave of currency debasement. 
                This is why hard assets like Bitcoin, real estate, and commodities become increasingly attractive during periods of monetary expansion.
              </p>
            </div>
          </div>
        
          <CryptoRelatedStocks />
          
          <NuclearEnergyStocks />
          
          <InnovatingEquities />
          
          <HighGrowthWatchlist />
          
          <BitcoinMiningSector />

        </div>
      </div>
    </div>
  );
}