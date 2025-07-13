"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function GmgnPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Digital Detox • Crypto Philosophy • AI Convergence</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Between Blocks and Neural Nets
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">A Season of Withdrawal, Focus, and Convergence</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Reading Time */}
            <div className="mt-8">
              <p className="text-yellow-500/80 text-sm font-light">
                Estimated reading time: ~27 minutes / 6,300 words
              </p>
            </div>
          </div>

          {/* Prologue Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Prologue | Silencing the Feed
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                I logged off—hard stop, cold turkey, no half‑measures. The first twenty‑four hours felt like stepping into an anechoic chamber: my phone was suddenly too light, my thumbs hovered uselessly, and the inner narrator that normally comments on every passing moment started screaming into a vacuum. For six years my cortex had been formatted by the tick‑tock of social platforms, each perception instantly transmuted into tweet‑sized drafting clay. Remove the stream and the cognitive loops spin in mid‑air, grasping for traction.
              </p>
              <p className="text-lg leading-relaxed">
                The withdrawal manifested somatically. Phantom vibrations pulsed in empty pockets, micro‑spasms danced across thumbs that had lost their primary occupation, and cortisol spiked whenever I reached for a device I had exiled to Do‑Not‑Disturb. The experience resembled quitting caffeine, but the jitters were mental, not muscular; therefore the rehabilitation needed to target the mind as deliberately as the body.
              </p>
              <p className="text-lg leading-relaxed">
                Day two dragged like wet concrete. Without the infinite scroll to punctuate micro‑breaks, I discovered how often I self‑interrupted. I&apos;d write four sentences, then unconsciously angle toward a browser tab the way a smoker angles toward a balcony. No tab meant confronting raw boredom. By day three I began narrating life events to an imaginary audience—&quot;Eggs, spinach, creatine, the usual&quot;—and realized the feed had become an internal monologue engine. I wasn&apos;t detoxing from an app; I was amputating a limb that had grafted itself onto cognition.
              </p>
            </div>
          </div>

          {/* Key Themes Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🧠</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Attention Arbitrage
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Focus as Competitive Advantage
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">⚡</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Crypto Philosophy
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Narrative-Driven Investment
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🤖</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  AI Convergence
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Decentralized Intelligence
              </p>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-8">
            {/* Section I: Attention Span as Arbitrage */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                I. Attention Span as Arbitrage
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  We inhabit a carnival of stimulus, but the scarce commodity isn&apos;t information—it&apos;s duration. Everyone can shout, few can listen, almost none sustain concentration across the valleys where nothing Instagrammable happens. The edge, therefore, is simple: hold your focus longer than the market expects. In trading terms, attention span is a form of temporal arbitrage—go long on boredom while the crowd sells at the first hint of silence.
                </p>
                <p className="text-lg leading-relaxed">
                  Observe a typical token launch. Novel narrative emerges, liquidity floods, Discord scrolls at seizure speed. In week one, everyone reads the docs; by week four only an inner circle continues spelunking the repo to see whether the roadmap survived reality. By month three, speculators rotate to the next shiny primitive, leaving code explorers largely alone. Value accrues precisely during that abandonment window. It&apos;s not that the crowd is stupid; it&apos;s that the utility function of infinite novelty overpowers patience economics.
                </p>
                <p className="text-lg leading-relaxed">
                  The same principle governs writing. Most essays stall at 1,500 words because that&apos;s where reader drop‑off allegedly spikes. Yet the internet offers infinite shelf space. A 6,000‑word piece attracts fewer casual likes but catalyzes deeper alliances: investors who inspect footnotes, founders who scan every clause. These alliances compound beyond the shallow analytic we call engagement. Therefore, the optimal media strategy is bimodal: rapid bursts for top‑of‑funnel presence, unapologetically dense tomes for the trust layer.
                </p>
              </div>
            </div>

            {/* Section II: The Dilution of Status Signals */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                II. The Dilution of Status Signals
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Academia used to grant a lifetime credential; now it grants a LinkedIn headline for the semester before you drop out. FAANG used to guarantee middle‑class security; now it&apos;s an onboarding ramp into the &quot;ex‑Google&quot; influencer grift. Startup founders &quot;exit&quot; for less than a senior engineer&apos;s salary, then parade the acquisition as if they&apos;d built Rome. But the more badges proliferate, the less each badge confers. Therefore the rational actor either escapes the badge casino entirely—opting for an inner scoreboard—or invents a new signal outside the reach of copy‑paste aspiration.
                </p>
                <p className="text-lg leading-relaxed">
                  Crypto once supplied that new signal: contribution tracked by immutable ledger, competence measured in commits rather than credentials. Today even those metrics blur—airdrops farmed, governance delegated, voting power rented. Clout is arbitraged; authenticity, as ever, resists commodification.
                </p>
                <p className="text-lg leading-relaxed">
                  Where does status migrate? Back to proof‑of‑effort. Marathon PRs beat blue checks. GitHub streaks overshadow follower counts. In an era where AI can conjure clip‑art blog posts and spin up pseudo‑academic citations, the only flex left is consistency over time. You cannot fake scars or delts or a twelve‑month audit‑less security track record.
                </p>
              </div>
            </div>

            {/* Section III: Bags, Belief, and the Narrative Trade */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                III. Bags, Belief, and the Narrative Trade
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  My capital stack is intentionally concentrated: HYPE, BTC, HOOD, ETH, EUL, PRIME. I sized these positions in April, closed the screen, and accepted volatility as tuition. Each bag encodes a thesis:
                </p>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20 mt-6">
                  <ul className="space-y-2 text-white/80 font-satoshi">
                    <li><span className="text-yellow-400 font-bold">HYPE</span> — a meta‑asset wagering that attention markets outperform bond markets.</li>
                    <li><span className="text-yellow-400 font-bold">BTC</span> — monetary spine for a multipolar century where distrust is default.</li>
                    <li><span className="text-yellow-400 font-bold">HOOD</span> — consumer rails democratizing finance, under‑priced given embedded optionality in options flow and crypto integration.</li>
                    <li><span className="text-yellow-400 font-bold">ETH</span> — the settlement substrate where creative computation meets capital formation.</li>
                    <li><span className="text-yellow-400 font-bold">EUL</span> — permissionless lending as infrastructural inevitability—a bet on risk‑adjusted yield curves escaping TradFi gatekeepers.</li>
                    <li><span className="text-yellow-400 font-bold">PRIME</span> — the handshake between GPU scarcity and cryptographic coordination, compute as collateral.</li>
                  </ul>
                </div>
                <p className="text-lg leading-relaxed mt-6">
                  Stories decouple from price all the time, but price eventually reconciles with narrative quality, therefore holding through drawdowns is a literary exercise as much as a financial one. You must ask: &quot;Is this a good book?&quot; If yes, keep reading. If the plot stalls, exit.
                </p>
              </div>
            </div>

            {/* Section IV: AI × Crypto */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                IV. AI × Crypto: From Buzzword Sandwich to Engine Room
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  The AI hype floodlifted every slide deck. Startups added &quot;GPT‑powered&quot; the way 2017 decks added &quot;blockchain.&quot; Most of these marriages were cosmetic. But beneath the froth lies a true intersection: decentralized compute markets, provenance‑aware datasets, cryptographic attestations for model outputs. The objective is not tokenizing APIs; it&apos;s rewiring economic incentives so that intelligence can scale without rent extraction from oligopolies.
                </p>
                <p className="text-lg leading-relaxed">
                  Projects like Prime Intellect map the terrain. Stake tokens, contribute idle GPU cycles, earn yield denominated in inference capacity. This inverts the cloud model: instead of renting compute from hyperscale providers, you supply compute to a network that transforms it into fungible resource tokens. It echoes early Ethereum mining except the reward isn&apos;t ether; it&apos;s thinking time on a distributed supercomputer.
                </p>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20 mt-6">
                  <h4 className="text-yellow-400 font-bold mb-4">Therefore, the convergence thesis has three pillars:</h4>
                  <ol className="space-y-2 text-white/80 font-satoshi list-decimal list-inside">
                    <li><span className="text-yellow-400 font-bold">Compute Liquidity</span> — GPUs as on‑chain collateral, priced dynamically by task urgency.</li>
                    <li><span className="text-yellow-400 font-bold">Data Provenance</span> — Merkle‑ized data pipelines guaranteeing that training sets remain untainted and licensable.</li>
                    <li><span className="text-yellow-400 font-bold">Model Integrity</span> — Zero‑knowledge proofs for inference correctness, preventing hallucinations in mission‑critical contexts.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Section V: Long-Form Madness */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                V. Long‑Form Madness and the Audio Turn
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Try writing fifteen thousand words that fuse into a constellation rather than a junk drawer. You will flirt with psychosis. Each paragraph spawns sub‑paragraphs; each insight decomposes. The process feels like mining a cave system while mapping it in real time. I&apos;ve written code that brute‑forces derivatives of DeFi yields with less complexity than structuring human emotion across sixty pages.
                </p>
                <p className="text-lg leading-relaxed">
                  The challenge isn&apos;t vocabulary; it&apos;s care. Maintaining a singular thread of intent across weeks demands emotional memory. One bad night of sleep can sever the filament, and you wake rereading your own draft as if a stranger wrote it. Many writers medicate (caffeine, nicotine, mild psychedelics) to preserve continuity; I tried stoic alternatives: ice baths, zone 2 cardio, binaural beats at 40 Hz—mixed results.
                </p>
                <p className="text-lg leading-relaxed">
                  Audio beckons as compromise. People claim they don&apos;t read, but they listen: gym headphones, commute pods, bedtime loops. Therefore I&apos;m packaging the series as spoken essays stitched with glitchy ambient scores. Voice adds texture lost in text; breath reveals emphasis algorithms cannot replicate. The transcripts will exist for citation, yet the medium shift honors the time‑scarcity of 2025 attention.
                </p>
              </div>
            </div>

            {/* Section VI: Health-Maxxing */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                VI. Health‑Maxxing as Operating System
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  While words stack invisibly, biomarkers refuse to lie. Resting heart rate, grip strength, glycemic variance—each number an audit trail for willpower. The epiphany: healthy physiology is leverage on cognition. VO2 max correlates with executive function; testosterone modulates risk appetite; sleep consolidates hippocampal pattern recognition. But most founders treat the body as taxi for the brain; therefore their cognitive returns depreciate faster than their codebases.
                </p>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20 mt-6">
                  <h4 className="text-yellow-400 font-bold mb-4">My stack:</h4>
                  <ul className="space-y-2 text-white/80 font-satoshi">
                    <li><span className="text-yellow-400 font-bold">Strength</span> — 5×5 barbell basics three times a week, deadlift as KPI. 2× body-weight pull sets an unforgeable moat.</li>
                    <li><span className="text-yellow-400 font-bold">Aerobic floor</span> — 180-age zone-2 for an hour every other day, modeled on Tour-de-France mitochondria hacks.</li>
                    <li><span className="text-yellow-400 font-bold">Micronutrient density</span> — sardines, beef liver tablets, cruciferous rotation. No seed oils except the occasional olive drench on Greek salad.</li>
                    <li><span className="text-yellow-400 font-bold">Recovery tech</span> — infrared sauna at 55°C, five grams glycine before bed, NovoThor red-light thrice weekly.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section VII: Digital Diplomacy */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                VII. Digital Diplomacy | On Losing European Friends
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  I adore my European crew—but WhatsApp feels like a Kafkaesque maze of unread receipts. Time-zone drift plus my American sleep cycle equals perpetual lag. The result: I ghost them unintentionally, relationships calcify, guilt accrues. But needing frictionless comms shouldn&apos;t kill friendship; therefore I built a new ritual.
                </p>
                <p className="text-lg leading-relaxed">
                  Monday Merge Call—09:00 PST, 18:00 CET. One dial-in, agenda-less. Whoever shows catches up, whoever misses gets the recording. Crypto punks treat it like stand-up; artists bring mood boards; ex-consultants ask KPI questions. The call ships relational context asynchronously. One hour a week resurrects a network I thought terminal.
                </p>
                <p className="text-lg leading-relaxed">
                  In a decentralizing world, friendship requires coordination layers—call it proof-of-attention. Attendance stakes social capital. Miss too many, stake slashes. Draconian? Maybe. But coordination without cost collapses; accountability sustains compounding trust.
                </p>
              </div>
            </div>

            {/* Section VIII: Identity Crisis */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                VIII. The Identity Crisis of Crypto
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  2021 framed crypto as its own galaxy; 2024 reframes it as plumbing. DEX volumes stabilize, NFTs find utilitarian footing in ticketing, DePIN mines physical infrastructure. The branding crisis is existential: If crypto is &quot;just&quot; middleware, why should anyone hold tokens?
                </p>
                <p className="text-lg leading-relaxed">
                  The answer lies in optionality. Protocol assets are perpetual calls on the success of any domain that plugs into them. ETH earns sequencer tips from gaming, finance, and culture simultaneously. Filecoin accrues fees whether Reddit archivers or genomic researchers store data. The token is a royalty stream on unpredictable future industries.
                </p>
                <p className="text-lg leading-relaxed">
                  Therefore, crypto isn&apos;t disappearing into the stack; it&apos;s liquefying value capture inside the stack. The identity shift is akin to electricity losing its novelty yet powering every miracle appliance. Once utility saturates, narrative chatter fades—but cash flows begin. Builders who embrace this plumbing destiny will mint wealth quietly while pundits chase the next spectacle.
                </p>
              </div>
            </div>

            {/* Section IX: Re-Entry Protocol */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                IX. Re-Entry Protocol | Posting Without Relapsing
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  My new social media OS runs three rules:
                </p>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20 mt-6">
                  <ol className="space-y-2 text-white/80 font-satoshi list-decimal list-inside">
                    <li><span className="text-yellow-400 font-bold">30-Minute Window</span> — I check feeds at 13:30 daily, GMT-8, timer on. Like a day trader hitting the open.</li>
                    <li><span className="text-yellow-400 font-bold">Three Outbound</span> — One insight tweet, one thread plug, one meme if the mood hits. Posts queue in Typefully; going live requires a breath hold.</li>
                    <li><span className="text-yellow-400 font-bold">Sunday Alt Vent</span> — The anonymous burner account chirps the industry shade I can&apos;t attach to the main. Emotional hygiene without collateral damage.</li>
                  </ol>
                </div>
                <p className="text-lg leading-relaxed mt-6">
                  Break the rules twice in a week and I donate 0.1 ETH to a protocol I hate. Negative staking keeps me honest.
                </p>
                <p className="text-lg leading-relaxed">
                  The meta goal is to convert feeds from dopamine slots into distribution rails. Attention harvested responsibly scales narrative leverage while preserving deep-work sanity. If that sounds clinical, that&apos;s the cost of adulthood in the attention casino.
                </p>
              </div>
            </div>

            {/* Section X: The Eighteen-Month Horizon */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                X. The Eighteen-Month Horizon
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  2026 will test three convictions:
                </p>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20 mt-6">
                  <ul className="space-y-2 text-white/80 font-satoshi">
                    <li><span className="text-yellow-400 font-bold">Compute Sovereignty</span> — Nations will treat GPUs like oil; open markets will fight chip hoarding with token incentives. PRIME and peers either explode or evaporate.</li>
                    <li><span className="text-yellow-400 font-bold">Modular Finance</span> — ETH L2 fee compression plus account abstraction births UX that feels CeFi. Mass adoption toggles from &quot;if&quot; to &quot;when.&quot;</li>
                    <li><span className="text-yellow-400 font-bold">Creator Equity</span> — NFT royalties revive via trustless enforcement. Artists issue revenue-sharing tokens backed by ZK attestation of sales. My residency program will pilot this in Q2.</li>
                  </ul>
                </div>
                <p className="text-lg leading-relaxed mt-6">
                  I&apos;m positioned accordingly—long optionality, short nihilism. The spread trade is focus: bet that the world will drown in infinite micro-distraction but a minority will cultivate monastic stamina. Capital eventually converges on that minority.
                </p>
              </div>
            </div>

            {/* Epilogue */}
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                Epilogue | Logging Back On—This Time Intentionally
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Social media taught me leverage; withdrawal taught me limits. Crypto taught me permissionless mobility; AI taught me to respect emergent complexity. Health taught me to fear entropy; writing taught me to transmute it.
                </p>
                <p className="text-lg leading-relaxed">
                  I return to the feed not as addict but as architect. The timeline is still a slot machine, but every spin funds distribution. Attention is still volatile, therefore I&apos;ll hedge it with barbells—one side dopamine drizzle, the other side deep-work slabs.
                </p>
                <p className="text-lg leading-relaxed">
                  If you&apos;ve read this far, you&apos;re in the minority willing to trade minutes for meaning. That minority shapes reality one transaction, one commit, one breath at a time. Let&apos;s build the neural-net-powered, block-secured, health-maxxed century we want to inhabit.
                </p>
                <p className="text-lg leading-relaxed font-bold text-yellow-500 mt-8">
                  See you in the comments—briefly, intentionally, relentlessly.
                </p>
              </div>
            </div>
          </div>

          {/* Key Investment Positions */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Investment Philosophy
            </h3>
            <p className="text-base md:text-lg text-white/80 font-satoshi mb-8 text-center leading-relaxed">
              Narrative-driven positions with concentrated conviction and long-term vision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">HYPE</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Meta-Asset</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Attention markets outperforming bond markets. A wager on the value of human focus in an AI-saturated world.</p>
                  <div className="text-yellow-400 font-bold">Thesis: Attention Arbitrage</div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">BTC</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Monetary Spine</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Monetary spine for a multipolar century where distrust is default. The ultimate hedge against institutional failure.</p>
                  <div className="text-yellow-400 font-bold">Thesis: Trustless Money</div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">HOOD</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Consumer Rails</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Consumer rails democratizing finance, under-priced given embedded optionality in options flow and crypto integration.</p>
                  <div className="text-yellow-400 font-bold">Thesis: Financial Democratization</div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">ETH</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Settlement Substrate</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">The settlement substrate where creative computation meets capital formation. The programmable money of the future.</p>
                  <div className="text-yellow-400 font-bold">Thesis: Programmable Value</div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">EUL</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Permissionless Lending</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Permissionless lending as infrastructural inevitability—a bet on risk-adjusted yield curves escaping TradFi gatekeepers.</p>
                  <div className="text-yellow-400 font-bold">Thesis: DeFi Infrastructure</div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">PRIME</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Compute Collateral</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">The handshake between GPU scarcity and cryptographic coordination, compute as collateral. AI&apos;s infrastructure play.</p>
                  <div className="text-yellow-400 font-bold">Thesis: AI Infrastructure</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
