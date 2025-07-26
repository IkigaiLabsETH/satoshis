'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@/components/ui/card";

const AccordionItem = ({
  title,
  children,
  defaultOpen = false
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

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
        <div className="pb-4 text-white/80 text-base">
          {children}
        </div>
      )}
    </div>
  )
}

const brokers = [
  {
    name: "YieldMax UCITS ETF",
    score: 4.8,
    pros: [
      "Official MSTY provider in Europe",
      "UCITS fund structure for EU investors",
      "Monthly income distributions",
      "Professional management"
    ],
    fees: "Management fee: 0.99%",
    minDeposit: "Check with your local broker",
    link: "https://www.yieldmaxetfs.com"
  },
  {
    name: "European Brokers",
    score: 4.5,
    pros: [
      "Access through local European brokers",
      "EU regulated trading environment",
      "Local customer support",
      "Familiar trading platforms"
    ],
    fees: "Varies by broker",
    minDeposit: "Varies by broker",
    link: "/platforms/msty/brokers"
  }
]

export default function MSTYPlatformsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Bitcoin Income • Options Strategy • Monthly Distributions</p>
          <h1 className="text-center">
            <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
              MSTY Trading
            </span>
          </h1>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-24 bg-yellow-500/30"></div>
            <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">Yieldmax MSTR Option Income Strategy ETF</p>
            <div className="h-px w-24 bg-yellow-500/30"></div>
          </div>
        </motion.div>

        {/* YouTube Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <div className="relative p-4 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {/* Custom Thumbnail */}
              <div className="absolute top-0 left-0 w-full h-full cursor-pointer group" onClick={(e) => {
                const iframe = e.currentTarget.nextElementSibling as HTMLIFrameElement;
                iframe.style.display = 'block';
                e.currentTarget.style.display = 'none';
              }}>
                <Image 
                  src="/visuals/BTC_memes_and_dreams_15.jpeg" 
                  alt="MSTY Trading Video Thumbnail"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* YouTube iframe */}
              <iframe
                className="absolute top-0 left-0 w-full h-full hidden"
                src="https://www.youtube.com/embed/dIOKlayHA8k"
                title="MSTY Trading Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

        {/* Narrative Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="relative bg-[#1c1f26] rounded-lg p-8 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <div className="space-y-6 text-lg text-white/90">
              <p className="font-medium text-yellow-500">I&apos;ve got a question for you.</p>
              <p>Why would you leverage trade, risk your sanity over red candles, or bet the house on a 20% pump when one wrong move could nuke your account?</p>
              
              <div className="w-full h-px bg-yellow-500/20 my-8"></div>

              <p className="font-medium text-yellow-500">MSTY gets all the hate, but it pays you every single month.</p>
              <p>No stress. No price alerts. No 3AM panic sweats. Just dividends, dropping like clockwork. Gone are the days of chasing pumps and praying for &quot;God candles.&quot; All you need to do? Absolutely nothing.</p>

              <div className="w-full h-px bg-yellow-500/20 my-8"></div>

              <p className="font-medium text-yellow-500">And let&apos;s be honest—to those complaining about NAV erosion? You&apos;re weak.</p>
              <p>Think about it. With MSTY, you&apos;re trading countless emotional breakdowns, failed entries, and margin calls for a tiny NAV dip and a guaranteed payout. That&apos;s not erosion. That&apos;s evolution.</p>
              
              <div className="w-full h-px bg-yellow-500/20 my-8"></div>
              
              <p className="font-medium text-yellow-500">Quiet wealth wins.</p>
              <p>MSTY isn&apos;t for hype chasers. It&apos;s for being smarter—with your time, your capital, and your peace of mind. It doesn&apos;t promise the moon, but it quietly pays for your life while others are still gambling on the next shitcoin.</p>
            </div>
          </div>
        </motion.div>

        {/* Alternative Perspective Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] p-8 space-y-8">
            <h2 className="text-3xl font-bold text-yellow-500">An Alternative View: The BTC-Native Solution</h2>
            
            <div>
              <p className="text-lg text-white/90">
                🚀 <span className="font-semibold">Sell a fraction of BTC per month.</span>
              </p>
              <p className="text-white/70">Zero mental gymnastics. No NAV decay, no ROC games, no options drag. No risk of underperformance from 3rd-party wrappers.</p>
              <p className="mt-2 text-white/80">If your BTC grows more than you sell, you&apos;re drawing far less than your stack appreciates—your net worth still compounds.</p>
            </div>
            
            <div className="w-full h-px bg-yellow-500/20 my-8"></div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Why This Wins</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm md:text-base">
                  <thead className="text-white/80">
                    <tr className="border-b border-yellow-500/20">
                      <th className="p-4 font-semibold">Strategy</th>
                      <th className="p-4 font-semibold">Complexity</th>
                      <th className="p-4 font-semibold">Capital Preservation</th>
                      <th className="p-4 font-semibold">Wealth Compounding</th>
                      <th className="p-4 font-semibold">Liquidity</th>
                      <th className="p-4 font-semibold">Tax Simplicity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="p-4 font-medium text-white">Yield ETFs (PLTY, NVDY, MSTY)</td>
                      <td className="p-4 text-red-400">High</td>
                      <td className="p-4 text-red-400">Low (NAV decay)</td>
                      <td className="p-4 text-yellow-400">Weak</td>
                      <td className="p-4 text-green-400">Good (monthly)</td>
                      <td className="p-4 text-red-400">Messy (ROC)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-yellow-500">BTC-only (Sell fraction/month)</td>
                      <td className="p-4 text-green-400">Low</td>
                      <td className="p-4 text-green-400">High</td>
                      <td className="p-4 text-green-400">Strong</td>
                      <td className="p-4 text-green-400">Perfect</td>
                      <td className="p-4 text-green-400">Simple</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full h-px bg-yellow-500/20 my-8"></div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Why Avoid Yield ETFs (For Now)</h3>
              <ul className="space-y-4 text-white/80 list-none text-base">
                <li>🛑 NAV bleeds slowly while giving the illusion of high income.</li>
                <li>🛑 Most of the &quot;yield&quot; is just selling your own capital back to you.</li>
                <li>🛑 Total return trails BTC long-term, especially post-halving.</li>
                <li>🛑 These are not wealth boosters, just yield wrappers for traders.</li>
              </ul>
            </div>

            <div className="w-full h-px bg-yellow-500/20 my-8"></div>
            
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">Final Verdict</h3>
              <p className="text-lg text-white/90">Keep stacking sats.</p>
              <p className="text-lg text-white/90">Sell a small fraction monthly.</p>
              <p className="text-lg text-white/90">Sleep easy. Skip the noise.</p>
              <p className="mt-4 text-xl font-semibold text-white">You&apos;re already holding the alpha asset. No need to wrap it.</p>
            </div>
          </div>
        </motion.div>

        {/* Pushback Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] p-8 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔥</span>
              <h2 className="text-3xl font-bold text-red-500">Pushback: The MSTY Mirage</h2>
            </div>
            
            <div className="space-y-6 text-lg text-white/90">
              <p>MSTY dangles a shiny 89% yield to bait yield chasers—but peel back the layers and you&apos;ll find one of the clearest examples of financial engineering dressed up as passive income.</p>
              
              <div>
                <p className="font-medium text-red-400 mb-3">Here&apos;s what it&apos;s actually doing under the hood:</p>
                <ul className="space-y-2 text-white/80 list-none">
                  <li>• Synthetic long exposure to MSTR (via long calls + short puts)</li>
                  <li>• Short-dated covered call selling (OTM, &lt;1-month expiry)</li>
                  <li>• T-bills on the side to look &quot;conservative&quot;</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <p className="font-bold text-red-400 mb-3">But here&apos;s the kicker:</p>
                <p>Over half of MSTYs distributions are just giving your own money back. Literally. Since inception, ~55% of payouts have been return of capital—not yield, not option premiums, just principal repackaged as &quot;dividends.&quot;</p>
                
                <div className="mt-4">
                  <p className="font-medium text-red-400 mb-2">Latest distribution breakdown (07/07/2025):</p>
                  <ul className="space-y-1 text-white/80 list-none">
                    <li>• <span className="font-bold text-red-400">96.86% return of capital</span></li>
                    <li>• <span className="font-bold text-red-400">3.14% actual income</span></li>
                  </ul>
                </div>
                
                <div className="mt-4 p-4 bg-black/30 border border-yellow-500/30 rounded">
                  <p className="font-bold text-yellow-400 mb-2">🚨 ALWAYS READ THE FINE PRINT</p>
                  <p className="text-white/90 text-sm">MSTY advertises a 75% yield, but the reality is that 96.86% of your &quot;dividend&quot; is just getting your own money back. You&apos;re paying taxes on money that was already yours.</p>
                </div>
                
                <p className="mt-4 text-white/90">So unless you bought in early and got lucky with entry price, you&apos;re not compounding—you&apos;re eroding.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <span>📉</span>
                  The Strategy Is Breaking Down
                </h3>
                
                <div className="space-y-4">
                  <p><span className="font-medium text-red-400">Why?</span> Because MSTR volatility has collapsed in 2025. Option premiums—the core income engine—are drying up. So MSTY keeps faking the yield by returning capital.</p>
                  
                  <p>Meanwhile, MSTR ripped +500% in Q4 2024, and MSTY? It caught crumbs. It&apos;s supposed to be a leveraged proxy. Instead, it&apos;s a neutered echo.</p>
                  
                  <p><span className="font-medium text-red-400">And now?</span> It&apos;s underperforming both MSTR and BTC. The fund&apos;s NAV is decaying. Premiums are weak. Payouts are funded by slicing off more and more of your own position.</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <span>💸</span>
                  The Tax Trap
                </h3>
                
                <p>MSTY&apos;s &quot;dividends&quot; are taxable events—even if they&apos;re just giving you your own money.</p>
                <p className="mt-2"><span className="font-medium text-yellow-400">Compare that to simply holding MSTR or BTC:</span></p>
                <ul className="mt-2 space-y-1 text-white/80 list-none">
                  <li>• You only pay tax when you sell</li>
                  <li>• You keep the upside</li>
                  <li>• You avoid the 0.99% management fee for the privilege of being slowly drained</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <span>🙃</span>
                  Capped Upside, Uncapped Downside
                </h3>
                
                <p className="mb-4">Let&apos;s summarize what you&apos;re actually getting with MSTY:</p>
                <ul className="space-y-2 text-white/80 list-none">
                  <li>• Cap your upside</li>
                  <li>• Keep full downside</li>
                  <li>• Pay taxes and fees for synthetic &quot;yield&quot;</li>
                  <li>• Watch NAV bleed while feeling good about &quot;income&quot;</li>
                </ul>
                
                <div className="mt-6">
                  <p className="font-medium text-red-400 mb-3">So Who Buys This?</p>
                  <ol className="space-y-1 text-white/80 list-none">
                    <li>1. Yield chasers who don&apos;t understand derivatives</li>
                    <li>2. &quot;Passive income&quot; seekers who don&apos;t read the fine print</li>
                    <li>3. Retail bagholders who think 90% APY is just Wall Street magic</li>
                  </ol>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span>✅</span>
                  Smarter Alternatives
                </h3>
                <ul className="space-y-2 text-white/80 list-none">
                  <li>• Want MSTR exposure? Buy MSTR</li>
                  <li>• Want BTC upside? Buy BTC</li>
                  <li>• Want real yield with no games? Buy T-bills</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <p className="text-xl font-medium text-white">MSTY is a lesson in financial alchemy: it turns your capital into &quot;income&quot; and charges you for the transformation. If you&apos;re serious about building wealth, look past the headline yield. The emperor has no yield.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-1">
          {brokers.map((broker, index) => (
            <motion.div
              key={broker.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">{broker.name}</h3>
                    <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-semibold text-black">
                      Score: {broker.score}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2 text-base">
                    {broker.pros.map((pro) => (
                      <li key={pro} className="flex items-center text-white/80">
                        <span className="mr-2 text-yellow-500">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 space-y-2 text-white/80 text-base">
                    <p>Fees: {broker.fees}</p>
                    <p>Minimum Deposit: {broker.minDeposit}</p>
                  </div>
                  {broker.link.startsWith('/') ? (
                    <Link
                      href={broker.link}
                      className="mt-6 inline-block rounded-lg bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    >
                      Overview All Brokers
                    </Link>
                  ) : (
                    <a
                      href={broker.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block rounded-lg bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    >
                      Visit Official Site
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Card>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-yellow-500">How to Trade MSTY in Europe</h2>
              <div className="mt-8 space-y-4">
                <AccordionItem title="1. Understanding MSTY in Europe">
                  MSTY is now available to European investors through YieldMax&apos;s UCITS fund structure. This provides EU investors with a regulated way to access MSTY&apos;s option income strategy while maintaining compliance with European regulations.
                </AccordionItem>
                <AccordionItem title="2. Finding a Local Broker">
                  To trade MSTY in Europe, follow these steps:
                  <ul className="list-disc pl-4 space-y-2 mt-4">
                    <li>Contact your existing broker to check if they offer access to YieldMax UCITS ETFs</li>
                    <li>Research local brokers in your country that offer US ETF trading through UCITS structures</li>
                    <li>Compare trading fees, platform features, and customer support options</li>
                    <li>Ensure the broker is properly regulated in your jurisdiction</li>
                  </ul>
                </AccordionItem>
                <AccordionItem title="3. Important Considerations">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>UCITS funds provide strong investor protections under EU regulations</li>
                    <li>Monthly distributions may be available (subject to fund performance)</li>
                    <li>Consider the management fee and any local broker fees</li>
                    <li>Understand the risks associated with options-based strategies</li>
                    <li>Check with multiple brokers as availability may vary by country</li>
                  </ul>
                </AccordionItem>
              </div>
            </div>
          </Card>
        </motion.div>

                {/* Enhanced FAQ Section */}
                <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <ChevronDown className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-yellow-500">Frequently Asked Questions</h2>
          </div>
          <AccordionItem title="How does the strategy work?" defaultOpen>
            <p className="text-white/90">
              Our strategy combines Bitcoin self-custody (80%) with strategic positions in MSTY (10%) 
              for monthly income and MSTR (10%) for additional Bitcoin exposure. MSTY generates income through 
              an options-based strategy on MSTR stock, utilizing covered call writing and put option selling, 
              while also holding short-term U.S. Treasuries as collateral. This approach provides both wealth 
              preservation and regular income without compromising your core Bitcoin position.
            </p>
          </AccordionItem>
          <AccordionItem title="What are MSTY&apos;s dividend yields and sustainability?">
            <p className="text-white/90">
              MSTY currently offers a distribution rate of approximately 75% annually. However, these yields 
              can fluctuate based on several factors:
              <br/><br/>
              • MSTR&apos;s stock price volatility and Bitcoin&apos;s value movements<br/>
              • Market conditions and options market dynamics<br/>
              • Changes in implied volatility affecting option premiums<br/>
              <br/>
              <span className="font-bold text-red-400">CRITICAL: Always read the fine print!</span>
              <br/><br/>
              The latest distribution (07/07/2025) contained:
              <br/>
              • <span className="text-red-400">96.86% return of capital</span> (your own money back)<br/>
              • <span className="text-red-400">3.14% actual income</span><br/>
              <br/>
              This means you&apos;re paying taxes on money that was already yours. The headline yield is misleading.
            </p>
          </AccordionItem>
          <AccordionItem title="What are the tax implications for MSTY distributions?">
            <p className="text-white/90">
              For French residents, MSTY distributions are subject to a 15% U.S. withholding tax. It&apos;s important 
              to understand that:
              <br/><br/>
              • The 15% tax is automatically withheld at source<br/>
              • You&apos;ll need to declare these distributions on your French tax return<br/>
              • The withheld tax can often be credited against your French tax liability<br/>
              <br/>
              We recommend consulting with a tax professional for personalized advice on your situation.
            </p>
          </AccordionItem>
          <AccordionItem title="What are the risks involved?">
            <p className="text-white/90">
              Key risks to consider include:
              <br/><br/>
              • Dividend Variability: Monthly income can fluctuate based on market conditions<br/>
              • Capital Risk: MSTR stock price and Bitcoin value declines can lead to losses<br/>
              • Market Liquidity: Performance is tied to MSTR and Bitcoin volatility<br/>
              • Tax Implications: Converting Bitcoin to MSTY may trigger taxable events<br/>
              <br/>
              It&apos;s recommended to consult with a financial advisor before making substantial investments.
            </p>
          </AccordionItem>
          <AccordionItem title="How do I get started?">
            <p className="text-white/90">
              Start by using our calculator to determine your target monthly income and required MSTY 
              shares. Follow these steps:
              <br/><br/>
              1. Determine your desired monthly income<br/>
              2. Calculate required shares (approximately $1 monthly distribution per share)<br/>
              3. Ensure you maintain 80% in Bitcoin cold storage<br/>
              4. Consider tax implications and documentation requirements<br/>
              5. Set up proper tracking for distributions and tax reporting<br/>
              <br/>
              Remember to maintain your Bitcoin-first approach while using MSTY for income generation.
            </p>
          </AccordionItem>
          <AccordionItem title="How do I track my investments and taxes?">
            <p className="text-white/90">
              We recommend maintaining detailed records:
              <br/><br/>
              • Number of MSTY shares and monthly distributions<br/>
              • U.S. withholding tax amounts (15%)<br/>
              • EUR/USD exchange rates for tax reporting<br/>
              • Form W-8BEN filing with your broker<br/>
              • Monthly income tracking for tax purposes<br/>
              <br/>
              Consider using a spreadsheet to track gross dividends, taxes withheld, and net income in both 
              USD and EUR.
            </p>
          </AccordionItem>
        </motion.div>
        
      </div>
    </div>
  )
} 