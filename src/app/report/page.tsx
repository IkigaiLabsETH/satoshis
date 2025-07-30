"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Digital Assets • Regulatory Framework • Market Analysis</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Digital Assets Report
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">Executive Order 14178 Analysis</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-black to-yellow-500/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">📊</div>
                  <h2 className="text-3xl font-bold text-yellow-500">EO14178</h2>
                  <p className="text-xl text-white/80">Trump Administration&apos;s Digital Assets Strategy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points Overview */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Key Points
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-yellow-500">Policy Framework</h4>
                  <ul className="list-disc list-inside space-y-2 text-white/80">
                    <li>Boost U.S. leadership in digital assets</li>
                    <li>Support open blockchains and stablecoins</li>
                    <li>Ban Central Bank Digital Currencies (CBDCs)</li>
                    <li>Promote technology-neutral regulations</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-yellow-500">Market Statistics</h4>
                  <ul className="list-disc list-inside space-y-2 text-white/80">
                    <li>68+ million Americans own cryptocurrencies</li>
                    <li>96% year-over-year transaction increase</li>
                    <li>Billions in monthly blockchain transactions</li>
                    <li>Strong institutional and retail participation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🏛️</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Regulatory Clarity
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Clear Framework
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">💼</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Banking Integration
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Financial Services
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">📈</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Market Growth
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Rapid Expansion
              </p>
            </div>
          </div>

          {/* Report Overview */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Report Overview
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80 font-satoshi leading-relaxed">
                                 The &quot;Digital Assets Report EO14178,&quot; released by the Trump Administration, outlines a comprehensive strategy to strengthen American leadership in digital financial technology. This landmark document focuses on fostering innovation in digital assets and blockchain, with key policies including protecting access to open public blockchain networks, ensuring U.S. dollar sovereignty through stablecoins, and providing regulatory clarity.
              </p>
              <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Key Policy Goals:</h4>
                <ul className="space-y-2 text-white/80 font-satoshi">
                  <li>• Protecting and promoting access to open public blockchain networks</li>
                  <li>• Ensuring U.S. dollar sovereignty through dollar-backed stablecoins</li>
                  <li>• Providing fair and open access to banking services</li>
                  <li>• Offering regulatory clarity through technology-neutral frameworks</li>
                  <li>• Prohibiting Central Bank Digital Currencies (CBDCs)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Market Growth and Statistics */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Market Growth and Statistics
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80 font-satoshi leading-relaxed">
                The report highlights significant market growth, with over 68 million Americans (1 in 5) owning cryptocurrencies. It notes billions of monthly transactions on public blockchains by early 2025, marking a 96% year-over-year increase, reflecting strong institutional and retail participation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Statistics:</h4>
                  <ul className="space-y-2 text-white/80 font-satoshi">
                    <li>• 68+ million American crypto owners</li>
                    <li>• 96% YoY transaction increase</li>
                    <li>• Billions in monthly transactions</li>
                    <li>• 83% institutional investors planning increases</li>
                    <li>• $4.8B VC investment in Q1 2025</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Growth Drivers:</h4>
                  <ul className="space-y-2 text-white/80 font-satoshi">
                    <li>• Regulatory clarity and support</li>
                    <li>• Technological advancements</li>
                    <li>• Institutional adoption</li>
                    <li>• Retail participation</li>
                    <li>• Venture capital investment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Banking and Regulatory Approach */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Banking and Regulatory Approach
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-white/80 font-satoshi leading-relaxed">
                The report encourages banks to embrace digital assets, advocating for technology-neutral policies and clarity on permissible activities. It opposes past discriminatory practices like Operation Choke Point 2.0 and supports the GENIUS Act for stablecoin regulation, ensuring full reserves and anti-money laundering compliance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Banking Integration:</h4>
                  <ul className="space-y-2 text-white/80 font-satoshi">
                    <li>• Custody services</li>
                    <li>• Trading platforms</li>
                    <li>• Lending services</li>
                    <li>• Tokenization support</li>
                    <li>• Technology-neutral policies</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">Regulatory Framework:</h4>
                  <ul className="space-y-2 text-white/80 font-satoshi">
                    <li>• GENIUS Act implementation</li>
                    <li>• Full reserve requirements</li>
                    <li>• AML compliance</li>
                    <li>• Clear jurisdictional boundaries</li>
                    <li>• Safe harbor provisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive Analysis */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Comprehensive Analysis
            </h3>
            <div className="space-y-8">
              
              {/* Report Structure */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Report Structure and Purpose</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    The report is structured into several chapters, covering the digital asset ecosystem, market structure, banking integration, stablecoins, countering illicit finance, and taxation. Its primary purpose is to foster responsible growth in digital assets and blockchain technologies, aligning with the Trump Administrations pro-innovation stance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Key Chapters:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Digital Asset Ecosystem</li>
                        <li>Market Structure</li>
                        <li>Banking Integration</li>
                        <li>Stablecoins</li>
                        <li>Illicit Finance</li>
                        <li>Taxation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Objectives:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Foster innovation</li>
                        <li>Provide regulatory clarity</li>
                        <li>Ensure U.S. leadership</li>
                        <li>Protect consumer interests</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory Framework */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Regulatory Framework and Oversight</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    The report calls for a clear taxonomy to classify digital assets, distinguishing between security tokens, commodity tokens, and tokens for commercial/consumer use. This classification is crucial for regulatory clarity, with the SEC focusing on investor protection for securities and the CFTC overseeing commodity derivatives and spot markets.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Asset Classification:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Security tokens</li>
                        <li>Commodity tokens</li>
                        <li>Commercial tokens</li>
                        <li>Consumer tokens</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Agency Roles:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>SEC - Investor protection</li>
                        <li>CFTC - Commodity oversight</li>
                        <li>State regulators</li>
                        <li>Federal coordination</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* U.S. Leadership */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">U.S. Leadership and Recommendations</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    The report positions the U.S. to lead globally in setting technical standards, countering regulatory fragmentation, and ensuring competitiveness. It credits President Trumps recognition of the crypto movement, with 72% approval among crypto investors in June 2025 and 64% more likely to invest due to his policies.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Strategic Initiatives:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Technical standards leadership</li>
                        <li>Regulatory coordination</li>
                        <li>International partnerships</li>
                        <li>Innovation support</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Public Support:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>72% crypto investor approval</li>
                        <li>64% more likely to invest</li>
                        <li>Strong institutional backing</li>
                        <li>Bipartisan support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Key Statistics and Data
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-yellow-500/30">
                    <th className="py-3 px-4 text-yellow-500 font-bold">Metric</th>
                    <th className="py-3 px-4 text-yellow-500 font-bold">Value</th>
                    <th className="py-3 px-4 text-yellow-500 font-bold">Source</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-yellow-500/10">
                    <td className="py-3 px-4">Crypto Owners in U.S.</td>
                    <td className="py-3 px-4">68 million (1 in 5 Americans)</td>
                    <td className="py-3 px-4">National Cryptocurrency Association, 2025</td>
                  </tr>
                  <tr className="border-b border-yellow-500/10">
                    <td className="py-3 px-4">Monthly Transactions</td>
                    <td className="py-3 px-4">Billions, +96% YoY by early 2025</td>
                    <td className="py-3 px-4">Gemini 2025 Global State of Crypto Report</td>
                  </tr>
                  <tr className="border-b border-yellow-500/10">
                    <td className="py-3 px-4">Institutional Investors Planning Increase</td>
                    <td className="py-3 px-4">83% in 2025</td>
                    <td className="py-3 px-4">EY Parthenon, HarrisX Crypto Policy Study</td>
                  </tr>
                  <tr className="border-b border-yellow-500/10">
                    <td className="py-3 px-4">Venture Capital in Q1 2025</td>
                    <td className="py-3 px-4">$4.8 billion, 70% YoY forecast</td>
                    <td className="py-3 px-4">Galaxy Q1 2025 VC, PitchBook</td>
                  </tr>
                  <tr className="border-b border-yellow-500/10">
                    <td className="py-3 px-4">DeFi Total Value Locked (TVL)</td>
                    <td className="py-3 px-4">Approached $130 billion by July 2025</td>
                    <td className="py-3 px-4">Gemini 2025 Global State of Crypto Report</td>
                  </tr>
                  <tr className="border-b border-yellow-500/10">
                    <td className="py-3 px-4">Illicit Transaction Volume (2023)</td>
                    <td className="py-3 px-4">0.81-0.83% of onchain activity</td>
                    <td className="py-3 px-4">Treasury Reports</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Trump Approval Among Crypto Investors</td>
                    <td className="py-3 px-4">72% (June 2025)</td>
                    <td className="py-3 px-4">HarrisX Crypto Policy Study June 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* External Links */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Official Documents
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Digital Assets Report EO14178</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Full Report PDF</p>
                </CardHeader>
                <CardContent>
                                     <p className="text-white/80 font-satoshi mb-4">Complete analysis of the Trump Administration&apos;s digital assets strategy and policy recommendations.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.whitehouse.gov/wp-content/uploads/2025/07/Digital-Assets-Report-EO14178.pdf" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Report
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">White House Fact Sheet</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Executive Summary</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Key highlights and recommendations from the Presidents Working Group on Digital Asset Markets.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-the-presidents-working-group-on-digital-asset-markets-releases-recommendations-to-strengthen-american-leadership-in-digital-financial-technology/" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Fact Sheet
                      </Button>
                    </Link>
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
