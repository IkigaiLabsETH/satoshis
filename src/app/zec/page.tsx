"use client";

export default function ZecPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Privacy • Digital Gold • Surveillance Resistance</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Zcash
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">The Privacy Era</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Timeline Quote */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-black to-yellow-500/10 flex items-center justify-center">
                <div className="text-center space-y-6 px-8">
                  <div className="space-y-3 text-2xl md:text-3xl font-light text-white/90">
                    <p>Real privacy ← all history until about 1980</p>
                    <p>bank/govt knows all ← you are here</p>
                    <p>Bitcoin panopticon ← even worse</p>
                    <p className="text-yellow-400 font-bold">Real privacy ← the Zcash era</p>
                  </div>
                  <p className="text-xl text-yellow-500/80 italic">— zooko</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* What's Interesting */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              What&apos;s Interesting About Zcash
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                As the first and only fair-launched end-to-end encrypted ledger with a strong cypherpunk social layer, Zcash is perhaps the only real solution to the surveillance risks facing Bitcoin.
              </p>
              <p className="text-lg">
                People are just starting to wake up to the necessity and urgency of a private store of value. Some people still think of Bitcoin in this way, but due to its transparent architecture, Bitcoin cannot be that. It cannot protect the collective from AI and surveillance being abused at scale. Zcash, however, already does.
              </p>
              <p className="text-lg">
                Recent events across the world have meaningfully updated my priors with respect to the likelihood of nationwide capital controls being enforced over the next decade. This trend no longer seems limited to countries like China and Russia. Fiat currencies (including USD) are almost all destined to significantly depreciate from here relative to hard assets.
              </p>
              <p className="text-lg">
                AI in combination with the existing surveillance apparatus will soon make it trivial for those in power to know about all your unencrypted onchain holdings across all ecosystems. And trivial to see where and when you send them out.
              </p>
            </div>
          </div>

          {/* How Zcash Helps */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-4xl">🔒</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Shielded Pool
                </h3>
              </div>
              <p className="text-lg text-white/80">
                If you hold at least some of your funds in the Zcash shielded pool, even the most powerful AI can&apos;t see or deduce what you have. Once those funds have sat in the shielded pool for long enough, you can move them around without traceability.
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-4xl">🛡️</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Battle Tested
                </h3>
              </div>
              <p className="text-lg text-white/80">
                Zcash turns 9 next month and has stayed true to its original vision since the beginning. Amidst the seemingly ever-increasing pressure to chase the next meta, sometimes it can take a decade for the market to realize the value of a unique protocol.
              </p>
            </div>
          </div>

          {/* Why Now */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Why Now?
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80">
                It feels like Zcash is at a social tipping point. Apart from the fundamentals improving drastically over the last year (from a UX, organizational, and shielded pool adoption front), it feels like there&apos;s finally a meaningful vibe shift underway.
              </p>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Key Improvements</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• UX flow from shielded ZEC to private USDC payments is very smooth</li>
                  <li>• Orchard pool privacy set increased by 4x since December</li>
                  <li>• Contains almost 20% of all ZEC in existence</li>
                  <li>• New generation of younger holders bringing fresh energy</li>
                  <li>• Simple narrative (surveillance dystopia insurance) resonating culturally</li>
                </ul>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Position</h4>
                <p className="text-white/80">
                  At time of writing, ZEC is still down ≈22.5% from its dec 9 high. ZEC is also still ≈72% down from its last cycle high of ≈$320 – a time when the fundamentals and regulatory climate were significantly worse and ZEC inflation was 3x higher than it is today.
                </p>
              </div>
            </div>
          </div>

          {/* Macro Trends */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Macro Trends
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80">
                AI powered surveillance, chilling effects, the weaponization of the rule of law, nationwide capital controls, and the confiscation of assets for political reasons are all trends that I unfortunately expect to get meaningfully worse during the next decade.
              </p>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <div className="text-lg italic text-yellow-400/90 mb-4">
                  &quot;If your assets can be frozen because you once met someone who had lunch with the brother-in-law of a banker connected to Putin, why take the risk of holding dollars (or Euros since the U.S. bullied Europe into following suit)&quot;
                </div>
                <p className="text-white/60">— Nassim Taleb</p>
              </div>

              <p className="text-lg text-white/80">
                This problem extends past the currencies in question. It also applies to the real-world assets (real-estate, gold, shares) and cryptocurrencies that are held within those countries or jurisdictionally dependent on them.
              </p>
              
              <p className="text-lg text-white/80">
                These trends are all tailwinds for a fully encrypted store of value like ZEC.
              </p>
            </div>
          </div>

          {/* Why Not Other Privacy Assets */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Why Not Another Private Asset Instead of ZEC?
            </h3>
            <div className="space-y-6">
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Privacy Comes From Funds at Rest</h4>
                <p className="text-white/80 mb-4">
                  There&apos;s simply no way to get strong privacy in the digital realm just at the moment of spend. It&apos;s very hard to avoid information leakage when you&apos;re shielding with a predetermined intention to spend.
                </p>
                <p className="text-white/80">
                  The only effective way to ensure you have strong privacy is to make sure you only spend from longer term funds that have been shielded for a certain amount of time (preferably weeks).
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Why ZEC Over XMR?</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <ul className="space-y-2 text-white/80">
                      <li>• XMR&apos;s brand too associated with crime money</li>
                      <li>• Zcash has government and institutional relationships</li>
                      <li>• Crosslink brings PoS finality to Zcash</li>
                      <li>• Pro-social mission and community</li>
                    </ul>
                  </div>
                  <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                    <ul className="space-y-2 text-white/80">
                      <li>• Dev fund for ongoing development</li>
                      <li>• Ecosystem support (Coinbase, Gemini, Kraken)</li>
                      <li>• Monero&apos;s current privacy model is broken</li>
                      <li>• Trying to replace it with Zcash-style privacy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">L2s and Privacy Pools</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 mb-4">
                    Even well-constructed L2s can&apos;t replace Zcash. As long as Ethereum base layer transactions aren&apos;t e2e encrypted, some metadata leakage is unavoidable, even when using an encrypted L2 (especially at the L1-rollup boundary).
                  </p>
                  <p className="text-white/80">
                    You need base layer private DA, a private mempool, and uniform or shielded fees to get close to the ≈0 information leakage of ZEC shielded-shielded transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Layer Importance */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Importance of the Social Layer
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80">
                While the above points primarily address the technological advantages, it feels like almost everyone who understands the technology is overindexing on the technology vs the values and resilience of the social layer that uphold it.
              </p>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <p className="text-white/80 mb-4">
                  You can&apos;t fork or vampire attack the strength of the values of a core social layer that&apos;s gone through hell and back.
                </p>
                <p className="text-white/80">
                  If those values are upholding a technical property of the system (e.g 21M, e2e encryption) that humanity finds — or will find — useful, then the underlying token will probably be valuable long term.
                </p>
              </div>

              <p className="text-lg text-white/80">
                While the Bitcoin social layer can be trusted to uphold the 21M cap at all costs, it simply does not have the same muscle when it comes to privacy. Out of all the projects in existence, Zcash has the only social layer today that I feel has what it takes to uphold the technical property of e2e encryption under significant external pressure.
              </p>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Organizational Resilience</h4>
                <p className="text-white/80 mb-4">
                  Three main contributing teams ensure no single point of failure:
                </p>
                <ul className="space-y-2 text-white/80">
                  <li>• Electric Coin Company (501(c)(3) nonprofit)</li>
                  <li>• Zcash Foundation (U.S. 501(c)(3) public charity)</li>
                  <li>• Shielded Labs (Swiss-based, donation-funded)</li>
                  <li>• Solo contributors like Sean Bowe working independently</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Memetic Potential */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Memetic Potential
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80">
                ZEC is one of the few genuinely useful coins that has effectively unlimited memetic potential.
              </p>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">The Lore is Insane</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Satoshi linking to Zooko&apos;s blog</li>
                  <li>• Snowden participating in first ceremony under pseudonym John Dobbertin</li>
                  <li>• Protocol name inextricably tied to privacy in crypto</li>
                  <li>• When people think privacy, they think Zcash</li>
                </ul>
              </div>

              <p className="text-lg text-white/80">
                I think digital SOV&apos;s are primarily a memetic challenge, with the caveat that the technical properties underlying them need to enable something that humanity finds useful or necessary over an extended period of time.
              </p>
              
              <p className="text-lg text-white/80">
                You also need a social layer that&apos;s willing to defend the key property of the SOV at all costs. In Bitcoin&apos;s case that&apos;s the 21M hard cap. In Zcash&apos;s case that&apos;s e2e encryption.
              </p>
            </div>
          </div>

          {/* Price Action */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Understanding ZEC Price Action
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80">
                People love to FUD the long term ZEC price graph, but what they miss is that ZEC launched with no premine or ICO. The circulating supply at the moment of launch was effectively 0%.
              </p>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Launch Dynamics</h4>
                <p className="text-white/80 mb-4">
                  Early rewards were deliberately tiny due to a slow-start mining design – they ramped up linearly to 12.5 ZEC by block 20,000 (≈34 days in). Some people paid a great deal for those initial ZEC in part for historical/provenance reasons.
                </p>
                <p className="text-white/80">
                  If you look closely at the market cap graph instead (price × circulating supply), each cycle so far has led to a higher peak market cap than the previous one (≈$2.5bn in 2017/18 and ≈$3.5bn in 2021/2022).
                </p>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Current Valuation</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/80 mb-2">Market Cap:</p>
                    <p className="text-3xl font-bold text-yellow-400">≈$0.9bn</p>
                    <p className="text-white/60 text-sm">≈4x less than previous cycle high</p>
                  </div>
                  <div>
                    <p className="text-white/80 mb-2">From ATH:</p>
                    <p className="text-3xl font-bold text-yellow-400">-72%</p>
                    <p className="text-white/60 text-sm">Previous high ≈$320</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Inflation Schedule Catalyst</h4>
                <p className="text-white/80 mb-4">
                  Zcash is about two halving cycles behind Bitcoin. While inflation in Bitcoin became very low (sub 1%) after 4 halvings, inflation in Zcash just became manageable after the second halving in November 2024.
                </p>
                <ul className="space-y-2 text-white/80">
                  <li>• Inflation dropped from ≈12.5% to ≈4.2%</li>
                  <li>• Next halving will bring it to ≈2% (comparable to gold)</li>
                  <li>• Fourth halving will achieve sub 1% (very good)</li>
                  <li>• Effects of halvings typically lag by 12-18 months</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Investment Thesis */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Why 1 ZEC May Be Worth $50k in 10-15 Years
            </h3>
            <div className="space-y-6">
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Privacy Adoption Parallels</h4>
                <p className="text-white/80 mb-4">
                  Best estimates for Signal&apos;s MAU put it at around 2-3% of WhatsApp&apos;s MAU but Signal&apos;s compound annual growth rate is much higher (20–36% vs WhatsApp&apos;s 8.4%).
                </p>
                <p className="text-white/80 mb-4">
                  Extrapolating these growth rates leads to Signal attaining somewhere between 5-8% of WhatsApp&apos;s size in 10 years time. This sort of relative market share seems to hold across most services where privacy is a concern (e.g., Brave has ≈2% market share vs Chrome&apos;s ≈69.2% but much higher user growth).
                </p>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">TAM Calculation</h4>
                <p className="text-white/80 mb-4">
                  If the TAM for a fully encrypted SOV reaches ≈5% of Bitcoin&apos;s TAM, and one BTC could one day be worth $1M, that leaves a price estimate of $50k per ZEC (5% of $1M).
                </p>
                <p className="text-white/80">
                  As a sanity check, $50k per ZEC would give ZEC a trillion dollar market cap, which is ≈1/10th of the value of all undeclared/hidden offshore wealth today.
                </p>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Smart Hedge Strategy</h4>
                <p className="text-white/80 mb-4">
                  It&apos;s hard to argue that it isn&apos;t a smart hedge to put ≈1% of your BTC/ETH/SOL stack into shielded ZEC.
                </p>
                <ul className="space-y-2 text-white/80">
                  <li>• If Zcash fails: losing 1% won&apos;t change your life</li>
                  <li>• If Zcash succeeds: that 1% could be worth more than your entire crypto holdings</li>
                  <li>• Insurance policy against the rest being confiscated</li>
                </ul>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Possible Futures</h4>
                <p className="text-white/80">
                  Looking out two or three decades there are possible futures in which 1 ZEC ends up being more valuable than 1 BTC. If we end up living in a world where there are more people who feel compelled to use Signal instead of WhatsApp, that&apos;s probably the sort of world in which ZEC is potentially more valuable than BTC.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              In Closing
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80">
                This essay is focused on making the case for a small allocation to ZEC and therefore focuses on the possible financial gain to be had if Zcash succeeds. But if Zcash does for the internet what the Bill of Rights did for America, the prospect of unprecedented economic and collective freedom is far more exciting than any possible financial gain.
              </p>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <div className="text-lg italic text-yellow-400/90 mb-4">
                  &quot;At no point have governments been more effectively intrusive, thanks to technology… Today&apos;s governments have far more reach, and this is proving to be unstoppable. A limited government conservative today is dreaming of what a centralizer was hoping only a few decades ago.&quot;
                </div>
                <p className="text-white/60">— Nassim Taleb</p>
              </div>

              <p className="text-lg text-white/80">
                Both encrypted messages (Signal) and encrypted assets (Zcash) are necessary to slow down this trend. In the best case they&apos;ll help reverse it.
              </p>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Privacy as a Collective Right</h4>
                <p className="text-white/80 mb-4">
                  A lot of people today are confused about privacy; they think of privacy as an individual right: but privacy is a collective right that derives from the individual right.
                </p>
                <p className="text-white/80 mb-4">
                  One of the common attacks against privacy, which comes straight out of the Nazi playbook, is to build a web of laws, administrative hurdles, and everyday routines that make self-disclosure the default.
                </p>
                <p className="text-white/80">
                  To hold ZEC is to take a stance against this extremely short-sighted and dangerous philosophy. It&apos;s to believe in the possibility of a world in which disclosure is consensual. A world in which the individual exists on an equal level to the State rather than being subservient to it.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              In Sum
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-white/80">
                <li>• Zcash pioneered the tech – exemplary protocol</li>
                <li>• Proven UX delivery capability</li>
                <li>• Government and institutional relations as core competency</li>
                <li>• Pass through privacy can&apos;t give you strong privacy</li>
                <li>• L2s on unencrypted L1s inevitably leak metadata</li>
              </ul>
              <ul className="space-y-2 text-white/80">
                <li>• Core teams independently funded and jurisdictionally distributed</li>
                <li>• Social layer willing to die on e2e encryption hill</li>
                <li>• Name synonymous with privacy – unlimited memetic potential</li>
                <li>• Appealing to next generation in meaningful way</li>
                <li>• Lore is unique and uncopyable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

