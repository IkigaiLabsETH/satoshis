'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, Shield, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from "@/components/ui/card"

const AccordionItem = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-yellow-500/20">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium text-white">{title}</span>
        <ChevronDown
          className={cn('h-6 w-6 transition-transform text-yellow-500', {
            '-rotate-180': isOpen,
          })}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-white/80">
          {children}
        </div>
      )}
    </div>
  )
}

const marketStats = [
  {
    title: "Market Cap",
    value: "$1.6T+",
    description: "Total Bitcoin MC"
  },
  {
    title: "24h Volume",
    value: "$25B+",
    description: "Daily trading volume"
  },
  {
    title: "Dominance",
    value: "60%+",
    description: "Share of total crypto MC"
  },
  {
    title: "Circulating Supply",
    value: "19.5M BTC",
    description: "Of 21M maximum supply"
  }
]

const keyEvents = [
  {
    year: "2026",
    events: [
      "Fifth Bitcoin halving preparation",
      "Global regulatory frameworks mature",
      "Quantum-resistant signature implementation",
      "Nation-state adoption expands",
      "DeFi-Bitcoin integration acceleration"
    ]
  },
  {
    year: "2025",
    events: [
      "Expected central bank digital currency launches",
      "Layer 2 daily transactions surpass 1M",
      "Major sovereign wealth fund adoption",
      "Enhanced privacy features deployment",
      "Cross-chain interoperability expansion"
    ]
  },
  {
    year: "2024",
    events: [
      "Spot Bitcoin ETF approval by SEC (January)",
      "Fourth Bitcoin halving (April) - Block reward reduces to 3.125 BTC",
      "Major banks launch Bitcoin custody services",
      "Lightning Network capacity exceeds 10,000 BTC",
      "Global institutional inflows reach new highs"
    ]
  },
  {
    year: "2023",
    events: [
      "Bitcoin surpasses $44,000 (December)",
      "BlackRock files for spot Bitcoin ETF",
      "Lightning Network reaches 5,000+ BTC capacity",
      "MicroStrategy holdings exceed 150,000 BTC",
      "El Salvador Bitcoin bonds development"
    ]
  },
  {
    year: "2022",
    events: [
      "Market correction to $15,700 (November)",
      "Mining hash rate hits 300 EH/s",
      "Taproot adoption reaches 50%",
      "Lightning Network growth +400%",
      "FTX collapse impacts market"
    ]
  },
  {
    year: "2021",
    events: [
      "Bitcoin reaches ATH of $69,000 (November)",
      "El Salvador adopts Bitcoin as legal tender",
      "China bans Bitcoin mining",
      "Taproot upgrade activation",
      "Tesla adds Bitcoin to balance sheet"
    ]
  },
  {
    year: "2020",
    events: [
      "Third Bitcoin halving - Block reward to 6.25 BTC",
      "MicroStrategy adopts Bitcoin standard",
      "PayPal enables Bitcoin trading",
      "Bitcoin surpasses $20,000 previous ATH",
      "Institutional adoption begins"
    ]
  },
  {
    year: "2017",
    events: [
      "Bitcoin reaches $20,000 first time",
      "SegWit activation",
      "Bitcoin Cash hard fork",
      "Lightning Network whitepaper",
      "Crypto market cap exceeds $100B"
    ]
  },
  {
    year: "2016",
    events: [
      "Second Bitcoin halving - Block reward to 12.5 BTC",
      "Ethereum DAO hack impacts crypto markets",
      "Bitfinex hack of 120,000 BTC",
      "Lightning Network development begins",
      "Bitcoin scaling debate intensifies"
    ]
  },
  {
    year: "2013",
    events: [
      "Bitcoin surpasses $1,000 first time",
      "First Bitcoin ATM installed in Vancouver",
      "Mt. Gox handles 70% of all Bitcoin trades",
      "China&apos;s first crypto ban",
      "US Senate holds first Bitcoin hearing"
    ]
  },
  {
    year: "2012",
    events: [
      "First Bitcoin halving - Block reward to 25 BTC",
      "Coinbase founded",
      "Bitcoin Foundation established",
      "Payment processor BitPay exceeds 1,000 merchants",
      "Bitcoin Magazine launches"
    ]
  },
  {
    year: "2011",
    events: [
      "Bitcoin reaches price parity with USD",
      "WikiLeaks begins accepting Bitcoin",
      "Mt. Gox becomes dominant exchange",
      "First major security breach (Mt. Gox)",
      "Silk Road marketplace launches"
    ]
  },
  {
    year: "2010",
    events: [
      "First Bitcoin transaction (10,000 BTC for pizza)",
      "Bitcoin Market established",
      "Mt. Gox cryptocurrency exchange founded",
      "Bitcoin reaches $0.10",
      "Mining pool launched"
    ]
  },
  {
    year: "2009",
    events: [
      "Genesis block mined by Satoshi Nakamoto (January 3)",
      "First Bitcoin transaction to Hal Finney",
      "Bitcoin software v0.1 released",
      "First Bitcoin exchange rate established",
      "New Liberty Standard sets BTC at $0.00076"
    ]
  }
]

export default function BitcoinPage() {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Monetary Rebellion • Digital Gold • Freedom Money</p>
          <h1 className="text-center">
            <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
              Bitcoin
            </span>
          </h1>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-24 bg-yellow-500/30"></div>
            <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">The Final Protest Vote</p>
            <div className="h-px w-24 bg-yellow-500/30"></div>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <div className="relative p-4 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/7hyoONj4nEY"
                title="Bitcoin Explained"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

        {/* Museum Narrative Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-yellow-500">The Bitcoin Manifesto</h2>
              <div className="mt-8 space-y-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/80 leading-relaxed">
                    The American middle class is dead. Buried. Cremated. Ashes sold to Fidelity for collateral.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    The boomers bought homes for 2x income. The zoomers buy iced coffee for 2x minimum wage.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    You work 60 hours a week, pay half to taxes, half to debt, and beg for 3% raises while inflation eats 8%.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    The food is fake. The money is fake. The jobs are fake. The politics are fake. The news is fake. The culture is fake. The friends are fake. The optimism is fake.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    But the CRISIS is REAL.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    You are renting your existence from the Federal Reserve. The system is functioning exactly as designed - to extract every ounce of your productive energy and convert it into corporate share buybacks and banker bonuses.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    Bitcoin is your life raft. The monetary rebellion against the American debt cartel. The final protest vote against a parasitic system that turned your labor into clown coupons.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    You will not &quot;buy Bitcoin someday.&quot; You will buy Bitcoin or you will own nothing.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    Fiat dies. Bitcoin lives. Choose.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 mt-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-yellow-500">Bitcoin Is Not Crypto</h3>
                    <p className="text-white/80 leading-relaxed">
                      You turn the corner, and suddenly the lights shift. ICOs. NFTs. Luna. FTX. The floor tilts under your feet.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      This wing of the museum feels different. Flashier. Faster. But also… hollow.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      A guide whispers: &quot;Bitcoin is not crypto. It&apos;s the foundation. The rest is noise.&quot;
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      And now it clicks. Bitcoin isn&apos;t trying to sell you something. It&apos;s not trying to pump. It&apos;s not VC-backed. It doesn&apos;t have a marketing team. It doesn&apos;t move fast and break things.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      It just… is.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-yellow-500">The Emotional Architecture</h3>
                    <p className="text-white/80 leading-relaxed">
                      This museum doesn&apos;t give you a product to buy. It gives you something rarer: context.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      Bitcoin emerged not as tech hype — but as a cultural response. It is a refusal.
                      A refusal to trust those who&apos;ve broken trust.
                      A refusal to let banks gamble with your savings.
                      A refusal to let borders, governments, or corporations decide who deserves access to wealth.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      It&apos;s a form of civil disobedience written in code. A slow revolution. No leaders. No pause button. No CEO.
                    </p>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">Bitcoin as Culture</h3>
                  <p className="text-white/80 leading-relaxed">
                    People think Bitcoin is too technical. But the real barrier isn&apos;t the tech — it&apos;s the framing.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Most people didn&apos;t understand the internet in the &apos;90s either. They understood the websites they loved.
                    Most people don&apos;t understand TCP/IP, but they use Instagram.
                    You don&apos;t need to explain how Bitcoin works. You need to show why it matters.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    That&apos;s why we need galleries. Zines. Films. Stories.
                    We need memes more than whitepapers.
                    We need timelines more than tickers.
                    We need places where people can wander into the Bitcoin story and feel something.
                  </p>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">Not About Convincing. About Curating.</h3>
                  <p className="text-white/80 leading-relaxed">
                    You can&apos;t evangelize Bitcoin. You can&apos;t &quot;sell&quot; decentralization.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    But you can curate a space where people can come to their own conclusions. That&apos;s the beauty of a museum. You walk. You look. You think. You don&apos;t get yelled at. You just… explore.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Bitcoin doesn&apos;t need to be simplified — it needs to be humanized.
                  </p>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">Final Thought</h3>
                  <p className="text-white/80 leading-relaxed">
                    Maybe the best way to understand Bitcoin isn&apos;t through a podcast or a YouTube tutorial. Maybe it&apos;s through a photograph. A headline. A letter. A meme.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Something real. Something felt.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Bitcoin isn&apos;t a product. It&apos;s a story.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    And the next chapter? That&apos;s up to us.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Market Stats */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {marketStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium text-white/80">{stat.title}</h3>
                  <p className="mt-2 text-3xl font-bold text-yellow-500">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/60">{stat.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Bitcoin Fundamentals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-yellow-500">Bitcoin Fundamentals</h2>
                <div className="mt-8 space-y-4">
                  <AccordionItem title="What is Bitcoin?">
                    Bitcoin is a decentralized digital currency created in 2009 by the pseudonymous Satoshi Nakamoto. It operates on a peer-to-peer network without the need for intermediaries, revolutionizing the concept of money. Key features include:
                    <ul className="mt-4 list-disc pl-4 space-y-2">
                      <li>Supply of 21 million BTC - mathematically enforced scarcity</li>
                      <li>Transparent transaction ledger secured by 400K+ nodes</li>
                      <li>Secured by proof-of-work consensus with 400+ EH/s hash rate</li>
                      <li>Global, borderless transactions processed 24/7/365</li>
                      <li>Self-custodial ownership with cryptographic security</li>
                      <li>10-minute block time with 7 transactions per second</li>
                      <li>Layer 2 scaling solutions enabling millions of transactions</li>
                    </ul>

                    <div className="mt-8 p-6 bg-black/20 rounded-lg border border-yellow-500/20">
                      <h4 className="text-xl font-bold text-yellow-500 mb-4">Historical Performance</h4>
                      <div className="space-y-4 text-white/80">
                        <p>
                          Since September 2014, Bitcoin has outperformed every major company stock in the world, falling behind only NVIDIA, which delivered an incredible +28,700%, compared to Bitcoin&apos;s +23,500% over the same period.
                        </p>
                        <p>
                          But when we zoom out to the beginning — back to 2009, the story changes completely. Back then, on forums like Bitcointalk, BTC was traded for pennies, with prices ranging between $0.0008 and $0.001 in peer-to-peer transactions.
                        </p>
                        <div className="bg-yellow-500/10 p-4 rounded-lg">
                          <p className="font-medium text-yellow-500">🔍 Fun Fact</p>
                          <p className="mt-2">
                            The lowest recorded price ever for Bitcoin was $0.00061337, on December 17, 2009. Interestingly, exactly 7 years later, on December 17, 2017, Bitcoin hit the peak of that bull cycle — a moment that truly put Bitcoin on the world&apos;s radar.
                          </p>
                        </div>
                        <div className="bg-yellow-500/10 p-4 rounded-lg">
                          <p className="font-medium text-yellow-500">🔥 Mind-Blowing Performance</p>
                          <p className="mt-2">
                            From that all-time low to today, Bitcoin has gained an astronomical +17,217,824,377.88% — that&apos;s 17.2 billion percent! The greatest return in financial market history.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionItem>
                  
                  <AccordionItem title="Bitcoin&apos;s Role in MSTY">
                    Bitcoin&apos;s price movements directly affect MSTY through MicroStrategy&apos;s significant Bitcoin holdings:
                    <ul className="mt-4 list-disc pl-4 space-y-2">
                      <li>MSTR stock price correlation with Bitcoin exceeds 0.9 correlation coefficient</li>
                      <li>Impact on MSTY options premiums through volatility dynamics</li>
                      <li>Strategic influence on delta-neutral trading opportunities</li>
                      <li>Volatility skew considerations in options pricing</li>
                      <li>Institutional holding patterns affect liquidity profiles</li>
                      <li>Arbitrage opportunities between MSTR and BTC markets</li>
                      <li>Leverage and margin considerations for position sizing</li>
                    </ul>
                  </AccordionItem>

                  <AccordionItem title="Market Dynamics">
                    Understanding Bitcoin market dynamics is crucial for MSTY traders:
                    <ul className="mt-4 list-disc pl-4 space-y-2">
                      <li>24/7 global trading across all major exchanges</li>
                      <li>Average daily volume exceeding $25 billion</li>
                      <li>Institutional vs retail flow analysis</li>
                      <li>On-chain metrics for market intelligence</li>
                      <li>Derivatives market impact on spot prices</li>
                      <li>Regulatory developments across jurisdictions</li>
                      <li>Macro correlation patterns with traditional markets</li>
                    </ul>
                  </AccordionItem>

                  <AccordionItem title="Technical Architecture">
                    Bitcoin&apos;s technical foundation ensures security and reliability:
                    <ul className="mt-4 list-disc pl-4 space-y-2">
                      <li>SHA-256 cryptographic security backbone</li>
                      <li>Decentralized network of 15,000+ listening nodes</li>
                      <li>Multi-signature and time-lock capabilities</li>
                      <li>Lightning Network for instant payments</li>
                      <li>Taproot upgrade for enhanced privacy</li>
                      <li>SegWit adoption exceeding 80% of transactions</li>
                      <li>Regular protocol improvements via soft forks</li>
                    </ul>
                  </AccordionItem>

                  <AccordionItem title="Investment Thesis">
                    The case for Bitcoin as a strategic asset:
                    <ul className="mt-4 list-disc pl-4 space-y-2">
                      <li>Digital gold narrative with fixed supply economics</li>
                      <li>Network effect driving exponential adoption</li>
                      <li>Institutional acceptance as treasury reserve asset</li>
                      <li>Portfolio diversification benefits</li>
                      <li>Asymmetric return potential</li>
                      <li>Sovereign wealth fund allocation potential</li>
                      <li>Central bank digital currency hedge</li>
                    </ul>
                  </AccordionItem>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Timeline and Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-yellow-500">Key Events & Timeline</h2>
                <div className="mt-8 space-y-8">
                  {(isTimelineExpanded ? keyEvents : keyEvents.slice(0, 3)).map((period) => (
                    <motion.div
                      key={period.year}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative pl-8"
                    >
                      <div className="absolute left-0 top-0 h-full w-px bg-yellow-500/20" />
                      <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-yellow-500" />
                      <h3 className="text-xl font-bold text-yellow-500">{period.year}</h3>
                      <ul className="mt-4 space-y-3">
                        {period.events.map((event, index) => (
                          <li key={index} className="text-white/80">
                            {event}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center mt-6"
                  >
                    <button
                      onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
                      className="group px-4 py-2 text-sm font-semibold text-yellow-500 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/10 transition-colors flex items-center space-x-2"
                    >
                      <span>{isTimelineExpanded ? 'Show Less' : 'Show Full Timeline'}</span>
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform', {
                          '-rotate-180': isTimelineExpanded,
                        })}
                      />
                    </button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Trading Implications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-yellow-500">Trading Implications</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <TrendingUp className="h-12 w-12 text-yellow-500" />
                  <h3 className="mt-4 text-xl font-bold text-white">Price Action</h3>
                  <p className="mt-2 text-white/80">
                    Bitcoin price movements create opportunities in MSTY options trading through their impact on MSTR stock.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 text-yellow-500" />
                  <h3 className="mt-4 text-xl font-bold text-white">Timing</h3>
                  <p className="mt-2 text-white/80">
                    Key Bitcoin events and market cycles can influence optimal entry and exit points for MSTY positions.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-yellow-500" />
                  <h3 className="mt-4 text-xl font-bold text-white">Risk Management</h3>
                  <p className="mt-2 text-white/80">
                    Understanding Bitcoin volatility is crucial for managing risk in MSTY options strategies.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Deep Dive Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          {/* YouTube Video Section */}
          <Card className="mb-16">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-yellow-500">Bitcoin Explained</h2>
                <span className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-500 rounded-full">Updated April 2024</span>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/reVebuAf_Cs"
                  title="Bitcoin Explained"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </Card>

          <Card className="transform hover:scale-[1.01] transition-transform duration-200">
            <div className="p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-between mb-8"
              >
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-2xl font-bold text-yellow-500"
                >
                  Deep Dive Analysis
                </motion.h2>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-500 rounded-full">
                    Updated April 16, 2025
                  </span>
                </div>
              </motion.div>
              
              {/* Market Landscape */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">Market Landscape</h3>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-yellow-500/10 p-3 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                        <TrendingUp className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-white">Institutional Adoption</h4>
                        <p className="text-white/80 mt-2">
                          Major financial institutions and corporations now hold Bitcoin as a treasury reserve asset, with MicroStrategy leading the charge with over 531,644 BTC. By 2025, 83% of institutional investors plan to increase crypto allocations, signaling Bitcoin&apos;s growing acceptance as a strategic asset class. A Fidelity survey in 2023 found 58% of institutional investors owned digital assets, with Bitcoin being the top choice.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-yellow-500/10 p-3 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                        <Shield className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-white">Regulatory Evolution</h4>
                        <p className="text-white/80 mt-2">
                          Global regulators are moving from uncertainty to engagement, with frameworks like MiCA providing clear rules for crypto-assets. The EU&apos;s comprehensive crypto regulation sets a precedent for other regions, balancing innovation with consumer protection and market stability. By 2050, we expect clear and standardized regulations coordinated via international bodies like FATF and BIS.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-yellow-500/10 p-3 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                        <Clock className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-white">Market Maturation</h4>
                        <p className="text-white/80 mt-2">
                          Bitcoin&apos;s market has grown to hundreds of billions in capitalization, with increasing liquidity and decreasing volatility. The Lightning Network now boasts over 15,000 public nodes and 54,000 channels, handling 6.6 million routed transactions monthly - a 1,212% increase from two years prior. By late 2023, roughly 70% of the total Bitcoin supply had not moved in over a year.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-yellow-500/10 p-3 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                        <TrendingUp className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-white">Macro Backdrop</h4>
                        <p className="text-white/80 mt-2">
                          In an environment of high global debt and inflationary pressures, Bitcoin&apos;s fixed supply and neutral monetary policy strengthen its &quot;digital gold&quot; narrative. The USD has lost ~85% of its purchasing power since the 1970s, highlighting Bitcoin&apos;s appeal as a hedge against fiat debasement. By 2050, over 98% of the 21 million BTC supply will have been mined.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Valuation Models */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-12"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">Valuation Models</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <motion.div 
                    className="bg-black/20 p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <h4 className="font-medium text-white mb-3">Network Effect</h4>
                    <p className="text-white/80">
                      Based on Metcalfe&apos;s Law, Bitcoin&apos;s value grows with its user base. Current estimates suggest over 100 million users globally, with adoption growing at ~137% annually - outpacing internet adoption rates in the 1990s. By 2030, projections suggest 4 billion users, potentially reaching mainstream adoption levels similar to the internet today.
                    </p>
                  </motion.div>
                  <motion.div 
                    className="bg-black/20 p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <h4 className="font-medium text-white mb-3">Scarcity Model</h4>
                    <p className="text-white/80">
                      Stock-to-Flow model suggests Bitcoin&apos;s diminishing issuance rate could drive prices to six-figures in current cycle. By 2050, over 98% of the 21 million BTC supply will be mined, with annual inflation approaching 0%, making it more scarce than gold. The block reward will fall to ~0.78 BTC by 2032 and ~0.05 BTC by 2048.
                    </p>
                  </motion.div>
                  <motion.div 
                    className="bg-black/20 p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    <h4 className="font-medium text-white mb-3">Macro Asset Share</h4>
                    <p className="text-white/80">
                      If Bitcoin achieves gold parity in market cap, price could reach $500,000-$600,000 per BTC. VanEck&apos;s base case projects $2.9M per BTC by 2050, assuming Bitcoin handles 10% of international trade and 5% of domestic transactions. Bull case scenarios suggest potential valuations exceeding $50M per BTC.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Risk Considerations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="mt-12"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">Risk Considerations</h3>
                </div>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="hover:transform hover:scale-[1.01] transition-transform duration-200"
                  >
                    <AccordionItem title="Price Volatility">
                      <p className="text-white/80">
                        Bitcoin remains volatile with periodic drawdowns of 50%+. However, volatility has decreased as the market matures, and no 4-year holding period has resulted in a loss historically. As market cap grows into the tens of trillions, volatility is expected to decrease further. By 2050, if Bitcoin reaches a market capitalization in the tens of trillions of dollars, it would likely exhibit much lower volatility, cementing its status as a store of value.
                      </p>
                    </AccordionItem>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    className="hover:transform hover:scale-[1.01] transition-transform duration-200"
                  >
                    <AccordionItem title="Regulatory Environment">
                      <p className="text-white/80">
                        While regulatory clarity is improving, changes in policy could impact Bitcoin&apos;s trajectory. The trend is toward regulation rather than prohibition, with frameworks like MiCA providing guidance. By 2050, we expect clear and standardized regulations globally, coordinated via international bodies. The IMF, G20, and BIS are likely to establish international standards for digital currencies, similar to Basel Accords for banking.
                      </p>
                    </AccordionItem>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                    className="hover:transform hover:scale-[1.01] transition-transform duration-200"
                  >
                    <AccordionItem title="Security and Custody">
                      <p className="text-white/80">
                        The Bitcoin network itself is secure, but investors must carefully manage custody. Institutional-grade solutions and insurance products have emerged to address these concerns. By 2050, quantum computing may threaten Bitcoin&apos;s cryptography, but the community is likely to adopt quantum-resistant algorithms well before quantum computers become a practical threat.
                      </p>
                    </AccordionItem>
                  </motion.div>
                </div>
              </motion.div>

              {/* Long-Term Outlook */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="mt-12"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">Long-Term Outlook</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div 
                    className="bg-black/20 p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.9 }}
                  >
                    <h4 className="font-medium text-white mb-3">Institutional Integration</h4>
                    <p className="text-white/80">
                      Major institutions are increasingly recognizing Bitcoin as a legitimate asset class, with growing adoption in corporate treasuries and investment portfolios. By 2050, Bitcoin could be a standard holding in institutional portfolios, similar to real estate, commodities, or equities. A Fidelity survey found 74% of institutions plan to invest in crypto, with Bitcoin being the preferred choice.
                    </p>
                  </motion.div>
                  <motion.div 
                    className="bg-black/20 p-6 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 2 }}
                  >
                    <h4 className="font-medium text-white mb-3">Global Adoption</h4>
                    <p className="text-white/80">
                      Nation-states are beginning to engage with Bitcoin, from El Salvador&apos;s adoption as legal tender to central banks considering Bitcoin in reserves. By 2050, central banks may hold 2-5% of their reserves in Bitcoin, potentially reaching $0.5-0.75 trillion in total reserves. The Czech National Bank is already examining Bitcoin&apos;s potential inclusion in reserves as an additional asset class.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* This is Bitcoin Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <Card>
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-yellow-500">This is Bitcoin</h2>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/Pef22g53zsg"
                  title="This is Bitcoin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quantum Computing Section (Foldable) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <Card>
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-yellow-500">Quantum Computing & Bitcoin</h2>
                <span className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-500 rounded-full">Updated April 2024</span>
              </div>
              {/* Intro */}
              <div className="mb-6">
                <p className="text-white/80 text-lg">
                  <strong>Why does quantum computing matter for Bitcoin?</strong> Quantum computers could one day break the cryptography that secures Bitcoin wallets and transactions. While today&apos;s quantum machines are far from this capability, advances like Shor&apos;s algorithm (which could instantly reveal private keys from public ones) and Grover&apos;s algorithm (which could speed up mining attacks) mean the risk is real—just not immediate. Fortunately, Bitcoin&apos;s design and current quantum limitations mean users are safe for now, but the community is already planning for a secure future.
                </p>
              </div>
              {/* Foldable Technical Section */}
              <AccordionItem title="Show Technical Details (Quantum Risk, Migration, and Community Response)">
                {/* Key Points at a Glance */}
                <div className="flex items-center space-x-3 mb-6 mt-4">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">Key Points at a Glance</h3>
                </div>
                <ul className="space-y-4 text-white/80">
                  <li>Quantum computers could crack Bitcoin&apos;s ECDSA and eventually SHA-256, but today&apos;s prototypes are still far from the millions of logical qubits needed.</li>
                  <li>Upgrading Bitcoin is technically doable but socially hard, because every full node must accept new, heavier signature schemes.</li>
                  <li>Roughly 25% of all BTC already sit in addresses whose public keys are exposed—making them &quot;low-hanging fruit&quot; once a cryptographically-relevant quantum computer (CRQC) arrives.</li>
                  <li>Post-quantum signatures such as SPHINCS+ or FALCON are 5–16× larger than ECDSA, therefore block space, fees and relay bandwidth all take a hit.</li>
                  <li>Most researchers expect a realistic threat window in the early-to-mid-2030s, but forecasts range from &quot;five years&quot; Reddit pessimists to &quot;never in our lifetime&quot; NSA realists.</li>
                </ul>

                {/* 1. Why quantum matters—for real */}
                <div className="flex items-center space-x-3 mb-6 mt-12">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">1. Why Quantum Matters—for Real</h3>
                </div>
                <div className="text-white/80 mb-4 space-y-2">
                  <p>Shor&apos;s algorithm can solve the discrete-log problem that underpins ECDSA, allowing an attacker to derive a private key from any revealed public key instantly once enough qubits and error-correction are available. Grover&apos;s algorithm offers only a quadratic speed-up against SHA-256, so mining is less vulnerable—but hash power could still centralize around whoever owns the first CRQC.</p>
                  <p>But Bitcoin&apos;s built-in 10-minute settlement window buys time: today&apos;s estimates say a quantum box would need 30 minutes–8 hours to break a single key, leaving current users safe for now.</p>
                </div>

                {/* 2. Technical Roadblocks */}
                <div className="flex items-center space-x-3 mb-6 mt-12">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">2. Technical Roadblocks</h3>
                </div>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse text-white/80 text-sm">
                    <thead>
                      <tr className="border-b border-yellow-500/20">
                        <th className="text-left py-2 px-2 text-yellow-500">Hurdle</th>
                        <th className="text-left py-2 px-2 text-yellow-500">Why it&apos;s tough</th>
                        <th className="text-left py-2 px-2 text-yellow-500">Trade-offs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-yellow-500/20">
                        <td className="py-2 px-2">Algorithm swap</td>
                        <td className="py-2 px-2">From ECDSA → PQC (e.g., SPHINCS+, FALCON, Dilithium)</td>
                        <td className="py-2 px-2">5–16× larger sigs; slower verification; new wallet firmware</td>
                      </tr>
                      <tr className="border-b border-yellow-500/20">
                        <td className="py-2 px-2">Vulnerable stock</td>
                        <td className="py-2 px-2">4-5 million BTC in P2PK &amp; reused P2PKH</td>
                        <td className="py-2 px-2">Can&apos;t all move—lost keys, Satoshi&apos;s stash, dead wallets</td>
                      </tr>
                      <tr className="border-b border-yellow-500/20">
                        <td className="py-2 px-2">Consensus layer</td>
                        <td className="py-2 px-2">Soft-fork vs hard-fork vs &quot;flag day&quot;</td>
                        <td className="py-2 px-2">Risk of chain split and MEV games during migration</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">Performance hit</td>
                        <td className="py-2 px-2">SPHINCS+ adds ~30 kB per tx at 128-bit quantum security</td>
                        <td className="py-2 px-2">Blocks fill faster → higher fees → usability drop</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 3. Governance & Coordination */}
                <div className="flex items-center space-x-3 mb-6 mt-12">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">3. Governance &amp; Coordination</h3>
                </div>
                <div className="text-white/80 mb-4 space-y-2">
                  <p>Banks can pause ledgers during upgrades, but Bitcoin can&apos;t; a messy fork war would shred trust. P2QRH (BIP-360) proposes opt-in Pay-to-Quantum-Resistant-Hash addresses plus fee discounts to coax users across, therefore lowering friction without halting the network.</p>
                  <p>Multisig, Lightning channels, and hardware wallets all embed ECDSA assumptions; each vendor must ship firmware updates before any cut-over date, or funds risk bricking.</p>
                </div>

                {/* 4. Timing the Migration */}
                <div className="flex items-center space-x-3 mb-6 mt-12">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">4. Timing the Migration</h3>
                </div>
                <ul className="space-y-2 text-white/80 mb-4">
                  <li>IBM&apos;s roadmap shows ~2,000 fault-tolerant qubits by 2033, still orders of magnitude short.</li>
                  <li>Google&apos;s Willow chip (105 qubits) proves progress but confirms we&apos;re &quot;at least a decade away&quot; from code-breaking power.</li>
                  <li>NIST finalized the first PQC standards (Kyber, Dilithium, SPHINCS+) in Aug 2024 and urges production migration &quot;as soon as possible.&quot;</li>
                </ul>
                <p className="text-white/80 mb-4">The prudent path is phased opt-in addresses starting now, full deprecation of ECDSA by mid-2030s, and SHA-256→SHA-512 or SHA-3 for future-proof mining once Grover-level machines become plausible.</p>

                {/* 5. Economic Blast Radius */}
                <div className="flex items-center space-x-3 mb-6 mt-12">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">5. Economic Blast Radius</h3>
                </div>
                <div className="text-white/80 mb-4 space-y-2">
                  <p>If a CRQC steals coins in dead addresses, it could dump billions on exchanges, hammering price and confidence—something the Hudson Institute and WSJ both warn could spark a wider recession.</p>
                  <p>Conversely, a badly planned upgrade that halts the network even for hours risks the same panic. That is why early, optional, well-tested migrations beat last-minute &quot;flag-day&quot; flips.</p>
                </div>

                {/* 6. What the Community is Doing Right Now */}
                <div className="flex items-center space-x-3 mb-6 mt-12">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">6. What the Community is Doing Right Now</h3>
                </div>
                <ul className="space-y-2 text-white/80 mb-4">
                  <li><strong>Research:</strong> Universities &amp; BTQ benchmark post-quantum signature costs on mainnet-like test-nets.</li>
                  <li><strong>Development:</strong> Bitcoin Core PRs exploring OP_CAT-based PQ sig verification; Taproot-style versioning for new scripts.</li>
                  <li><strong>Education:</strong> QRL Show, ARK Invest &quot;Bitcoin Brainstorm&quot; podcasts keep miners and HODLers informed.</li>
                </ul>
                <p className="text-white/80 mb-4">But progress remains scattered. Therefore, a cross-ecosystem task force—Core devs, wallet vendors, miners, exchanges—must align on a single transition path before 2028, giving wallets 5+ years to auto-migrate UX-simply.</p>

                {/* Bottom Line */}
                <div className="flex items-center space-x-3 mb-6 mt-12">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">Bottom Line</h3>
                </div>
                <div className="text-white/80 mb-4">
                  Quantum computing is a long-tail existential risk for Bitcoin: not tomorrow, but too big to ignore. The technical primitives exist, therefore the real battle is social—achieving rough consensus without shattering Bitcoin&apos;s cohesion or its block-space economics.
                </div>
              </AccordionItem>
            </div>
          </Card>
        </motion.div>

        {/* Galaxy Digital Sale Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16"
        >
          <Card>
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-yellow-500">Galaxy Digital&apos;s $9.5B Bitcoin Sale: A Bullish Stress Test</h2>
                <span className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-500 rounded-full">July 2025</span>
              </div>
              
              <div className="mt-8 space-y-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/80 leading-relaxed">
                    On July 25, 2025, Galaxy Digital completed the sale of over 80,000 BTC, valued at approximately $9.5 billion, on behalf of a Satoshi-era investor. While this initially sparked fear, uncertainty, and doubt (FUD) among market participants, the market&apos;s response revealed something far more significant: Bitcoin&apos;s remarkable resilience and institutional readiness.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 mt-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-yellow-500">Market Resilience and Recovery</h3>
                    <p className="text-white/80 leading-relaxed">
                      The sale initially caused Bitcoin&apos;s price to dip to around $115,000 on July 25, 2025. However, within 36 hours, the price had rebounded to approximately $118,200 by July 26, 2025. This rapid recovery suggests that the market has sufficient liquidity to handle large transactions without prolonged disruption.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      The 24-hour trading volume on July 26, 2025, was around $60 billion, indicating that the $9.5 billion sale was well within the market&apos;s capacity to absorb, especially given the over-the-counter (OTC) nature of the transaction.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-yellow-500">Institutional Implications</h3>
                    <p className="text-white/80 leading-relaxed">
                      This event is particularly encouraging for large fund managers and sovereign wealth funds, as it demonstrates they can enter and exit Bitcoin positions with relative ease. The use of OTC deals by Galaxy Digital helped minimize market impact, further supporting Bitcoin&apos;s attractiveness to institutional investors.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      The quick recovery also indicates strong underlying demand, likely driven by institutional adoption and increasing interest from treasury companies.
                    </p>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">Key Market Metrics</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-white/80 text-sm">
                      <thead>
                        <tr className="border-b border-yellow-500/20">
                          <th className="text-left py-2 px-2 text-yellow-500">Date</th>
                          <th className="text-left py-2 px-2 text-yellow-500">Price (USD)</th>
                          <th className="text-left py-2 px-2 text-yellow-500">24-Hour Change</th>
                          <th className="text-left py-2 px-2 text-yellow-500">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-yellow-500/20">
                          <td className="py-2 px-2">July 14, 2025</td>
                          <td className="py-2 px-2">123,153.22</td>
                          <td className="py-2 px-2 text-green-400">+3%</td>
                          <td className="py-2 px-2">Record high before sale</td>
                        </tr>
                        <tr className="border-b border-yellow-500/20">
                          <td className="py-2 px-2">July 24, 2025</td>
                          <td className="py-2 px-2">116,254.40</td>
                          <td className="py-2 px-2 text-red-400">-5.6%</td>
                          <td className="py-2 px-2">Pre-sale decline</td>
                        </tr>
                        <tr className="border-b border-yellow-500/20">
                          <td className="py-2 px-2">July 25, 2025</td>
                          <td className="py-2 px-2">115,600</td>
                          <td className="py-2 px-2 text-red-400">-0.6%</td>
                          <td className="py-2 px-2">Dip during sale execution</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2">July 26, 2025</td>
                          <td className="py-2 px-2">118,200</td>
                          <td className="py-2 px-2 text-green-400">+2.2%</td>
                          <td className="py-2 px-2">Full recovery achieved</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">Bullish Implications</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Market Liquidity & Resilience</h4>
                      <p className="text-white/80">
                        The ability to absorb a $9.5 billion sell order without significant price drops demonstrates Bitcoin&apos;s exceptional liquidity. This is crucial for institutional investors who require confidence in market depth for large transactions.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Strong Buyer Demand</h4>
                      <p className="text-white/80">
                        The quick recovery suggests strong underlying demand from institutional players and retail investors, indicating robust market fundamentals and positive sentiment.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">OTC Execution Success</h4>
                      <p className="text-white/80">
                        The use of OTC deals helped mitigate immediate selling pressure on public exchanges, demonstrating sophisticated market infrastructure for large transactions.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Institutional Confidence</h4>
                      <p className="text-white/80">
                        Recent ETF inflows reaching $14.4 billion through early July 2025, combined with corporate treasury adoption, suggest sufficient institutional demand to absorb large sales.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">Strategic Significance</h3>
                  <p className="text-white/80 leading-relaxed">
                    This event serves as a stress test for Bitcoin&apos;s institutional readiness. The market&apos;s ability to handle such a large transaction with minimal disruption sends a clear signal to large investors: Bitcoin can accommodate significant capital flows without breaking.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    For sovereign wealth funds, pension funds, and other large institutional players, this demonstration of liquidity and resilience is exactly what they need to see before committing substantial capital to Bitcoin allocations.
                  </p>
                  <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20 mt-6">
                    <p className="text-lg text-yellow-500 font-bold">
                      The Galaxy Digital sale wasn&apos;t a bearish event—it was a bullish validation of Bitcoin&apos;s institutional maturity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Final Note - Market Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-yellow-500">The End of Bitcoin as a Secret</h2>
              <div className="mt-8 space-y-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/80 leading-relaxed">
                    When you&apos;ve been around Bitcoin for a while, you start to feel a breakout before it happens.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed mt-4">
                    $109,500 this morning and a breakout feels imminent. If you adjust for dollar weakness, we&apos;ve been in this range since November of 2024. Which means we&apos;ve spent 9 months building a foundation for the next move higher.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 mt-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-yellow-500">Who Has Been Laying the Bricks?</h3>
                    <p className="text-white/80 leading-relaxed">
                      A wave of treasury companies that have raised cheap capital and packed their balance sheets full of BTC. Dozens of public and private companies have re-aligned their corporate strategy towards Bitcoin. And they now have a duty to their shareholders to continue acquiring BTC.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      Back in 2020, we used to ask ourselves what would happen if more ultra-high net worth people like Michael Saylor started buying Bitcoin hand-over-fist. Well, we&apos;re about to find out.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-yellow-500">It Isn&apos;t Just Billionaires</h3>
                    <p className="text-white/80 leading-relaxed">
                      It&apos;s corporations raising hundreds of millions of siloed capital from return-starved capital markets and channeling it into Bitcoin. And the smart ones are keeping debt levels low while they do it. Which means they&apos;re going into this with a plan to not just survive the next bear market, but to take advantage of it by accumulating BTC at discount prices.
                    </p>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">The Open Secret</h3>
                  <p className="text-white/80 leading-relaxed">
                    What we&apos;re actually witnessing is the end of Bitcoin as a secret. Bitcoiners have had an incredible edge in the past 10 years because we understood something that most people were reluctant to believe. But the capital markets have finally sniffed it out.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    The wave of treasury companies raising endless capital is proof. The now open secret is: <strong className="text-yellow-500">Bitcoin will outperform nearly every business on the planet in the medium term.</strong>
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    There are very few productive activities you can undertake as a corporation that will outperform Bitcoin as it&apos;s repriced to reflect its attributes as neutral finite money. Therefore you have to buy it.
                  </p>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">The Acquisition Imperative</h3>
                  <p className="text-white/80 leading-relaxed">
                    You can buy it with cash reserves, cashflows, debt, or equity issuance. But you have to buy it or risk falling behind those who do. There&apos;s one major problem with this: there isn&apos;t nearly enough $100K Bitcoin to satisfy the demand of all of these corporations buying BTC.
                  </p>
                  <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                    <p className="text-lg text-yellow-500 font-bold">
                      Therefore we must go higher. Much, much higher.
                    </p>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-yellow-500">The Strategic Reality</h3>
                  <p className="text-white/80 leading-relaxed">
                    Bitcoiners have had an incredible edge in the past 10 years because we understood something that most people were reluctant to believe. But the capital markets have finally sniffed it out. The wave of treasury companies raising endless capital is proof that the secret is out.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    The market is no longer about convincing people Bitcoin is valuable. It&apos;s about corporations competing to acquire it before their competitors do. This is the new paradigm.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 