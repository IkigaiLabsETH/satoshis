/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// Shimmer effect for text
const shimmer = {
  hidden: { backgroundPosition: '0% 0%' },
  visible: {
    backgroundPosition: '200% 0%',
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'linear' as const as const,
    },
  },
};

// Floating particles component with client-side generation to avoid hydration issues
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    left: string;
    top: string;
    animateY: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles on client side only to avoid hydration mismatch
    const newParticles = [...Array(12)].map(() => ({
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animateY: Math.random() * -150 - 50,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400/30 shadow-[0_0_20px_2px_rgba(234,179,8,0.3)]"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, particle.animateY],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function LightningNetworkPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent z-30"></div>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-4xl mx-auto px-4 pt-16 md:pt-20 relative z-20"
      >
        <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg p-6 mb-6">
          <h1 className="font-boska text-4xl md:text-5xl font-bold text-yellow-400 mb-6 tracking-tight">
            The Graveyard of Crypto Experiments — and the Path Beyond HODL 🪦₿
          </h1>
          
          <p className="font-satoshi text-lg text-gray-200 mb-6">
            Crypto has always been a playground for economic experiments—some brilliant, some bizarre, most destined to die.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-4">
            A few fallen giants from the last cycle:
          </p>

          <ul className="list-disc pl-6 text-gray-200 space-y-2 font-satoshi text-lg mb-6">
            <li>Fractional NFTs / ERC-404 – Liquidity theater, mostly.</li>
            <li>NFT Lending – Cool in theory, but illiquid and clunky.</li>
            <li>Music NFTs – UX friction + cultural mismatch.</li>
            <li>Elastic supply tokens (AMPL) – Still breathing, but no one's listening.</li>
            <li>$YFI-style fair launches – Short-term egalitarianism, long-term ghost towns.</li>
            <li>(3,3) – Reflexivity weaponized, but unsustainable.</li>
            <li>Move-to-Earn – Burnt out as fast as your sneaker's reward curve.</li>
            <li>Two-token models – Too clever by half. $Bera is the final boss.</li>
            <li>Algo-stables – $UST's collapse triggered an entire market PTSD.</li>
            <li>$RAI – Conceptually elegant, practically irrelevant.</li>
            <li>$FEI and PCV – Olympus still keeps the dream alive with POL, but the narrative moved on.</li>
          </ul>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            So what happened?
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            Nothing went wrong. This is the process.<br/>
            Innovation dies to evolve. Each failure gives birth to new primitives and cultural memory.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            Crypto is an arena where experiments get tested in production, with real money. No simulations. No mercy.
            That's what makes it incredible. And brutal.
          </p>

          <div className="border-l-4 border-yellow-400 bg-yellow-900/30 p-4 rounded mb-6">
            <p className="font-satoshi text-lg text-yellow-200">
              But here's the shift you need to make:
            </p>
          </div>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            If you're rational, the majority of your savings should be in Bitcoin.<br/>
            Not ETH. Not altcoins. Certainly not bags that can be printed into oblivion.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            Bitcoin is finite. Everything else isn't.<br/>
            Sell the infinite. Buy the scarce. Hold it long enough, and your purchasing power won't just grow—it will teleport.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            That's not a radical statement anymore. It's just logical.
          </p>

          <div className="border-l-4 border-yellow-400 bg-yellow-900/30 p-4 rounded mb-6">
            <p className="font-satoshi text-lg text-yellow-200">
              But HODLing comes with a subtle curse.
            </p>
          </div>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            When you get fabulously wealthy by sitting on your hands, you risk internalizing a dangerous illusion:<br/>
            That wealth is something that happens to you.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            And that's not satisfying.<br/>
            That's not fulfilling.<br/>
            That's not what you're here for.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            Bitcoin is the best savings technology ever invented.<br/>
            But saving is not the same as creating.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            Wealth is created by helping people at scale.<br/>
            By solving real problems.<br/>
            By putting something valuable out into the world.
          </p>

          <div className="border-l-4 border-yellow-400 bg-yellow-900/30 p-4 rounded mb-6">
            <p className="font-satoshi text-lg text-yellow-200">
              Even if Bitcoin hits $4M, a broke 20-year-old with zero sats can still become wealthy—by building, serving, and creating.
            </p>
          </div>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            That's the secret most Bitcoin maxis forget:<br/>
            Bitcoin is finite.<br/>
            But wealth is not.<br/>
            Abundance isn't zero-sum.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            And here's the kicker: the internet and AI just gave you the ultimate leverage.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            You don't need a storefront on 5th Avenue anymore.<br/>
            You don't need venture capital.<br/>
            You don't even need a team.
          </p>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            You need an idea.<br/>
            You need to help someone.<br/>
            You need to ship.
          </p>

          <div className="border-l-4 border-yellow-400 bg-yellow-900/30 p-4 rounded mb-6">
            <p className="font-satoshi text-lg text-yellow-200">
              The real opportunity is this:
            </p>
          </div>

          <ul className="list-disc pl-6 text-gray-200 space-y-2 font-satoshi text-lg mb-6">
            <li>Use Bitcoin to store the wealth you extract from the system.</li>
            <li>Use your skills and time to generate wealth that Bitcoin can't give you: meaning, growth, purpose.</li>
          </ul>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            The path forward isn't: "HODL and pray."<br/>
            It's: "HODL and build."<br/>
            Build something that helps others.<br/>
            Build something that makes Bitcoin worth spending someday.
          </p>

          <div className="border-l-4 border-yellow-400 bg-yellow-900/30 p-4 rounded mb-6">
            <p className="font-satoshi text-lg text-yellow-200">
              Maybe you read this far because you're meant to do more than just watch number go up.<br/>
              Maybe you're here to launch something.<br/>
              To contribute.<br/>
              To leave your fingerprint on this timeline.
            </p>
          </div>

          <p className="font-satoshi text-lg text-gray-200 mb-6">
            Bitcoin will store your wealth.<br/>
            But only you can create it.
          </p>

          <p className="font-boska text-2xl text-yellow-400 font-bold">
            So go create.
          </p>
        </Card>
      </motion.div>

      {/* Logo section */}
      <div className="flex justify-center pt-20">
        <Image
          src="/kaipulse.svg"
          alt="KaiPulse logo"
          width={128}
          height={128}
          className="w-24 md:w-32 h-auto mb-6 drop-shadow-lg"
          priority
        />
      </div>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center z-30"
      >
        <div className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg mb-10 p-8 md:p-12">
          <h2 className="font-boska text-4xl md:text-5xl font-extrabold text-yellow-400 mb-6 tracking-tight drop-shadow-lg uppercase">
           Why We Build on Lightning
          </h2>
          <p className="font-satoshi text-xl md:text-2xl text-white/90 mb-6 font-medium">
            We are builders. But after years in DeFi, we learned a hard truth: <span className="font-bold text-yellow-300">Smart contracts are brittle, tokens are a casino, and your product&apos;s destiny is hijacked by whales, hype, and market chaos.</span>
          </p>
          <ul className="text-left text-gray-200 mb-6 space-y-3 list-disc pl-8 text-lg font-satoshi">
            <li>
              <span className="font-bold text-yellow-300">Smart contracts:</span> One bug, one exploit, and fortunes vanish. Upgrades are a nightmare. Audits? Expensive, imperfect, and never enough. Legal risks lurk everywhere.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Tokens:</span> When price pumps, you&apos;re a genius. When it dumps, you&apos;re the villain. Value is dictated by whales, market makers, and influencers—not your vision, not your users.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Liquidity:</span> Too much, and your token is a ghost. Too little, and it&apos;s a pump-and-dump. Emissions bleed your treasury dry. The grind is endless, the stress is real.
            </li>
          </ul>
          <div className="bg-yellow-900/40 border-l-4 border-yellow-400 p-5 rounded mb-6">
            <p className="text-yellow-200 font-semibold mb-2 text-lg font-epilogue">Our AHA Moment:</p>
            <p className="text-yellow-100 text-base md:text-lg font-satoshi">
              We brainstormed with Satoshi. We explored Runes, Ordinals, Stacks, and every new way to build on Bitcoin. The revelation? <span className="font-bold">They all inherit the same flaws as EVMs and alt-L1s.</span> The risk, the drama, the distractions—they never go away.
            </p>
          </div>
          <p className="font-satoshi text-xl md:text-2xl text-white/90 mb-4 font-semibold">
            <span className="font-bold text-yellow-400">Lightning is different.</span> No tokens. No smart contract roulette. No market games. Just pure, instant, unstoppable value transfer—built on the most secure, open monetary network in history.
          </p>
          <p className="font-boska text-2xl md:text-3xl font-extrabold text-yellow-400 mt-6 drop-shadow">
            There is no second best.<br />
            <span className="text-white font-bold">If you want to build for the future, you build on LN.</span>
          </p>
        </div>
      </motion.section>
      {/* Animated background gradients */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(234,179,8,0.15), transparent 40%), radial-gradient(circle at 20% 80%, rgba(234,179,8,0.1), transparent 40%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 80% 20%, rgba(234,179,8,0.15), transparent 40%), radial-gradient(circle at 20% 80%, rgba(234,179,8,0.1), transparent 40%)',
            'radial-gradient(circle at 20% 20%, rgba(234,179,8,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(234,179,8,0.1), transparent 40%)',
            'radial-gradient(circle at 80% 20%, rgba(234,179,8,0.15), transparent 40%), radial-gradient(circle at 20% 80%, rgba(234,179,8,0.1), transparent 40%)',
          ],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' as const }}
      />
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10 pointer-events-none z-0"></div>
      {/* Floating particles */}
      <FloatingParticles />
      {/* Hero Section */}
      <div className="relative z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={shimmer}
              className="font-boska text-5xl md:text-7xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)]"
              style={{ backgroundSize: '200% 100%' }}
            >
              Red Pill for Bitcoin Builders
            </motion.h1>
            <p className="font-satoshi text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              The Lightning Network is Bitcoin&apos;s answer to instant, global, censorship-resistant payments—enabling new business models. If you&apos;re a developer, this is your invitation to build on the most secure, open monetary network.
            </p>
            <div className="bg-[#1c1f26] border-2 border-yellow-500 rounded-lg shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] max-w-4xl w-full mx-auto mt-8 overflow-hidden">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/AYAreuNzx58"
                title="Lightning Network Deep Dive"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-2 text-sm text-gray-400 text-center font-satoshi">
              Watch: <a href="https://www.youtube.com/watch?v=AYAreuNzx58" target="_blank" rel="noopener noreferrer" className="underline text-yellow-400">Lightning Network: what is it? why should I care? what can I do with it? Enjoy bitcoin like its 2013</a>
            </p>
          </motion.div>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16 text-white relative z-20">
        {/* Section: Why Build on Bitcoin + Lightning? */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">Why Build on Bitcoin + Lightning?</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">Every Like is Real Value.</span><br/>
                KaiPulse is built on a radical idea: every interaction should matter. With the Lightning Network, every like is a real Bitcoin payment—21 sats, instantly, directly to the creator. This isn&apos;t just digital cash; it&apos;s a revolution in how we support artists, foster genuine connection, and build communities where engagement is meaningful. Lightning&apos;s global, permissionless payments mean anyone, anywhere, can participate and be rewarded.
              </p>
              <p className="font-satoshi text-lg text-yellow-400 font-semibold mt-4">
                No middlemen. No empty metrics. Just pure, programmable value—at the speed of the internet.
              </p>
            </CardContent>
          </Card>
        </motion.section>
        {/* Section: How to Get Started */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">How to Get Started</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">Building with Lightning is Frictionless.</span><br/>
                Our MVP leverages Voltage Cloud to handle the heavy lifting of node management, so you can focus on what matters: creating and building. Whether you&apos;re a developer, a creator, or a curious explorer, you can:
              </p>
              <ol className="list-decimal pl-6 text-gray-200 space-y-2 font-satoshi text-lg">
                <li><span className="font-bold">Dive deep:</span> Explore our <a href="https://docs.lightning.engineering/" className="underline text-yellow-400">Lightning Network Production Guide</a> for everything from node setup to best practices.</li>
                <li><span className="font-bold">Plug and play:</span> Use our modular LightningPaymentWidget to add real Bitcoin payments to your app or content—no complexity required.</li>
                <li><span className="font-bold">Experiment boldly:</span> Try per-action payments—like our signature 21-sat likes—and discover how instant, programmable money unlocks new business models.</li>
                <li><span className="font-bold">Create meaning:</span> Build experiences where every interaction is valuable, every user is empowered, and every sats counts.</li>
              </ol>
            </CardContent>
          </Card>
        </motion.section>
        {/* Section: Voltage - Our Lightning Infrastructure Partner */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.35 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">What is Voltage?</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">Voltage</span> is a leading platform for integrating the Bitcoin Lightning Network into modern applications. It empowers developers and enterprises to send and receive instant Bitcoin payments, manage Lightning wallets, and handle team-based permissions—all with enterprise-grade security and reliability.
              </p>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 font-satoshi text-lg mb-4">
                <li>Spin up and manage Lightning wallets for users or teams</li>
                <li>Send and receive instant, global Bitcoin payments</li>
                <li>Manage team access and permissions with ease</li>
                <li>Test integrations safely in a staging environment</li>
                <li>Access instant credit and settle invoices quickly</li>
              </ul>
              <p className="font-satoshi text-lg text-yellow-400 font-semibold mt-4">
                Voltage handles the heavy lifting of Lightning node management, so you can focus on building great products.
              </p>
              <a href="https://docs.voltageapi.com/" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition font-satoshi">Read the Voltage API Docs</a>
            </CardContent>
          </Card>
        </motion.section>
        {/* Section: Featured Guide */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">Lightning Network Production Guide</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">Your Blueprint for Lightning-Powered Apps.</span><br/>
                Our comprehensive guide is your roadmap to launching apps like KaiPulse, where every microtransaction is seamless and secure. Inside, you&apos;ll learn how to:
              </p>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 font-satoshi text-lg">
                <li>Deploy production-grade Lightning nodes with Voltage Cloud.</li>
                <li>Integrate real-time payments and reward logic into your product.</li>
                <li>Master rate limiting, error monitoring, and robust security.</li>
                <li>Use our open-source LightningPaymentWidget for a frictionless user experience.</li>
                <li>Scale to thousands of microtransactions—while keeping users in full control of their funds.</li>
              </ul>
              <p className="font-satoshi text-lg text-yellow-400 font-semibold mt-4">
                Build with confidence. Build for the future.
              </p>
              <Link href="https://docs.lightning.engineering/" className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition font-satoshi">Read the Full Guide</Link>
            </CardContent>
          </Card>
        </motion.section>
        {/* Section: Red Pill */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">Red Pill: Why Lightning, Why Now?</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">This is More Than Technology—It&apos;s a Movement.</span><br/>
                With KaiPulse, we&apos;re proving that social platforms can be rebuilt on real value. Every like, every reward, every connection—powered by Bitcoin, not speculation. No tokens, no empty promises. Just pure, unstoppable value exchange.
              </p>
              <p className="font-satoshi text-lg text-yellow-400 font-semibold mt-4">
                Join us. Build the future of social engagement—one sats at a time.
              </p>
            </CardContent>
          </Card>
        </motion.section>
        {/* Section: Case Study */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20"
        >
          <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">Case Study: KaiPulse &amp; Lightning Network</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-white/90 mb-2 font-satoshi text-lg">
                <strong>KaiPulse</strong> is a photo-first, curated social app where every like instantly sends Bitcoin to creators over the Lightning Network. It demonstrates how Lightning enables real, programmable value transfer at internet speed.
              </p>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1 font-satoshi text-lg">
                <li><strong>Why Lightning?</strong> Instant, borderless micropayments (21 sats per like) with no middlemen, enabling new business models for creators and fans.</li>
                <li><strong>Why Voltage?</strong> Managed, non-custodial LND nodes with high uptime, easy API integration, and full user control of funds—perfect for scaling real Bitcoin apps.</li>
                <li><strong>Technical Flow:</strong> Each like triggers a Lightning invoice via Voltage; payment is detected in real time and creators are credited instantly. Security, rate limiting, and error handling are built in.</li>
                <li><strong>UX Impact:</strong> Likes have real value, fans earn rewards, and creators get paid instantly—no ads, no algorithms, just pure value exchange.</li>
              </ul>
              <p className="text-gray-400 text-sm font-satoshi">
                Learn more in the <Link href="https://github.com/IkigaiLabsETH/cheeseburger/blob/main/SATS.md" className="underline text-yellow-400">SATS Lightning Network Production Guide</Link>.
              </p>
            </CardContent>
          </Card>
        </motion.section>
        {/* Section: AI Agents & Lightning */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.7 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20"
        >
          <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">AI Agents &amp; Lightning: Powering ElizaOS</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">Where Intelligence Meets Instant Value.</span><br/>
                Imagine a world where every question, every answer, every digital interaction is powered by real Bitcoin—instantly, permissionlessly, and at internet scale. With Lightning, ElizaOS and the next generation of AI agents become truly autonomous: every request is a microtransaction, every response is earned, and every agent can transact with any other—no banks, no borders, no friction.
              </p>
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">Pay to Play, Earn to Serve.</span><br/>
                Instead of giving away intelligence for free, ElizaOS asks for a tiny Lightning payment before responding. If you pay, you get your answer—immediately. If not, you receive a Lightning invoice you can settle at your pace. This model unlocks:
              </p>
              <div className="font-satoshi text-lg text-gray-200 mb-2">
                <span className="font-bold text-yellow-300">Why it Matters:</span><br/>
              </div>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1 font-satoshi text-lg">
                <li>No Friction: Anyone, anywhere, can access intelligence—no signups, no credit cards, just Lightning.</li>
                <li>Global, Open, and Permissionless: The world&apos;s knowledge, unlocked for all.</li>
                <li>Full Ownership: No middlemen, no gatekeepers—just pure, unstoppable value exchange between humans and machines.</li>
              </ul>
              <div className="bg-black/80 border-l-4 border-yellow-400 p-4 rounded mb-2">
                <p className="text-yellow-200 font-semibold mb-1 font-epilogue">The Big Picture:</p>
                <p className="text-yellow-100 font-satoshi">
                  Lightning transforms ElizaOS into a Bitcoin-native AI—instantly paid, globally accessible, and truly sovereign. It&apos;s the foundation for a new market of AI agents, each empowered to earn, spend, and collaborate—without ever touching a bank.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
        {/* Section: Bitcoin Payments - The Quiet Revolution */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.9 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20 mb-24"
        >
          <Card className="bg-[#181a20] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">
                Bitcoin Payments: The Quiet Revolution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="font-satoshi text-lg text-gray-200 mb-4">
                <span className="font-bold text-yellow-300">The narrative that &quot;Bitcoin payments are dead, long live Bitcoin-as-savings&quot; misreads both the data and the arc of monetary history.</span>
              </p>
              <ol className="list-decimal pl-6 text-gray-200 space-y-4 font-satoshi text-lg">
                <li>
                  <span className="font-bold text-yellow-300">Lightning&apos;s growth is silent, not stagnant</span><br/>
                  Public capacity passed 6,000 BTC this cycle, but public nodes show only what&apos;s opted-in for telemetry. Private and TOR channels—used by Cash App, River, Binance, Strike, Bitfinex, Kraken, Lightspark, Breez, Phoenix, Muun and Voltage-backed enterprises—are multiples larger.<br/>
                  Cash App alone routs hundreds of thousands of LN payouts daily (Block Q1-25 report).<br/>
                  Nostr &quot;zaps&quot; move millions of micro-payments per month with no marketing budget.<br/>
                  Podcasting 2.0, Wolt/Bitfinex remittances, Blink in El Salvador, MicroStrategy&apos;s internal payroll pilot—all real, all Lightning.<br/>
                  <span className="text-yellow-400">Adoption isn&apos;t broken; it&apos;s just not measured by web-2 vanity dashboards.</span>
                </li>
                <li>
                  <span className="font-bold text-yellow-300">Strike ≠ Lightning</span><br/>
                  If Strike throttles down, dozens of well-capitalised players fill the gap: Cash App, Lightspark (ex-Meta Novi team), Synota (energy settlements), Fuse (gaming), Kollider (FX rails) and the Voltage / Blockstream infrastructure layer. Lightning&apos;s moat is that anyone can spin a node; losing a single front-end does not kill the protocol.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">Store-of-value first? Correct—and already achieved</span><br/>
                  BTC&apos;s SoV function is what enables a credibly scarce medium of exchange. Satoshi&apos;s design never required either–or. Gold served as SoV for millennia while also clearing small payments (e.g., gold certificates). Lightning is the certificate layer—except settlement finality remains on-chain.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">&quot;People don&apos;t want to spend sats because of taxes&quot;</span><br/>
                  Tax friction is jurisdiction-specific and will atrophy as more countries adopt inflation-indexed or de-minimis VAT thresholds (see Germany&apos;s &lt;600€ rule, Portugal&apos;s capital-gains exemption after one year, El Salvador&apos;s zero-CGT). Meanwhile Lightning&apos;s ideal use case is sub-dollar micro-payments—below the threshold where tax reporting is even triggered.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">&quot;Digital USD for commerce, Bitcoin for savings&quot; ignores permission risk</span><br/>
                  Stablecoins and CBDCs are IOUs—seizable, censorable, inflated by policy. Bitcoin rails let you denominate in dollars inside a BTC channel (e.g., FTX&apos;s Stablesats model, Synonym Slashtags, Ark proposals). Commerce wants price stability, not custodial risk.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">Institutional rails will not rebuild Lightning &quot;in-house&quot;</span><br/>
                  Why reinvent audited, battle-tested, open-source payment infrastructure when you can integrate LND or Core-Lightning under commercial SLAs? Visa&apos;s B2B Connect, PayPal&apos;s BTC/LN send-receive, and Bitfinex&apos;s internal LN treasury prove the cost curve favours plugging into the public network.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">The optionality argument</span><br/>
                  Lightning lets you spend when you choose and never forces you to sell. You can loop BTC collateral into synthetic dollars (e.g., Bitfinex&apos;s USDt-LN, Revolt Runes), close the loop instantly, and stay net-long. Removing the payment rail removes this optionality; Lightning re-injects it—tax compliant or not.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">Macro reality</span><br/>
                  A money that can only be hoarded eventually invites layers that unlock its velocity. That layer is here, live, open-source, and growing. Payments aren&apos;t antithetical to SoV; they&apos;re the monetisation phase that completes it.
                </li>
              </ol>
              <div className="border-l-4 border-yellow-400 bg-yellow-900/30 p-4 rounded mt-6">
                <p className="font-boska text-xl text-yellow-400 font-bold mb-2">Bottom line</p>
                <p className="font-satoshi text-lg text-white">
                  Bitcoin the asset already won.<br/>
                  Bitcoin the network is now scaling via Lightning—quietly, pragmatically, permissionlessly.<br/>
                  The future is not &quot;BTC or USD.&quot; It&apos;s BTC as reserve, Lightning for flow, and fiat bridges that users can exit at will. That is sovereignty in practice—not a concession to legacy rails.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
        <footer className="mt-12 text-center text-gray-500 text-xs font-satoshi">
          Inspired by <a href="https://www.youtube.com/watch?v=AYAreuNzx58" target="_blank" rel="noopener noreferrer" className="underline">this Lightning Network deep dive</a> and the open-source Bitcoin movement.
        </footer>
        {/* Section: Flashback & Reinvention: LTL MAPS, Then and Now */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.8 } } }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20 mb-20"
        >
          <Card className="bg-[#181a20] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="font-boska text-2xl md:text-3xl font-bold text-yellow-400 mb-2 uppercase tracking-tight">Flashback & Reinvention: LTL MAPS, Then and Now</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-epilogue text-xl font-bold text-yellow-300 mb-2 uppercase tracking-tight">A Pioneer&apos;s Journey</h3>
                <p className="font-satoshi text-gray-200 text-lg mb-2">
                  In 2016, we set out to change the way people explored the world. Our first web3 app was a trailblazer: the first to let users buy digital art and experiences with Apple Pay, the first with a FINRA license in the App Store, and the first to use sidechain technology for fast, cheap microtransactions. We believed travel should be personal, private, and rewarding—long before &quot;web3&quot; was a buzzword.
                </p>
                <p className="font-satoshi text-gray-200 text-lg mb-2">
                  <span className="font-bold text-yellow-300">The Problem We Saw</span><br/>
                  Travel discovery was broken. Endless lists, fake reviews, and algorithmic feeds left explorers adrift. LTL MAPS was our answer: a privacy-first, community-owned app where every recommendation came from real friends and trusted travelers, not faceless platforms.
                </p>
                <p className="font-satoshi text-gray-200 text-lg mb-2">
                  <span className="font-bold text-yellow-300">Our Vision</span><br/>
                  LTL MAPS wasn&apos;t just a map—it was a movement. We minted digital art as proof of location, partnered with local artists, and rewarded users for authentic exploration. Geo-mining, NFTs, and a decentralized ethos made every journey a tapestry of discovery, ownership, and connection.
                </p>
              </div>
              <div>
                <h3 className="font-epilogue text-xl font-bold text-yellow-300 mb-2 uppercase tracking-tight">Rethinking LTL MAPS with Lightning Network</h3>
                <p className="font-satoshi text-gray-200 text-lg mb-2">
                  <span className="font-bold text-yellow-300">A New Era: Instant, Global, Bitcoin-Native</span><br/>
                  Today, the Lightning Network lets us take this vision further than ever before:
                </p>
                <ul className="list-disc pl-6 text-gray-200 space-y-2 font-satoshi text-lg mb-4">
                  <li><span className="font-bold">Real Bitcoin, Real Rewards:</span> Every check-in, every proof-of-location, every digital collectible is powered by instant, borderless Bitcoin microtransactions. No sidechains, no tokens, no friction—just sats, sent and received at the speed of experience.</li>
                  <li><span className="font-bold">Proof of Location, Proof of Value:</span> Travelers unlock geolocation-based digital art (NFTs) by physically visiting curated spots. Each unlock is a Lightning payment—verifiable, permissionless, and globally accessible. Your travel history becomes a living, Bitcoin-backed passport.</li>
                  <li><span className="font-bold">Empowering Local Artists & Businesses:</span> Artists and venues receive direct Lightning payments when their locations are visited and their art is collected. No middlemen, no platform fees—just pure value exchange between explorers and creators.</li>
                  <li><span className="font-bold">Gamified Exploration, Real-World Impact:</span> Every adventure is a treasure hunt. Lightning-powered rewards incentivize off-the-beaten-path journeys, while local businesses can offer instant, programmable discounts or perks—paid and settled in real time.</li>
                  <li><span className="font-bold">Privacy by Design, Community at Heart:</span> With Lightning, users retain full control of their data and funds. The app remains community-governed, but now every interaction is secured and settled on the world&apos;s most open monetary network.</li>
                </ul>
                <p className="font-satoshi text-yellow-400 text-lg font-semibold mb-2">The Future: Lightning-Powered Travel</p>
                <p className="font-satoshi text-gray-200 text-lg mb-2">
                  LTL MAPS, reborn on Lightning, is more than a travel app—it&apos;s a global, living network of explorers, artists, and businesses, all connected by the flow of sats.<br/>
                  <span className="block mt-2">No more walled gardens.<br/>No more fake reviews.<br/>No more friction.</span>
                  Just authentic discovery, real rewards, and a digital identity as rich as your adventures.
                </p>
                <p className="font-boska text-2xl text-yellow-400 mt-4">The journey continues. The world awaits. And now, every step is powered by Bitcoin.</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
} 