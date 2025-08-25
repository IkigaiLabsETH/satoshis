"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function V12Page() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Luxury V12 • BMW Heritage • Investment Analysis</p>
            <h1 className="text-center">
              <span className="text-5xl md:text-7xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                M760i xDrive — The Last V12
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">Rolls‑Royce DNA, Autobahn pace, future‑classic potential</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>

            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <iframe
                src="https://www.youtube.com/embed/xp6nK9Jf8aU"
                title="BMW M760i V12"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Overview */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">What It Is</h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                The pre‑2023 BMW M760i xDrive is BMW’s final production V12. Built through 2022 with a limited “Final V12” run of just 12 US cars, it uses the 6.6‑liter N74 twin‑turbo V12—shared DNA with Rolls‑Royce Ghost/Wraith/Dawn—tuned to ~600–610 hp and 627 lb‑ft. The 7‑Series platform shares roughly 20% of its components with the Rolls‑Royce Ghost, giving it legitimate luxury underpinnings.
              </p>
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-4xl">⚡</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">Engine</h3>
              </div>
              <p className="text-center text-white/80">6.6L N74 TT V12 • ~600–610 hp • 627 lb‑ft • xDrive</p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-4xl">🏁</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">Performance</h3>
              </div>
              <p className="text-center text-white/80">0–100 km/h ~3.6 s • Effortless Autobahn pace • Quiet luxury</p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-4xl">🏆</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">Pedigree</h3>
              </div>
              <p className="text-center text-white/80">Final BMW V12 • Shared Rolls‑Royce architecture • Low‑volume swan song</p>
            </div>
          </div>

          {/* Market Prices */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Current Market (EU, mid‑2025)</h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">Typical asking prices for 2017–2022 cars:</p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Low‑mileage 2022: ~€64k–€82k</li>
                <li>2017–2019 higher‑km examples: can dip below €50k</li>
                <li>US market often cheaper (&lt; $50k) but imports add costs for EU compliance</li>
              </ul>
              <p className="text-white/80">
                At ~€60k, you’re likely landing a 2020–2022 car with moderate km. New MSRP was ~€150k–€200k, so depreciation has already taken the heavy hit and values have begun to stabilize now that production ended.
              </p>
            </div>
          </div>

          {/* Investment View */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Investment Potential</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Pros</h4>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>“Last BMW V12” story—strong future‑classic narrative</li>
                  <li>Rolls‑Royce engine lineage; luxury + pace blend is unique</li>
                  <li>Values appear to have bottomed; low‑volume Final V12 cars already trade at premiums</li>
                </ul>
              </div>
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Cons / Risks</h4>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>V12 running costs: €1k–€2k per service; aging turbo/electrical risk</li>
                  <li>12–15 L/100 km; emissions/taxes can limit EU usability</li>
                  <li>Luxury sedans appreciate slower than sports cars/limited exotics</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-white/80">
              Short‑term flip: unlikely. Long‑hold (5–10+ years) as a well‑stored, low‑km example: reasonable chance of modest upside while you enjoy a truly special daily.
            </p>
          </div>

          {/* Maintenance & Running Costs */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Maintenance & Running Costs</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Service Intervals</h4>
                <ul className="text-white/80 space-y-2">
                  <li>• Oil changes: Every 15,000 km or annually</li>
                  <li>• Spark plugs: Every 60,000 km</li>
                  <li>• Brake fluid: Every 2 years</li>
                  <li>• Transmission fluid: Every 80,000 km</li>
                  <li>• Coolant: Every 4 years</li>
                </ul>
              </div>
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Cost Considerations</h4>
                <ul className="text-white/80 space-y-2">
                  <li>• Annual service: €1,000–€2,000</li>
                  <li>• Fuel consumption: 12–15 L/100 km</li>
                  <li>• Insurance: Premium rates due to V12</li>
                  <li>• Road tax: Higher in EU due to emissions</li>
                  <li>• Parts availability: Generally good for 7‑Series</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">BMW M760i vs Mercedes S‑Class (S600 / Maybach S680)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-black rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">BMW M760i xDrive</CardTitle>
                </CardHeader>
                <CardContent className="text-white/80 space-y-3">
                  <p><span className="text-yellow-400">Engine:</span> 6.6L TT V12 (N74) ~600–610 hp / 627 lb‑ft</p>
                  <p><span className="text-yellow-400">Character:</span> Sport‑luxury, tauter chassis, stealth performance</p>
                  <p><span className="text-yellow-400">0–100 km/h:</span> ~3.6 s (quicker than most S‑Class V12s)</p>
                  <p><span className="text-yellow-400">Market:</span> €50k–€85k (EU), stabilizing post‑production</p>
                  <p><span className="text-yellow-400">Collectability:</span> “Last BMW V12” gives stronger narrative pull</p>
                </CardContent>
              </Card>

              <Card className="bg-black rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Mercedes S‑Class V12 (S600 / Maybach S680)</CardTitle>
                </CardHeader>
                <CardContent className="text-white/80 space-y-3">
                  <p><span className="text-yellow-400">Engine:</span> 6.0L TT V12 (M279) ~530–621 hp depending on trim</p>
                  <p><span className="text-yellow-400">Character:</span> Ultra‑plush ride, rear‑seat focus, classic chauffeur spec</p>
                  <p><span className="text-yellow-400">0–100 km/h:</span> ~4.1–4.7 s (fast, but less overtly sporting)</p>
                  <p><span className="text-yellow-400">Market:</span> Older S600s can be cheaper; Maybach S680s command big premiums</p>
                  <p><span className="text-yellow-400">Collectability:</span> Strong brand cachet; Maybach badges carry long‑term appeal</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 bg-black/50 p-6 rounded-none border border-yellow-500/20 text-white/80">
              <h4 className="text-xl font-bold text-yellow-500 mb-3">Takeaway</h4>
              <p>
                Choose the BMW if you want the quicker, more engaging driver’s V12 with a unique “last of its line” hook. Choose the S‑Class if you prioritize serene ride quality and prestige (especially in Maybach trim). For ~€60k, a clean M760i is compelling value; comparable Maybach V12s will cost substantially more.
              </p>
            </div>
          </div>

          {/* Maybach S680 Deep Dive */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Mercedes‑Maybach S 680: The Pinnacle of Luxury</h3>
            <div className="space-y-6">
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Overview & Heritage</h4>
                <p className="text-white/80 mb-4">
                  The Mercedes‑Maybach S 680 represents the ultra‑premium Maybach sub‑brand, launched in 2021 as a direct rival to Rolls‑Royce Ghost and Bentley Flying Spur. Built on the extended‑wheelbase S‑Class platform (W223), it elevates Mercedes luxury with exclusive Maybach styling cues, two‑tone paint options, chrome accents, and the iconic Maybach grille. For 2025, it continues as the range‑topping variant, powered by what Mercedes hints could be one of its final V12 engines amid the industry&apos;s shift toward electrification.
                </p>
                <p className="text-white/80 text-sm">
                  <span className="text-yellow-400">Historical context:</span> Maybach originated as an independent luxury marque in the early 20th century, revived by Mercedes in 2002, and integrated as a sub‑brand by 2013 to compete in the high‑end market.
                </p>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Performance & Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Engine & Performance</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• 6.0L Twin‑Turbo V12 (M279)</li>
                      <li>• 621 hp @ 5,250‑5,500 rpm</li>
                      <li>• 664 lb‑ft torque @ 2,000‑4,000 rpm</li>
                      <li>• 9‑speed automatic + 4MATIC AWD</li>
                      <li>• 0‑60 mph: ~4.5 seconds</li>
                      <li>• Top speed: 155 mph (electronically limited)</li>
                      <li>• Weight: 5,346 lbs</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Dimensions & Chassis</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• Length: 215.3 inches</li>
                      <li>• Wheelbase: 133.7 inches</li>
                      <li>• Rear legroom: Up to 44 inches</li>
                      <li>• Trunk: 12.3 cubic feet</li>
                      <li>• Adaptive air springs with E‑Active Body Control</li>
                      <li>• Standard 21‑inch wheels</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Luxury Features & Technology</h4>
                <p className="text-white/80 mb-4">
                  The S 680&apos;s interior is a masterclass in extravagance, often described as a &ldquo;private jet on wheels.&rdquo; Standard features include Nappa leather upholstery with optional diamond quilting, heated/ventilated/massaging seats for all occupants, and executive rear seats that recline up to 43.5 degrees with footrests and calf massagers.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Technology Suite</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• MBUX with dual 12.8‑inch OLED screens</li>
                      <li>• Augmented reality navigation</li>
                      <li>• Burmester 4D surround sound (30 speakers)</li>
                      <li>• 64‑color ambient lighting</li>
                      <li>• Level 2 semi‑autonomous driving</li>
                      <li>• 360‑degree camera system</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Exclusive Maybach Touches</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• Illuminated door sills</li>
                      <li>• Digital light headlamp system</li>
                      <li>• Optional rear‑axle steering</li>
                      <li>• Built‑in fragrance atomizer</li>
                      <li>• Refrigerator & folding tables</li>
                      <li>• Champagne flute compartment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Pricing & Market Reality</h4>
                <p className="text-white/80 mb-4">
                  The 2025 Mercedes‑Maybach S 680 starts at around $232,750 in the US, with fully loaded examples easily exceeding $250,000. In Europe, prices hover around €250,000‑€300,000 depending on taxes and options.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">New vs Used Pricing</h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• <span className="text-yellow-400">2025 MSRP:</span> $232,750+ (US) / €250k‑€300k (EU)</li>
                      <li>• <span className="text-yellow-400">2021‑2023 models:</span> $180k‑$220k (US) / €180k‑€250k (EU)</li>
                      <li>• <span className="text-yellow-400">Depreciation:</span> 30‑40% in first few years, then stabilizes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Running Costs & Warranty</h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• <span className="text-yellow-400">Fuel economy:</span> 12 city / 21 highway / 15 combined mpg</li>
                      <li>• <span className="text-yellow-400">Warranty:</span> 4‑year/50,000‑mile coverage</li>
                      <li>• <span className="text-yellow-400">V12 servicing:</span> High parts and labor costs</li>
                      <li>• <span className="text-yellow-400">Resale value:</span> Holds relatively well for luxury sedan</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">BMW M760i vs Maybach S 680: The Ultimate Choice</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">BMW M760i (€60k)</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• Better performance & driver engagement</li>
                      <li>• &ldquo;Last BMW V12&rdquo; narrative</li>
                      <li>• Lower entry cost</li>
                      <li>• Higher running costs</li>
                      <li>• Less prestige than Maybach</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Maybach S 680 (€250k+)</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• Unmatched interior luxury</li>
                      <li>• Better long‑term value retention</li>
                      <li>• Stronger brand cachet & exclusivity</li>
                      <li>• Much higher entry price</li>
                      <li>• Less driver engagement</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-black/30 p-4 rounded-none border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Critical Reception</h5>
                  <p className="text-white/80 text-sm mb-2">
                    Critics rave about the S 680&apos;s blend of serenity and speed, calling it &ldquo;the ultimate expression of Mercedes luxury.&rdquo; Car and Driver praises its &ldquo;supremely powerful&rdquo; V12 and &ldquo;palatial interior,&rdquo; noting it&apos;s a viable alternative to British ultra‑lux brands at a slightly lower price point.
                  </p>
                  <p className="text-white/80 text-sm">
                    <span className="text-yellow-400">Bottom line:</span> The Maybach S 680 stands as a testament to the dying art of V12 grand touring. If you have €250k+ and crave the pinnacle of automotive refinement, it&apos;s peerless. For V12 performance and character at €60k, the BMW is the smarter buy. The Maybach is an investment in luxury; the BMW is an investment in driving experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The Complete Luxury Sedan Comparison */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">The Complete Luxury Sedan Comparison</h3>
            <p className="text-white/80 mb-6 text-lg">
              From the efficient diesel S‑Class to the mighty V12 icons, here&apos;s your complete guide to luxury sedan ownership and investment potential.
            </p>
                          <div className="space-y-6">
                {/* Mercedes S 350 d W222 */}
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-3">Mercedes S 350 d W222: The Efficient Luxury Choice</h4>
                  <p className="text-white/80 mb-4">
                    The Mercedes‑Benz S 350 d W222 Executive (Phase 1, pre‑facelift) is a 2013‑2017 model from the sixth‑generation S‑Class lineup. Known for its refined diesel powertrain, advanced comfort features, and flagship luxury status, it offers tremendous value as a used buy with low initial cost but potentially high maintenance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-yellow-400 font-semibold mb-2">Engine & Performance</h5>
                      <ul className="text-white/80 space-y-1 text-sm">
                        <li>• 3.0L turbo V6 diesel</li>
                        <li>• 258 hp @ 3,600 rpm</li>
                        <li>• 620 Nm torque @ 1,600‑2,400 rpm</li>
                        <li>• 7‑speed automatic</li>
                        <li>• 0‑100 km/h: ~6.8 seconds</li>
                        <li>• Top speed: 250 km/h (limited)</li>
                        <li>• Fuel economy: 6‑7 L/100km</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-semibold mb-2">Market Reality</h5>
                      <ul className="text-white/80 space-y-1 text-sm">
                        <li>• <span className="text-yellow-400">Original MSRP:</span> €100k‑€120k</li>
                        <li>• <span className="text-yellow-400">Used price (100k km):</span> €25k‑€40k</li>
                        <li>• <span className="text-yellow-400">Annual maintenance:</span> €1k‑€2k</li>
                        <li>• <span className="text-yellow-400">Warranty:</span> 2‑3 years/unlimited km</li>
                        <li>• <span className="text-yellow-400">Best for:</span> Daily luxury, efficiency</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Rolls-Royce Ghost */}
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-3">Rolls‑Royce Ghost: The Ultimate V12 Benchmark</h4>
                  <p className="text-white/80 mb-4">
                    The Rolls‑Royce Ghost represents the pinnacle of British luxury, embodying over a century of automotive excellence. As BMW&apos;s crown jewel (BMW owns Rolls‑Royce), the Ghost shares the same N74 V12 architecture as the M760i but tuned for ultimate refinement rather than performance. The 2025 Series II refresh brings updated styling and enhanced technology while maintaining the handcrafted elegance that defines the brand.
                  </p>
                  <p className="text-white/80 text-sm">
                    <span className="text-yellow-400">Key insight:</span> The M760i&apos;s V12 is essentially a performance‑tuned version of the Ghost&apos;s engine, making it a unique bridge between BMW performance and Rolls‑Royce luxury.
                  </p>
                </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Performance & Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Engine & Performance</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• 6.75L Twin‑Turbo V12 (N74)</li>
                      <li>• 563 hp @ 5,000 rpm (standard)</li>
                      <li>• 592 hp @ 5,000 rpm (Black Badge)</li>
                      <li>• 627 lb‑ft torque @ 1,600 rpm</li>
                      <li>• 664 lb‑ft torque @ 1,600 rpm (Black Badge)</li>
                      <li>• 8‑speed automatic transmission</li>
                      <li>• 0‑60 mph: ~4.6 seconds (4.3 Black Badge)</li>
                      <li>• Top speed: 155 mph (electronically limited)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Dimensions & Chassis</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• Length: 218.8 inches</li>
                      <li>• Wheelbase: 129.7 inches</li>
                      <li>• Curb weight: ~5,445 lbs</li>
                      <li>• Cargo space: 17.3 cubic feet</li>
                      <li>• Magic carpet ride suspension</li>
                      <li>• Active noise cancellation</li>
                      <li>• Starlight headliner (optional)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Luxury & Craftsmanship</h4>
                <p className="text-white/80 mb-4">
                  The Ghost&apos;s interior is a masterclass in British craftsmanship, featuring lambswool carpets, hand‑stitched leather, real wood veneers, and the iconic starlight headliner. Unlike the tech‑heavy Maybach, the Ghost focuses on timeless elegance with discreet technology integration.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Bespoke Features</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• Hand‑painted coachlines</li>
                      <li>• Custom embroidery options</li>
                      <li>• Bespoke color palettes</li>
                      <li>• Personalized door sills</li>
                      <li>• Custom picnic tables</li>
                      <li>• Individual rear seat configuration</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Technology Suite</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• 10.3‑inch touchscreen (discreet)</li>
                      <li>• High‑end audio system</li>
                      <li>• Night vision system</li>
                      <li>• Head‑up display</li>
                      <li>• 360‑degree camera</li>
                      <li>• Adaptive cruise control</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Pricing & Market Reality</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">2025 Used Market Reality</h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• <span className="text-yellow-400">2014‑2016 Ghost:</span> €130k‑€180k (low mileage)</li>
                      <li>• <span className="text-yellow-400">2017‑2019 Ghost:</span> €180k‑€250k</li>
                      <li>• <span className="text-yellow-400">2020+ Ghost:</span> €250k‑€350k+</li>
                      <li>• <span className="text-yellow-400">Warranty:</span> 4 years/unlimited miles</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-2">Investment Profile</h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• <span className="text-yellow-400">Depreciation:</span> Slower than Maybach</li>
                      <li>• <span className="text-yellow-400">Value retention:</span> Excellent due to rarity</li>
                      <li>• <span className="text-yellow-400">Maintenance:</span> Very high (bespoke parts)</li>
                      <li>• <span className="text-yellow-400">Fuel economy:</span> 14 mpg combined</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">The Complete Luxury Sedan Quartet: S 350 d vs M760i vs Maybach vs Ghost</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-black/30 p-4 rounded-none border border-yellow-500/30">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-center">S 350 d W222</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• <span className="text-yellow-400">Price:</span> €25k‑40k (used)</li>
                      <li>• <span className="text-yellow-400">Focus:</span> Efficiency</li>
                      <li>• <span className="text-yellow-400">Narrative:</span> Daily luxury</li>
                      <li>• <span className="text-yellow-400">Best for:</span> Practical luxury</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-none border border-yellow-500/30">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-center">BMW M760i</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• <span className="text-yellow-400">Price:</span> €60k (used)</li>
                      <li>• <span className="text-yellow-400">Focus:</span> Performance</li>
                      <li>• <span className="text-yellow-400">Narrative:</span> Last BMW V12</li>
                      <li>• <span className="text-yellow-400">Best for:</span> Driving enthusiasts</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-none border border-yellow-500/30">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-center">Maybach S680</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• <span className="text-yellow-400">Price:</span> €100k‑€150k (used)</li>
                      <li>• <span className="text-yellow-400">Focus:</span> Technology</li>
                      <li>• <span className="text-yellow-400">Narrative:</span> German luxury</li>
                      <li>• <span className="text-yellow-400">Best for:</span> Tech lovers</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-none border border-yellow-500/30">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-center">Rolls‑Royce Ghost</h5>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li>• <span className="text-yellow-400">Price:</span> €130k‑€250k (used)</li>
                      <li>• <span className="text-yellow-400">Focus:</span> Craftsmanship</li>
                      <li>• <span className="text-yellow-400">Narrative:</span> British heritage</li>
                      <li>• <span className="text-yellow-400">Best for:</span> Prestige seekers</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-black/30 p-4 rounded-none border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Critical Insight</h5>
                  <p className="text-white/80 text-sm">
                    The BMW M760i offers the best value proposition for V12 enthusiasts who want Rolls‑Royce DNA at a fraction of the cost. For daily luxury on a budget, the S 350 d W222 provides exceptional value at €25k‑40k. While the Maybach and Ghost provide superior luxury, the M760i&apos;s performance credentials and &ldquo;last of its kind&rdquo; narrative make it the smartest investment in the dying V12 era.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Due Diligence & Links */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Due Diligence & Research</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-3">Pre‑Purchase Inspection</h4>
                  <ul className="list-disc list-inside space-y-2 text-white/80">
                    <li>Engine health: compression test, turbo condition, oil analysis</li>
                    <li>xDrive system: transfer case, differential fluids, driveshafts</li>
                    <li>Cooling system: radiator, water pump, thermostat, hoses</li>
                    <li>Electronics: iDrive system, sensors, battery condition</li>
                    <li>Suspension: air springs, shocks, bushings, alignment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-3">Service History Analysis</h4>
                  <ul className="list-disc list-inside space-y-2 text-white/80">
                    <li>Complete service records with BMW dealer stamps</li>
                    <li>Regular oil changes (every 15,000 km or annually)</li>
                    <li>Spark plug replacement (every 60,000 km)</li>
                    <li>Transmission and differential fluid changes</li>
                    <li>Brake fluid and coolant replacement history</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">Legal & Financial Considerations</h4>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>EU emissions compliance and road tax implications</li>
                  <li>Insurance costs (V12 engines command premium rates)</li>
                  <li>Import duties if sourcing from non‑EU markets</li>
                  <li>Registration requirements and documentation</li>
                  <li>Warranty transfer and extended coverage options</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link href="https://www.autoscout24.com/" target="_blank">
                <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Browse AutoScout24</Button>
              </Link>
              <Link href="https://www.mobile.de/" target="_blank">
                <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Browse Mobile.de</Button>
              </Link>
              <Link href="https://www.rolls-roycemotorcars.com/" target="_blank">
                <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">Rolls‑Royce Tech Lineage</Button>
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Ready to Invest in the Last BMW V12?</h3>
            <div className="text-center space-y-6">
              <p className="text-white/80 text-lg">
                The BMW M760i represents a unique opportunity to own a piece of automotive history while potentially building long‑term value. With production ended and values stabilizing, now might be the perfect time to secure your example.
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Link href="https://www.autoscout24.com/" target="_blank">
                  <Button className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                    Browse EU Listings
                  </Button>
                </Link>
                <Link href="https://www.mobile.de/" target="_blank">
                  <Button className="bg-black text-yellow-500 font-bold px-6 py-3 rounded-none border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 w-full">
                    Search German Market
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">Bottom Line</h3>
            <p className="text-white/80 text-lg">
              If you can secure a low‑km, well‑kept M760i around €60k, it’s a buy—enjoy now, preserve carefully, and let the “last BMW V12” narrative compound. As an alternative, an S‑Class V12 majors in comfort and brand prestige but usually at a higher entry price in comparable condition.
            </p>
          </div>

          {/* Final Verdict */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">The V12 Trinity: Final Verdict</h3>
            <div className="space-y-6">
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-3">For the Smart Investor</h4>
                <p className="text-white/80 mb-4">
                  The BMW M760i offers the best value proposition in the dying V12 era. At €60k, you get Rolls‑Royce DNA, superior performance, and a compelling narrative that will only strengthen over time. For daily luxury on a budget, the S 350 d W222 at €25k‑€40k provides exceptional value. While the Maybach (€100k‑€150k) and Ghost (€130k‑€250k) provide superior luxury, they come at 2–4x the price with similar depreciation curves.
                </p>
                <p className="text-white/80">
                  <span className="text-yellow-400">Key advantage:</span> The M760i&apos;s performance credentials and &ldquo;last of its kind&rdquo; status make it the smartest investment in the ultra‑luxury V12 segment.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-black/30 rounded-none border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-bold mb-2">S 350 d W222</h5>
                  <p className="text-white/80 text-sm">Efficiency • Value • Daily Use</p>
                  <p className="text-yellow-400 font-bold mt-2">€25k‑40k</p>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-none border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-bold mb-2">BMW M760i</h5>
                  <p className="text-white/80 text-sm">Best Value • Performance • Investment</p>
                  <p className="text-yellow-400 font-bold mt-2">€60k</p>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-none border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-bold mb-2">Maybach S680</h5>
                  <p className="text-white/80 text-sm">Technology • Luxury • Comfort</p>
                  <p className="text-yellow-400 font-bold mt-2">€100k‑150k</p>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-none border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-bold mb-2">Rolls‑Royce Ghost</h5>
                  <p className="text-white/80 text-sm">Prestige • Craftsmanship • Heritage</p>
                  <p className="text-yellow-400 font-bold mt-2">€130k‑250k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


