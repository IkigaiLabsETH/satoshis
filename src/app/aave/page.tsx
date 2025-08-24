"use client";

import { useEffect, useState } from 'react';

export default function AavePage() {
  const [aavePrice, setAavePrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=aave,ethereum&vs_currencies=usd'
        );
        if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);
        const data = await response.json();
        setAavePrice(data.aave?.usd ?? null);
        setEthPrice(data.ethereum?.usd ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch prices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const watchlist = [
    { token: 'Chainlink (LINK)', focus: 'Oracles/Data Feeds', price: '$26.07', d7: '+20.0%', d30: '+45.4%', why: 'Oracles powering 1k+ apps; CCIP growth; outpacing ETH 30d.' },
    { token: 'Ethena (ENA)', focus: 'Synthetic Assets/Yield', price: '$0.74', d7: '+4.1%', d30: '+56.1%', why: 'USDe TVL growth; delta-neutral yields; restaking meta tailwinds.' },
    { token: 'Pendle (PENDLE)', focus: 'Yield Tokenization', price: '~$3.14 (est.)', d7: '-0.6%', d30: '-0.6%', why: 've-governance, LRTfi integrations; setup for breakout on fixed-yield demand.' },
    { token: 'Uniswap (UNI)', focus: 'DEX/Aggregator', price: '$11.32', d7: '+3.7%', d30: '+11.8%', why: 'V4 hooks; liquidity efficiency; volume-led upside vs ETH.' },
    { token: 'Jupiter (JUP)', focus: 'Solana DEX Aggregator', price: '$0.52', d7: '+1.8%', d30: '+4.4%', why: 'Cross-chain swaps, buybacks; Solana speed edge if ETH lags.' },
    { token: 'Lido DAO (LDO)', focus: 'Liquid Staking', price: '$1.52', d7: '+10.6%', d30: '+40.5%', why: 'stETH dominance; governance catalysts; restaking yields vs native ETH.' },
    { token: 'Aerodrome (AERO)', focus: 'Base DEX/Liquidity', price: '$1.47', d7: '+11.2%', d30: '+66.0%', why: 'Explosive Base TVL; ve-model; strong 30d relative momentum.' },
    { token: 'Hyperliquid (HYPE)', focus: 'Perps DEX', price: '$44.02', d7: '+6.0%', d30: '+2.5%', why: 'High perps volume; buybacks; leverage meta reflexivity.' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light">DeFi • Lending • Money Markets</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)]">Aave</span>
            </h1>
            <div className="flex items-center justify-center mt-2">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic">ETH-relative DeFi screen for BTC-ratio outperformance</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>

            {/* Live Prices & CTA */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-400">Error fetching live prices: {error}</span>
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-yellow-500 mb-4">📈 Live Market Snapshot</h2>
                  <p className="text-lg text-gray-300 mb-6">Track AAVE and ETH spot while planning deposit/borrow strategies, eMode loops, and Safety Module rewards.</p>
                  <div className="mb-6 p-4 bg-black/20 rounded-none border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-yellow-400 font-semibold">Live Prices</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-400">{isLoading ? 'Loading...' : 'Live from CoinGecko'}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-300">{isLoading ? '--' : aavePrice ? `$${aavePrice.toLocaleString()}` : '$0'}</div>
                        <div className="text-sm text-gray-400">AAVE</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{isLoading ? '--' : ethPrice ? `$${ethPrice.toLocaleString()}` : '$0'}</div>
                        <div className="text-sm text-gray-400">ETH</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500"></div>
                      <span>Core loop: Deposit stables/ETH → borrow stables/ETH → optional eMode loop</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500"></div>
                      <span>Risk: monitor health factor, variable rates, liquidation thresholds</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500"></div>
                      <span>Safety Module: stake AAVE for rewards and protocol backstop</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-black/30 rounded-none p-6 border border-yellow-500/30 mb-6">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">🏦</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Aave App</h3>
                    <p className="text-gray-300 text-sm">Deposit assets, borrow against collateral, and manage your health factor in real time.</p>
                  </div>
                  <a
                    href="https://app.aave.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-8 py-4 bg-yellow-500 text-black font-bold rounded-none hover:bg-yellow-400 transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
                  >
                    Open Aave ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Overview</h2>
            <p className="text-gray-300 text-lg">Aave is a non-custodial liquidity protocol enabling deposits to earn yield and overcollateralized borrows across multiple networks. Advanced features include eMode for correlated assets, isolation mode for long-tail risk, and a Safety Module that backstops the protocol.</p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] text-center">
              <div className="flex items-center justify-center gap-4 mb-4"><span className="text-4xl">⚙️</span><h3 className="text-2xl md:text-3xl font-bold text-yellow-500">eMode & Efficiency</h3></div>
              <p className="text-lg text-white/80">Higher LTV for correlated assets (stables/LSTs) to optimize capital efficiency.</p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] text-center">
              <div className="flex items-center justify-center gap-4 mb-4"><span className="text-4xl">🛡️</span><h3 className="text-2xl md:text-3xl font-bold text-yellow-500">Safety Module</h3></div>
              <p className="text-lg text-white/80">Stake AAVE to earn rewards and provide a protocol backstop for extreme events.</p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] text-center">
              <div className="flex items-center justify-center gap-4 mb-4"><span className="text-4xl">⚡</span><h3 className="text-2xl md:text-3xl font-bold text-yellow-500">Flash Loans</h3></div>
              <p className="text-lg text-white/80">Uncollateralized atomic loans for arbitrage, refinancing, and liquidations.</p>
            </div>
          </div>

          {/* ETH-Relative Thesis */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Why we feature Aave (ETH-relative lens)</h3>
            <p className="text-gray-300 text-sm mb-3">We use Aave as an anchor to surface DeFi tokens that may outperform ETH on a BTC basis. With Aave’s TVL dominance (~64% share, $65B+), rising institutional flows, and stablecoin integrations (e.g., GHO), AAVE has recently matched or exceeded ETH’s absolute gains and strengthened its BTC ratio. The screen favors tokens with accelerating TVL, strong fundamentals, and 7/30-day momentum above ETH.</p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Key trends: agentic yield (restaking/LRTfi), cross-chain expansion, RWA integration</li>
              <li>Watch rotations: ETH-beta names when ETH/BTC rallies; flip to DeFi catalysts (Aave V4, EigenLayer AVSs)</li>
              <li>Risk: unlocks, regulation, ETH drawdowns; track BTC pairs and TVL on DefiLlama</li>
            </ul>
          </div>

          {/* Bullish Thesis */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">We are bullish on Aave because</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
              <li>Category dominance: ~$65B+ TVL and ~64% lending market share, reinforcing network effects</li>
              <li>Relative strength: AAVE/BTC up ~20% (7d) and matching/outpacing ETH on absolute returns</li>
              <li>Stablecoin flywheel: GHO and broader integrations deepen liquidity and onchain utility</li>
              <li>Institutional adoption: rising borrows/deposits as TradFi rates fall and DeFi yields normalize</li>
              <li>Risk architecture: eMode, isolation mode, and Safety Module provide robust risk segmentation</li>
            </ul>
            <div className="mt-4">
              <h4 className="text-yellow-400 font-epilogue mb-2">Upcoming catalysts</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                <li>Aave V4 roadmap (efficiency, cross-chain liquidity, modular upgrades)</li>
                <li>Restaking/LRTfi integrations amplifying yields and collateral utility</li>
                <li>RWA + stablecoin growth expanding borrow demand and fee capture</li>
              </ul>
            </div>
          </div>

          {/* Risk & Caution */}
          <div className="p-8 rounded-none border-2 border-red-500 bg-black/40 shadow-[5px_5px_0px_0px_rgba(239,68,68,1)]">
            <h3 className="text-2xl font-bold text-red-300 mb-3">Risk & Caution</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
              <li>Maintain health factor buffer; volatile collateral can liquidate quickly</li>
              <li>Variable borrow rates can spike; consider stable rates where available</li>
              <li>Protocol and market risks; use conservative LTVs and diversify</li>
            </ul>
          </div>

          {/* BTC-Ratio DeFi Watchlist */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Top DeFi tokens to watch vs ETH (BTC ratio)</h3>
            <div className="overflow-x-auto rounded-none border border-yellow-500/20">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-black/60">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Token</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Focus Area</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Price (Aug 23, 2025)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">7d</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">30d</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Why it may outperform ETH on BTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 bg-black/30">
                  {watchlist.map((row) => (
                    <tr key={row.token} className="hover:bg-yellow-500/5">
                      <td className="px-4 py-3 align-top text-sm text-white">{row.token}</td>
                      <td className="px-4 py-3 align-top text-sm text-gray-300">{row.focus}</td>
                      <td className="px-4 py-3 align-top text-sm text-gray-300">{row.price}</td>
                      <td className="px-4 py-3 align-top text-sm text-gray-300">{row.d7}</td>
                      <td className="px-4 py-3 align-top text-sm text-gray-300">{row.d30}</td>
                      <td className="px-4 py-3 align-top text-sm text-gray-300">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">Data snapshot and narrative per Aug 23, 2025. Educational only. Monitor BTC pairs on TradingView/DexScreener and TVL on DefiLlama.</p>
          </div>

          {/* Docs CTA */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] text-center">
            <h2 className="font-epilogue text-5xl md:text-6xl font-bold text-yellow-400 mb-6 tracking-tight leading-tight drop-shadow-[0_2px_32px_rgba(247,181,0,0.18)]">Learn More</h2>
            <p className="text-lg md:text-xl font-satoshi text-white/80 mb-8 max-w-2xl mx-auto">Read the Aave docs for full details on interest rate models, risk parameters, and supported networks.</p>
            <a
              href="https://docs.aave.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-yellow-500 text-black font-bold px-10 py-4 rounded-none hover:bg-yellow-400 transition-all duration-300 font-epilogue tracking-tight text-2xl shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
            >
              Aave Docs ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}