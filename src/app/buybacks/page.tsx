"use client";

import Link from "next/link";

export default function BuybacksPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Header accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="space-y-16">
          {/* Hero */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-2 font-light">
              DeFi • Tokenomics • Market Structure
            </p>
            <h1 className="text-center">
              <span className="text-5xl md:text-7xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)]">
                Buybacks
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30" />
              <p className="mx-6 text-lg text-white/70 font-light italic">
                The Rise of Token Buybacks in Crypto: A Sustainable Path to Value Accrual or Short-Term Hype?
              </p>
              <div className="h-px w-24 bg-yellow-500/30" />
            </div>

            {/* Visual frame */}
            <div className="relative w-full mx-auto mt-10 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-black to-black" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-yellow-500/70 text-sm tracking-widest">TOKEN BUYBACKS • VALUE ACCRUAL • 2025</span>
              </div>
            </div>
          </div>

          {/* Editorial Intro */}
          <section className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] space-y-6 leading-relaxed">
            <p className="text-white/80">
              In the ever-evolving landscape of decentralized finance (DeFi) and blockchain protocols, token buybacks have emerged as a powerful mechanism for protocols to redistribute value, reduce circulating supply, and signal long-term commitment to their communities. Unlike traditional stock buybacks in corporate finance, where companies repurchase shares to boost earnings per share and shareholder value, crypto buybacks involve protocols using a portion of their generated revenue—often from trading fees, lending interest, or other ecosystem activities—to purchase their native tokens from the open market. These tokens are then typically burned, locked, staked, or redistributed to holders, creating deflationary pressure that can drive up token prices while aligning incentives between the protocol&apos;s success and its token holders.
            </p>
            <p className="text-white/80">
              The appeal is straightforward: in a market plagued by inflationary tokenomics and rug pulls, buybacks offer a tangible way for protocols to "put their money where their mouth is." They transform passive token holding into a revenue-sharing model, where holders benefit directly from protocol growth. However, this isn&apos;t without controversy. Critics argue that buybacks can be a band-aid for poor fundamentals, artificially inflating prices without addressing underlying issues like user adoption or competition. In volatile crypto markets, aggressive buybacks might drain treasuries during downturns, leading to sustainability questions. Yet, as we approach the latter half of 2025, with Bitcoin hovering near all-time highs and DeFi total value locked (TVL) surging past $200 billion, buybacks are gaining traction as a core strategy for protocols across market caps.
            </p>
            <p className="text-white/80">
              This editorial dives deep into a curated selection of protocols employing buybacks, categorized by market capitalization. These examples span lending platforms, DEX aggregators, AI-driven tools, and more, showcasing how buybacks are being implemented to foster growth. Drawing from recent data and announcements, we&apos;ll explore their mechanisms, impacts, and potential pitfalls. While some of these protocols are under-the-radar gems with sub-$50 million caps, others are blue-chip giants exceeding $1 billion—proving that buybacks aren&apos;t just for small players trying to pump prices but a scalable tool for ecosystem maturity.
            </p>
          </section>

          {/* Under $50M */}
          <section className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
              Under $50 Million Market Cap: Emerging Protocols Betting Big on Buybacks for Bootstrapping Growth
            </h3>
            <p className="text-white/80">
              At the lower end of the spectrum, protocols with market caps under $50 million often use buybacks to bootstrap liquidity and attract early adopters. These are high-risk, high-reward plays where buybacks can significantly impact token supply due to lower overall circulation. However, execution is key—small treasuries mean buybacks must be efficient to avoid dilution from operational costs.
            </p>
            <ul className="space-y-6 text-white/80">
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Silo Finance (SILO):</span> As a non-custodial lending protocol on Sonic and EVM chains, Silo Finance allocates 50% of its revenue to buying back SILO tokens, which are then distributed to stakers via the xSILO module. This creates a flywheel: more lending activity generates fees, funding buybacks that reward holders and reduce supply. With a focus on risk-isolated markets, Silo&apos;s buybacks have been part of a tokenomics upgrade emphasizing multi-chain governance. In my view, this positions SILO as a sleeper hit in DeFi lending, especially if TVL grows amid 2025&apos;s restaking boom. But with a modest cap, volatility remains a concern—buybacks could amplify pumps but falter in bear markets.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Gearbox (GEAR):</span> Gearbox, a composable leverage protocol, dedicates 25% of its revenue to repurchasing GEAR LP tokens, starting implementations as early as March 2025. This not only reduces supply but also bolsters liquidity pools, making it easier for users to enter leveraged positions. Gearbox&apos;s stateful approach to credit and leverage across L2 ecosystems adds utility, and buybacks tie directly to borrower rates voted on by stakers. It&apos;s a smart, community-driven model that could see GEAR outperform if DeFi leverage demand spikes, though competition from larger players like Aave might cap its upside.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Natix Network (NATIX):</span> Natix, a DePIN (Decentralized Physical Infrastructure Network) project focused on drive-to-earn data collection, channels 40% of protocol revenue into NATIX buybacks and burns, with another 35% for staking rewards. Since July 2024, over 352.5 million NATIX have been burned, driven by data sales revenue. This deflationary mechanic rewards contributors in a real-world utility play—users earn tokens by mapping via dashcams, fueling AI and mapping apps. Natix&apos;s buybacks signal maturity in the DePIN space, where token value often lags hardware adoption. If partnerships expand in 2025, NATIX could explode, but regulatory hurdles for data privacy pose risks.
                </p>
              </li>
            </ul>
            <p className="text-white/80">
              These sub-$50M protocols exemplify how buybacks can accelerate bootstrapping, turning revenue into immediate holder value. Yet, their small scale means buybacks must be paired with viral growth to avoid fizzling out.
            </p>
          </section>

          {/* $50M-$500M */}
          <section className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
              $50 Million to $500 Million Market Cap: Mid-Tier Protocols Scaling Buybacks for Stability
            </h3>
            <p className="text-white/80">
              In this bracket, protocols have established user bases but face intense competition. Buybacks here often exceed 50% of revenue, providing a buffer against market dumps and incentivizing long-term holding through staking or locking.
            </p>
            <ul className="space-y-6 text-white/80">
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Kaito (KAITO):</span> Kaito, an AI-powered crypto analytics tool, has aggressively pursued buybacks, accumulating over $6.6 million in KAITO since March 2025, with proposals to repurchase 150% of distributed tokens from campaigns. This has driven a 41% rally amid rising staked supply. Kaito&apos;s focus on semantic search and insights makes it a Web3 staple, and buybacks tighten supply as TVL grows. It&apos;s a bullish setup, but reliance on hype cycles could lead to corrections if AI narrative fades.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">DeFi App (HOME):</span> As a versatile DeFi platform, DeFi App uses 80% of net fee revenue for HOME buybacks, holding them in the DAO treasury. Recent proposals, like DIP-005, authorize up to 187.5 million HOME repurchases tied to campaigns. This creates a feedback loop: more trading boosts revenue, funding buybacks that strengthen the token. With governance emphasis, HOME feels undervalued in mid-cap DeFi, potentially yielding 2-3x gains if adoption surges.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">DeBridge (DBR):</span> DeBridge, a cross-chain bridge, allocates 100% of protocol revenue to its Reserve Fund for DBR buybacks, repurchasing 1.3% of supply ($3 million) since June 2025. This full commitment stabilizes DBR amid interoperability demands. As bridges become critical in multi-chain worlds, DeBridge&apos;s buybacks could propel it higher, though security risks in bridging remain a wildcard.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Aevo (AEVO):</span> Aevo, a derivatives exchange, resumed monthly buybacks of 1 million AEVO in Q2/Q3 2025, funded by insurance pools and revenue. June&apos;s buyback averaged $0.38 per token. Aevo&apos;s on-chain executions enhance transparency, making it attractive for options traders. In a maturing perp market, this could solidify Aevo&apos;s position, but volume dependency might expose it to slowdowns.
                </p>
              </li>
            </ul>
            <p className="text-white/80">
              Mid-tier buybacks emphasize sustainability, often integrating with staking for compounded rewards. These protocols are primed for breakout if macro conditions favor DeFi.
            </p>
          </section>

          {/* $500M-$1B */}
          <section className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
              $500 Million to $1 Billion Market Cap: Established Players Using Buybacks to Cement Dominance
            </h3>
            <p className="text-white/80">
              Here, buybacks are strategic, often 20-50% of fees, balancing growth with token economics in competitive arenas.
            </p>
            <ul className="space-y-6 text-white/80">
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">EtherFi (ETHFI):</span> EtherFi, a restaking protocol, repurposes withdrawal fees for ETHFI buybacks, spending $320,000 weekly in May 2025 alone. This has doubled ETHFI&apos;s price amid $3.15 million in fees. As restaking leads 2025 narratives, EtherFi&apos;s buybacks align with TVL growth, positioning it as a top contender—though EigenLayer competition looms.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Maple Finance (SYRUP):</span> Maple, an institutional lending platform, allocates 20-25% of fees to SYRUP buybacks, with MIP-018 proposing an increase for Q3 2025. Rewards go to stakers, bucking bearish trends with a 23% upside. Maple&apos;s focus on RWAs (real-world assets) makes buybacks a bridge to tradfi, potentially undervalued at this cap.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Raydium (RAY):</span> Solana&apos;s DEX Raydium uses 12% of fees for RAY buybacks, cumulatively exceeding $190 million by July 2025. This has repurchased 69 million RAY, fueling rallies. Raydium&apos;s AMM dominance on Solana suggests buybacks will sustain momentum, especially with memecoin fervor.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">dYdX (DYDX):</span> dYdX allocates 25% of fees to DYDX buybacks, spending $1.9 million to acquire 2.8 million tokens since March 2025. Staked for rewards, this loop enhances governance. As a perp leader, dYdX&apos;s buybacks could drive it toward $2B cap if volumes persist.
                </p>
              </li>
            </ul>
          </section>

          {/* >$1B */}
          <section className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
              Over $1 Billion Market Cap: Blue-Chips Leveraging Buybacks for Long-Term Resilience
            </h3>
            <p className="text-white/80">
              Giants use buybacks conservatively, often 50-100% of revenue, to maintain leadership amid scrutiny.
            </p>
            <ul className="space-y-6 text-white/80">
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Hyperliquid (HYPE):</span> Hyperliquid directs 97% of fees to HYPE buybacks, repurchasing $31 million in a week and generating $4 million daily. This could repurchase all supply in 1.5-7.5 years. Hyperliquid&apos;s perp dominance makes it a powerhouse, with buybacks signaling elite fundamentals.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">AAVE (AAVE):</span> Aave&apos;s DAO has repurchased 70,000 AAVE ($15.7M), netting $2.6 million profit in six months. Part of a $50M annual plan, this upgrades tokenomics. Aave&apos;s lending supremacy ensures buybacks sustain its blue-chip status.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Chainlink (LINK):</span> Chainlink&apos;s new Reserve converts revenue to LINK buybacks via Payment Abstraction, channeling 50% of fees. This oracles giant&apos;s move could stabilize LINK amid CCIP growth.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Pump Fun (PUMP):</span> Pump.fun uses 100% revenue for PUMP buybacks, spending $6.68 million recently amid a 60% crash recovery. As a memecoin launcher, buybacks counter sell-pressure, potentially fueling "hated rallies."
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Jupiter (JUP):</span> Jupiter allocates 50% of fees to JUP buybacks, topping $100 million annually and locking tokens for three years. Solana&apos;s aggregator benefits from high volumes, making buybacks a value accrual machine.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold text-yellow-400">Sky (SKY):</span> Formerly MakerDAO, Sky spent $1.39 million weekly on SKY buybacks, using staking rewards and surplus. This stabilizes the stablecoin ecosystem, with co-founder involvement adding credibility.
                </p>
              </li>
            </ul>
          </section>

          {/* Summary Table */}
          <section className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Protocol Buyback Overview</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-black/40 text-yellow-400">
                    <th className="text-left p-3 border-b border-yellow-500/30">Market Cap Category</th>
                    <th className="text-left p-3 border-b border-yellow-500/30">Protocol (Token)</th>
                    <th className="text-left p-3 border-b border-yellow-500/30">Buyback Allocation</th>
                    <th className="text-left p-3 border-b border-yellow-500/30">Key Impact</th>
                  </tr>
                </thead>
                <tbody className="text-white/80 divide-y divide-yellow-500/20">
                  {[
                    ["Under $50M","Silo Finance (SILO)","50% of revenue","Enhances staking rewards, multi-chain growth"],
                    ["Under $50M","Gearbox (GEAR)","25% of revenue","Boosts LP liquidity, voter incentives"],
                    ["Under $50M","Natix Network (NATIX)","40% buyback & burn","Deflationary DePIN data economy"],
                    ["$50M-$500M","Kaito (KAITO)","Variable, e.g., 150% of distributions","AI-driven supply reduction"],
                    ["$50M-$500M","DeFi App (HOME)","80% of net fees","Treasury reserves for stability"],
                    ["$50M-$500M","DeBridge (DBR)","100% of revenue","Full commitment to cross-chain value"],
                    ["$50M-$500M","Aevo (AEVO)","Monthly fixed (1M tokens)","Derivatives market confidence"],
                    ["$500M-$1B","EtherFi (ETHFI)","From withdrawal fees","Restaking fee capture"],
                    ["$500M-$1B","Maple Finance (SYRUP)","20-25% of fees","Institutional lending rewards"],
                    ["$500M-$1B","Raydium (RAY)","12% of fees","Solana DEX dominance"],
                    ["$500M-$1B","dYdX (DYDX)","25% of fees","Perp trading alignment"],
                    [">$1B","Hyperliquid (HYPE)","97% of fees","Rapid supply shock potential"],
                    [">$1B","AAVE (AAVE)","Variable, $50M annual","Lending protocol maturity"],
                    [">$1B","Chainlink (LINK)","50% via reserve","Oracle revenue recycling"],
                    [">$1B","Pump Fun (PUMP)","100% of revenue","Memecoin launchpad recovery"],
                    [">$1B","Jupiter (JUP)","50% of fees","Aggregator long-term locking"],
                    [">$1B","Sky (SKY)","From surplus & rewards","Stablecoin ecosystem strength"],
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-black/30">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 align-top">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] space-y-6 leading-relaxed">
            <p className="text-white/80">
              In conclusion, token buybacks represent a maturing crypto industry&apos;s shift toward sustainable economics, where protocols like these prioritize real revenue over speculative airdrops. While politically incorrect to say, not all buybacks are equal—smaller caps risk hype-driven failures, while giants like Hyperliquid or AAVE use them to entrench moats. As 2025 unfolds with potential ETF inflows and regulatory clarity, expect buybacks to proliferate, rewarding protocols that generate genuine value. Investors should diligence revenue sources and execution, as buybacks alone won&apos;t save flawed models. Ultimately, this trend could herald a more equitable DeFi era, where holders truly own the upside.
            </p>
            <div className="pt-2 text-center">
              <Link href="/" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4">
                Back to home
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


