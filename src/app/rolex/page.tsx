"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function RolexPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Luxury Markets • Wealth Cycles • Market Psychology</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-7xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Rolex as a Market Signal
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">When Wealth Becomes Visible</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

          {/* Section: The Moment Wealth Becomes Visible */}
          <Card className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">There&apos;s a moment in every cycle when wealth becomes visible.</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/80 mb-4">Not just on-chain, or in portfolio screenshots &ndash; but out in the real world. Someone who was unknown a year ago walks into a dealer, pays cash for a watch, and posts a wrist shot online. This moment, trivial as it seems, marks an important shift in the psychology of markets.</p>
              <p className="text-lg text-white/80">But let&apos;s start with the basics...</p>
            </CardContent>
          </Card>

          {/* Section: Why Watches? */}
          <Card className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">Why Watches?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/80 mb-4">The logic is simple. Rolexes are Veblen goods. The more they cost, the more people want them. They don&apos;t signal value through function, but through price. Because what people are buying isn&apos;t utility, but status.</p>
              <p className="text-lg text-white/80 mb-4">And when new money gets rich fast, the first thing they want is for people to know. They don&apos;t buy farmland or treasuries. They buy symbols. Watches. Cars. Sometimes JPEGs.</p>
              <p className="text-lg text-white/80">But it&apos;s not as simple as it might look like at first...</p>
            </CardContent>
          </Card>

          {/* Section: A Lagging Reflex */}
          <Card className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">A Lagging Reflex</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/80 mb-4">Watches Index and Bitcoin Price normalized, 2020-2024.</p>
              <p className="text-lg text-white/80 mb-4">In 2021, most people assumed luxury watches rose with crypto. But if you look closely at the timing, the watch market didn’t boom on Bitcoin’s first all-time high. It boomed on the second – when tokenized JPEGs were being bought for the price of houses.</p>
              <p className="text-lg text-white/80 mb-4">The Rolex spike wasn’t the start of a bull market. It was the top. What makes this useful is that luxury markets lag. Not by much – but just enough. You can see it in the data. Watch indexes trailed crypto on the way up, peaked a little later, and then collapsed almost in sync. Rolex prices fell by nearly 30% in the year following the crypto crash. Not because demand disappeared. But because the kind of demand driving them (status demand) – dried up.</p>
              <p className="text-lg text-white/80">This makes watches an unusual kind of signal. They don’t predict fundamentals. They reflect sentiment. And they do it more cleanly than most indicators we have...</p>
            </CardContent>
          </Card>

          {/* Section: A Different Kind of Indicator */}
          <Card className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">A Different Kind of Indicator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/80 mb-4">In traditional finance, you have volatility indexes. In crypto, you have funding rates. But both measure behavior indirectly. Luxury goods are different. They tell you not just what investors are doing, but how they feel. How rich they think they are. And how much they want the world to notice.</p>
              <p className="text-lg text-white/80 mb-4">It’s not perfect. But when you see watches selling 2x retail, or people posting their custom made NFT Rolexes, it is usually near the top. Because by then, the wealth has already been made. Now it’s being spent.</p>
              <p className="text-lg text-white/80">So where are we now?</p>
            </CardContent>
          </Card>

          {/* Section: Where Are We In This Cycle? */}
          <Card className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">Where Are We In This Cycle?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/80 mb-4">Right now we’re back near all-time highs. Bitcoin is up. Ethereum too. Even normie coins like ADA and XRP are up 50% in the last month. And yet… the Rolex market is quiet. Prices are flat. Some models are sitting unsold. Dealers aren’t reporting shortages. Premiums are modest.</p>
              <p className="text-lg text-white/80 mb-4">At first glance, that might seem bearish. But it may actually be the opposite. The truth is, the profits this cycle haven’t spread very far yet. Most of the recent memecoin rallies created only a few hundred millionaires. That’s not enough to move a market built on broad speculative excess.</p>
              <p className="text-lg text-white/80 mb-4">You can see hints of the pattern returning. More Rolex pics on CT. More mentions. But nothing close to 2021. Not yet. It’s also worth remembering that last time, watches didn’t move until late in the cycle. Not on Bitcoin’s first peak, but after the second – when everyone felt rich. When everyone wanted to feel seen.</p>
            </CardContent>
          </Card>

          {/* Section: History Never Repeats, but It Rhymes */}
          <Card className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">History Never Repeats, but It Rhymes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/80 mb-4">Over the last few months, something has shifted. Bitcoin and watch prices have started to move together. Not perfectly. But closely enough that the pattern stands out. That didn’t happen last time. In 2021, watches lagged. Crypto ran first. Then NFTs. Only after that came the Rolex spike.</p>
              <p className="text-lg text-white/80 mb-4">This time, watches are moving already? Well, not really... This time, the chart looks different. Watches and Bitcoin started rising at almost the same moment. And since March, they’ve moved almost in sync. But if you zoom out, the picture changes.</p>
            </CardContent>
          </Card>

          {/* Section: The Bigger Picture */}
          <Card className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">The Bigger Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-white/80 mb-4">Bitcoin is near all-time highs. Watches are not. Most models are still well below their 2022 peaks. And outside of Rolex and Patek, the watch market is red. Cartier, Omega, even AP – all down 30–40% below retail.</p>
              <p className="text-lg text-white/80 mb-4">That’s important, because it tells you two things. First, we’re not in the euphoric phase yet. Second, most watches are still a bad investment. They weren’t designed to hold value. They were designed to signal it.</p>
              <p className="text-lg text-white/80 mb-4">The fact that watches are rising again doesn’t mean we’re at the top. But it does mean we’re already a decent part of the cycle in. People don’t start buying symbols until they feel like the hard part is over. That’s usually the middle. Somewhere around 2/3 through the cycle. The wealth is accumulating. The confidence is returning. But the real spending hasn’t started.</p>
              <p className="text-lg text-white/80">When it does, you won’t need a chart to see it. You’ll know.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
