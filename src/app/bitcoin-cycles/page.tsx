"use client";

import SupportLine from '@/components/cycles/SupportLine';
import MaxPain from '@/components/cycles/MaxPain';

export default function BitcoinCyclesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Bitcoin Cycles • Market Timing • Wealth Building</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Bitcoin Cycles
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">Strategic Roadmap to 2030 & Beyond</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-black to-yellow-500/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl">📈</div>
                  <h2 className="text-3xl font-bold text-yellow-500">Bitcoin Leads the Market</h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    Your strategic guide to navigating Bitcoin&apos;s cycles, from accumulation to distribution, 
                    with actionable insights for every phase of the market.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Philosophy Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🎯 Core Strategy Philosophy
            </h3>
            <div className="space-y-6 text-gray-300">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Bitcoin Leads Everything</h4>
                  <p className="text-lg leading-relaxed">
                    Bitcoin&apos;s price action should guide both your entries and exits. When Bitcoin nears its previous all-time high around $125K, 
                    it&apos;s time to start scaling out of altcoin positions. The goal is to derisk and lock in profits systematically.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Systematic Profit Taking</h4>
                  <p className="text-lg leading-relaxed">
                    Start with 20% of your long-term bags when Bitcoin approaches ATH. If alts have performed well, 
                    this might cover your entire initial investment. Continue taking 10-20% profits at each consolidation phase.
                  </p>
                </div>
              </div>
              <div className="bg-yellow-500/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Key Principles:</h4>
                <ul className="space-y-2 text-white/90">
                  <li>• <strong>2023-2024:</strong> Stack long-term bags (accumulation phase)</li>
                  <li>• <strong>2025-2026:</strong> Scale out systematically (distribution phase)</li>
                  <li>• <strong>Moonbags:</strong> Keep 5-10% untouched for potential 1000x gains</li>
                  <li>• <strong>No Rebuying:</strong> Once sold, don&apos;t buy back - profit is profit</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Halving Cycle Analysis */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              ⚡ The Halving Has Spoken
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                On April 20th, 2024, Bitcoin whispered its fourth epochal truth into the void — the halving. An event so deceptively simple yet so profoundly catalytic, 
                it cuts miner rewards in half, but historically sets fire to the second half of the bull cycle. It&apos;s not magic — it&apos;s memetics and math.
              </p>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Historical Halving Patterns</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-yellow-500/30">
                        <th className="py-3 px-4 text-left">Cycle</th>
                        <th className="py-3 px-4 text-left">Halving Date</th>
                        <th className="py-3 px-4 text-left">Peak Date</th>
                        <th className="py-3 px-4 text-left">Weeks to Peak</th>
                        <th className="py-3 px-4 text-left">Peak Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-yellow-500/30">
                        <td className="py-3 px-4">2012-13</td>
                        <td className="py-3 px-4">Nov 2012</td>
                        <td className="py-3 px-4">Nov 2013</td>
                        <td className="py-3 px-4">52 weeks</td>
                        <td className="py-3 px-4">$1,150</td>
                      </tr>
                      <tr className="border-b border-yellow-500/30">
                        <td className="py-3 px-4">2016-17</td>
                        <td className="py-3 px-4">Jul 2016</td>
                        <td className="py-3 px-4">Dec 2017</td>
                        <td className="py-3 px-4">74 weeks</td>
                        <td className="py-3 px-4">$19,800</td>
                      </tr>
                      <tr className="border-b border-yellow-500/30">
                        <td className="py-3 px-4">2020-21</td>
                        <td className="py-3 px-4">May 2020</td>
                        <td className="py-3 px-4">Nov 2021</td>
                        <td className="py-3 px-4">78 weeks</td>
                        <td className="py-3 px-4">$69,000</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">2024-25</td>
                        <td className="py-3 px-4">Apr 2024</td>
                        <td className="py-3 px-4">Q4 2025</td>
                        <td className="py-3 px-4">74-78 weeks</td>
                        <td className="py-3 px-4">$180K-$275K</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-500/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Key Insights:</h4>
                <ul className="space-y-2 text-white/90">
                  <li>• <strong>Consistent Timing:</strong> Peaks occur 74-78 weeks post-halving</li>
                  <li>• <strong>Exponential Growth:</strong> Each cycle multiplies previous peak by 10-20x</li>
                  <li>• <strong>Mid-Cycle Signal:</strong> Current $110K is likely mid-cycle, not the top</li>
                  <li>• <strong>Logarithmic Channel:</strong> Bitcoin respects long-term growth corridors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cycle Analysis Components */}
          <SupportLine />
          <MaxPain />

          {/* 2024-2025 Bull Market Strategy */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🚀 2024-2025 Bull Market Strategy
            </h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">Current Phase: Accumulation</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-epilogue mb-3">Target Ranges:</h5>
                    <ul className="text-white/80 font-satoshi space-y-2">
                      <li>• <strong>Minimum Target:</strong> $180,000 (Nov 2025 ± 3mo)</li>
                      <li>• <strong>Maximum Target:</strong> $275,000 (Nov 2025 ± 3mo)</li>
                      <li>• <strong>Speculative Ceiling:</strong> $928,000 (log curve projection)</li>
                      <li>• <strong>Support Level:</strong> $50,000 (2025 floor)</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">Action Plan</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-epilogue mb-3">Scaling Out Strategy:</h5>
                    <ul className="text-white/80 font-satoshi space-y-2">
                      <li>• <strong>First Exit:</strong> 20% at $125K (previous ATH)</li>
                      <li>• <strong>Second Exit:</strong> 10-20% at consolidation</li>
                      <li>• <strong>Third Exit:</strong> 10-20% at $200K consolidation</li>
                      <li>• <strong>Moonbags:</strong> 5-10% for potential 1000x</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Psychological Pivot Points:</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-lg font-bold text-white mb-2">$100K - The Gateway</h5>
                    <p className="text-white/80 text-sm">Once BTC reclaims and holds $100K, all eyes turn toward Fibonacci confluence zones: $170K, $250K, and $450K+.</p>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white mb-2">$170K - The Breakout</h5>
                    <p className="text-white/80 text-sm">Technical breakout from Cup & Handle pattern. Measured move targets suggest this is just the beginning.</p>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white mb-2">$250K - Escape Velocity</h5>
                    <p className="text-white/80 text-sm">The move that breaks the matrix - propels BTC from &quot;digital gold&quot; to &quot;reserve asset&quot; status.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2026-2027 Bear Market Strategy */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              📉 2026-2027 Bear Market Strategy
            </h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">Bear Market Targets</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-epilogue mb-3">Expected Ranges:</h5>
                    <ul className="text-white/80 font-satoshi space-y-2">
                      <li>• <strong>Bear Market Floor:</strong> $60,000 (2026)</li>
                      <li>• <strong>Recovery Level:</strong> $80,000 (2027)</li>
                      <li>• <strong>Accumulation Zone:</strong> $60K - $80K</li>
                      <li>• <strong>Duration:</strong> 12-18 months</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">Bear Market Actions</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-epilogue mb-3">Strategic Moves:</h5>
                    <ul className="text-white/80 font-satoshi space-y-2">
                      <li>• <strong>Preserve Capital:</strong> Hold cash for opportunities</li>
                      <li>• <strong>DCA Strategy:</strong> Buy dips below $70K</li>
                      <li>• <strong>Altcoin Selection:</strong> Focus on fundamentals</li>
                      <li>• <strong>Patience:</strong> Wait for clear reversal signals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2028-2029 Bull Market Strategy */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🌙 2028-2029 Bull Market Strategy
            </h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">Halving Cycle Targets</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-epilogue mb-3">Projected Ranges:</h5>
                    <ul className="text-white/80 font-satoshi space-y-2">
                      <li>• <strong>Minimum Target:</strong> $420,000 (Q4 2029 ± 6mo)</li>
                      <li>• <strong>Maximum Target:</strong> $690,000 (Q4 2029 ± 6mo)</li>
                      <li>• <strong>Speculative Ceiling:</strong> $1,200,000 (AI/sovereignty narrative)</li>
                      <li>• <strong>Support Level:</strong> $110,000 (2029 floor)</li>
                      <li>• <strong>Halving Date:</strong> April 2028</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">Moon Phase Strategy</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <h5 className="text-yellow-400 font-epilogue mb-3">Advanced Tactics:</h5>
                    <ul className="text-white/80 font-satoshi space-y-2">
                      <li>• <strong>Pre-Halving:</strong> Accumulate 6-12 months before</li>
                      <li>• <strong>Post-Halving:</strong> Hold through initial volatility</li>
                      <li>• <strong>Peak Distribution:</strong> Scale out at euphoria signals</li>
                      <li>• <strong>Legacy Bags:</strong> 5-10% for generational wealth</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Narrative Evolution (2028-2029)</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-lg font-bold text-white mb-3">Macro Catalysts:</h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• <strong>AI Sovereignty:</strong> Bitcoin as base layer for AI autonomy</li>
                      <li>• <strong>Fiat Collapse:</strong> Dollar debasement accelerates</li>
                      <li>• <strong>Institutional Adoption:</strong> Nation-state accumulation</li>
                      <li>• <strong>Digital Autonomy:</strong> End of fiat trust systems</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white mb-3">Technical Milestones:</h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• <strong>Layer 2 Maturity:</strong> Lightning network scaling</li>
                      <li>• <strong>Privacy Features:</strong> Enhanced fungibility</li>
                      <li>• <strong>Cross-Chain Integration:</strong> Bitcoin as settlement layer</li>
                      <li>• <strong>Developer Ecosystem:</strong> Bitcoin-native applications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Psychology & Signals */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🧠 Market Psychology & Exit Signals
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Top Signals</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <ul className="text-white/80 font-satoshi space-y-3">
                    <li>• <strong>Mass Euphoria:</strong> Everyone talking about 1000x gains</li>
                    <li>• <strong>Mainstream Media:</strong> Bitcoin all over news</li>
                    <li>• <strong>Rolex Giveaways:</strong> Crypto influencers giving away luxury items</li>
                    <li>• <strong>FOMO Peaks:</strong> Non-crypto people asking for advice</li>
                    <li>• <strong>Altcoin Mania:</strong> Shitcoins doing 100x in days</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Bottom Signals</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <ul className="text-white/80 font-satoshi space-y-3">
                    <li>• <strong>Mass Capitulation:</strong> &quot;Bitcoin is dead&quot; narratives</li>
                    <li>• <strong>Fear Dominance:</strong> Everyone selling in panic</li>
                    <li>• <strong>Institutional Doubt:</strong> Major players questioning crypto</li>
                    <li>• <strong>Technical Support:</strong> Price at major support levels</li>
                    <li>• <strong>Contrarian Opportunity:</strong> When others are fearful</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Management */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🛡️ Risk Management Framework
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Portfolio Allocation</h4>
                  <ul className="text-white/80 font-satoshi space-y-2">
                    <li>• <strong>Bitcoin:</strong> 60-70% of crypto portfolio</li>
                    <li>• <strong>Ethereum:</strong> 20-25% of crypto portfolio</li>
                    <li>• <strong>Altcoins:</strong> 10-15% of crypto portfolio</li>
                    <li>• <strong>Cash:</strong> 20-30% for opportunities</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Position Sizing</h4>
                  <ul className="text-white/80 font-satoshi space-y-2">
                    <li>• <strong>Core Positions:</strong> 5-10% per major asset</li>
                    <li>• <strong>Speculative:</strong> 1-3% per altcoin</li>
                    <li>• <strong>Moonbags:</strong> 0.5-1% per high-risk play</li>
                    <li>• <strong>Never:</strong> More than 5% in any single altcoin</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Stop Loss Strategy</h4>
                  <ul className="text-white/80 font-satoshi space-y-2">
                    <li>• <strong>Bitcoin:</strong> 25% below entry</li>
                    <li>• <strong>Ethereum:</strong> 30% below entry</li>
                    <li>• <strong>Altcoins:</strong> 50% below entry</li>
                    <li>• <strong>Trailing:</strong> Move stops up with profits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items Checklist */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              ✅ Action Items Checklist
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Immediate Actions (2024)</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Review current portfolio allocation</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Set price alerts for $125K Bitcoin</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Identify top 5 altcoins for 2025</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Prepare exit strategy for each position</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">2025 Preparation</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Monitor Bitcoin approaching $125K</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Execute first 20% exit at ATH</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Watch for euphoria signals</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-yellow-500 rounded focus:ring-yellow-500" />
                      <span className="text-white/80">Prepare bear market shopping list</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Risk Management */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🎯 Advanced Risk Management
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Rebalancing Strategy</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <ul className="text-white/80 space-y-3">
                      <li>• <strong>$100K-$170K:</strong> Trim 10-20% into stable-yield strategies</li>
                      <li>• <strong>$170K-$300K:</strong> Consider funding ecosystem bets</li>
                      <li>• <strong>Above $300K:</strong> Go illiquid - real assets, strategic equity</li>
                      <li>• <strong>Moon Phase:</strong> Support Bitcoin-native infrastructure</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Macro Watch Points</h4>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <ul className="text-white/80 space-y-3">
                      <li>• <strong>Fed Pivot:</strong> Rate cuts = more upside fuel</li>
                      <li>• <strong>ETF Flows:</strong> Net inflows = strong momentum</li>
                      <li>• <strong>Election Cycle:</strong> Instability = increased BTC narrative</li>
                      <li>• <strong>Institutional Adoption:</strong> Corporate treasury moves</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Invalidation Signals:</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-lg font-bold text-white mb-2">Technical</h5>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Weekly close below 200-day SMA (~$88K)</li>
                      <li>• Loss of prior ATH region ($69-70K)</li>
                      <li>• Break of logarithmic channel support</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white mb-2">Macro</h5>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Aggressive rate hikes</li>
                      <li>• Credit crunch events</li>
                      <li>• ETF outflow reversal</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white mb-2">Regulatory</h5>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• U.S. spot market crackdown</li>
                      <li>• Major exchange shutdowns</li>
                      <li>• Institutional access restrictions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              💡 Key Takeaways
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="bg-yellow-500/10 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Remember These Fundamentals:</h4>
                <ul className="space-y-2 text-white/90">
                  <li>• <strong>Bitcoin leads the market</strong> - use it as your compass</li>
                  <li>• <strong>Stack in bear markets</strong> - accumulate when others are fearful</li>
                  <li>• <strong>Scale out in bull markets</strong> - distribute when others are greedy</li>
                  <li>• <strong>Keep moonbags</strong> - never sell 100% of any position</li>
                  <li>• <strong>Don&apos;t rebuy</strong> - once you take profits, move on</li>
                  <li>• <strong>Trust the process</strong> - cycles repeat, but timing varies</li>
                </ul>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">The Bottom Line:</h4>
                <p className="text-white/80 text-lg leading-relaxed">
                  If BTC holds above $100K, it unlocks the next expansion zone. Primary range: $170K (base case) → $928K (speculative ceiling). 
                  Volatility expected — but structurally, Bitcoin remains in a textbook post-halving expansion phase.
                </p>
              </div>
              
              <p className="text-lg text-center text-white/80 italic">
                &quot;The goal isn&apos;t to catch every move, but to catch the major moves and preserve capital for the next opportunity.&quot;
              </p>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="bg-yellow-500/90 p-8 rounded-none border-2 border-yellow-300 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] text-center">
            <p className="text-2xl font-bold text-black [text-shadow:_0_1px_1px_rgba(0,0,0,0.2)]">
              We ride until 2026. But not just to make money. <br/> We ride to win the narrative.
            </p>
          </div>

          <footer className="text-center pt-8">
            <p className="text-lg tracking-widest text-yellow-500 font-mono">
              🟠 Stay sovereign. Stay weird. Stay early.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
} 