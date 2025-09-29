"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PlasmaPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Stablecoin Infrastructure • DeFi • Payments</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Plasma
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">The Future of Money</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-black to-yellow-500/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl">⚡</div>
                  <h2 className="text-4xl font-bold text-yellow-500">Purpose-Built for Stablecoins</h2>
                  <p className="text-xl text-white/80">Zero-fee USDT transfers • EVM-compatible • DeFi native</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Evolution of Money
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Throughout history, money has consistently evolved to fulfill three core functions: as a medium of exchange, a store of value, and a unit of account, while a relentless drive for faster settlement, lower costs, and borderless usability has propelled its transformation from localized barter systems to today&apos;s global digital networks.
              </p>
              <p className="text-lg">
                Stablecoins represent the next phase in the evolution of money and payments, forming the foundation of a financial system with faster settlement, lower fees, seamless cross-border functionality, native programmability and a strong auditability trail.
              </p>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Projection:</h4>
                <p className="text-lg">
                  With the backdrop of an improving regulatory environment, the evolving US debt situation and improving technology, we project stablecoin market cap to reach roughly <span className="text-yellow-400 font-bold">$4.9 trillion</span> over the next decade: nearly a <span className="text-yellow-400 font-bold">20x expansion</span> from today&apos;s levels.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">⚡</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Zero Fees
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Free USDT Transfers
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🔗</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  EVM Compatible
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Seamless Integration
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🏦</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  DeFi Native
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Built for Finance
              </p>
            </div>
          </div>

          {/* Stablecoin Categories */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Stablecoin Categories
            </h3>
            <div className="space-y-8">
              {/* Fiat Backed */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Fiat Backed - 92% of Market</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    A fiat-backed stablecoin maintains its 1:1 peg by fully collateralizing each digital token with an equivalent amount of fiat currency held off-chain. For example, each USDC token is backed by $1 held in a combination of cash and short-term U.S. government debt.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Examples:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>USDC (Circle)</li>
                        <li>USDT (Tether)</li>
                        <li>BUSD (Binance)</li>
                        <li>USDP (Paxos)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Revenue Model:</h5>
                      <p className="text-white/80 font-satoshi">Deploy reserves into interest-bearing US debt instruments. Tether earned ~$7B in 2024 from US Treasuries.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto Backed */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Crypto Backed - Decentralized</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Crypto-backed stablecoins operate similarly but mostly utilise overcollateralized lending systems due to their decentralised / non-KYC nature. Typically, a user deposits $1,000 worth of BTC, which then mints up to $800 in stablecoins, reflecting an 80% loan-to-value (LTV) ratio.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Examples:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>DAI (MakerDAO)</li>
                        <li>LUSD (Liquity)</li>
                        <li>FRAX (Fractional)</li>
                        <li>RAI (Reflexer)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Mechanism:</h5>
                      <p className="text-white/80 font-satoshi">Overcollateralized lending with liquidation thresholds to prevent bad debt accumulation.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Backed */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Strategy Backed - Yield Generating</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    A new category of &ldquo;stablecoins&rdquo; has recently emerged - tokens that maintain a $1-denominated value while embedding exposure to yield-generating investment strategies. These instruments function less like traditional stablecoins and more like dollar-denominated shares in an open-ended hedge fund.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Examples:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>USDe (Ethena)</li>
                        <li>USDY (Ondo)</li>
                        <li>sDAI (Spark)</li>
                        <li>yUSD (Yearn)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Risk Profile:</h5>
                      <p className="text-white/80 font-satoshi">Different risk profile than traditional stablecoins - more like synthetic dollar products.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Stablecoin Use Cases
            </h3>
            <div className="space-y-8">
              {/* Store of Value */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Store of Value</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Over 20% of the global population lives under regimes experiencing inflation rates of 6.5% or higher. In countries grappling with runaway inflation, weakening currencies, or strict capital controls, individuals and businesses are increasingly turning to USD-pegged stablecoins as a store of value.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Key Markets:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Argentina</li>
                        <li>Turkey</li>
                        <li>Lebanon</li>
                        <li>Venezuela</li>
                        <li>Nigeria</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Function:</h5>
                      <p className="text-white/80 font-satoshi">Digital savings accounts offering stable alternative for preserving purchasing power.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remittances */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Remittances - $905B Market</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Each year, tens of millions of workers send a portion of their wages back home, supporting over 200 million recipients globally. In 2024, total remittance flows reached approximately $905 billion. The average cost to send $200 abroad was approximately 6.4 percent, with some corridors exceeding 10 percent.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Current Issues:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>High fees (6.4% average)</li>
                        <li>Slow settlement</li>
                        <li>Limited transparency</li>
                        <li>Regressive tax on poor</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Stablecoin Solution:</h5>
                      <p className="text-white/80 font-satoshi">Internet-native alternative optimized for speed, transparency, and low cost. Plasma enables zero transfer fees on USDT transactions.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payments */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Global Payments - $1.8 Quadrillion</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    The global payments industry processed 3.4 trillion transactions in 2023, representing $1.8 quadrillion in value and generating $2.4 trillion in revenue. Yet despite these volumes, legacy systems remain characterized by higher transaction costs, slower settlement, chargeback risks, closed networks, and limited accessibility.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Legacy Problems:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>High costs</li>
                        <li>Slow settlement</li>
                        <li>Chargeback risks</li>
                        <li>Closed networks</li>
                        <li>Limited access</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Stablecoin Benefits:</h5>
                      <p className="text-white/80 font-satoshi">Faster settlement, lower costs, 24/7 availability, programmability, and auditability.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto Trading */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Crypto Trading</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Stablecoins first gained traction as crypto-native collateral and settlement rails, powering market makers and arbitrageurs to optimize capital efficiency. Today, trading firms and liquidity providers carry substantial stablecoin balances, while DeFi protocols embed them across collateral vaults, lending pools and AMM pairs.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Applications:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Market making</li>
                        <li>Arbitrage</li>
                        <li>DeFi collateral</li>
                        <li>Exchange margining</li>
                        <li>OTC settlement</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Growth:</h5>
                      <p className="text-white/80 font-satoshi">Centralized exchanges shifted perpetual futures to stablecoin-based contracts, now dominating trading volumes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plasma Architecture */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Plasma Architecture
            </h3>
            <div className="space-y-8">
              {/* PlasmaBFT */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">PlasmaBFT Consensus</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Plasma combines a Byzantine Fault Tolerant (&ldquo;BFT&rdquo;) consensus protocol, PlasmaBFT, with an execution layer built on Reth. The chain is EVM-equivalent, meaning contracts, opcodes, and tooling behave the same as Ethereum.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Key Features:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Two-chain commit rule</li>
                        <li>Pipelined operation</li>
                        <li>Reward slashing (not stake)</li>
                        <li>Committee-based voting</li>
                        <li>Non-validating nodes</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Benefits:</h5>
                      <p className="text-white/80 font-satoshi">Linear view change, responsiveness, threshold signatures for efficiency, and better scaling for large-scale implementations.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reth Execution */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Reth Execution Layer</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Plasma uses Reth (Rust ETH), an execution client built by Paradigm. Reth is a reimplementation of the EVM written in Rust that processes transactions, executes contracts, and updates state. Plasma is EVM-equivalent, therefore every opcode and precompile behaves the same as on Ethereum mainnet.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Architecture:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Modular design</li>
                        <li>Staged synchronization</li>
                        <li>Engine API integration</li>
                        <li>Consensus-execution split</li>
                        <li>Memory efficient</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Components:</h5>
                      <p className="text-white/80 font-satoshi">Transaction pool, block building, execution engine, and storage - all separated into distinct components for better performance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Native Features */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Plasma Native Features</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Plasma integrates stablecoin-focused features at the protocol level. These include zero-fee USD₮ transfers, support for custom gas tokens, and confidential transfers (currently under development).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Zero-Fee USDT:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Protocol-managed paymaster</li>
                        <li>EIP-4337 based</li>
                        <li>Identity checks & rate limits</li>
                        <li>EVM-compatible wallets</li>
                        <li>Reserved blockspace</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Custom Gas Tokens:</h5>
                      <p className="text-white/80 font-satoshi">Pay fees in approved ERC-20s like USDT and pBTC. Oracle-priced gas with protocol approval required.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plasma One */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Plasma One - Crypto-Native Neobank
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80">
                Plasma One is a non-custodial stablecoin-native neobank and card that brings saving, spending, earning, and sending into a single platform. The goal is to package core financial services around stablecoins into one application, allowing users to treat digital dollars as ordinary money.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">Key Features</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Spend directly from stablecoin balance while earning yield</li>
                    <li>• Up to 4% cashback in XPL on card purchases</li>
                    <li>• Global Visa network (150+ countries)</li>
                    <li>• Free transfers within Plasma system</li>
                    <li>• DeFi integration for yield generation</li>
                    <li>• Non-custodial asset management</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-yellow-500">pBTC Integration</h4>
                  <p className="text-white/80">
                    pBTC brings native Bitcoin onto Plasma using LayerZero&apos;s Omnichain Fungible Token (OFT) standard. It enables BTC to circulate on Plasma as collateral, facilitate transfers, and integrate across DeFi applications without centralized custody.
                  </p>
                  <ul className="space-y-2 text-white/80">
                    <li>• Threshold signature custody (MPC/TSS)</li>
                    <li>• Unified supply across chains</li>
                    <li>• Collateral for borrowing stablecoins</li>
                    <li>• DeFi integration opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tokenomics */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              XPL Tokenomics
            </h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Token Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Public Sale</span>
                      <span className="text-yellow-400 font-bold">10%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Ecosystem & Growth</span>
                      <span className="text-yellow-400 font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Team</span>
                      <span className="text-yellow-400 font-bold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Investors</span>
                      <span className="text-yellow-400 font-bold">25%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Key Details</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Initial supply: 10B XPL</li>
                    <li>• ~18% circulating at TGE</li>
                    <li>• 5% annual inflation (decreasing to 3%)</li>
                    <li>• EIP-1559 fee burning</li>
                    <li>• PoS consensus mechanism</li>
                    <li>• Validator rewards system</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Vesting Schedule</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-yellow-400 font-epilogue mb-2">Public Sale:</h5>
                    <p className="text-white/80 font-satoshi">Non-US: Immediate unlock<br/>US: 12-month lockup</p>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-epilogue mb-2">Team:</h5>
                    <p className="text-white/80 font-satoshi">1/3: 1-year cliff<br/>2/3: 2-year linear vest</p>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-epilogue mb-2">Ecosystem:</h5>
                    <p className="text-white/80 font-satoshi">8% immediate unlock<br/>32%: 3-year linear vest</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day 1 DeFi Ecosystem */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Day 1 DeFi Ecosystem
            </h3>
            <p className="text-base md:text-lg text-white/80 font-satoshi mb-8 text-center leading-relaxed">
              Plasma will be home to billions of dollars in USDT on launch day, with strategic partnerships bringing nearly $3B in TVL from Veda, Binance Earn, and Maple.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Aave</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">$69B TVL</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">The most trusted onchain lending platform, providing core DeFi infrastructure for borrowing and lending.</p>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Ethena</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">$14B TVL</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Strategy-backed stablecoin USDe with yield-generating investment strategies and synthetic dollar products.</p>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Maple</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">$4B+ TVL</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">syrupUSDT vault bringing $200M in deposits at launch, offering overcollateralized loans to crypto-native companies.</p>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Uniswap</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">DEX</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Professional pool management for stablecoin swaps with tens of millions in XPL incentives over 6 months.</p>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Pendle</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Yield Trading</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Tokenized yield trading platform allowing speculation on future returns of yield-bearing assets.</p>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Centrifuge</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">$1.2B+ TVL</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Onchain access to tokenized assets, specifically treasury and credit funds with 4-5% yields from US Treasuries.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Investment Thesis */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Investment Thesis
            </h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Stablecoin Supercycle</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Market grew from $30M (2018) to $250B+ today</li>
                    <li>• 263% CAGR over 6 years</li>
                    <li>• Projected $4.9T market cap by 2034</li>
                    <li>• 15th largest holder of US Treasuries</li>
                    <li>• Regulatory clarity advancing</li>
                    <li>• Shadow monetary policy tool</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Purpose-Built Infrastructure</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Zero-fee USDT transfers</li>
                    <li>• EVM-compatible execution</li>
                    <li>• Custom gas token support</li>
                    <li>• Confidential transfers (planned)</li>
                    <li>• DeFi-native architecture</li>
                    <li>• Plasma One neobank integration</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Opportunity</h4>
                <p className="text-white/80 font-satoshi mb-4">
                  Plasma is positioned to capture the next phase of stablecoin growth by offering purpose-built infrastructure that addresses the limitations of Ethereum and Tron. With 40% of all blockchain fees spent on simple USDT transfers, Plasma&apos;s zero-fee model directly targets this inefficiency.
                </p>
                <p className="text-white/80 font-satoshi">
                  The combination of technical innovation, strategic partnerships, and a comprehensive DeFi ecosystem positions Plasma to become the leading stablecoin settlement layer, potentially processing more dollar transaction value than any other blockchain or payments company in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
