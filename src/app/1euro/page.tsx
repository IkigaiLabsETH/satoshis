"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function OneEuroHomesPage() {
  // Sample data for towns - expand with all from content
  const towns = [
    { village: 'Nulvi', region: 'Sardinia', details: 'Close to the northern coast, 30-45 minutes to beaches like Castelsardo and Marina di Sorso, attracting many but with some preferring other options.' },
    { village: 'Ollolai', region: 'Sardinia', details: 'Post-Trump election, targets Americans for relocation, noted for unique promotional efforts.' },
    { village: 'Fabbriche di Vergemoli', region: 'Tuscany', details: 'Located in the Apuan Alps, ideal for exploring historical and natural sites.' },
    { village: 'Zungoli', region: 'Campania', details: 'Fourth initiative, requires renovation project within 1 year, work completed within 3 years.' },
    { village: 'Biccari', region: 'Puglia', details: 'Attracts retirees, second home buyers, and potential renters, rich in history and traditions.' },
    { village: 'Mussomeli', region: 'Sicily', details: 'Sold 125 houses since 2017, contributing €7m to local economy, known for safety and climate.' },
    { village: 'Sambuca di Sicilia', region: 'Sicily', details: 'Known as “Little America,” successful in attracting international buyers, revitalizing the area.' },
    { village: 'Montieri', region: 'Tuscany', details: 'Sold 70 houses, part of broader Tuscany efforts to repopulate rural areas.' },
    { village: 'Pratola Peligna', region: 'Abruzzo', details: 'Example of rebirth, with initiatives like Swedish couple buying for 1 euro, promoting recovery.' },
    { village: 'Villa San Pietro', region: 'Sardinia', details: 'Receives funds under Regional Law No. 3 (09/03/2022) to combat depopulation.' },
    { village: 'Calitri', region: 'Campania', details: 'Offers €5,000 incentive for relocation, part of Support Fund for Marginal Municipalities (2021/2023).' },
    { village: 'Presicce Acquarica', region: 'Puglia', details: 'Offers €30,000 to relocate to Salento, aiming to boost population and economy.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Real Estate • Cultural Revival • Investment Opportunity</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                One Euro Homes
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">Revitalizing Italy&apos;s Hidden Gems</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual - Placeholder for a relevant video or image */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-yellow-500 text-lg font-bold mb-2">Featured Visual</p>
                  <p className="text-white/70 text-sm">Video placeholder</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Overview
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Italy&apos;s one euro homes initiative is designed to revitalize depopulated rural areas by selling abandoned or dilapidated properties for a symbolic one euro. This program, active as of July 2025, aims to attract buyers who will renovate and occupy these homes, boosting local economies. However, it comes with complexities, including renovation costs and cultural implications, which potential buyers should carefully consider.
              </p>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🏠</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Ongoing Program
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                73+ towns participating as of July 2025
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🔨</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Renovation Required
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Significant costs and bureaucratic challenges
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">💼</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Economic Benefits
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Boosts local economies but raises gentrification concerns
              </p>
            </div>
          </div>

          {/* Comprehensive Analysis */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Comprehensive Analysis of Italy&apos;s One Euro Homes Initiative as of July 13, 2025
            </h3>
            <div className="space-y-8">
              {/* Current Status and Scope */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Current Status and Scope</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Research suggests that as of July 2025, at least 73 towns across Italy have launched or are adopting the one euro homes model, a significant expansion from earlier years. This initiative, which began notably in 2008 with Salemi, Sicily, under Mayor Vittorio Sgarbi, has grown to include regions from the Alpine north to the Sicilian south. Specific examples highlight its success: Mussomeli, Sicily, has sold 125 houses since 2017, contributing an estimated €7 million to the local economy, while Sambuca di Sicilia is now colloquially referred to as the Sicilian “Little America” due to its appeal to international buyers. Montieri in Tuscany has also seen success, selling 70 houses through the scheme.
                  </p>
                  <p className="text-white/80 font-satoshi">
                    The program continues to attract interest, with articles from April 2025 noting a reversal in trend where Italians are rediscovering the opportunity to live in villages through this initiative. Websites like <Link href="https://1eurohouses.com/" className="text-yellow-400 hover:underline">1eurohouses.com</Link> and <Link href="https://renovita.net/" className="text-yellow-400 hover:underline">renovita.net</Link> provide platforms for potential buyers, offering maps and listings of available properties, updated regularly to reflect new projects. The evidence leans toward this being a dynamic and ongoing effort, with towns like Penne in Abruzzo gaining international attention for their projects aimed at combating depopulation.
                  </p>
                </div>
              </div>

              {/* Participating Towns and Specific Initiatives */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Participating Towns and Specific Initiatives</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {towns.map((town, index) => (
                    <Card key={index} className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                      <CardHeader>
                        <CardTitle className="font-epilogue text-xl text-yellow-400">{town.village}</CardTitle>
                        <p className="text-white/60 font-satoshi text-sm">{town.region}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/80 font-satoshi mb-4">{town.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-white/80 font-satoshi mt-4">
                  These towns often require buyers to contact the local council directly, with obligations to renovate and secure the property, as noted in sources like <Link href="https://www.idealista.it/en/news/property-for-sale-in-italy/2025/01/14/192763-1-euro-houses-in-italy-the-villages-still-in-the-spotlight-in-2025" className="text-yellow-400 hover:underline">idealista/news</Link>. Maps and detailed listings are available at <Link href="https://1eurohouses.com/1-euro-houses-map/" className="text-yellow-400 hover:underline">1eurohouses.com/1-euro-houses-map/</Link>, ensuring buyers can explore options across both northern and southern Italy.
                </p>
              </div>

              {/* Economic and Social Impacts */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Economic and Social Impacts</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    The economic benefits are evident in towns like Mussomeli, where the influx of buyers has stimulated local construction, retail, and tourism sectors. Articles from The Independent (<Link href="https://www.independent.co.uk/travel/europe/italy/italy-one-euro-homes-how-buy-house-b2639062.html" className="text-yellow-400 hover:underline">source</Link>) highlight how new homeowners buy local produce, employ construction workers, and boost venues, potentially creating boutique hotels or B&amp;Bs. This aligns with the strategy of reviving small abandoned centers without new overbuilding, preserving cultural identity.
                  </p>
                  <p className="text-white/80 font-satoshi">
                    However, the social fabric is more complex. The Guardian (<Link href="https://www.theguardian.com/society/2025/jul/08/the-life-swap-dream-or-a-marketing-gimmick-the-italian-towns-selling-houses-for-1" className="text-yellow-400 hover:underline">source</Link>) notes that while some towns have sold all listed properties, there are risks of turning into “Disneyfied villages,” potentially eroding local customs, such as Sedini’s food festival. Trust issues, particularly in towns like Sedini, where participation is low due to mistrust between residents and newcomers, add another layer of complexity.
                  </p>
                </div>
              </div>

              {/* Challenges and Considerations for Buyers */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Challenges and Considerations for Buyers</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Potential buyers face several hurdles, which are critical to understand before participating. Renovation is a significant requirement, often mandated within a couple of years, and can be costly. For instance, the Guardian article mentions high renovation costs, and <Link href="https://www.emiliadelizia.com/ultimate-guide-to-1-euro-houses-in-italy/" className="text-yellow-400 hover:underline">emiliadelizia.com</Link> notes that while the initial price is one euro, the real investment lies in renovations. Bureaucratic challenges are particularly pronounced for foreigners, with Jennifer Fortune’s experience of endless paperwork cited as an example.
                  </p>
                  <p className="text-white/80 font-satoshi">
                    Gentrification tensions are another concern, with ethical questions about buying into foreign places without connections, potentially displacing local culture. This is especially relevant given Italy’s demographic challenges, with predictions of a population decline by 2 million by 2040 and 4 million by 2050, and poverty rates at 9.8% nationally in 2023, higher in regions like Sardinia (20%), as per <Link href="https://www.reuters.com/markets/europe/poverty-italy-hits-new-high-despite-economic-recovery-2024-03-25/" className="text-yellow-400 hover:underline">Reuters</Link>.
                  </p>
                </div>
              </div>

              {/* Additional Resources and Ethical Considerations */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Additional Resources and Ethical Considerations</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    For those interested, ebooks and guides are available, such as those on <Link href="https://1eurohouses.com/renovate-abandoned-premises/" className="text-yellow-400 hover:underline">1eurohouses.com/renovate-abandoned-premises/</Link>, offering details in English, French, and Spanish. These resources are crucial for understanding the process, but buyers should also consider the ethical implications, as highlighted by The Guardian, of potentially contributing to gentrification without fostering genuine community integration.
                  </p>
                  <p className="text-white/80 font-satoshi">
                    In conclusion, Italy&apos;s one euro homes initiative is a vibrant and ongoing effort to address depopulation, with significant economic benefits but also notable challenges. Potential buyers should research specific towns, understand renovation and bureaucratic requirements, and be mindful of the cultural and social impacts, ensuring their participation contributes positively to the community.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Renovation Costs */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Renovation Costs for Italy&apos;s One Euro Homes
            </h3>
            <div className="space-y-8">
              {/* Overview */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Overview</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Italy&apos;s one euro homes initiative, active as of July 13, 2025, offers abandoned properties for a symbolic one euro to attract buyers who will renovate and revitalize depopulated areas. While the initial cost is minimal, the renovation costs represent the true financial commitment, varying widely based on property condition, size, location, and desired quality. This section provides a clear, layman-friendly overview of what to expect.
                  </p>
                </div>
              </div>

              {/* Cost Range */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Cost Range</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Research suggests renovation costs typically range from €500 to €2,000 per square meter. For a small property, say 50-100 square meters, this could translate to total costs of €25,000 to €200,000 or more, depending on whether you opt for basic repairs or a high-end renovation.
                  </p>
                </div>
              </div>

              {/* Factors Influencing Costs */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Factors Influencing Costs</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <ul className="text-white/80 font-satoshi list-disc list-inside mb-4">
                    <li><strong>Property Condition</strong>: Many one euro homes are in ruins, requiring extensive work like rebuilding, wiring, and plumbing, which can push costs higher.</li>
                    <li><strong>Size and Location</strong>: Larger properties or those in areas with stricter regulations (e.g., historic zones) may increase expenses.</li>
                    <li><strong>Quality of Renovation</strong>: Basic renovations might cost around €500-€700 per square meter, while luxury projects can reach €1,500-€2,000 per square meter.</li>
                  </ul>
                </div>
              </div>

              {/* Additional Expenses */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Additional Expenses</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Beyond renovation, buyers should budget for administrative fees and taxes, which can add €20,000-€30,000; deposits, often €5,000, refundable upon completing renovations within the required timeframe (usually 2-3 years); and professional fees for architects, engineers, and permits, which vary by project.
                  </p>
                </div>
              </div>

              {/* Tax Benefits */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Tax Benefits</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    It&apos;s worth noting that Italy offers a 50% tax deduction on renovation expenses, up to €96,000 per property, if you&apos;re paying taxes in Italy, which can help offset costs.
                  </p>
                </div>
              </div>

              {/* Comparative Analysis */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Comparative Analysis</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-yellow-500/20">
                        <th className="p-2 border border-yellow-500/30">Person</th>
                        <th className="p-2 border border-yellow-500/30">Location</th>
                        <th className="p-2 border border-yellow-500/30">Size (sq m)</th>
                        <th className="p-2 border border-yellow-500/30">Purchase Cost (EUR)</th>
                        <th className="p-2 border border-yellow-500/30">Renovation Cost (EUR)</th>
                        <th className="p-2 border border-yellow-500/30">Cost per sq m (EUR)</th>
                        <th className="p-2 border border-yellow-500/30">Total Cost (EUR)</th>
                        <th className="p-2 border border-yellow-500/30">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-yellow-500/10">
                        <td className="p-2 border border-yellow-500/30">Meredith Tabbone</td>
                        <td className="p-2 border border-yellow-500/30">Sambuca di Sicilia</td>
                        <td className="p-2 border border-yellow-500/30">250.8</td>
                        <td className="p-2 border border-yellow-500/30">~5,900</td>
                        <td className="p-2 border border-yellow-500/30">425,000</td>
                        <td className="p-2 border border-yellow-500/30">~1,694</td>
                        <td className="p-2 border border-yellow-500/30">~430,900</td>
                        <td className="p-2 border border-yellow-500/30"><Link href="https://www.cnbc.com/2024/05/19/what-it-really-costs-to-renovate-a-1-home-in-italy.html" className="text-yellow-400 hover:underline">CNBC</Link></td>
                      </tr>
                      <tr className="hover:bg-yellow-500/10">
                        <td className="p-2 border border-yellow-500/30">Rubia Daniels</td>
                        <td className="p-2 border border-yellow-500/30">Mussomeli, Sicily</td>
                        <td className="p-2 border border-yellow-500/30">~90 (estimated)</td>
                        <td className="p-2 border border-yellow-500/30">~3,301 per property</td>
                        <td className="p-2 border border-yellow-500/30">50,000 (expected total)</td>
                        <td className="p-2 border border-yellow-500/30">~556</td>
                        <td className="p-2 border border-yellow-500/30">~53,301</td>
                        <td className="p-2 border border-yellow-500/30"><Link href="https://metro.co.uk/2021/05/04/woman-who-bought-three-1-houses-in-italy-reveals-true-cost-of-renovation-14515451/" className="text-yellow-400 hover:underline">Metro News</Link></td>
                      </tr>
                      <tr className="hover:bg-yellow-500/10">
                        <td className="p-2 border border-yellow-500/30">Mike and Jennifer</td>
                        <td className="p-2 border border-yellow-500/30">Not specified</td>
                        <td className="p-2 border border-yellow-500/30">180</td>
                        <td className="p-2 border border-yellow-500/30">20,000</td>
                        <td className="p-2 border border-yellow-500/30">270,000</td>
                        <td className="p-2 border border-yellow-500/30">1,500</td>
                        <td className="p-2 border border-yellow-500/30">290,000</td>
                        <td className="p-2 border border-yellow-500/30"><Link href="https://www.dandgdesign.com/what-are-the-costs-of-renovating-a-house-in-italy/" className="text-yellow-400 hover:underline">D&amp;G Design</Link></td>
                      </tr>
                      <tr className="hover:bg-yellow-500/10">
                        <td className="p-2 border border-yellow-500/30">Author&apos;s Home</td>
                        <td className="p-2 border border-yellow-500/30">Not specified</td>
                        <td className="p-2 border border-yellow-500/30">180</td>
                        <td className="p-2 border border-yellow-500/30">50,000</td>
                        <td className="p-2 border border-yellow-500/30">198,000</td>
                        <td className="p-2 border border-yellow-500/30">1,100</td>
                        <td className="p-2 border border-yellow-500/30">248,000</td>
                        <td className="p-2 border border-yellow-500/30"><Link href="https://www.dandgdesign.com/what-are-the-costs-of-renovating-a-house-in-italy/" className="text-yellow-400 hover:underline">D&amp;G Design</Link></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-white/80 font-satoshi mt-4">
                    This table illustrates the variability, with costs per square meter ranging from €556 for basic renovations to €1,694 for luxury projects, reinforcing the need for careful budgeting.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Conclusion</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi">
                    In conclusion, while Italy&apos;s one euro homes offer an attractive entry point, renovation costs are the true financial barrier, ranging from €25,000 to over €400,000 depending on the project. Potential buyers should research specific properties, understand local regulations, and factor in additional fees and tax benefits to ensure a financially viable investment. Resources like <Link href="https://www.cnbc.com/2024/05/19/what-it-really-costs-to-renovate-a-1-home-in-italy.html" className="text-yellow-400 hover:underline">CNBC</Link> and <Link href="https://www.idealista.it/en/news/property-for-sale-in-italy/2023/03/09/204276-the-truth-about-1-euro-houses-in-italy-discover-the-hidden-costs" className="text-yellow-400 hover:underline">idealista/news</Link> provide further guidance for navigating this complex process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
