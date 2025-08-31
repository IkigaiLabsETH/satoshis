"use client";

import { Button } from '@/components/ui/button';

export default function MaxiPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Bitcoin Maximalism • Digital Sovereignty • Financial Freedom</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                MAXI
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">A Thesis on Bitcoin Maximalism</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-black flex items-center justify-center">
                <div className="text-center space-y-4">
                  <span className="text-8xl">₿</span>
                  <p className="text-2xl font-bold text-yellow-500">Bitcoin: The Light in Dark Places</p>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Abstract
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                In an era dominated by hype around &ldquo;blockchain technology&rdquo; and a proliferation of alternative cryptocurrencies, Bitcoin stands as a beacon of resilience, security, and principled design. This thesis argues that the narrative portraying Bitcoin as an outdated &ldquo;boomer coin&rdquo; destined to be eclipsed by more adaptable, user-friendly blockchains is fundamentally misguided.
              </p>
              <p className="text-lg">
                Instead, Bitcoin&apos;s core principles—rooted in simplicity, decentralization, and unyielding security—position it as the premier cryptocurrency for surviving in a hostile world. Furthermore, Bitcoin maximalism, often derided as toxic or exclusionary, is a necessary cultural defense mechanism.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🛡️</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Security First
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Unyielding Protection
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">⚡</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Simplicity
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Minimalist Design
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🌍</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Decentralization
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                True Sovereignty
              </p>
            </div>
          </div>

          {/* Introduction Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Introduction: Challenging the &ldquo;Blockchain, Not Bitcoin&rdquo; Narrative
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                For years, the dominant discourse in cryptocurrency has emphasized blockchain as the revolutionary technology, with Bitcoin dismissed as its primitive first iteration. Proponents argue that the future lies in a multichain world: diverse cryptocurrencies led by agile teams that prioritize scalability, user experience, and rapid iteration.
              </p>
              <p className="text-lg">
                Bitcoin, they claim, is shackled by its libertarian roots, slow transaction times, and resistance to change—appealing only to ideologues while alienating mainstream users who seek seamless DeFi, gaming, and NFTs without the &ldquo;toxicity&rdquo; of anti-government rhetoric.
              </p>
              <p className="text-lg">
                This thesis contends the opposite: Bitcoin maximalism is grounded in a profound understanding of cryptocurrency&apos;s role in an adversarial global landscape. Maximalists recognize that honest cryptocurrencies are rare, while grifters abound.
              </p>
            </div>
          </div>

          {/* Security Technology Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Blockchains as Security Technology in a Hostile World
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                At its core, blockchain is not about efficiency or entertainment; it is a security technology designed to protect individuals in an unfriendly environment. Drawing an analogy from J.R.R. Tolkien&apos;s *The Lord of the Rings*, a blockchain functions like the Phial of Galadriel: a light in dark places when all others fail.
              </p>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Security Features:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Redundant Verification: Each transaction confirmed thousands of times</li>
                  <li>Delayed Confirmations: 10 seconds to 10 minutes for security</li>
                  <li>Self-Custody: No recovery for lost keys</li>
                  <li>Privacy Trade-offs: Transparency with advanced anonymity tools</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Twin Pillars Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Twin Pillars of Robustness: Technology and Culture
            </h3>
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Technological Simplicity and Purity</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Bitcoin&apos;s protocol emphasizes minimalism: a 1 MB block size, 21 million coin cap, and Nakamoto consensus via proof-of-work. These choices are not arbitrary but &ldquo;works of art&rdquo;—simple, mathematically elegant, and timeless.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Core Principles:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>1 MB block size limit</li>
                        <li>21 million coin cap</li>
                        <li>Proof-of-work consensus</li>
                        <li>Minimalist protocol</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Benefits:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Easy to explain</li>
                        <li>Mathematically elegant</li>
                        <li>Timeless design</li>
                        <li>Systemic stability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Cultural Uncompromising Minimalism</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Bitcoin&apos;s culture is one of vigilance, resisting external co-optation by governments or corporations and internal exploitation by grifters. Contrast this with Ethereum&apos;s ecosystem, where founder Vitalik Buterin frequently engages with global elites.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Cultural Values:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Vigilance</li>
                        <li>Resistance to co-optation</li>
                        <li>Internal protection</li>
                        <li>Unyielding defense</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Threats Resisted:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Government interference</li>
                        <li>Corporate opportunism</li>
                        <li>Internal grifters</li>
                        <li>Centralization pressure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Currency as Killer App Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Currency as the Killer App: Real Adoption Over Hype
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Ethereum&apos;s whitepaper promised revolutionary applications: tokens, derivatives, stablecoins, DAOs, prediction markets, and more. Yet, the most impactful use case remains simple: currency for storage and payments.
              </p>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Global Adoption:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>3% of Argentinians hold crypto</li>
                  <li>6% of Nigerians hold crypto</li>
                  <li>12% of Ukrainians hold crypto</li>
                  <li>Primarily for wealth preservation</li>
                </ul>
              </div>
              <p className="text-lg mt-4">
                Focusing exclusively on money enhances its efficacy. Bitcoin eschews rich statefulness to avoid MEV-like pitfalls, reducing developer demands for inflationary rewards or feature bloat.
              </p>
            </div>
          </div>

          {/* Purity of Origins Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Purity of Origins: Early Projects vs. Grifter Influx
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Industries evolve predictably: Pioneers are idealists drawn to raw potential, but success attracts opportunists—&ldquo;Eternal September&rdquo; in internet parlance. Bitcoin, as the first, embodies genuine values: self-sovereignty, privacy, decentralization.
              </p>
              <p className="text-lg">
                Later projects show increasing &ldquo;premines&rdquo;—founder allocations—as proxies for profit-seeking. Messari data reveals Bitcoin&apos;s minimal insider rewards compared to newer chains, highlighting a shift from altruism to grift.
              </p>
              <p className="text-lg">
                This temporal dynamic gives Bitcoin irreplicable advantages. Newer assets struggle to foster authentic communities amid venture capital influxes and scams.
              </p>
            </div>
          </div>

          {/* Virtue of Intolerance Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Virtue of Intolerance: Resisting Assimilation
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Bitcoin maximalism&apos;s &ldquo;toxicity&rdquo; is its strength. Per Conquest&apos;s second law (generalized), non-mainstream identities require active resistance to assimilation. Blockchains are countercultural: Global amid fragmentation, uncensorable amid rising suppression.
              </p>
              <p className="text-lg">
                Maximalists combat internal threats—scammers, collaborationists (government appeasers), corporatists (centralizers)—with unapologetic scorn. Politeness fails when adversaries embed in communities; agreeableness enables exploitation.
              </p>
              <p className="text-lg">
                Even &ldquo;weird&rdquo; crusades, like Bitcoiners&apos; anti-seed oil campaign (highlighting omega-6 harms), foster cohesion. Media skepticism toward Bitcoiners contrasts with praise for similar efforts by &ldquo;respectable&rdquo; tech firms.
              </p>
            </div>
          </div>

          {/* Conclusion Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Conclusion: Embrace Maximalism
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Maximalism transcends network effects; it&apos;s rooted in Bitcoin&apos;s cultural and structural superiority. It acknowledges most cryptoassets as scams, necessitating intolerance to protect newcomers and preserve integrity.
              </p>
              <p className="text-lg">
                Better to err conservatively: Mislead ten on a &ldquo;good&rdquo; investment than bankrupt one via grift; keep protocols simple over chasing apps; offend millions than stand for nothing.
              </p>
              <p className="text-lg font-bold text-yellow-400">
                In a dangerous world, Bitcoin maximalism isn&apos;t fanaticism—it&apos;s pragmatism. It ensures cryptocurrency remains a light in dark places, not a diluted toy for the privileged. Be brave, fight for values, be a maximalist.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">
                Join the Bitcoin Revolution
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Stand with those who understand that Bitcoin maximalism is not about exclusion—it&apos;s about protecting the most important invention of our time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-none border-2 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
                  Learn More
                </Button>
                <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-8 py-3 rounded-none border-2 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] hover:shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] transition-all">
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
