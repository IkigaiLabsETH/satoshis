"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MedPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Luxury Hotels • French Riviera • Monte-Carlo</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Mediterranean
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">The Ultimate Luxury Experience</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Featured Visual */}
            <div className="relative w-full mx-auto mt-12 aspect-[16/9] overflow-hidden rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-yellow-600 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">French Riviera & Monte-Carlo</h2>
                  <p className="text-xl text-white/80">Seven Legendary Hotels</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Legendary Luxury Hotels
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Discover seven of the most prestigious hotels on the French Riviera and in Monte-Carlo, each offering unique experiences that blend historical charm with modern luxury. From Belle Époque palaces to contemporary architectural marvels, these hotels represent the pinnacle of Mediterranean hospitality.
              </p>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Experience Highlights:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Michelin-starred dining experiences</li>
                  <li>Private beaches and infinity pools</li>
                  <li>World-class spas and wellness centers</li>
                  <li>Historical significance and cultural heritage</li>
                  <li>Exclusive concierge services</li>
                  <li>Panoramic Mediterranean views</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🏛️</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Historical Charm
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Belle Époque Elegance
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🍽️</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Fine Dining
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Michelin-Starred Cuisine
              </p>
            </div>
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🌊</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Mediterranean Views
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Panoramic Sea Vistas
              </p>
            </div>
          </div>

          {/* Hotel Showcase */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Seven Legendary Hotels
            </h3>
            <div className="space-y-8">
              
              {/* La Réserve de Beaulieu */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">La Réserve de Beaulieu - Belle Époque Elegance</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Founded in 1880 as a seafood restaurant and expanded to a hotel in 1905, La Réserve de Beaulieu embodies Belle Époque elegance. Located in Beaulieu-sur-Mer, this intimate retreat features a pink-and-white façade, Italian interiors, and a 186 m² seawater pool. The hotel offers 39 rooms, suites, and villas, many with balconies and panoramic sea views.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Highlights:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Michelin-starred Le Restaurant des Rois</li>
                        <li>186 m² seawater pool</li>
                        <li>Spa with hammam and hot tub</li>
                        <li>Pet-friendly (under 5 kg)</li>
                        <li>Belle Époque architecture</li>
                        <li>Intimate luxury experience</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Location:</h5>
                      <p className="text-white/80 font-satoshi">Beaulieu-sur-Mer, near Nice and Monaco</p>
                      <p className="text-white/60 font-satoshi text-sm mt-2">12 km from Nice C&ocirc;te d&apos;Azur Airport</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Le Negresco */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Le Negresco - Art & Cultural Heritage</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Built in 1913 by Henri Negresco, Le Negresco is a cultural landmark with over 6,000 art pieces, from Louis XV to Street Art rooms. Located on the Promenade des Anglais in Nice, it has hosted figures like Princess Grace and the Beatles. The hotel features over 100 rooms and suites, with the iconic Angel Suite under the dome offering unparalleled elegance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Highlights:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Michelin-starred Le Chantecler</li>
                        <li>6,000-piece art collection</li>
                        <li>Private beach access</li>
                        <li>Spa and fitness center</li>
                        <li>Iconic dome and Angel Suite</li>
                        <li>Central Nice location</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Location:</h5>
                      <p className="text-white/80 font-satoshi">Promenade des Anglais, Nice</p>
                      <p className="text-white/60 font-satoshi text-sm mt-2">3.1 miles from Nice Airport</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Royal-Riviera */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Hotel Royal-Riviera - Modern Mediterranean</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Originally the Bedford Hotel in 1904, Hotel Royal-Riviera was renovated and reopened in 1999, offering modern Mediterranean design. Located in Saint-Jean-Cap-Ferrat, this confidential retreat features 96 rooms and suites, 78 in the main Belle Époque building and 18 in Villa l&apos;Orangerie, all with sea or garden views.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Highlights:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Private beach access</li>
                        <li>Heated infinity pool</li>
                        <li>Gourmet French dining</li>
                        <li>Spa with sauna and hammam</li>
                        <li>Water sports activities</li>
                        <li>Confidential location</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Location:</h5>
                      <p className="text-white/80 font-satoshi">Saint-Jean-Cap-Ferrat</p>
                      <p className="text-white/60 font-satoshi text-sm mt-2">15 km from Nice Airport</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Maybourne Riviera */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">The Maybourne Riviera - Contemporary Luxury</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Opened in 2022 by the Maybourne Hotel Group, The Maybourne Riviera features modernist architecture inspired by maritime culture. Located in Roquebrune-Cap-Martin, it offers floor-to-ceiling windows and terraces with panoramic sea views over Monaco. The hotel features suites and studios with sun-soaked terraces and contemporary comforts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Highlights:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>abc kitchens riviera by Jean-Georges</li>
                        <li>Infinity heated pool with sea views</li>
                        <li>Full-service spa</li>
                        <li>Shuttle services to Monte Carlo</li>
                        <li>Modernist architecture</li>
                        <li>Panoramic Monaco views</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Location:</h5>
                      <p className="text-white/80 font-satoshi">Roquebrune-Cap-Martin</p>
                      <p className="text-white/60 font-satoshi text-sm mt-2">12 miles from Nice Airport</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grand Hôtel du Cap-Ferrat */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Grand Hôtel du Cap-Ferrat - Riviera Icon</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Since 1908, Grand Hôtel du Cap-Ferrat has been a Riviera icon, earning Palace de France status in 2011 and a 3 Key Michelin distinction in 2024. Located at the tip of Saint-Jean-Cap-Ferrat, it features 6 hectares of gardens and sea views from Nice to Monaco. The hotel offers 74 rooms and suites, plus villas like Villa Rose Pierre.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Highlights:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Michelin-starred Le Cap restaurant</li>
                        <li>33 m seawater pool</li>
                        <li>Award-winning spa</li>
                        <li>6 hectares of gardens</li>
                        <li>Palace de France distinction</li>
                        <li>Private cabanas at Club Dauphin</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Location:</h5>
                      <p className="text-white/80 font-satoshi">Tip of Saint-Jean-Cap-Ferrat</p>
                      <p className="text-white/60 font-satoshi text-sm mt-2">15 km from Nice Airport</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hôtel du Cap-Eden-Roc */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Hôtel du Cap-Eden-Roc - Legendary Pool</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Dating to 1870 as Villa Soleil for writers like Jules Verne, Hôtel du Cap-Eden-Roc became a hotel in 1889. Located on Cap d&apos;Antibes, it&apos;s famous for its rock-carved saltwater pool and hosting the Lost Generation, including F. Scott Fitzgerald. The hotel features 111 rooms and suites, including villas, with antique furnishings and marble bathrooms.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Highlights:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Famous rock-carved pool</li>
                        <li>Michelin-starred Louroc restaurant</li>
                        <li>Five tennis courts</li>
                        <li>33 beach cabanas</li>
                        <li>Kids&apos; club</li>
                        <li>Celebrity history</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Location:</h5>
                      <p className="text-white/80 font-satoshi">Cap d&apos;Antibes</p>
                      <p className="text-white/60 font-satoshi text-sm mt-2">12 miles from Nice Airport</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hôtel de Paris Monte-Carlo */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-500">Hôtel de Paris Monte-Carlo - Belle Époque Palace</h4>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <p className="text-white/80 font-satoshi mb-4">
                    Opened in 1864 by Prince Charles III, Hôtel de Paris Monte-Carlo is a Belle Époque palace, featured in films like GoldenEye and Iron Man 2. Centrally located on Place du Casino, it&apos;s steps from the Casino and Prince&apos;s Palace. The hotel boasts 206 rooms and suites, including 7 diamond suites, with contemporary designs post-2019 renovation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Highlights:</h5>
                      <ul className="text-white/80 font-satoshi list-disc list-inside">
                        <li>Three Michelin-starred restaurants</li>
                        <li>Le Louis XV - Alain Ducasse (3 stars)</li>
                        <li>Central Monte Carlo location</li>
                        <li>Spa and fitness options</li>
                        <li>Access to Thermes Marins</li>
                        <li>Belle Époque architecture</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-epilogue mb-2">Location:</h5>
                      <p className="text-white/80 font-satoshi">Place du Casino, Monte Carlo</p>
                      <p className="text-white/60 font-satoshi text-sm mt-2">Monaco heliport nearby</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Cards Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Featured Hotels
            </h3>
            <p className="text-base md:text-lg text-white/80 font-satoshi mb-8 text-center leading-relaxed">
              Discover our curated selection of the French Riviera&apos;s most exceptional hotels, each offering unique experiences and world-class hospitality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">La Réserve de Beaulieu</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Beaulieu-sur-Mer</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Belle Époque elegance with Michelin-starred dining, seawater pool, and intimate luxury experience since 1880.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.reservebeaulieu.com/" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Hotel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Le Negresco</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Nice</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Cultural landmark with 6,000 art pieces, Michelin-starred dining, and iconic dome since 1913.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.lenegresco.com/en" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Hotel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Hotel Royal-Riviera</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Saint-Jean-Cap-Ferrat</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Modern Mediterranean design with private beach, infinity pool, and confidential location since 1904.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.royal-riviera.com/en/" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Hotel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">The Maybourne Riviera</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Roquebrune-Cap-Martin</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Contemporary luxury with modernist architecture, Jean-Georges dining, and panoramic Monaco views.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.maybourneriviera.com/" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Hotel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Grand Hôtel du Cap-Ferrat</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Saint-Jean-Cap-Ferrat</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Riviera icon with Palace de France distinction, Michelin-starred dining, and 6 hectares of gardens.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.fourseasons.com/capferrat/" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Hotel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Hôtel du Cap-Eden-Roc</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Cap d&apos;Antibes</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Legendary rock-carved pool, celebrity history, and Michelin-starred dining since 1870.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.oetkerhotels.com/hotels/hotel-du-cap-eden-roc/" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Hotel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <CardHeader>
                  <CardTitle className="font-epilogue text-xl text-yellow-400">Hôtel de Paris Monte-Carlo</CardTitle>
                  <p className="text-white/60 font-satoshi text-sm">Monte Carlo</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-satoshi mb-4">Belle Époque palace with three Michelin-starred restaurants and central Monte Carlo location since 1864.</p>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.montecarlosbm.com/en/hotel-monaco/hotel-paris-monte-carlo" target="_blank">
                      <Button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-none hover:bg-yellow-400 transition-all duration-300 w-full">
                        View Hotel
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Travel Recommendations */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Travel Recommendations
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">For Art & History Lovers</h4>
                  <p className="text-white/80 font-satoshi mb-4">Le Negresco offers the perfect blend of cultural significance and central Nice location, ideal for exploring the city&apos;s museums and galleries.</p>
                  <ul className="text-white/60 font-satoshi text-sm">
                    <li>• 6,000-piece art collection</li>
                    <li>• Central Nice location</li>
                    <li>• Cultural heritage</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">For Privacy Seekers</h4>
                  <p className="text-white/80 font-satoshi mb-4">Cap-Ferrat hotels offer exclusive retreats with private beaches and gardens, perfect for those seeking tranquility.</p>
                  <ul className="text-white/60 font-satoshi text-sm">
                    <li>• Private beach access</li>
                    <li>• Secluded locations</li>
                    <li>• Intimate atmosphere</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">For Glamour & Nightlife</h4>
                  <p className="text-white/80 font-satoshi mb-4">Hôtel de Paris Monte-Carlo immerses guests in the vibrant casino culture and nightlife of Monte Carlo.</p>
                  <ul className="text-white/60 font-satoshi text-sm">
                    <li>• Central Monte Carlo location</li>
                    <li>• Casino access</li>
                    <li>• Vibrant nightlife</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">For Contemporary Luxury</h4>
                  <p className="text-white/80 font-satoshi mb-4">The Maybourne Riviera offers modernist architecture and contemporary comforts with stunning sea views.</p>
                  <ul className="text-white/60 font-satoshi text-sm">
                    <li>• Modernist design</li>
                    <li>• Contemporary amenities</li>
                    <li>• Panoramic views</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
