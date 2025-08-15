"use client";

import { useState } from "react";

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-[#1c1f26] p-6 md:p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
    <h3 className="text-xl md:text-3xl font-bold text-yellow-500 mb-6">
      {title}
    </h3>
    <div className="space-y-4 text-gray-300 text-lg">
      {children}
    </div>
  </div>
);

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start">
        <span className="text-yellow-500 mr-4 mt-1">▹</span>
        <span>{children}</span>
    </li>
);

const MetricCard = ({ title, value, description }: { title: string, value: string, description: string }) => (
    <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
        <p className="text-yellow-400 text-3xl font-bold font-epilogue">{value}</p>
        <h4 className="text-xl font-bold text-white mt-2">{title}</h4>
        <p className="text-white/80 font-satoshi mt-1">{description}</p>
    </div>
);

const MinerProfileCard = ({ name, ticker, marketCap, btcHoldings }: { name: string, ticker: string, marketCap: string, btcHoldings: string }) => (
    <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20 flex flex-col justify-between">
        <div>
            <h4 className="text-xl font-bold text-white">{name}</h4>
            <p className="text-yellow-400 font-mono">{ticker}</p>
        </div>
        <div className="mt-4 space-y-2">
            <div>
                <p className="text-sm text-white/70">Market Cap</p>
                <p className="text-lg font-bold text-white">{marketCap}</p>
            </div>
            <div>
                <p className="text-sm text-white/70">BTC Holdings</p>
                <p className="text-lg font-bold text-white">{btcHoldings}</p>
            </div>
        </div>
    </div>
);

const FinancialsTable = ({ data }: { data: { metric: string, value: string }[] }) => (
    <div className="mt-6 border border-yellow-500/20">
        {data.map((item, index) => (
            <div key={index} className={`flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 ${index % 2 === 0 ? 'bg-black/50' : 'bg-black/20'}`}>
                <p className="text-white/80 text-sm sm:text-base">{item.metric}</p>
                <p className="text-yellow-400 font-bold font-mono text-right sm:text-left">{item.value}</p>
            </div>
        ))}
    </div>
);

// Proto Rig profitability calculator (defaults to France electricity cost)
const ProtoRigProfitability = () => {
    const [electricityCost, setElectricityCost] = useState(0.10); // €/kWh (France default adjustable)
    const powerKw = 12; // 12,000 W
    const kWhPerDay = powerKw * 24; // 288 kWh/day
    // Baseline revenue inferred from $0.06/kWh example: profit $29.90 + cost (288*0.06=$17.28) ≈ $47.18/day
    const baselineRevenuePerDay = 47.18; // treat as € for simplicity
    const dailyProfit = baselineRevenuePerDay - kWhPerDay * electricityCost;
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = dailyProfit * 365;

    const format = (n: number) => `€${Math.round(n).toLocaleString('fr-FR')}`;

    return (
        <div className="bg-[#0b0d12] p-6 md:p-7 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h4 className="text-white font-bold text-xl md:text-2xl mb-5">Profitability (France electricity)</h4>
            <div className="flex flex-wrap items-center gap-3 mb-5">
                <label className="text-sm text-white/70">Electricity cost (€/kWh)</label>
                <input
                    type="number"
                    min={0}
                    step={0.005}
                    value={electricityCost}
                    onChange={(e) => setElectricityCost(parseFloat(e.target.value || '0'))}
                    className="bg-black border border-yellow-500/50 text-white p-2 w-28 focus:outline-none focus:border-yellow-500"
                />
                <span className="text-xs text-white/50">Default: 0.10 €/kWh</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <MetricCard title="Daily Profit" value={format(dailyProfit)} description="12 kW draw, baseline revenue" />
                <MetricCard title="Monthly Profit" value={format(monthlyProfit)} description="30 days" />
                <MetricCard title="Annual Profit" value={format(yearlyProfit)} description="365 days" />
            </div>
            <p className="text-xs text-white/50 mt-3">Approximation from vendor specs and public examples; revenue varies with BTC price and difficulty.</p>
        </div>
    );
};

export default function MiningPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-yellow-500/90 text-xs md:text-sm mb-4 font-light font-satoshi">Bitcoin Economics • Energy Markets • Future of Hashpower</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_0_1px_10px_rgba(255,255,255,0.2)] font-satoshi">
                Bitcoin Mining After 2025:
                <br />
                <span className="text-yellow-500 [text-shadow:_0_1px_20px_rgba(234,179,8,0.4)]">From Dirty Rigs to Clean Nodes of Economic Gravity</span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-16 sm:w-24 bg-yellow-500/30"></div>
              <p className="mx-4 sm:mx-6 text-base md:text-lg text-white/70 font-light italic font-satoshi">How the Culture of Mining Has Evolved — and Where the New Hashpower Frontiers Are Being Built</p>
              <div className="h-px w-16 sm:w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <iframe
                src="https://www.youtube.com/embed/9BFRY4IwDQA"
                title="The Future of Bitcoin Mining"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <Section title="The First 16 Years: Cowboy Capitalism & Coal-Fired Hashpower">
            <p>
              In Bitcoin&apos;s formative years — from 2009 to 2025 — mining was the wild west. A niche hobby became an arms race. From CPUs to GPUs to FPGAs and finally ASICs, each epoch was defined by exponential leaps in hashrate and a shift in who could afford to stay in the game.
            </p>
            <p>
              What began as a grassroots movement powered by gamers and tinkerers quickly morphed into a global industrial landscape, with warehouses of miners guzzling fossil fuels in energy-rich regions. The culture was adversarial, opaque, and carbon-heavy. Efficiency was secondary to brute force.
            </p>
            <p>
              Electricity was king, and whoever secured the cheapest electrons could dominate. But the costs — social, environmental, and political — mounted. Regulators balked. ESG-conscious investors recoiled. Grid operators grew wary. And the narrative around Bitcoin mining calcified: wasteful, dirty, extractive.
            </p>
            <p>
                But post-2025? That story flipped.
            </p>
          </Section>

          <Section title="The Post-2025 Mining Renaissance: Solar-Powered Sovereignty">
            <p>
              The year 2025 marked a pivot. As the fifth Bitcoin halving approached and energy geopolitics reshaped the globe, the economics of mining began to invert. With over 50% of the network running on renewable sources, efficiency no longer meant just J/TH — it meant value per surplus kilowatt. It meant matching the ebb and flow of renewable production. It meant being good grid citizens.
            </p>
            <p>
              In Europe, small villages with massive solar farms found new purpose in Bitcoin. Instead of curtailing their overproduction or dumping it onto the grid at low prices, they began routing it into smart containers filled with next-generation ASICs.
            </p>
            <p>
              Clean power became clean hash. Waste heat became warmth for greenhouses and pools. And local councils began generating income not just from solar subsidies — but from BTC.
            </p>
          </Section>

          <Section title="The Rise of Modular, Demand-Responsive Mining">
            <p>
              Modern miners don&apos;t fight the grid. They flex with it. Using Braiins OS+ firmware, dynamic autotuning, and load-balancing APIs, these rigs no longer scream at full capacity 24/7. They modulate. They duck during price spikes and throttle up during negative pricing windows.
            </p>
            <p>
              In a world where real-time energy markets dominate, miners have evolved into grid symbionts — stabilizing demand rather than distorting it. Their footprint is no longer purely physical. It&apos;s temporal, programmable, invisible.
            </p>
          </Section>

          <Section title="Proto Rig Review: Block’s Open‑Source Revolution">
            <p>
              On August 14, 2025, Block unveiled <em>Proto Rig</em> at Core Scientific’s Dalton, Georgia facility — a durable, modular, and efficient mining chassis that reframes mining as long‑lived infrastructure rather than disposable appliances.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-xl">Why it matters</h4>
                <ul className="space-y-3 list-none pl-0">
                  <BulletPoint>Tool‑free, on‑rack repairs in under 90 seconds</BulletPoint>
                  <BulletPoint>Replaceable hashboards: upgrade performance without replacing the whole system</BulletPoint>
                  <BulletPoint>Fan modules and control board are pull‑and‑replace for minimal downtime</BulletPoint>
                  <BulletPoint>Fanless PSU design and three‑phase power balancing for efficient infrastructure</BulletPoint>
                  <BulletPoint>Open‑source firmware, software, and APIs with Proto Fleet management</BulletPoint>
                </ul>
                <p className="text-sm text-white/60">Source: <a className="text-yellow-400 underline" href="https://proto.xyz/products/rig" target="_blank" rel="noopener noreferrer">proto.xyz/products/rig</a></p>
              </div>
              <div>
                <FinancialsTable
                  data={[
                    { metric: 'Hashrate', value: 'Up to 819 TH/s (9 hashboards)' },
                    { metric: 'Efficiency', value: 'As low as 14.1 J/TH (air‑cooled)' },
                    { metric: 'Power', value: 'Up to 12,000 W (3× 4,000 W PSUs)' },
                    { metric: 'Power Density', value: 'Up to 9.4 kW/ft' },
                    { metric: 'Repair Time', value: 'Under 90 seconds (on‑rack)' },
                    { metric: 'Cooling', value: 'Air‑cooled standard, immersion‑ready' },
                    { metric: 'Chassis', value: '390 × 290 × 500 mm; ~110 lbs (9 boards)' },
                  ]}
                />
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-xl">The economics of modularity</h4>
                <ul className="space-y-3 list-none pl-0">
                  <BulletPoint>15–20% savings per upgrade cycle by replacing hashboards instead of full systems</BulletPoint>
                  <BulletPoint>Transforms 3–5 year replacement into 10+ year infrastructure life</BulletPoint>
                  <BulletPoint>Downtime minimized; failed modules do not halt the entire chassis</BulletPoint>
                </ul>
              </div>
              <ProtoRigProfitability />
            </div>

            <p className="mt-6 text-white/80">
              Bottom line: Proto Rig matches premium air‑cooled alternatives on efficiency while shifting value to uptime, serviceability, and open tooling — critical advantages in post‑halving economics.
            </p>
          </Section>

          <Section title="Mining as a Circular Infrastructure Layer">
            <p>
                The most forward-thinking operations post-2025 aren&apos;t just about BTC yield. They&apos;re about synergy. Think:
            </p>
            <ul className="space-y-3 list-none pl-0">
                <BulletPoint>Waste heat from miners drying hemp, algae, or timber</BulletPoint>
                <BulletPoint>Containerized mining clusters heating swimming pools or aquaponic farms</BulletPoint>
                <BulletPoint>Tokenized mining yield shared with the local energy coop via smart contracts</BulletPoint>
            </ul>
            <p>
                Mining is no longer a silo. It&apos;s a layer — woven into local food, water, energy, and digital asset flows.
            </p>
          </Section>

          <Section title="A Case Study for the Next Mining Epoch">
            <p>
              What some regions were to flared gas and off-grid ranching, other solar-rich areas are to post-2025 mining: a place where solar saturation meets Bitcoin abstraction. Pilot projects showcase what&apos;s possible: 10-unit proofs of concept scaling into 1,000-unit solar-native mining villages.
            </p>
            <p>
                With sub-€0.03/kWh marginal energy, 30–40% hash efficiency gains via firmware, and paybacks measured in weeks, the next chapter of Bitcoin mining isn&apos;t offshore. It&apos;s on local rooftops, modular farms, and sovereign grids.
            </p>
          </Section>

          <Section title="The Financial Model of Solar-Powered Mining">
            <p>
              Profitability in the post-2025 era hinges on access to low-cost energy and operational efficiency. Consider a hypothetical large-scale operation in a solar-rich region like Nouvelle-Aquitaine, leveraging surplus energy from a 53 MW solar farm. Such a setup could power approximately 15,100 next-generation ASIC miners (e.g., Antminer S21 Pro).
            </p>
            <p>
                The financial viability depends critically on balancing revenue against significant operating expenses. While using surplus solar power effectively eliminates electricity costs—the largest variable for traditional miners—hardware depreciation remains a major factor, with equipment lifecycles typically lasting only 2-3 years.
            </p>
            <FinancialsTable data={[
                { metric: 'Solar Farm Capacity', value: '53 MW' },
                { metric: 'Number of ASIC Units', value: '~15,100' },
                { metric: 'Assumed Bitcoin Price', value: '€100,000' },
                { metric: 'Uptime (Solar-Adjusted)', value: '~33%' },
                { metric: '---', value: '---' },
                { metric: 'Est. Annual Revenue', value: '€38.6M' },
                { metric: 'Est. Annual Hardware Depreciation', value: '(€27.2M)' },
                { metric: 'Est. Annual Maintenance', value: '(€3.0M)' },
                { metric: '---', value: '---' },
                { metric: 'Est. Net Annual Profit', value: '€8.4M' },
            ]} />
            <p className="text-sm text-white/60 mt-4 italic">
                Note: This model is illustrative and assumes stable Bitcoin prices and mining difficulty. Actual returns will vary with market conditions.
            </p>
          </Section>

          <Section title="Key Metrics of Sustainable Mining">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <MetricCard 
                      value=">50%"
                      title="Renewable Energy Share"
                      description="The majority of the Bitcoin network is powered by renewables, with solar and wind leading the charge."
                  />
                  <MetricCard 
                      value="<€0.03/kWh"
                      title="Surplus Energy Cost"
                      description="Miners are capitalizing on extremely low-cost surplus solar energy, enabling rapid ROI."
                  />
                  <MetricCard 
                      value="30-40%"
                      title="Firmware Efficiency Gains"
                      description="Advanced firmware like Braiins OS+ enhances hash rate and improves grid integration."
                  />
                  <MetricCard 
                      value="Circular"
                      title="Waste Heat Utilization"
                      description="A former byproduct is now a resource, used for greenhouses, local heating, and aquaculture."
                  />
                  <MetricCard 
                      value="Community"
                      title="Tokenized Yields"
                      description="Mining revenue is shared with local energy co-ops, boosting rural economies and engagement."
                  />
                   <MetricCard 
                      value="Synergistic"
                      title="Energy Sources"
                      description="A dual approach using both solar and nuclear power is being explored to ensure a low-carbon footprint."
                  />
              </div>
          </Section>

          <Section title="Global Trends & Challenges">
              <p>
                Despite the shift to renewables, the industry faces hurdles. Bitcoin mining&apos;s total energy consumption remains a point of contention, with critics concerned about diverting clean energy from other essential uses. The public and regulatory narrative is still evolving, and gaining widespread social acceptance for mining as a sustainable practice is an ongoing effort.
              </p>
          </Section>

          <Section title="Policy & Grid Stabilization: A National Case Study">
            <p>
              Forward-thinking governments are beginning to recognize mining&apos;s potential role in national energy strategy. In France, for example, a parliamentary proposal (Amendment No. 547) is evaluating Bitcoin mining as a tool to stabilize the national electricity grid.
            </p>
            <p>
              The initiative focuses on leveraging the country&apos;s significant surplus nuclear energy. By acting as a flexible, on-demand energy consumer, mining operations can absorb excess electricity during periods of overproduction, which in turn reduces the costly wear-and-tear on nuclear facilities from frequent power adjustments. Key potential benefits include:
            </p>
            <ul className="space-y-3 list-none pl-0 mt-4">
                <BulletPoint>Enhancing grid resilience by balancing supply and demand.</BulletPoint>
                <BulletPoint>Reducing operational strain on critical nuclear infrastructure.</BulletPoint>
                <BulletPoint>Repurposing waste heat for urban or industrial heating systems.</BulletPoint>
                <BulletPoint>Creating economic opportunities through the development of a low-carbon mining industry.</BulletPoint>
            </ul>
             <p className="text-sm text-white/60 mt-4 italic">
                While still in the evaluation phase, this proposal signals a major shift, reframing mining from a perceived problem to a potential solution for energy management.
            </p>
          </Section>

          <Section title="The Miner's Dilemma: Price, Profit, and the Deflationary Thesis">
            <p>
                When a miner considers selling Bitcoin, the price is not just a number—it&apos;s a reflection of a much deeper economic reality. The core thesis of thinkers like Jeff Booth challenges the very foundation of how we measure value. It starts with a simple, yet powerful, thought experiment: if you were to measure all the world&apos;s assets—stocks, real estate, and bonds, totaling roughly $900 trillion—in Bitcoin&apos;s fixed supply, each of the 21 million coins would be worth approximately $43 million.
            </p>
            <p>
                While this isn&apos;t a price prediction, it&apos;s a stark illustration of Bitcoin&apos;s profound scarcity and its potential as a unit of account outside the traditional, debt-laden financial system. This perspective posits that technology, especially AI, is an unstoppable deflationary force, naturally driving down the cost of goods and services. In a free market, this would mean everyone gets richer over time as their money buys more. However, the current fiat system counteracts this with continuous money printing to service ever-expanding debt—a system fundamentally at odds with technological progress.
            </p>
            <p>
                This creates the ultimate &quot;what if&quot; for a Bitcoin miner: What if you are mining the only asset that is immune to this manipulation? What if the true measure of profitability isn&apos;t the immediate fiat value, but the long-term purchasing power in a world where everything else is getting cheaper? Selling Bitcoin for fiat could be seen as trading a scarce, appreciating asset for a depreciating one that is actively being debased.
            </p>
          </Section>

          <Section title="Beyond Operating Expenses: Bitcoin as a Treasury Asset">
            <p>
                For miners, the core business model involves a constant tension: sell earned Bitcoin to cover substantial operating expenses or hold it as a long-term treasury asset. The decision to hold is a strategic bet on Bitcoin&apos;s fundamental value proposition as a hedge against global economic instability.
            </p>
            <p>
                This perspective, influenced by thinkers like Jeff Booth, posits that technology is a powerful deflationary force. As AI and automation drive prices of goods and services down, traditional inflationary monetary systems, fueled by ever-expanding government debt, are on a collision course with this reality.
            </p>
            <p>
                In this context, Bitcoin—with its immutable, fixed supply of 21 million—stands apart. It cannot be debased or printed into oblivion. For a miner, holding even a small portion of their yield is a vote of confidence that this digital scarcity will provide a robust store of value, preserving purchasing power in a future where fiat currencies may falter. It transforms the mining operation from a simple cash-flow business into a long-term accumulator of a unique treasury reserve asset.
            </p>
          </Section>

          <Section title="The Public Face of Mining: Top Traded Companies">
            <p>
                As the industry has matured, Bitcoin mining has moved from a niche hobby to a sector with major, publicly traded corporations. These companies provide a way for investors to gain exposure to the mining industry through traditional stock markets. Their performance is closely tied to the price of Bitcoin, energy costs, and operational efficiency. Here are three of the largest players by market capitalization.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <MinerProfileCard
                    name="Marathon Digital"
                    ticker="NASDAQ: MARA"
                    marketCap="$6 Billion"
                    btcHoldings="49,179 BTC"
                />
                <MinerProfileCard
                    name="CleanSpark"
                    ticker="NASDAQ: CLSK"
                    marketCap="$3.7 Billion"
                    btcHoldings="12,502 BTC"
                />
                <MinerProfileCard
                    name="Riot Platforms"
                    ticker="NASDAQ: RIOT"
                    marketCap="$3.1 Billion"
                    btcHoldings="19,225 BTC"
                />
            </div>
          </Section>

          <Section title="Hash is the New Gravity">
            <p>
              Post-2025, mining is less about brute force and more about economic gravity. Mining finds the cheapest, cleanest energy and rewards those who align with entropy, not fight it. In this world, Bitcoin mining is no longer a liability. It&apos;s a battery with no charge time, a heat source with a yield curve, and a hedge against energy underutilization.
            </p>
            <p>
              As we look ahead, the hash frontier will not be built by oil-rich autocrats or fossil-fueled giants. It will be stitched together by solar-rich villages, local DAOs, and modular collectives.
            </p>
            <p>
                The rigs are humming. The sun is shining. And Bitcoin is, finally, in balance with the grid.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
