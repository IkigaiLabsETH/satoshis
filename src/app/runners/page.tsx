"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RunnersPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Crypto Market Survey • Outperformers vs. Bitcoin</p>
            <h1 className="text-center">
              <span className="text-5xl md:text-7xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Runners
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">Survey Note: Outperformers as of July 26, 2025</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

          {/* Key Points Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Key Points</h3>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-200">
              <li>Research suggests <span className="text-yellow-400 font-bold">PENGU</span>, <span className="text-yellow-400 font-bold">ZORA</span>, <span className="text-yellow-400 font-bold">REKT</span>, and <span className="text-yellow-400 font-bold">ENA</span> have outperformed Bitcoin recently, driven by specific market catalysts.</li>
              <li>PENGU&apos;s surge is likely linked to a potential ETF filing, boosting investor interest.</li>
              <li>ZORA&apos;s growth is fueled by exchange listings and its unique content tokenization model.</li>
              <li>REKT appears to benefit from a recent Binance.US listing and strong community engagement.</li>
              <li>ENA&apos;s performance may be supported by a $260 million buyback and partnerships, aligning with stablecoin trends.</li>
            </ul>
          </div>

          {/* Comparative Table */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Comparative Analysis</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-white/90 border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-black/60">
                    <th className="px-4 py-2 text-yellow-400 font-bold">Coin</th>
                    <th className="px-4 py-2 text-yellow-400 font-bold">Performance</th>
                    <th className="px-4 py-2 text-yellow-400 font-bold">FDV (USD)</th>
                    <th className="px-4 py-2 text-yellow-400 font-bold">Key Catalysts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-black/40">
                    <td className="px-4 py-2 font-bold text-yellow-300">PENGU</td>
                    <td className="px-4 py-2">+15%</td>
                    <td className="px-4 py-2">$3.87B</td>
                    <td className="px-4 py-2">SEC acknowledgment of ETF filing, strong community, cultural impact</td>
                  </tr>
                  <tr className="bg-black/30">
                    <td className="px-4 py-2 font-bold text-yellow-300">ZORA</td>
                    <td className="px-4 py-2">+40%</td>
                    <td className="px-4 py-2">$568M</td>
                    <td className="px-4 py-2">Exchange listings, content tokenization, Base chain growth</td>
                  </tr>
                  <tr className="bg-black/40">
                    <td className="px-4 py-2 font-bold text-yellow-300">REKT</td>
                    <td className="px-4 py-2">+19%</td>
                    <td className="px-4 py-2">$369M</td>
                    <td className="px-4 py-2">Binance.US listing, collaborations, community engagement</td>
                  </tr>
                  <tr className="bg-black/30">
                    <td className="px-4 py-2 font-bold text-yellow-300">ENA</td>
                    <td className="px-4 py-2">Strong, not specified</td>
                    <td className="px-4 py-2">Significant buyback/partnerships</td>
                    <td className="px-4 py-2">$260M buyback, Anchorage partnership, stablecoin narrative</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Sections for Each Coin */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* PENGU */}
            <Card className="bg-[#1c1f26] p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="font-epilogue text-2xl text-yellow-400">PENGU: ETF Hopes and Community Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 font-satoshi mb-4">PENGU, the token for Pudgy Penguins, has seen a 15% increase, reaching a fully diluted valuation (FDV) of $3.87 billion. This surge is likely driven by the U.S. Securities and Exchange Commission&apos;s (SEC) acknowledgment of Canary Capital&apos;s ETF filing, which could be the first to hold both tokens and NFTs, attracting significant investment. The Pudgy Penguins project, known for its strong community and cultural impact, has also expanded into merchandise, further supporting its market presence.</p>
                <ul className="list-disc list-inside text-white/70 space-y-1 mb-4">
                  <li>SEC ETF filing acknowledged in July 2025</li>
                  <li>243% monthly rally, $2B trading volume</li>
                  <li>Strong community, whale accumulation</li>
                  <li>Merchandise and NFT floor price up 59%</li>
                </ul>
                <div className="flex flex-col gap-2 mt-2">
                  <Link href="https://coinmarketcap.com/currencies/pudgy-penguins/" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Market Data</Button>
                  </Link>
                  <Link href="https://www.sec.gov/Archives/edgar/data/2059693/000199937125002883/canarypengu-s1_032025.htm" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">SEC Filing</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* ZORA */}
            <Card className="bg-[#1c1f26] p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="font-epilogue text-2xl text-yellow-400">ZORA: Exchange Listings and Platform Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 font-satoshi mb-4">ZORA, a token for the Zora network on the Base chain, has risen 40% to an FDV of $568 million, hitting a new all-time high. Recent listings on exchanges like CoinstoreExc have likely increased trading volume. Its unique feature—tokenizing social media posts into tradable coins—along with the growth of the Base chain, which is seeing increased adoption, seems to be key to its performance.</p>
                <ul className="list-disc list-inside text-white/70 space-y-1 mb-4">
                  <li>+40% price increase, new all-time high</li>
                  <li>Exchange listings (CoinstoreExc, July 2025)</li>
                  <li>Tokenizes posts into ERC-20 coins</li>
                  <li>Riding Base chain adoption</li>
                </ul>
                <div className="flex flex-col gap-2 mt-2">
                  <Link href="https://www.coingecko.com/en/coins/zora" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Market Data</Button>
                  </Link>
                  <Link href="https://x.com/roschamomile/status/1947815664460435499" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Community Insight</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* REKT */}
            <Card className="bg-[#1c1f26] p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="font-epilogue text-2xl text-yellow-400">REKT: Exchange Listing and Brand Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 font-satoshi mb-4">REKT, associated with Rekt Brands Inc., has grown 19% to an FDV of $369 million, also reaching a new all-time high. A recent listing on Binance.US, a major exchange, is likely a major driver, typically boosting visibility and price. Additionally, collaborations and a strong community, including notable holders like Snoop Dogg, appear to sustain its momentum.</p>
                <ul className="list-disc list-inside text-white/70 space-y-1 mb-4">
                  <li>+19% price increase, new all-time high</li>
                  <li>Binance.US listing (July 2025)</li>
                  <li>Brand collaborations, Snoop Dogg as holder</li>
                  <li>12 consecutive all-time highs</li>
                </ul>
                <div className="flex flex-col gap-2 mt-2">
                  <Link href="https://coinmarketcap.com/currencies/rekt-eth/" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Market Data</Button>
                  </Link>
                  <Link href="https://www.tradingview.com/news/coinmarketcal:69cd5c748094b:0-rekt-rekt-binance-us-listing-24-jul-2025/" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Listing News</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* ENA */}
            <Card className="bg-[#1c1f26] p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="font-epilogue text-2xl text-yellow-400">ENA: Buyback and Stablecoin Narrative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 font-satoshi mb-4">ENA, the governance token for Ethena, a synthetic dollar protocol, is noted in the context of stablecoins on Ethereum. While specific performance data isn&apos;t provided, recent developments like a $260 million buyback program and a partnership with Anchorage Digital for a U.S.-compliant stablecoin suggest strong growth potential, aligning with the rising interest in stablecoins and DeFi.</p>
                <ul className="list-disc list-inside text-white/70 space-y-1 mb-4">
                  <li>$260M buyback program (July 2025)</li>
                  <li>Anchorage Digital partnership for USDtb</li>
                  <li>15.7% price jump on partnership news</li>
                  <li>Strong DeFi and stablecoin narrative</li>
                </ul>
                <div className="flex flex-col gap-2 mt-2">
                  <Link href="https://coinmarketcap.com/currencies/ethena/" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Market Data</Button>
                  </Link>
                  <Link href="https://bitcoinethereumnews.com/finance/ethena-launches-260m-ena-buyback-through-new-treasury-arm/" target="_blank">
                    <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Buyback News</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Survey Note Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Survey Note: Detailed Analysis</h3>
            <p className="text-base md:text-lg text-white/80 font-satoshi mb-4 leading-relaxed">
              This survey note provides an in-depth examination of the cryptocurrencies <span className="text-yellow-400 font-bold">PENGU</span>, <span className="text-yellow-400 font-bold">ZORA</span>, <span className="text-yellow-400 font-bold">REKT</span>, and <span className="text-yellow-400 font-bold">ENA</span>, which have recently outperformed Bitcoin, as of 03:54 PM CEST on Saturday, July 26, 2025. Each coin&apos;s performance is analyzed through market data, recent developments, and community sentiment, offering a comprehensive understanding of the factors driving their success.
            </p>
            <p className="text-base md:text-lg text-white/80 font-satoshi mb-2 leading-relaxed">
              Each coin&apos;s outperformance is driven by unique factors, from regulatory progress and exchange listings to community strength and strategic partnerships, highlighting the diverse opportunities within the cryptocurrency market beyond Bitcoin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}