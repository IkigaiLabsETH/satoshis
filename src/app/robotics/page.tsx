"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRoboticsPrices } from '@/hooks/useRoboticsPrices';

export default function RoboticsPage() {
  const { prices, isLoading, error } = useRoboticsPrices();

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">DePIN • Machine Economy • AI Automation</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Robotics
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">The Future of Tokenized Physical Intelligence</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-black to-yellow-500/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl">🤖</div>
                  {isLoading ? (
                    <div className="space-y-2">
                      <h2 className="text-4xl font-bold text-yellow-500">Loading...</h2>
                      <p className="text-xl text-white/80">Fetching live data</p>
                    </div>
                  ) : error ? (
                    <div className="space-y-2">
                      <h2 className="text-4xl font-bold text-red-500">Error</h2>
                      <p className="text-xl text-white/80">Failed to load prices</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h2 className="text-4xl font-bold text-yellow-500">$158M+ Market Cap</h2>
                      <p className="text-xl text-white/80">Live robotics crypto data</p>
                      <p className="text-sm text-yellow-400">Last updated: {prices.peaq.lastUpdated}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Market Overview Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Rise of Robotics in Crypto
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                The robotics sector represents one of the most exciting frontiers in crypto, combining blockchain technology with physical automation. These projects are building the infrastructure for a tokenized machine economy where robots, IoT devices, and autonomous systems can operate and transact independently.
              </p>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Live Market Data:</h4>
                {isLoading ? (
                  <div className="text-yellow-400">Loading real-time prices...</div>
                ) : error ? (
                  <div className="text-red-400">Error loading prices: {error}</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-4 rounded border border-yellow-500/20">
                      <div className="text-sm text-yellow-400">Total Market Cap</div>
                      <div className="text-xl font-bold">$158M+</div>
                    </div>
                    <div className="bg-black/30 p-4 rounded border border-yellow-500/20">
                      <div className="text-sm text-yellow-400">24h Volume</div>
                      <div className="text-xl font-bold">$6.4M+</div>
                    </div>
                    <div className="bg-black/30 p-4 rounded border border-yellow-500/20">
                      <div className="text-sm text-yellow-400">Last Updated</div>
                      <div className="text-sm">{prices.peaq.lastUpdated}</div>
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <h5 className="text-lg font-bold text-yellow-500 mb-2">Key Drivers:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>DePIN network expansion</li>
                    <li>AI-robotics convergence</li>
                    <li>Smart city infrastructure</li>
                    <li>Industrial automation demand</li>
                    <li>Maker movement growth</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🔗</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  DePIN Networks
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Decentralized Physical Infrastructure
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🧠</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  AI Integration
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Machine Learning & Perception
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">⚡</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Tokenization
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Machine Economy & Automation
              </p>
            </div>
          </div>

          {/* Top Robotics Projects */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Leading Robotics Projects
            </h3>
            <div className="space-y-8">
              {/* peaq */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">peaq (PEAQ) - The Backbone of the Machine Economy</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Leading the pack with a market cap of $74.2 million, peaq is a Layer-1 blockchain designed to power DePIN and the burgeoning &quot;machine economy.&quot; At its core, peaq enables the tokenization and interoperability of vehicles, robots, and IoT devices, allowing them to operate autonomously on a decentralized network.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Live Stats:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Market Cap: ${(prices.peaq.marketCap / 1000000).toFixed(1)}M</li>
                        <li>Price: ${prices.peaq.price.toFixed(6)}</li>
                        <li>24h Volume: ${(prices.peaq.volume24h / 1000000).toFixed(2)}M</li>
                        <li className={prices.peaq.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          24h Change: {prices.peaq.change24h >= 0 ? '+' : ''}{prices.peaq.change24h.toFixed(1)}%
                        </li>
                        <li>850,000+ connected devices</li>
                        <li>30+ ecosystem projects</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Technology:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Layer-1 blockchain</li>
                        <li>Machine tokenization</li>
                        <li>DePIN infrastructure</li>
                        <li>IoT device integration</li>
                        <li>Autonomous operations</li>
                        <li>Real-world applications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUKI */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">AUKI (AUKI) - Decentralized Perception for Smarter Machines</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Hot on peaq&apos;s heels is AUKI, with a $55.5 million market cap and one of the category&apos;s standout performers at +24.1% in 24 hours and a whopping +87% over the past week. AUKI Labs is constructing a DePIN network focused on AI perception, essentially giving machines a &quot;collaborative sense of space&quot; for robotics, extended reality (XR), and smart cities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Live Stats:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Market Cap: ${(prices.auki.marketCap / 1000000).toFixed(1)}M</li>
                        <li>Price: ${prices.auki.price.toFixed(6)}</li>
                        <li>24h Volume: ${(prices.auki.volume24h / 1000).toFixed(0)}K</li>
                        <li className={prices.auki.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          24h Change: {prices.auki.change24h >= 0 ? '+' : ''}{prices.auki.change24h.toFixed(1)}%
                        </li>
                        <li>DePIN spatial computing</li>
                        <li>Top performer</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Technology:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>DePIN spatial computing</li>
                        <li>AI perception networks</li>
                        <li>Collaborative robotics</li>
                        <li>XR integration</li>
                        <li>Smart city applications</li>
                        <li>Open-source contributions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Codec Flow */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Codec Flow (CODEC) - AI Agents That Act in the Physical World</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Rounding out the top three is Codec Flow (CODEC), commanding a $20.8 million market cap. This innovative platform deploys adaptive AI agents—dubbed &quot;Operators&quot;—capable of seeing, reasoning, and executing tasks across software, cloud, edge computing, and crucially, robotics.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Live Stats:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Market Cap: ${(prices.codec.marketCap / 1000000).toFixed(1)}M</li>
                        <li>Price: ${prices.codec.price.toFixed(6)}</li>
                        <li>24h Volume: ${(prices.codec.volume24h / 1000000).toFixed(2)}M</li>
                        <li className={prices.codec.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          24h Change: {prices.codec.change24h >= 0 ? '+' : ''}{prices.codec.change24h.toFixed(1)}%
                        </li>
                        <li>Vision-Language Actions</li>
                        <li>Strong volume</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Technology:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Vision-Language Actions (VLAs)</li>
                        <li>Adaptive AI agents</li>
                        <li>Cross-platform automation</li>
                        <li>Manufacturing integration</li>
                        <li>Logistics applications</li>
                        <li>Physical world execution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Homebrew Robotics Club */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Homebrew Robotics Club (BREW) - Democratizing Robotics for Hobbyists</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Diving into the mid-tier, Homebrew Robotics Club (BREW) stands out as a community-driven gem with a $3.88 million market cap and the category&apos;s top 24-hour gainer at +55.8%. Inspired by the legendary Homebrew Computer Club that birthed personal computing icons like Steve Jobs, this project empowers hobbyists to design, build, and share robotics-focused products.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Live Stats:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Market Cap: ${(prices.brew.marketCap / 1000000).toFixed(2)}M</li>
                        <li>Price: ${prices.brew.price.toFixed(6)}</li>
                        <li>24h Volume: ${(prices.brew.volume24h / 1000).toFixed(0)}K</li>
                        <li className={prices.brew.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          24h Change: {prices.brew.change24h >= 0 ? '+' : ''}{prices.brew.change24h.toFixed(1)}%
                        </li>
                        <li>Community-driven</li>
                        <li>Top 24h gainer</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Vision:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Community-driven development</li>
                        <li>Hobbyist empowerment</li>
                        <li>Open-source robotics</li>
                        <li>Maker revolution</li>
                        <li>3D printing integration</li>
                        <li>Decentralized innovation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* VitaNova */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">VitaNova (SHOW) - An Evolving AI-Robotics Fusion</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    VitaNova, tokenized as SHOW, brings a creative twist to the sector with a $3.25 million market cap and impressive gains of +38.8% in 24 hours and +76.6% over seven days. This open-source initiative merges AI, robotics, and artistic design to birth an autonomous agent that &quot;explores a physical body&quot; via livestreams, evolving interactively with user input.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Live Stats:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Market Cap: ${(prices.show.marketCap / 1000000).toFixed(2)}M</li>
                        <li>Price: ${prices.show.price.toFixed(6)}</li>
                        <li>24h Volume: ${(prices.show.volume24h / 1000).toFixed(0)}K</li>
                        <li className={prices.show.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          24h Change: {prices.show.change24h >= 0 ? '+' : ''}{prices.show.change24h.toFixed(1)}%
                        </li>
                        <li>AI-robotics fusion</li>
                        <li>Strong momentum</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Innovation:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>AI-robotics fusion</li>
                        <li>Artistic design integration</li>
                        <li>Interactive evolution</li>
                        <li>Livestream embodiment</li>
                        <li>User-driven development</li>
                        <li>Entertainment + tech</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* RoboStack */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">RoboStack (ROBOT) - Cloud Simulation for Rapid Robotics Development</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Closing the list is RoboStack (ROBOT), a promising entrant with a fully diluted valuation (FDV) of $6.7 million. This cloud-native platform accelerates the development, testing, and deployment of intelligent robotic systems through realistic simulations, leveraging AI and a proprietary RCP protocol.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Live Stats:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>FDV: ${(prices.robot.marketCap / 1000000).toFixed(1)}M</li>
                        <li>Price: ${prices.robot.price.toFixed(6)}</li>
                        <li>24h Volume: ${(prices.robot.volume24h / 1000).toFixed(0)}K</li>
                        <li className={prices.robot.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                          24h Change: {prices.robot.change24h >= 0 ? '+' : ''}{prices.robot.change24h.toFixed(1)}%
                        </li>
                        <li>Cloud simulation</li>
                        <li>Strong early traction</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Platform:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Cloud-native simulation</li>
                        <li>Rapid prototyping</li>
                        <li>RCP protocol</li>
                        <li>AI-powered testing</li>
                        <li>Hardware-agnostic</li>
                        <li>Developer-friendly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Thesis Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Why Robotics Crypto Could 10x: An Asymmetric Bet on the Future
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                The robotics category&apos;s blistering start—up 20% since its CoinGecko debut and 21.5% in a single day—signals more than hype; it&apos;s the dawn of tokenized physical intelligence. These projects aren&apos;t just riding AI trends; they&apos;re embedding blockchain into the gears of tomorrow&apos;s machines, from DePIN networks to hobbyist kits.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Drivers:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Real-world utility in automation</li>
                    <li>Smart city infrastructure needs</li>
                    <li>DePIN network expansion</li>
                    <li>AI-robotics convergence</li>
                    <li>Maker movement growth</li>
                    <li>Industrial automation demand</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Growth Catalysts:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Hardware cost reduction</li>
                    <li>Open-source development</li>
                    <li>3D printing accessibility</li>
                    <li>Edge computing advances</li>
                    <li>5G network deployment</li>
                    <li>Regulatory clarity</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
                <p className="text-lg font-semibold text-yellow-400">
                  With total 24-hour volume hitting $6.4 million across the sector, liquidity is building fast. If predictions hold, a 10x surge to $1.58 billion by December 2025 isn&apos;t far-fetched, driven by real-world adoption in automation, smart cities, and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Featured Projects
            </h3>
            <p className="text-base md:text-lg text-white/80 font-satoshi mb-8 text-center leading-relaxed">
              Discover the leading robotics projects that are pioneering the intersection of blockchain and automation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">peaq (PEAQ)</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Machine Economy Infrastructure</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Layer-1 blockchain powering DePIN and the machine economy, enabling tokenization and interoperability of vehicles, robots, and IoT devices.</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-yellow-400 font-bold">${(prices.peaq.marketCap / 1000000).toFixed(1)}M Market Cap</div>
                    <div className={prices.peaq.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {prices.peaq.change24h >= 0 ? '+' : ''}{prices.peaq.change24h.toFixed(1)}% 24h
                    </div>
                    <div className="text-xs text-gray-400">${prices.peaq.price.toFixed(6)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">AUKI (AUKI)</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Decentralized Perception</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">DePIN network focused on AI perception, giving machines a collaborative sense of space for robotics, XR, and smart cities.</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-yellow-400 font-bold">${(prices.auki.marketCap / 1000000).toFixed(1)}M Market Cap</div>
                    <div className={prices.auki.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {prices.auki.change24h >= 0 ? '+' : ''}{prices.auki.change24h.toFixed(1)}% 24h
                    </div>
                    <div className="text-xs text-gray-400">${prices.auki.price.toFixed(6)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Codec Flow (CODEC)</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">AI Agents in Physical World</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Platform deploying adaptive AI agents capable of seeing, reasoning, and executing tasks across software, cloud, and robotics.</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-yellow-400 font-bold">${(prices.codec.marketCap / 1000000).toFixed(1)}M Market Cap</div>
                    <div className={prices.codec.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {prices.codec.change24h >= 0 ? '+' : ''}{prices.codec.change24h.toFixed(1)}% 24h
                    </div>
                    <div className="text-xs text-gray-400">${prices.codec.price.toFixed(6)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Homebrew Robotics (BREW)</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Community-Driven Innovation</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Community-driven platform empowering hobbyists to design, build, and share robotics-focused products in a decentralized manner.</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-yellow-400 font-bold">${(prices.brew.marketCap / 1000000).toFixed(2)}M Market Cap</div>
                    <div className={prices.brew.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {prices.brew.change24h >= 0 ? '+' : ''}{prices.brew.change24h.toFixed(1)}% 24h
                    </div>
                    <div className="text-xs text-gray-400">${prices.brew.price.toFixed(6)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">VitaNova (SHOW)</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">AI-Robotics Fusion</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Open-source initiative merging AI, robotics, and artistic design to create autonomous agents that explore physical embodiment.</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-yellow-400 font-bold">${(prices.show.marketCap / 1000000).toFixed(2)}M Market Cap</div>
                    <div className={prices.show.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {prices.show.change24h >= 0 ? '+' : ''}{prices.show.change24h.toFixed(1)}% 24h
                    </div>
                    <div className="text-xs text-gray-400">${prices.show.price.toFixed(6)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">RoboStack (ROBOT)</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Cloud Simulation Platform</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Cloud-native platform accelerating development, testing, and deployment of intelligent robotic systems through realistic simulations.</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-yellow-400 font-bold">${(prices.robot.marketCap / 1000000).toFixed(1)}M FDV</div>
                    <div className={prices.robot.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {prices.robot.change24h >= 0 ? '+' : ''}{prices.robot.change24h.toFixed(1)}% 24h
                    </div>
                    <div className="text-xs text-gray-400">${prices.robot.price.toFixed(6)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
