"use client";

import { Header } from '@/components/Header';
import { motion } from 'framer-motion';
import SolEth from '@/components/SolEth';
import {
  PremiumLayout,
  PremiumHero,
  BoxyCard,
  MetricsGrid,
  ComparisonSection,
  EcosystemGrid,
  FinancialTable
} from '@/components/sol';

const growthMetrics = [
  {
    label: 'Starting Point',
    value: '0.3%',
    description: 'Initial App Revenue Share'
  },
  {
    label: 'Current Position',
    value: '50%',
    description: 'Of All Crypto App Revenue'
  },
  {
    label: 'Growth Multiple',
    value: '166x',
    description: 'Revenue Share Increase'
  }
];

const networkMetrics = [
  {
    label: 'Current Supply',
    value: '551M',
    description: 'SOL in circulation'
  },
  {
    label: 'Inflation Rate',
    value: '6.017%',
    description: 'Tapering 15% annually'
  },
  {
    label: 'Staking Rate',
    value: '88.9%',
    description: 'Of total supply staked'
  },
  {
    label: '60-Day Volume',
    value: '1.4B',
    description: 'Transactions processed'
  }
];

const platformComparison = [
  { Feature: 'Primary Asset', Solana: 'SOL' },
  { Feature: 'Consensus', Solana: 'Proof of History + Proof of Stake' },
  { Feature: 'Smart Contract Language', Solana: 'Rust, C, C++' },
  { Feature: 'Execution Model', Solana: 'Parallel, single-threaded' },
  { Feature: 'Transaction Fees', Solana: 'Ultra-low, sub-penny' },
  { Feature: 'Ecosystem Maturity', Solana: 'Highly developed' },
  { Feature: 'NFT/DeFi Support', Solana: 'Extensive, market-leading' },
  { Feature: 'Traditional Finance', Solana: 'Strong integration (Superstate)' }
];

const ethVsSolComparison = [
  {
    title: 'The Ethereum Odyssey',
    content: "Ethereum's rollup-centric roadmap aims for synchronous composability and lightning-fast confirmations through innovations like shared sequencing, preconfirmations, and real-time SNARKs. While ambitious, this vision faces challenges in resolving fundamental trade-offs, with a timeline extending potentially to 2028."
  },
  {
    title: 'The Solana Sprint',
    content: "Solana prioritizes speed and performance through centralized block production and ordering, aiming for a globally distributed network with multiple concurrent block producers. While offering impressive speed, this approach faces scrutiny regarding its preconfirmation process and economic security model."
  },
  {
    title: 'Philosophical Divergence',
    content: "Ethereum represents a vision with a business—prioritizing long-term security and scalability. Solana is a business with a vision—focusing on immediate performance and efficiency. Each platform serves different needs: Ethereum for trustless access and high security, Solana for high-performance execution and builder ecosystem."
  }
];

const xStocksComparison = [
  {
    title: 'Major Exchange Adoption',
    content: "Bybit, the world's second-largest cryptocurrency exchange, has joined the xStocks Alliance alongside Kraken, making tokenized equities available in over 190 countries."
  },
  {
    title: 'DeFi-Native Integration',
    content: "xStocks are fully integrated with Solana's leading DeFi protocols including Kamino Finance ($2B+ liquidity), Raydium ($1.6B liquidity), and Jupiter aggregation."
  },
  {
    title: 'Available Today',
    content: "Trade household names and crypto giants as tokenized assets: SPYx, APPLx, NVDAx, TSLAx, METAx, GOOGLx, COINx, QQQx, CRCLx, MSTRx—with many more coming soon."
  }
];

const defiProjects = [
  {
    name: 'Jupiter Exchange',
    symbol: '$JUP',
    description: 'Leading aggregator for Solana, offering the best prices for token swaps.',
    growth: 'Primary DEX aggregator on Solana, poised for ecosystem growth.'
  },
  {
    name: 'Jito',
    symbol: '$JITO',
    description: 'Optimizes Solana\'s validator performance through advanced MEV strategies.',
    growth: 'Enhancing validator rewards and network efficiency.'
  },
  {
    name: 'Raydium Protocol',
    symbol: '$RAY',
    description: 'Automated market maker and liquidity provider for Serum DEX.',
    growth: 'Cornerstone of Solana\'s DeFi landscape with first-mover advantage.'
  },
  {
    name: 'Orca',
    symbol: '$ORCA',
    description: 'User-friendly AMM known for simplicity and efficient token swaps.',
    growth: 'Focus on user experience driving mass adoption.'
  },
  {
    name: 'Drift Protocol',
    symbol: '$DRIFT',
    description: 'Decentralized perpetual swap exchange on Solana.',
    growth: 'Well-positioned in the lucrative perpetual swaps market.'
  },
  {
    name: 'Kamino Finance',
    symbol: '$KMNO',
    description: 'Yield optimizer automating farming strategies for users.',
    growth: 'Crucial tool for DeFi investors seeking maximum returns.'
  }
];

const infrastructureProjects = [
  {
    name: 'Pyth Network',
    symbol: '$PYTH',
    description: 'Next-generation oracle solution providing real-time market data.',
    growth: 'Essential for ecosystem integrity with high-fidelity data feeds.'
  },
  {
    name: 'Wormhole',
    symbol: '$W',
    description: 'Cross-chain bridge for asset and data transfer between blockchains.',
    growth: 'Critical infrastructure for blockchain interoperability.'
  },
  {
    name: 'Render Network',
    symbol: '$RENDER',
    description: 'Decentralized GPU rendering platform leveraging idle computing power.',
    growth: 'Growing demand for rendering services in AI and graphics.'
  }
];

const emergingProjects = [
  {
    name: 'Tensor',
    symbol: '$TNSR',
    description: 'Marketplace and toolset for NFT trading on Solana.',
    growth: 'Comprehensive platform for the growing NFT market.'
  },
  {
    name: 'Parcl',
    symbol: '$PARCL',
    description: 'Real estate tokenization platform for fractional property ownership.',
    growth: 'Revolutionizing property investment accessibility.'
  },
  {
    name: 'Whales Market',
    symbol: '$WHALES',
    description: 'Platform for trading loyalty points and rewards.',
    growth: 'Innovative approach to the vast loyalty points market.'
  }
];

const strengths = [
  {
    title: 'Institutional Adoption',
    highlight: 'ETF momentum building.',
    description: `With a 90% probability of ETF approval in 2025 and major institutions like Fidelity filing applications, Solana is becoming increasingly attractive to institutional investors.`,
    note: `Builder's Note: The ETF narrative is real—institutions are paying attention.`
  },
  {
    title: 'Traditional Finance Bridge',
    highlight: 'Superstate&apos;s Opening Bell platform.',
    description: `The launch of "Opening Bell" enables SEC-registered public equities trading on Solana, bridging traditional finance with blockchain technology.`,
    note: `Builder's Note: This is a game-changer for traditional finance integration.`
  },
  {
    title: 'Network Resilience',
    highlight: 'Proven under extreme conditions.',
    description: `Handling $10B+ in 24-hour trading volume during the memecoin frenzy demonstrated Solana's ability to maintain functionality under extreme network stress.`,
    note: `Builder's Note: The network held up impressively during peak activity.`
  },
  {
    title: 'Ecosystem Growth',
    highlight: 'Mature and expanding rapidly.',
    description: `Solana's ecosystem continues to grow with strong DeFi, NFT, and gaming projects, supported by low fees and high throughput.`,
    note: `Builder's Note: The developer community is thriving and building.`
  }
];

const flaws = [
  {
    title: 'Network Congestion',
    pain: `Despite improvements, network congestion can still occur during extreme activity spikes, affecting user experience.`,
    solution: `Continued infrastructure upgrades and optimization to handle increasing demand.`
  },
  {
    title: 'Regulatory Uncertainty',
    pain: `While ETF prospects are promising, regulatory clarity remains a key consideration for institutional adoption.`,
    solution: `Active engagement with regulators and compliance-focused development.`
  },
  {
    title: 'Competition in DeFi',
    pain: `Other chains are catching up with their own scaling solutions and ecosystem development.`,
    solution: `Focus on unique advantages like low fees and established ecosystem.`
  },
  {
    title: 'Technical Complexity',
    pain: `The technical sophistication of Solana can be challenging for new developers.`,
    solution: `Enhanced documentation and developer tooling to lower the entry barrier.`
  }
];

const pillars = [
  {
    title: "Institutional Investors",
    description: "With ETF prospects and traditional finance integration, Solana is becoming increasingly attractive to institutional players."
  },
  {
    title: "DeFi & NFT Builders",
    description: "Low fees and high throughput make Solana ideal for DeFi and NFT projects requiring scale and efficiency."
  },
  {
    title: "Traditional Finance",
    description: "Superstate's Opening Bell platform positions Solana as a bridge between traditional and decentralized finance."
  }
];

export default function SolanaHonestTake() {
  return (
    <>
      <Header />
      <PremiumLayout>
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PremiumHero
            title="Solana (SOL)"
            subtitle="Blockchain Platform • Institutional Finance"
            tagline="The Institutional Frontier"
          />
        </motion.div>

        {/* Growth Metrics Section */}
        <BoxyCard title="From Nothing to Everything">
          <p className="text-lg text-gray-300 mb-8">
            The Most Explosive Growth in Crypto
          </p>
          <MetricsGrid metrics={growthMetrics} />
          <p className="text-center text-lg text-gray-300 mt-8">
            For every $100 in crypto app revenue, $50 is now captured by Solana applications.
          </p>
        </BoxyCard>

        {/* SOL/ETH Chart */}
        <BoxyCard title="SOL/ETH Performance Comparison">
          <SolEth />
        </BoxyCard>

        {/* ETH vs SOL Comparison */}
        <BoxyCard title="Ethereum vs Solana">
          <ComparisonSection items={ethVsSolComparison} />
        </BoxyCard>

        {/* Network Metrics & Economic Model */}
        <BoxyCard title="Network Metrics & Economic Model">
          <MetricsGrid metrics={networkMetrics} columns={4} className="mb-8" />

          {/* Economic Model Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-500/5 p-6 rounded border border-yellow-500/20">
              <h4 className="text-xl text-yellow-500 mb-4">Supply & Inflation</h4>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Projected to reach 720M SOL by 2030, with inflation stabilizing at 1.45% annually. Current burn rate of 0.067% per year against 6% inflation creates an interesting dynamic for long-term holders.
                </p>
                <div className="bg-yellow-500/10 rounded-lg p-4">
                  <p className="text-yellow-400/80 text-sm">
                    &quot;60-day fee collection: 122,975 SOL (50% burned)&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/5 p-6 rounded border border-yellow-500/20">
              <h4 className="text-xl text-yellow-500 mb-4">Staking Dynamics</h4>
              <div className="space-y-4">
                <p className="text-gray-300">
                  With 88.9% of SOL staked, non-stakers face a 5.62% annual loss in network share, while stakers gain equivalently. This high staking rate ensures robust network security and validates the emission schedule.
                </p>
                <div className="bg-yellow-500/10 rounded-lg p-4">
                  <p className="text-yellow-400/80 text-sm">
                    &quot;Contrasts with ETH&apos;s 22.96% stake rate&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sustainability Note */}
          <div className="bg-yellow-500/5 p-6 rounded border border-yellow-500/20">
            <h4 className="text-xl text-yellow-500 mb-4">Towards Sustainability</h4>
            <p className="text-gray-300">
              The path to becoming a deflationary asset requires increased network adoption, higher transaction volume, and strategic fee adjustments. The potential for dynamic and localized fee structures could enhance the economic model, making it more attractive for developers and users alike.
            </p>
          </div>
        </BoxyCard>

        {/* What Makes Solana Special */}
        <BoxyCard title="What Makes Solana Different?">
          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((item) => (
              <div
                key={item.title}
                className="bg-yellow-500/5 p-6 rounded border border-yellow-500/20"
              >
                <h4 className="text-xl text-yellow-500 font-bold mb-3">
                  {item.title}
                </h4>
                <div className="text-yellow-500 italic mb-3 border-l-4 border-yellow-500/60 pl-4">
                  {item.highlight}
                </div>
                <div className="text-gray-300 mb-3 leading-relaxed">
                  {item.description}
                </div>
                <div className="text-yellow-500/80 text-sm italic">{item.note}</div>
              </div>
            ))}
          </div>
        </BoxyCard>

        {/* The Memecoin Trenches Reality Check */}
        <BoxyCard title="The Memecoin Trenches: A Brutal Reality Check">
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-red-500/5 p-6 rounded border border-red-500/20">
              <h4 className="text-xl text-red-500 font-bold mb-4">The Hard Truth</h4>
              <p className="text-gray-300 leading-relaxed">
                Based on comprehensive data analysis and recent reports from across the web and X, the &quot;trenches&quot;—the high-risk memecoin trading scene on Solana, particularly via launchpads like Pump.fun—are indeed &quot;cooked&quot; for the vast majority of retail participants. The math remains overwhelmingly negative, with systemic issues like bot dominance, rapid token failures, and concentrated profits making it a zero-sum (or worse) game for most.
              </p>
            </div>

            {/* User Loss and Profit Stats */}
            <div>
              <h4 className="text-xl text-yellow-500 font-bold mb-6 border-l-4 border-yellow-500/60 pl-4">User Loss and Profit Statistics</h4>
              <div className="bg-gray-800/50 p-6 rounded border border-gray-700">
                <p className="text-gray-300 mb-6">
                  Your figures align closely with independent reports from mid-2025, revealing a stark reality for retail participants:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="text-lg text-red-400 font-semibold mb-4">Loss Distribution</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Losses $0–$1K:</span>
                        <span className="text-red-400 font-semibold">56.6%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Losses $1K–$10K:</span>
                        <span className="text-red-400 font-semibold">5.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Losses $10K–$100K:</span>
                        <span className="text-red-400 font-semibold">0.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Losses &gt;$100K:</span>
                        <span className="text-red-400 font-semibold">0.04% (~1,700 wallets)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg text-green-400 font-semibold mb-4">Profit Distribution</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Profits &gt;$1M:</span>
                        <span className="text-green-400 font-semibold">0.001% (46–311 wallets)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Profits &gt;$100K:</span>
                        <span className="text-green-400 font-semibold">~0.1% (~5,000 wallets)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Active Wallets:</span>
                        <span className="text-gray-400">~4.25M</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                  <p className="text-red-400/80 text-sm">
                    <strong>Key Insight:</strong> Only ~0.001% of wallets have profited over $1M, while over 60% of users have experienced net losses. These platforms function like short-term casinos where retail math is &quot;always negative.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Token Survival Rates */}
            <div>
              <h4 className="text-xl text-yellow-500 font-bold mb-6 border-l-4 border-yellow-500/60 pl-4">Token Survival Rates</h4>
              <div className="bg-gray-800/50 p-6 rounded border border-gray-700">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl text-red-400 font-bold">98%</div>
                    <div className="text-gray-400 text-sm">Die before 90 days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-red-400 font-bold">15%</div>
                    <div className="text-gray-400 text-sm">Fail in first 24 hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-green-400 font-bold">1%</div>
                    <div className="text-gray-400 text-sm">Graduate to DEX liquidity</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Even with competitors like LetsBONK launching ~21K tokens/day (vs. Pump.fun&apos;s ~8.5K), ~99% still fail. ~98% show scam traits, with examples like $SEND&apos;s -87% drop in 1 hour or $BELIEVE&apos;s -85% crash.
                </p>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <p className="text-yellow-400/80 text-sm">
                    <strong>Survival Reality:</strong> Top survivors (BONK, WIF, POPCAT) are exceptions from earlier cycles. New launches rarely endure, with 99% labeled as scams in community discussions.
                  </p>
                </div>
              </div>
            </div>

            {/* Bot Dominance and Fake Volume */}
            <div>
              <h4 className="text-xl text-yellow-500 font-bold mb-6 border-l-4 border-yellow-500/60 pl-4">Bot Dominance and Artificial Volume</h4>
              <div className="bg-gray-800/50 p-6 rounded border border-gray-700">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="text-lg text-red-400 font-semibold mb-4">Bot Statistics</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Bot Trading Volume:</span>
                        <span className="text-red-400 font-semibold">60–80%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Top Accounts as Bots:</span>
                        <span className="text-red-400 font-semibold">~90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Pump.fun Top Traders:</span>
                        <span className="text-red-400 font-semibold">93 of 100 are bots</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg text-orange-400 font-semibold mb-4">Volume Manipulation</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Telegram Bot Volume:</span>
                        <span className="text-orange-400 font-semibold">$65B+ in 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Industrial Bots:</span>
                        <span className="text-orange-400 font-semibold">Thousands of tokens/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Front-running:</span>
                        <span className="text-orange-400 font-semibold">Systematic</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                  <p className="text-red-400/80 text-sm">
                    <strong>Volume Reality:</strong> Tools like volume bots &quot;fuel&quot; perceived booms but extract from users. Much of the $65B+ volume from Telegram bots (BONKbot, Trojan) is artificial.
                  </p>
                </div>
              </div>
            </div>

            {/* Market Share and Trends */}
            <div>
              <h4 className="text-xl text-yellow-500 font-bold mb-6 border-l-4 border-yellow-500/60 pl-4">Market Share and Recent Trends</h4>
              <div className="bg-gray-800/50 p-6 rounded border border-gray-700">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="text-lg text-blue-400 font-semibold mb-4">Pump.fun Market Position</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Market Share:</span>
                        <span className="text-blue-400 font-semibold">66–73%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Peak Weekly Revenue:</span>
                        <span className="text-blue-400 font-semibold">$13.48M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">July Revenue:</span>
                        <span className="text-red-400 font-semibold">~$300K/day</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg text-purple-400 font-semibold mb-4">Overall Market</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Solana Memecoin MC:</span>
                        <span className="text-purple-400 font-semibold">~$11.5B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Daily Token Launches:</span>
                        <span className="text-purple-400 font-semibold">~30K total</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Success Rate:</span>
                        <span className="text-red-400 font-semibold">&lt;1%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                  <p className="text-blue-400/80 text-sm">
                    <strong>Trend Analysis:</strong> Revenue dipped to 10-month lows in July due to competition and fatigue. Collapses like Launchcoin&apos;s -97% volume drop mirror broader exhaustion.
                  </p>
                </div>
              </div>
            </div>

            {/* X Sentiment Analysis */}
            <div>
              <h4 className="text-xl text-yellow-500 font-bold mb-6 border-l-4 border-yellow-500/60 pl-4">Community Sentiment on X</h4>
              <div className="bg-gray-800/50 p-6 rounded border border-gray-700">
                <p className="text-gray-300 mb-6">
                  Recent X discussions overwhelmingly confirm the trenches are &quot;cooked,&quot; &quot;fried,&quot; or &quot;over&quot; due to scams, extraction, and no fresh capital:
                </p>
                <div className="space-y-4 mb-6">
                  <div className="bg-red-500/10 p-4 rounded border border-red-500/20">
                    <p className="text-red-400 italic">&quot;Trenches are absolutely cooked... idk how memecoins recover.&quot;</p>
                  </div>
                  <div className="bg-red-500/10 p-4 rounded border border-red-500/20">
                    <p className="text-red-400 italic">&quot;The trenches are cooked for good this cycle... mid to high cap memes are the only place worth the risk.&quot;</p>
                  </div>
                  <div className="bg-red-500/10 p-4 rounded border border-red-500/20">
                    <p className="text-red-400 italic">&quot;Trenches are cooked. Same liquidity rotating... no retail... memecoins are so fucked.&quot;</p>
                  </div>
                  <div className="bg-red-500/10 p-4 rounded border border-red-500/20">
                    <p className="text-red-400 italic">&quot;The absolute pathetic state of the trenches... unlikely for low caps to take off again.&quot;</p>
                  </div>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <p className="text-yellow-400/80 text-sm">
                    <strong>Minority Optimism:</strong> Some argue &quot;Memecoin trencher sentiment at all time lows... means theres a 0 to billion dollar cook coming&quot; or &quot;Trenches are back... coins are slow cooking higher.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Will Trenches Heat Up Again? */}
            <div className="bg-orange-500/5 p-6 rounded border border-orange-500/20">
              <h4 className="text-xl text-orange-500 font-bold mb-4">Will the Trenches Heat Up Again?</h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Probably not sustainably for retail. 2025 data shows exhaustion from rugs, bots, and PvP (player-vs-player) dynamics. If Solana or broader crypto rallies (e.g., altseason), mid/high-cap memes (BONK, WIF, PEPE) might pump, but trenches could see brief spikes before extraction resumes.
              </p>
              <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                <p className="text-orange-400/80 text-sm">
                  <strong>Reality Check:</strong> No inflows mean no real heat. It&apos;s evolved into a &quot;solved game&quot; for bots/insiders. Focus on established plays or DYOR—retail edges are razor-thin.
                </p>
              </div>
            </div>

            {/* Bullish Technical Outlook */}
            <div className="bg-green-500/5 p-6 rounded border border-green-500/20">
              <h4 className="text-xl text-green-500 font-bold mb-4">🚀 But We&apos;re Still Bullish on SOL</h4>
              <p className="text-gray-300 leading-relaxed mb-6">
                Despite the memecoin trenches being &quot;cooked,&quot; Solana&apos;s core infrastructure is about to undergo a massive upgrade that will fundamentally change the game.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Consensus rewrite = <span className="text-green-400 font-bold">100x faster</span></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">100ms finality ⚡</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Firedancer + Agave racing for dominance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Mainnet ~Q1</span>
                  </div>
                </div>
                
                <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/20">
                  <h5 className="text-lg text-green-400 font-semibold mb-3">The Big Picture</h5>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    While the memecoin scene may be exhausted, Solana&apos;s technical foundation is about to leapfrog the competition. The consensus rewrite alone will make the network 100x faster, while 100ms finality puts it in a league of its own.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                <p className="text-yellow-400/80 text-sm">
                  <strong>🚀 Solana is about to blink and settle.</strong> The technical upgrades coming in Q1 will fundamentally change what&apos;s possible on the network, regardless of what happens in the memecoin trenches.
                </p>
              </div>
            </div>
          </div>
        </BoxyCard>

        {/* xStocks: Tokenized Capital Markets */}
        <BoxyCard title="The Future is Here: xStocks">
          <p className="text-lg text-gray-300 mb-6">
            &quot;Tokenized capital markets are live. This is what investing looks like when it&apos;s designed for everyone.&quot;
          </p>
          <p className="text-gray-300 mb-8">
            Over 60 tokenized stocks are now available on Bybit, Kraken, and Solana—Apple, Amazon, Microsoft, and crypto companies like Coinbase and MicroStrategy, all accessible 24/7 with the speed of blockchain.
          </p>
          <ComparisonSection items={xStocksComparison} />
        </BoxyCard>

        {/* Platform Comparison */}
        <BoxyCard title="Solana at a Glance">
          <p className="text-lg text-gray-300 mb-8 text-center">
            Solana&apos;s features have matured significantly, making it a robust platform for both traditional and decentralized finance applications.
          </p>
          <FinancialTable 
            headers={['Feature', 'Solana']}
            rows={platformComparison}
          />
        </BoxyCard>

        {/* Who is Solana For Now? */}
        <BoxyCard title="Who Is Solana For Now?">
          <p className="text-lg text-gray-300 mb-8 text-center">
            Solana&apos;s next chapter is about:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-yellow-500/5 p-6 rounded border border-yellow-500/20"
              >
                <h4 className="text-xl text-yellow-500 font-bold mb-3">{pillar.title}</h4>
                <p className="text-gray-300">{pillar.description}</p>
              </div>
            ))}
          </div>
        </BoxyCard>

        {/* Honest Flaws & Solutions */}
        <BoxyCard title="What's Broken & How We Fix It">
          <div className="space-y-6">
            {flaws.map((item) => (
              <div
                key={item.title}
                className="bg-yellow-500/5 p-6 rounded border border-yellow-500/20 border-l-4 border-l-yellow-500"
              >
                <h4 className="text-xl text-yellow-500 font-bold mb-4">{item.title}</h4>
                <div className="mb-4">
                  <div className="text-yellow-500 italic mb-2 border-l-4 border-yellow-500/60 pl-4">Pain Point</div>
                  <div className="text-gray-300 mb-4">{item.pain}</div>
                </div>
                <div>
                  <div className="text-yellow-500 italic mb-2 border-l-4 border-yellow-500/60 pl-4">Possible Direction</div>
                  <div className="text-gray-300">{item.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </BoxyCard>

        {/* Ecosystem Watchlist */}
        <BoxyCard title="Ecosystem Watchlist">
          <p className="text-lg text-gray-300 mb-8 text-center">
            The Solana ecosystem is thriving with innovative projects across multiple sectors. Here are the ones worth watching.
          </p>

          {/* DeFi Section */}
          <div className="mb-12">
            <h4 className="text-xl text-yellow-500 mb-6 border-l-4 border-yellow-500/60 pl-4">DeFi</h4>
            <EcosystemGrid projects={defiProjects} />
          </div>

          {/* Infrastructure Section */}
          <div className="mb-12">
            <h4 className="text-xl text-yellow-500 mb-6 border-l-4 border-yellow-500/60 pl-4">Infrastructure</h4>
            <EcosystemGrid projects={infrastructureProjects} />
          </div>

          {/* Emerging Sectors */}
          <div>
            <h4 className="text-xl text-yellow-500 mb-6 border-l-4 border-yellow-500/60 pl-4">Emerging Sectors</h4>
            <EcosystemGrid projects={emergingProjects} />
          </div>
        </BoxyCard>

        {/* Conclusion */}
        <BoxyCard title="The Future of Finance">
          <div className="space-y-4 text-gray-300">
            <p>
              <strong>Solana has positioned itself as the institutional bridge between traditional finance and blockchain technology.</strong> With ETF prospects, traditional finance integration through platforms like xStocks, and proven network resilience, Solana represents the next evolution of financial infrastructure.
            </p>
            <p>
              The combination of 24/7 tokenized markets, DeFi composability, and institutional-grade performance creates unprecedented opportunities for builders and investors. As traditional assets become blockchain-native and crypto companies mature, Solana&apos;s high-performance architecture provides the foundation for this convergence.
            </p>
            <p className="text-yellow-500 font-semibold">
              The institutional frontier is here, and Solana is leading the charge.
            </p>
          </div>
        </BoxyCard>
      </PremiumLayout>
    </>
  );
}
