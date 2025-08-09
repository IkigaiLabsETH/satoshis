"use client";

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PriceTicker from '@/components/AltCoinsBeta';
import useSWR from 'swr';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LiveChartData {
  date: string;
  price: number;
  twoYearMA: number | null;
  twoYearMAx5: number | null;
}

interface ErrorData {
  error: string;
  details?: string;
}

function EthTwoYearMAMultiplierChart() {
  const { data: chartData, error } = useSWR<LiveChartData[] | ErrorData>('/api/cryptocompare/eth-price-history', fetcher);

  if (error) return <div>Failed to load chart data. Please try again later.</div>;
  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-yellow-500">Loading Real-Time Data...</p>
      </div>
    );
  }

  if (!Array.isArray(chartData)) {
    const errorPayload = chartData as ErrorData;
    const errorMessage = errorPayload.details || errorPayload.error || 'An unknown error occurred.';
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-red-500 font-bold">Failed to load chart data.</p>
        <p className="text-sm text-gray-400 mt-2">Error: {errorMessage}</p>
      </div>
    );
  }

  const labels = chartData.map(d => d.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'Ethereum Price',
        data: chartData.map(d => d.price),
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        pointRadius: 0,
        tension: 0.1,
        borderWidth: 1.5,
      },
      {
        label: '2-Year MA x 5 (Sell Target)',
        data: chartData.map(d => d.twoYearMAx5),
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        pointRadius: 0,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: '2-Year MA (Buy Zone)',
        data: chartData.map(d => d.twoYearMA),
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        pointRadius: 0,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          padding: 20,
          font: { size: 14 },
        },
      },
      title: { display: false },
    },
    scales: {
      y: {
        type: 'logarithmic',
        title: { display: true, text: 'Price (USD)', color: 'white' },
        ticks: {
          color: 'white',
          callback: function (value: string | number) {
            if (typeof value !== 'number') return String(value);
            if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
            if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
            return `$${value}`;
          },
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        ticks: { color: 'white', maxRotation: 0, autoSkip: true, maxTicksLimit: 10 },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
    interaction: { intersect: false, mode: 'index' },
  };

  return <Line options={options} data={data} />;
}

export default function EthHonestTake() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Trust Commodity • Digital Oil • Settlement Layer</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Ethereum
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">The Foundation of Web3 Infrastructure</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

          {/* Seasonality & Rotation Outlook */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Seasonality & Rotation Outlook
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Near term, the base case is ALT/BTC strength into late August while ALT/ETH bleeds; then a rotation back to BTC in Sep/Oct as seasonals historically favor BTC over ALTs.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-4">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-3">Implications</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Favor conservative ETH swing sizing through August; keep BTC core intact.</li>
                    <li>Expect relative underperformance of ALT/ETH pairs; avoid chasing strength.</li>
                    <li>Plan trims on ETH strength into resistance; redeploy on confirmed supports.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-3">Sep/Oct Playbook</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Rotate a portion of ALT/ETH profits back to BTC if BTC dominance turns up.</li>
                    <li>Increase BTC bias on weekly confirmation; keep ETH as the fintech rails.</li>
                    <li>Re-assess ETH/BTC at 0.040/0.045 zones; respect invalidations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Live Market Data */}
          <PriceTicker />

          {/* Market Overview Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Market Overview
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Ethereum today sits at the crossroads of decentralized trust and digital infrastructure. As the leading smart-contract platform, Ether serves as a &quot;base layer of computing&quot; underpinning vast DeFi, NFT and Web3 applications. Regulators explicitly treat ETH as a commodity (the CFTC has affirmed Ether is a commodity under US law), reinforcing its role as neutral &quot;trust engine&quot; money.
              </p>
              <p className="text-lg">
                Investors and builders often call ETH &quot;digital oil&quot;, since every transaction and smart contract execution is paid for with gas fees in Ether – analogous to how oil fuels an economy. These metaphors capture Ethereum&apos;s evolving identity: a global trust network and computational backplane whose security and utility give Ether intrinsic value.
              </p>
            </div>
          </div>

          {/* 2-Year MA Multiplier (ETH) */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">The 2-Year Moving Average Multiplier (ETH)</h3>
            <div className="w-full h-[60vh]">
              <EthTwoYearMAMultiplierChart />
            </div>
            <div className="mt-6 text-gray-300 text-sm leading-relaxed text-center">
              <p>
                Red line (2Y MA × 5) historically aligns with take-profit conditions in prior cycles; Green line (2Y MA) has marked high-probability accumulation zones during bear markets.
              </p>
            </div>
          </div>

          {/* Market Cycles Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Market Cycles: ETH vs. Bitcoin Dynamics
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Ethereum has historically lagged Bitcoin in bull markets, setting up a catch-up narrative today. After Bitcoin&apos;s recent run, ETH/BTC hit multi-year lows. A weekly chart shows the ETH/BTC ratio in a clear downtrend since late 2021. For example, from Sept 2022 to now BTC/USD climbed ~470% vs. ETH/USD ~170%, dragging ETH/BTC from ~0.06 to ~0.026.
              </p>
              <p className="text-lg">
                This prolonged underperformance reflects capital flowing first into Bitcoin (e.g. via the new spot BTC ETFs) and only later into altcoins. Indeed, on-chain analytics show Bitcoin investors reached &quot;euphoria&quot; metrics long before Ethereum traders did, and recent inflows into crypto ETFs have favored BTC so far.
              </p>
              <p className="text-lg">
                Institutional rotation is now turning. Market analysts note a breakout in ETH/BTC: Ethereum has &quot;decisively outperformed Bitcoin after lagging throughout the whole cycle&quot;. The recent Pectra upgrade (proto-danksharding) and ETH&apos;s rebound above key levels have renewed interest.
              </p>
            </div>
          </div>

          {/* Trust Foundation Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Trust Foundation
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Ethereum secures a massive on-chain economy (over ~$400 billion in assets) as a neutral settlement layer. Its Proof-of-Stake consensus now leverages ~800K validators, making Ethereum one of crypto&apos;s most secure and decentralized platforms.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Security Metrics</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>~800K active validators</li>
                    <li>~$400B secured value</li>
                    <li>90% reduced issuance post-Merge</li>
                    <li>CFTC-regulated commodity status</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Key Initiatives</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Trillion Dollar Security initiative</li>
                    <li>Global financial infrastructure</li>
                    <li>Institutional-grade security</li>
                    <li>Regulatory clarity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tokenomics Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Post-Merge Tokenomics
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Ethereum&apos;s supply dynamics flipped after The Merge (Sep 2022) and EIP-1559. Issuance plunged by ~90% – from ~15,000 ETH/day to ~1,500 ETH/day – an event dubbed the &quot;triple halvening&quot;. At the same time, the London hard fork (Aug 2021) introduced fee-burning. Today ~85% of all transaction fees are burned, effectively acting as a network-wide &quot;buyback&quot; for ETH holders.
              </p>
              <p className="text-lg">
                Dune/ultrasound data confirm the impact: since the Merge the network has issued ~6.5M new ETH and burned ~3.5M. That implies annualized issuance ~580K ETH vs. burn 1.75M ETH (today&apos;s gas levels). In other words, at recent activity levels Ethereum&apos;s net supply growth is slightly negative (–1.0% per year).
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Issuance</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>~580K ETH/year</li>
                    <li>~0.5% inflation</li>
                    <li>90% reduction post-Merge</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Burn</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>~1.7M ETH/year</li>
                    <li>~0.98% of supply</li>
                    <li>Usage-driven deflation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Net Effect</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Mildly deflationary</li>
                    <li>Supply shrunk ~350K ETH</li>
                    <li>Dynamic supply curve</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Usage & Growth Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Usage & Growth
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                The base-fee burn depends on how people use Ethereum. Notably, DeFi dominates Ethereum activity – over 90% of all decentralized finance volume occurs on Ethereum and its Layer-2s. Major DeFi apps (AMMs, lending, etc.) drive significant gas usage and fees.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Primary Drivers</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>DeFi TVL peaking ~$150B</li>
                    <li>NFT trading and minting</li>
                    <li>Layer-2 rollup growth</li>
                    <li>Stablecoin transfers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Future Growth</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Pectra/Blobs upgrade</li>
                    <li>L2 fee optimization</li>
                    <li>RWA tokenization</li>
                    <li>Gaming/metaverse</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 2024-25 Catalysts Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              2024-25 Catalysts
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Looking ahead, several macro and structural factors could catalyze Ethereum:
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Catalysts</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Bitcoin Halving (Apr 2024)</li>
                    <li>ETH ETFs & Institutional Flows</li>
                    <li>3-5% Staking Yields</li>
                    <li>RWA Tokenization Growth</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Technical Catalysts</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Pectra Upgrade</li>
                    <li>EIP-4844 (Blobs)</li>
                    <li>L2 Ecosystem Expansion</li>
                    <li>Enterprise Adoption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Investment Perspective
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                In summary, Ethereum combines robust fundamentals with timely catalysts. It is both a base-layer trust asset and a usage-driven monetary asset. The post-Merge economics have tilted ETH toward deflation when the network is busy, a feature unique among blockchains.
              </p>
              <p className="text-lg">
                After years of trailing Bitcoin, ETH now sits undervalued by some measures. The ETH/BTC ratio bottom and renewed ETH-specific narratives suggest we may be entering a &quot;late-cycle&quot; run for altcoins. Institutional flows (including ETF capital) are beginning to rotate into Ethereum, and upcoming demand drivers (crypto adoption, innovation) could push ETH higher.
              </p>
              <p className="text-lg">
                From a research standpoint, Ethereum&apos;s thesis rests on its evolving identity: a &quot;digital oil&quot; powering a world-computer, and a trust layer securing trillions in value. This dual narrative — coupled with negative net issuance under heavy use — provides a strong case for Ethereum as a long-term store of value and growth asset.
              </p>
            </div>
          </div>

          {/* Digital Oil Thesis Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              ETH Is Digital Oil: The Investment Thesis for a Machine-Driven Future
            </h3>
            
            {/* TL;DR */}
            <div className="mb-8 p-6 bg-black/30 rounded-lg border border-yellow-500/30">
              <h4 className="text-xl font-bold text-yellow-500 mb-4">TL;DR</h4>
              <p className="text-lg text-gray-300">
                Ethereum is not a company. ETH is not equity. ETH is programmable collateral, yield-generating commodity, and the neutral reserve powering the machine-native economy. As AI agents emerge, as finance moves onchain, and as institutions seek yield with credible neutrality, ETH is the asset they&apos;ll need—but don&apos;t yet own. This mispricing is our opportunity.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-8 text-gray-300">
              {/* Section I */}
              <div>
                <h4 className="text-xl font-bold text-yellow-500 mb-4">I. The Shift: From Sovereign Systems to Autonomous Infrastructure</h4>
                <p className="text-lg mb-4">
                  We&apos;re witnessing a structural migration from fiat-based analog finance to permissionless, composable, and credibly neutral infrastructure. Ethereum is emerging as the operating system for this onchain future.
                </p>
                <p className="text-lg">
                  Over $767B in tokenized assets already reside on Ethereum L1 and L2s. It&apos;s the platform of choice for stablecoins (60%+ market share), RWAs (82%), and institutional-grade smart contract deployment.
                </p>
                <p className="text-lg mt-4">
                  Ethereum isn&apos;t just infrastructure — it&apos;s the final settlement layer of the AI and tokenized economies.
                </p>
              </div>

              {/* Section II */}
              <div>
                <h4 className="text-xl font-bold text-yellow-500 mb-4">II. ETH&apos;s Role: More Than Money</h4>
                <p className="text-lg mb-4">
                  ETH is not merely a speculative asset — it is a productive, scarce, and deflationary commodity underpinning the entire Ethereum economy:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>Digital Oil: ETH is consumed (burned) to fuel every transaction, every RWA issuance, every stablecoin transfer, and every AI agent deployment.</li>
                  <li>Native Yield: ETH can be staked with a validator set securing {'>'} $88B in value, yielding ~3% APY while preserving liquidity through LSDs.</li>
                  <li>Pristine Collateral: ETH is credibly neutral—free from jurisdictional or issuer risk—and collateralizes billions in DeFi, stablecoins, and permissioned finance.</li>
                  <li>Deflationary by Design: Since The Merge, ETH&apos;s supply inflation has averaged ~0.09%, often going negative due to EIP-1559 burns.</li>
                  <li>Strategic Reserve Asset: ETH is being stockpiled by protocols, DAOs, institutions, and sovereign treasuries. Its programmability makes it far more capital-efficient than BTC.</li>
                </ul>
              </div>

              {/* Section III */}
              <div>
                <h4 className="text-xl font-bold text-yellow-500 mb-4">III. Why ETH Is Mispriced</h4>
                <p className="text-lg mb-4">
                  ETH/BTC has declined 70% from its 2022 ratio, despite Ethereum dominating every institutional metric. Why?
                </p>
                <p className="text-lg">
                  Because BTC is understood by TradFi: &quot;digital gold.&quot; ETH, however, defies legacy valuation. It&apos;s oil, it&apos;s yield, it&apos;s collateral. You don&apos;t model ETH with a DCF — you model it like energy or monetary base assets.
                </p>
                <p className="text-lg mt-4">
                  This disconnect creates asymmetric opportunity. ETH isn&apos;t lagging — it&apos;s loading.
                </p>
              </div>

              {/* Section IV */}
              <div>
                <h4 className="text-xl font-bold text-yellow-500 mb-4">IV. ETH x AI: The Coming Explosion</h4>
                <p className="text-lg mb-4">
                  AI agents will need a native economy: money, identity, settlement, property rights. Ethereum is the only platform with all of that today:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>Finality & Composability: For agents transacting, bidding, and negotiating in real-time.</li>
                  <li>Smart Contract Enforcement: Rights enforced by code, not courts.</li>
                  <li>Agent Meshes: Autonomous agents staking, settling, and coordinating value — all denominated in ETH.</li>
                </ul>
                <p className="text-lg mt-4">
                  ETH is not just digital oil. It&apos;s machine money.
                </p>
              </div>

              {/* Section V */}
              <div>
                <h4 className="text-xl font-bold text-yellow-500 mb-4">V. Valuation Benchmarks</h4>
                <p className="text-lg mb-4">
                  Forget P/E multiples. ETH valuation maps to real-world commodity and monetary frameworks:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>Oil reserves: $85T</li>
                  <li>Global M2: $93T</li>
                  <li>Bond market collateral: $141T</li>
                  <li>Tokenized global assets (10% penetration): $50T</li>
                </ul>
                <p className="text-lg mt-4">
                  Even a conservative 10% share of these flows implies ETH can support a multi-trillion-dollar valuation.
                </p>
                <div className="mt-4 space-y-2 text-lg">
                  <p>Short-term target: $8K ETH</p>
                  <p>Mid-term: $80K ETH</p>
                  <p>Long-term: Uncapped, reflexively deflationary</p>
                </div>
              </div>

              {/* Section VI */}
              <div>
                <h4 className="text-xl font-bold text-yellow-500 mb-4">VI. Catalysts</h4>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>✅ ETH ETFs approved, staking yield ETFs next</li>
                  <li>✅ Regulatory clarity: ETH = commodity</li>
                  <li>✅ Strategic ETH Reserve growing (~$2.5B publicly disclosed)</li>
                  <li>✅ AI-native economies forming: L2s for agents (e.g. World Chain, Base)</li>
                  <li>✅ Ethereum&apos;s renaissance: zkVMs, account abstraction, cross-L2 unification</li>
                </ul>
              </div>

              {/* Conclusion */}
              <div className="mt-8 p-6 bg-black/30 rounded-lg border border-yellow-500/30">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Conclusion: ETH Is the Reserve Asset of the Onchain Renaissance</h4>
                <p className="text-lg">
                  The Ethereum thesis is now simple: as the global economy replatforms onto autonomous, tokenized rails, ETH becomes the neutral, productive, and programmable base layer money.
                </p>
                <p className="text-lg mt-4">
                  The world just doesn&apos;t know it yet.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="https://ethereum.org/en/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-yellow-500 text-black font-bold px-12 py-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:bg-yellow-400 transition-all duration-300 font-satoshi tracking-tight text-2xl">
                  ETH Docs <ArrowRight className="ml-4 w-7 h-7" />
                </Button>
              </Link>
              <Link href="https://www.strategicethreserve.xyz/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-yellow-500 text-black font-bold px-12 py-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:bg-yellow-400 transition-all duration-300 font-satoshi tracking-tight text-2xl">
                  Strategic ETH Reserve <ArrowRight className="ml-4 w-7 h-7" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
