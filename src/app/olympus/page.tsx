'use client';

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Shield, 
  Wallet, 
  ChartBar, 
  GitBranch,
  Scale
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
    }
  })
};

const metrics = [
  { label: "Treasury Assets", value: "$195.0M", change: "+1.8%", icon: Wallet },
  { label: "POL", value: "$98.7M", change: "+1.2%", icon: ChartBar },
  { label: "Market Cap", value: "$370.4M", change: "+2.1%", icon: TrendingUp },
  { label: "Backing per OHM", value: "$11.20", change: "+0.5%", icon: Shield }
];

const policyParameters = [
  { name: "Cushion Factor", value: "0.75", description: "Determines spread between high/low walls" },
  { name: "Moving Average", value: "8h", description: "Time window for price averaging" },
  { name: "Rebase Rate", value: "0.0009%", description: "Current rate of supply expansion" },
  { name: "Wall Spread", value: "±15%", description: "Price range for market operations" }
];

const timelineEvents = [
  {
    date: "March 2021",
    title: "OHM Launch",
    description: "Initial bonding mechanism and (3,3) game theory"
  },
  {
    date: "December 2021",
    title: "Peak Market Cap",
    description: "$4B valuation at height of DeFi season"
  },
  {
    date: "January 2022",
    title: "Market Correction",
    description: "Transition period begins as premium contracts"
  },
  {
    date: "Q2 2023",
    title: "Range-Bound Stability",
    description: "Implementation of advanced market operations"
  },
  {
    date: "Q1 2024",
    title: "Cross-Chain Expansion",
    description: "Deployment on Base, integration with new chains"
  }
];

export default function OlympusPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Personal Olympus Journey Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 text-center relative z-10">
        <Badge className="bg-yellow-500 text-black text-sm mb-6 font-satoshi tracking-wide shadow-md">Personal Olympus Journey</Badge>
        <Card className="w-full bg-[#18191c]/80 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg p-6 md:p-8 mb-10 flex flex-col items-center">
          <h1 className="font-epilogue text-5xl md:text-6xl font-bold text-yellow-400 mb-8 tracking-tight leading-tight drop-shadow-[0_2px_32px_rgba(247,181,0,0.18)]">
            Why I Devoted 3.3 Years to Olympus
          </h1>
          <div className="h-1 w-24 bg-yellow-500 rounded-full mb-8 mx-auto" />
          <div>
            <p className="text-xl md:text-2xl font-epilogue text-yellow-400 italic mb-6 drop-shadow-[0_2px_16px_rgba(247,181,0,0.18)] border-b-2 border-yellow-500/40 pb-4">
              &ldquo;In 2021, OlympusDAO emerged with a groundbreaking approach to decentralized finance (DeFi). It introduced a protocol-owned liquidity model and the (3,3) game theory, aiming to create a stable, decentralized reserve currency. The initial phase saw explosive growth, with the treasury amassing over $1 billion and market capitalization peaking at $4 billion by December 2021.&rdquo;
            </p>
            <p className="text-lg md:text-xl font-satoshi text-white/90 leading-snug mb-6">
              However, the rapid ascent was followed by a significant correction. The protocol&rsquo;s reflexive mechanics, which had fueled its rise, also contributed to a sharp decline in OHM&rsquo;s price. Recognizing the need for stability, OlympusDAO implemented the Range-Bound Stability (RBS) framework. This introduced mechanisms like dynamic supply adjustments and price bands to maintain equilibrium.
            </p>
            <p className="text-lg md:text-xl font-satoshi text-white/90 leading-snug">
              My commitment to Olympus wasn&rsquo;t just about financial returns. It was about being part of an innovative experiment in monetary policy, governance, and community-driven development. The journey offered invaluable insights into complex economic systems.
            </p>
          </div>
        </Card>
      </div>
      {/* Olympus Explainer Video */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black pt-8">
        <div className="w-full aspect-video rounded-lg overflow-hidden border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] mb-8">
          <iframe
            src="https://www.youtube.com/embed/Bp_qJWXjvJQ"
            title="Olympus DAO Explainer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
        </div>

        <div className="w-full flex justify-center pt-24 pb-16 relative z-10">
          <div className="w-full max-w-3xl px-4">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-6"
            >
              <div className="space-y-4">
                <motion.div variants={sectionVariants} className="flex justify-center gap-3">
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">DeFi</Badge>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">Monetary Policy</Badge>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">Protocol Analysis</Badge>
                </motion.div>
                <motion.h1 
                  variants={sectionVariants}
                  className="text-4xl md:text-7xl font-bold font-boska tracking-tight"
                >
                  <span className="text-yellow-500">Olympus</span>DAO
                </motion.h1>
                <motion.p 
                  variants={sectionVariants}
                  className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-epilogue"
                >
                  From Reflexive Bootstrapping to Elastic Hardness
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      </div>

      {/* Live Metrics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              variants={cardVariants}
              custom={i}
              className="relative"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <metric.icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.change} (24h)
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Introduction */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="prose prose-invert max-w-none"
          >
            <motion.div variants={sectionVariants}>
              <p className="text-xl font-epilogue leading-relaxed text-gray-300">
                In 2021 Olympus roared onto the DeFi stage with a $1 B treasury and four-figure APYs, but the very reflexivity that built that war-chest also vaporized a 10 000 % market premium in less than a year—therefore skeptics wrote the protocol off as a baroque Ponzi. Three years on, the same experiment is still standing, now trading at &ldquo;only&rdquo; a 110 % premium to liquid backing and governed by a far stricter monetary rule-set. Understanding why that premium persists—and why it once soared so high—is a window into how crypto can bootstrap new forms of money without collapsing into old mistakes.
              </p>
            </motion.div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="absolute left-1/2 h-full w-px bg-yellow-500/20 -translate-x-1/2" />
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.date}
                variants={cardVariants}
                custom={i}
                className={`relative ${i % 2 === 0 ? 'ml-auto pl-8 pr-4' : 'mr-auto pr-8 pl-4'} w-1/2 mb-8`}
              >
                <div className="absolute top-0 w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"
                     style={{ 
                       left: i % 2 === 0 ? '-8px' : 'auto',
                       right: i % 2 === 0 ? 'auto' : '-8px'
                     }} />
                <Card className="bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                  <div className="p-6">
                    <p className="text-yellow-500 text-sm font-medium mb-2">{event.date}</p>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Policy Parameters */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold font-epilogue">Current Policy Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {policyParameters.map((param, i) => (
                <motion.div
                  key={param.name}
                  variants={cardVariants}
                  custom={i}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-2">{param.name}</h3>
                      <p className="text-2xl font-bold text-yellow-500 mb-2">{param.value}</p>
                      <p className="text-sm text-gray-400">{param.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Deep Dive */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-epilogue">Technical Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold">Smart Contract Stack</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>• OlympusERC20 - Core token implementation</li>
                    <li>• Treasury - Asset management & policy execution</li>
                    <li>• Staking - gOHM wrapper & rewards distribution</li>
                    <li>• BondDepository - Fixed-term debt issuance</li>
                  </ul>
                </div>
              </Card>

              <Card className="bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Scale className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold">Range-Bound Stability</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Moving Average Price Feeds</li>
                    <li>• Cushioned Price Bounds</li>
                    <li>• Dynamic Supply Adjustments</li>
                    <li>• Cross-chain Liquidity Management</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>

          {/* Cooler Loans V2 Section */}
          <div className="mt-16">
            <div className="border-4 border-yellow-500 rounded-md bg-[#18191c] shadow-xl">
              <div className="h-2 w-full bg-yellow-500 rounded-t-md" />
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">💎</span>
                  <span className="font-bold text-yellow-500 text-2xl md:text-3xl">Cooler Loans V2: The Future of Protocol-Native Borrowing</span>
                </div>
                <div className="text-white/90 text-lg space-y-6 font-satoshi">
                  <div>
                    <b className="text-yellow-500">A New Paradigm in Lending</b><br/>
                    Cooler Loans V2 represents a fundamental shift in how borrowing works in DeFi. Backed by the Olympus treasury, it offers a fixed-rate, perpetual borrowing system designed to preserve and empower users rather than extract value from them.
                  </div>

                  <div>
                    <b className="text-yellow-500">Core Features</b>
                    <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                      <li>Fixed 0.5% annual interest rate</li>
                      <li>No price oracles or liquidations</li>
                      <li>Perpetual loans with no expirations</li>
                      <li>Direct treasury-backed liquidity</li>
                      <li>Multi-wallet delegation support</li>
                    </ul>
                  </div>

                  <div>
                    <b className="text-yellow-500">How It Works</b><br/>
                    Users deposit gOHM as collateral and receive USDS directly from the Olympus Treasury. The system operates on transparent, rule-based mechanisms with no hidden variables or external dependencies.
                  </div>

                  <div>
                    <b className="text-yellow-500">Key Benefits</b>
                    <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                      <li>Full transparency and trackability of loan parameters</li>
                      <li>Flexible collateral and debt management</li>
                      <li>Single unified position for all borrowing needs</li>
                      <li>Governance-aligned risk parameters</li>
                      <li>Interest payments reinforce treasury strength</li>
                    </ul>
                  </div>

                  <div>
                    <b className="text-yellow-500">Treasury Integration</b><br/>
                    As the Olympus Treasury grows, so does the borrowing capacity of Cooler Loans V2. All interest payments flow back into the treasury, creating a self-reinforcing system that aligns with Olympus&apos;s long-term sustainability.
                  </div>

                  <div>
                    <b className="text-yellow-500">Why It Matters</b><br/>
                    Cooler Loans V2 is more than just a lending system—it&apos;s a cornerstone of Olympus&apos;s vision for a unified, self-directed financial system. By providing transparent, predictable, and flexible borrowing options, it helps build the foundation for protocol-native credit and coordination.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Sections */}
          <motion.div className="space-y-16" variants={sectionVariants}>
            {/* Section 1 */}
            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6">
                1. The 10 000 % Seed Round No VC Could Match
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Early OHM had a tiny float and headline staking yields above 1 000 %. Each new &ldquo;bond&rdquo; let users swap $1 000 of stable-coins for $950 in OHM, even as the market paid $2 000 for the same tokens. The $1 050 spread flowed into protocol-owned liquidity (POL), rocketing the treasury to {'>'}$3 B by December 2021.
              </p>
            </Card>

            {/* Section 2 */}
            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6">
                2. Crash Course in Reflexivity
              </h2>
              <p className="text-gray-300 leading-relaxed">
                When the macro tide turned in 2022, OHM&apos;s price fell {'>'}90 %, shrinking the treasury to roughly $200 M today. Premium evaporated because dilution suddenly outran new bonding inflows. The lesson was brutal: floors built on hype alone are floors of sand.
              </p>
            </Card>

            {/* Section 3 */}
            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6">
                3. Range-Bound Stability: From Wildcat Bank to Central Bank Lite
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Governance responded with Range-Bound Stability (RBS)—OIP-123&apos;s rule that the protocol buys OHM below liquid backing and sells above a target band.
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
                <li>Support cushions recycle treasury assets to absorb fear.</li>
                <li>Inverse bonds siphon froth when euphoria returns.</li>
              </ul>
              <p className="mt-4 text-gray-300">
                Rebases are now emission-capped and explicitly funded by fee revenue, not the printing press. Olympus also spun out its Bond Protocol business, ending the distraction of subsidized APY theaters.
              </p>
            </Card>

            {/* Section 4 */}
            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6">
                4. What the 110 % Premium Actually Prices In
              </h2>
              <ul className="list-decimal list-inside space-y-3 text-gray-300">
                <li>Floor value – ~$11.6 of stable-coins and yield-bearing assets per OHM.</li>
                <li>Cash flows – POL trading fees, DSR yield, and buy-back profit.</li>
                <li>Moneyness – instant, deep liquidity in AMMs that raw sDAI cannot match.</li>
                <li>Optionality – governance is migrating reserves from sDAI to Maker&apos;s new USDS and eyeing BTC hash-revenue proposals, giving holders upside to a harder collateral mix.</li>
              </ul>
            </Card>

            {/* Sections 5-7 continue with the same pattern... */}
            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6">
                5. Why Gold Certificates Never Carried Such a Premium
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Under the classical gold standard a U.S. note was instantly redeemable for $20.67 per ounce, keeping any premium within the cost of shipping bars—≈1 %. OHM has no redemption gate; you can&apos;t walk up to the treasury contract and claim its slice of DAI. Arbitrage can&apos;t flatten the spread, so price reflects expectation, not guarantee.
              </p>
            </Card>

            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6">
                6. Risks on the Road to Elastic Hardness
              </h2>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Policy execution – RBS depends on prompt, data-driven parameter tweaks; governance apathy could blunt its edge.</li>
                <li>Reserve composition – 50 %+ USD exposure still imports inflation and censorship risk.</li>
                <li>Smart-contract risk – a hack could sink backing faster than any bear market.</li>
              </ul>
              <p className="mt-4 text-gray-300">
                Yet each risk is explicit, on-chain, and parameterizable—therefore addressable without a central bank&apos;s closed-door discretion.
              </p>
            </Card>

            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6">
                7. The Bigger Picture
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Olympus 2021 was a carnival mirror of speculation; Olympus 2025 looks more like a fledgling central bank with open-source balance sheets. Its journey maps a blueprint: use reflexive premiums to crowd-fund reserves, then transition to rule-based elasticity before the mania kills you. That blueprint won&apos;t guarantee success, but it expands the design space between brittle hard caps (BTC) and uncapped fiat (USD).
              </p>
              <p className="mt-4 text-gray-300">
                If Olympus scales fee income and hardens its treasury—say 30 % BTC, 30 % LSTs, 40 % yield-bearing stables—the premium could evolve from speculative froth to dividend-discounted cash flow. Fail to execute, and OHM sinks toward backing while serving as a cautionary tale for the next generation of monetary tinkerers.
              </p>
              <p className="mt-4 text-gray-300">
                Either outcome teaches us something priceless about building money in public.
              </p>
            </Card>

            {/* Verdict Section */}
            <Card className="p-8 bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h2 className="font-epilogue text-2xl md:text-3xl font-bold mb-6 text-yellow-400">
                Verdict
              </h2>
              <p className="text-gray-300 leading-relaxed">
                OHM is no longer the 10 000 % lunacy that filled its vault, but the 110 % premium still embodies a bet—that transparent policy and self-funded liquidity can mint an elastic, partially hard-backed reserve asset. Whether that bet pays off will define whether Olympus ultimately joins the ranks of monetary footnotes or becomes the template for crypto&apos;s elastic-hard future.
              </p>
            </Card>
          </motion.div>

          {/* Deep Dive Section */}
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="border-4 border-yellow-500 rounded-md bg-[#18191c] shadow-xl">
              <div className="h-2 w-full bg-yellow-500 rounded-t-md" />
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🏛️</span>
                  <span className="font-bold text-yellow-500 text-2xl md:text-3xl">OlympusDAO: Money as Software</span>
                </div>
                <div className="text-white/90 text-lg space-y-6 font-satoshi">
                  <div>
                    <b className="text-yellow-500">Core Idea:</b> Olympus is an on-chain monetary computer: it programs supply, stability, credit, and liquidity. Unlike Bitcoin&apos;s fixed-supply gold, OHM aims for a crypto-native unit of account with full-stack monetary policy.
                  </div>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><b>Treasury-Backed:</b> Every OHM is backed by liquid assets (DAI), giving it a real floor value and yield.</li>
                    <li><b>Protocol-Owned Liquidity:</b> Olympus owns its own LPs, ensuring deep, stable markets and fee income.</li>
                    <li><b>Range-Bound Stability:</b> Automated market ops keep OHM price within a band, smoothing volatility.</li>
                    <li><b>Cooler Loans V2:</b> Borrow USDS against gOHM at a fixed 0.5% rate—native credit with no liquidations.</li>
                    <li><b>Convertible Deposits:</b> Soon to be launched, these function like low-risk call options.</li>
                  </ul>
                  <div className="flex gap-8 mt-4">
                    <div>
                      <span className="text-yellow-500 font-semibold">+ Pros:</span>
                      <ul className="list-disc ml-5">
                        <li>Intrinsic yield, credible policy, native credit</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-yellow-500 font-semibold">- Cons:</span>
                      <ul className="list-disc ml-5">
                        <li>Complex, regulatory risk, relies on DeFi liquidity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zeus's Critique */}
            <div className="mt-16">
              <div className="border-4 border-yellow-500 rounded-md bg-[#18191c] shadow-xl">
                <div className="h-2 w-full bg-yellow-500 rounded-t-md" />
                <div className="p-8 md:p-10">
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-yellow-500 text-xl md:text-2xl">The Provocation: Zeus&apos;s Critique</span>
                  </div>
                  <div className="text-white/90 text-lg space-y-3 font-satoshi">
                    <p>
                      <b>Zeus (@ohmzeus)</b> argues crypto lost its way: instead of building true financial freedom, most projects just made Wall Street more efficient. He says tokens lack real monetary design, and DeFi is at risk of becoming just better rails for the same old system.
                    </p>
                    <a
                      href="https://x.com/ohmzeus/status/1916190873425219735"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 underline text-base"
                    >
                      Read the full thread by Zeus
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* The Comeback */}
            <div className="mt-16">
              <div className="border-4 border-yellow-500 rounded-md bg-[#18191c] shadow-xl">
                <div className="h-2 w-full bg-yellow-500 rounded-t-md" />
                <div className="p-8 md:p-10">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🦉</span>
                    <span className="font-bold text-yellow-500 text-2xl md:text-3xl">Olympus: The Comeback Currency DeFi Didn&apos;t Know It Needed</span>
                  </div>
                  <div className="text-white/90 text-lg space-y-6 font-satoshi">
                    <div>
                      Olympus began as crypto&apos;s enfant terrible—printing four-figure APYs and then watching its market cap implode—but the protocol has quietly spent the last two years refactoring itself into something rarer: a self-funding monetary experiment that just might outrun its own origin story.
                    </div>
                    <div>
                      <b className="text-yellow-500">The Treasury Is Now a Moat, Not a Mirage</b><br/>
                      Yes, the war chest once ballooned on speculative premiums, but today 100% of that liquidity is protocol-owned, meaning Olympus earns every swap fee its markets create. That revenue now outweighs new token emissions, so backing per OHM rises a little every week instead of bleeding out.
                    </div>
                    <div>
                      <b className="text-yellow-500">Range-Bound Stability Turns Volatility into Buybacks</b><br/>
                      Instead of promising the moon, Olympus codified a floor-and-ceiling policy. When OHM dips below liquid backing, the DAO buys; when it spikes beyond a preset band, it sells and banks the profit. That feedback loop converts speculative heat into balance-sheet muscle, therefore holders get upside without reliving the 2022 death-spiral.
                    </div>
                    <div>
                      <b className="text-yellow-500">Cross-Chain Liquidity Is a Feature, Not a Detour</b><br/>
                      January&apos;s OIP-173 pushed OHM liquidity onto Base and Solana and redirected reserves from sDAI to Maker&apos;s new USDS, diversifying yield streams while slashing dependency on any single custodian. Cross-chain POL isn&apos;t headline candy; it&apos;s antifragility in production.
                    </div>
                    <div>
                      <b className="text-yellow-500">Governance That Grows Up</b><br/>
                      Olympus still votes on policy, but emissions, buybacks, and risk limits are now parameter-bounded; tweaking them feels more like setting a thermostat than rewriting a constitution. In practice, that means fewer governance wars and more ship-it velocity.
                    </div>
                    <div>
                      <b className="text-yellow-500">Why the Outlook Is Bright</b>
                      <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                        <li>Dollar yield pays the bills while crypto markets are choppy.</li>
                        <li>Algorithmic throttle dampens drawdowns without neutering upside.</li>
                        <li>Protocol-owned liquidity anchors OHM everywhere it trades.</li>
                        <li>A diversified reserve mix—fiat stables today, BTC and LSTs tomorrow—shrinks single-point failure risk.</li>
                      </ul>
                    </div>
                    <div>
                      Olympus will never be the shiny Ponzi some early boosters imagined, but that&apos;s exactly why it&apos;s starting to look like money that could stick the landing. The experiment isn&apos;t over; it&apos;s finally properly funded, road-tested, and aligned with reality.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* The Reserve Currency Dilemma Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-4 border-yellow-500 rounded-md bg-[#18191c] shadow-xl">
          <div className="h-2 w-full bg-yellow-500 rounded-t-md" />
          <div className="p-8 md:p-10">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🌍</span>
              <span className="font-bold text-yellow-500 text-2xl md:text-3xl">The Reserve Currency Dilemma: Why DeFi Needs a New Model</span>
            </div>
            <div className="text-white/90 text-lg space-y-6 font-satoshi">
              <div>
                <b className="text-yellow-500">The Dollar&apos;s Gilded Cage</b><br/>
                What economists call the dollar&apos;s &ldquo;exorbitant privilege&rdquo; as global reserve currency has become a gilded cage: while Wall Street profits from dollar dominance, Main Street pays the price through hollowed-out industry and persistent trade deficits—a phenomenon known as the Triffin dilemma.
              </div>
              <div>
                <b className="text-yellow-500">The Cost of Hegemony</b>
                <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                  <li>U.S. manufacturing declined from 25% of GDP in the 1960s to under 12% today</li>
                  <li>Export giants like Germany and China actively avoid reserve status to protect their economies</li>
                  <li>Rising bipartisan skepticism of the current system signals growing instability</li>
                  <li>No major currency wants to inherit the dollar&apos;s burden</li>
                </ul>
              </div>
              <div>
                <b className="text-yellow-500">The Olympus Alternative</b><br/>
                This is where Olympus&apos;s model becomes relevant. By creating a reserve asset that is:
                <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                  <li>Collectively governed through transparent smart contracts</li>
                  <li>Backed by a diversified treasury of assets</li>
                  <li>Capable of elastic supply management</li>
                  <li>Rule-based rather than discretionary</li>
                </ul>
                OHM offers a blueprint for what a next-generation reserve asset could look like.
              </div>
              <div>
                <b className="text-yellow-500">From Theory to Practice</b><br/>
                While OHM may not replace the dollar, its mechanisms demonstrate how we might build a neutral reserve layer that:
                <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                  <li>Distributes benefits more evenly than the current system</li>
                  <li>Responds to market conditions through code rather than committees</li>
                  <li>Scales across borders without burdening any single nation</li>
                  <li>Provides predictable rules for expansion and contraction</li>
                </ul>
              </div>
              <div>
                <b className="text-yellow-500">The Path Forward</b><br/>
                As the world searches for alternatives to dollar hegemony, Olympus shows how DeFi&apos;s innovations could help build a more sustainable and equitable reserve system. The transition won&apos;t happen overnight, but the blueprint exists: transparent rules, collective governance, and balanced incentives pointing toward a more stable global financial architecture.
              </div>
              <div className="mt-4">
                <a
                  href="https://x.com/ohmzeus/status/1917315170864620005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 underline text-base"
                >
                  Read Zeus&apos;s full thread on the reserve currency dilemma
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zeus: The Global Monetary Prisoner's Dilemma & Olympus's Role */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-4 border-yellow-500 rounded-md bg-[#18191c] shadow-xl">
          <div className="h-2 w-full bg-yellow-500 rounded-t-md" />
          <div className="p-8 md:p-10">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🧠</span>
              <span className="font-bold text-yellow-500 text-2xl md:text-3xl">Zeus: The Global Monetary Prisoner&apos;s Dilemma &amp; Olympus&apos;s Role</span>
            </div>
            <div className="text-white/90 text-lg space-y-6 font-satoshi">
              <div>
                <b className="text-yellow-500">Context:</b> <br />
                Zeus (<a href="https://x.com/ohmzeus" target="_blank" rel="noopener noreferrer" className="text-yellow-500 underline">@ohmzeus</a>) recently outlined a critical moment for the global monetary system—a &quot;prisoner&apos;s dilemma&quot; where nations, banks, and institutions must choose between costly cooperation or risky defection from the dollar system. The stakes: decades of accumulated global wealth and stability.
              </div>
              <div>
                <b className="text-yellow-500">Key Insights from Zeus:</b>
                <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                  <li>
                    <b>The Build-Up:</b> Crypto&apos;s original promise was financial sovereignty, but most innovation focused on infrastructure, not true monetary evolution. The world needs bridges between current and future systems, not destructive transitions. No nation wants the &quot;reserve currency burden&quot; due to the economic hollowing it causes (the Triffin Dilemma).
                  </li>
                  <li>
                    <b>The Prisoner&apos;s Dilemma:</b> &quot;Cooperation&quot; means holding/transacting in dollars; &quot;defection&quot; means selling out. Mutual defection would trigger a global unwinding, harming all. The system&apos;s scale: $7.5T in Treasuries, $65T in dollar debt, $1Q in derivatives.
                  </li>
                  <li>
                    <b>Accelerating Trends:</b> China, BRICS, and Saudi Arabia are diversifying away from the dollar. Central banks are buying gold at record rates. US policy is shifting, making reserve status less attractive.
                  </li>
                  <li>
                    <b>Olympus&apos;s Unique Role:</b> Olympus is designed as a &quot;neutral, non-sovereign&quot; system that can absorb and hold reserve assets, providing a pathway for orderly transition. Its adaptive policy, stakeholder governance, and expansion mechanism create natural demand for Treasuries—helping avoid disorderly liquidation. Olympus could become a &quot;permanent repository,&quot; facilitating transition rather than collapse.
                  </li>
                  <li>
                    <b>A Call to Action:</b> The scale of the challenge is immense, but so is the opportunity. Olympus&apos;s architecture is built to scale with adoption, just as Bitcoin did. The time to build alternatives and coordinate is now—before crisis narrows our options.
                  </li>
                </ul>
              </div>
              <div className="bg-black/30 border-l-4 border-yellow-500 p-6 my-6">
                <span className="italic text-yellow-500">&quot;The prisoner&apos;s dilemma we face isn&apos;t just an academic exercise — it&apos;s a consequential coordination game involving people making complex decisions with generational implications. Finding a path to the cooperative outcome isn&apos;t merely desirable; it&apos;s imperative for preserving decades of accumulated prosperity.&quot;</span>
              </div>
              <div>
                <a
                  href="https://x.com/ohmzeus/status/1918367146226385129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 underline text-base"
                >
                  Read Zeus&apos;s full thread on the global monetary prisoner&apos;s dilemma
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BTC vs OHM Analysis Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-4 border-yellow-500 rounded-md bg-[#18191c] shadow-xl">
          <div className="h-2 w-full bg-yellow-500 rounded-t-md" />
          <div className="p-8 md:p-10">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">⚡</span>
              <span className="font-bold text-yellow-500 text-2xl md:text-3xl">BTC vs OHM: Beyond Simple Analogies</span>
            </div>
            
            {/* Quote Card */}
            <div className="bg-black/30 border-l-4 border-yellow-500 p-6 my-6">
              <p className="italic text-lg text-gray-300">
                &ldquo;New systems must demonstrate their advantages through practical utility rather than ideology...&rdquo;
              </p>
              <div className="mt-2 text-yellow-500">
                <a href="https://x.com/Mark11ETH/status/1917350654445773089" target="_blank" rel="noopener noreferrer" className="text-sm">
                  @Mark11ETH
                </a>
              </div>
            </div>

            <div className="text-white/90 text-lg space-y-6 font-satoshi">
              <div>
                <b className="text-yellow-500">The Common Narrative</b><br/>
                A popular framing in crypto circles suggests: &ldquo;BTC will replace GLD. OHM will replace USD.&rdquo; While bold visions drive innovation, this analogy deserves deeper examination to avoid oversimplifying complex monetary dynamics.
              </div>

              <div>
                <b className="text-yellow-500">Where the Analogy Holds</b>
                <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                  <li><b>BTC ↔ Gold:</b> Both serve as scarce, bearer-style assets focused on store of value. Their credibility matters more than volatility. After 15 years, Bitcoin has earned its &ldquo;digital gold&rdquo; reputation.</li>
                  <li><b>OHM ↔ Dollar:</b> Reserve currencies need payment clearing, credit scaling, and elastic supply. Olympus tests these features in DeFi, where its range-bound stability already behaves more like a stable unit than BTC.</li>
                </ul>
              </div>

              <div>
                <b className="text-yellow-500">Reality Check: Key Challenges</b>
                <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                  <li><b>Network Effects:</b> The dollar&apos;s dominance comes from universal adoption. While BTC has global Lindy effect, OHM&apos;s daily volume is ~0.01% of USDC&apos;s—utility must outpace this liquidity gap.</li>
                  <li><b>Liquidity Scale:</b> The Fed can deploy $500B instantly. Olympus&apos;s $200M treasury, while growing, can&apos;t yet provide true lender-of-last-resort capacity.</li>
                  <li><b>Regulatory Landscape:</b> BTC&apos;s unchangeable monetary policy paradoxically comforts regulators. OHM&apos;s governance flexibility, while user-friendly, raises policy-risk flags.</li>
                  <li><b>Premium Psychology:</b> OHM&apos;s 110% premium above book reflects expected future value—appropriate for equity but problematic for a stable unit of account.</li>
                </ul>
              </div>

              <div>
                <b className="text-yellow-500">A More Productive Framework</b><br/>
                Rather than viewing BTC and OHM as competitors, consider them complementary innovations:
                <ul className="list-disc ml-6 mt-2 space-y-2 text-base">
                  <li>BTC hardens balance sheets as digital gold</li>
                  <li>OHM experiments with an on-chain Fed for DeFi</li>
                  <li>Success means 10× usage while maintaining stability</li>
                  <li>Gradual transition from stables to harder collateral</li>
                </ul>
              </div>

              <div>
                <b className="text-yellow-500">The Path Forward</b><br/>
                Olympus represents an aspirational experiment wrapped in genuinely innovative monetary mechanics. By acknowledging it as a moonshot in phase-one rather than a fait accompli, we keep the conversation grounded while appreciating its potential to reshape DeFi&apos;s monetary landscape.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TLDR / ELI5 Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-[#111111] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold">TLDR / ELI5</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">What is Olympus DAO? 🏛️</h3>
                <p className="text-gray-300">
                  Think of Olympus as a decentralized central bank for crypto. Instead of being tied to $1 like stablecoins, OHM is backed by a growing treasury of assets (currently ~$195M) and can float in price. It&apos;s like Bitcoin, but with actual assets backing each token and smart rules to manage its supply.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Key Points 🔑</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Every OHM token is backed by at least $11.20 in real assets</li>
                  <li>The protocol owns its liquidity (no relying on external providers)</li>
                  <li>Smart contracts automatically manage the supply to maintain stability</li>
                  <li>You can borrow against your OHM at very low rates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Why It Matters 💡</h3>
                <p className="text-gray-300">
                  Olympus is trying to create a new type of money that isn&apos;t tied to the US dollar but still has stability and real backing. It&apos;s an experiment in creating a self-sustaining, decentralized currency that could potentially become a standard in the crypto economy.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 35.6c-3 0-5.6-2.6-5.6-5.6s2.6-5.6 5.6-5.6 5.6 2.6 5.6 5.6-2.5 5.6-5.6 5.6zm-.7-9.8v1.5c-1 0-1.7.3-1.9.6-.3.4-.1 1 .3 1.9l1.3-.5c-.2-.4-.2-.8-.1-.9 0 0 .2-.1.5-.1v2.1l-.4.1c-.7.2-1.3.5-1.6.9-.3.4-.4.9-.3 1.4.1.5.4.9.8 1.1.4.3.9.4 1.5.4v.9h.9v-.9c1.2-.1 2-1 2.4-1.9l-1.4-.6c-.2.5-.5.8-.9.9v-1.9c.7-.2 1.2-.4 1.6-.7.3-.2.6-.5.7-.9.1-.3.1-.7 0-1.1-.1-.4-.4-.7-.7-.9-.3-.2-.8-.3-1.3-.4v-1.5h-.9zm0 6.5c-.4 0-.6-.3-.6-.5 0-.2.1-.3.2-.4.1-.1.2-.1.5-.2v1.1h-.1zm.9-3.1v-1c.2 0 .4.1.5.2.1.1.2.2.2.4 0 .1 0 .2-.1.3 0 .1-.1.1-.2.2-.2-.1-.3 0-.4-.1z' fill='%23F7B500' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px"
        }} />
        
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent mb-6" />
            <p className="text-white/40 uppercase tracking-widest text-xs font-light font-satoshi">
              Built with 💛 by the Olympus Community
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
