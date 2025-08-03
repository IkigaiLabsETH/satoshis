"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function NavalPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* Hero Section with Subtle Pattern */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: "url('/assets/grid-pattern.svg')",
            backgroundSize: "cover",
            mixBlendMode: "luminosity"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />

        <motion.div 
          className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Premium Accent Line */}
          <div className="flex items-center mb-6">
            <div className="h-[2px] w-12 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <span className="ml-4 text-sm uppercase tracking-widest text-yellow-400 font-epilogue">Knowledge &amp; Wealth</span>
          </div>

          <motion.h1 
            className="text-4xl md:text-7xl font-boska font-bold mb-8 tracking-tight"
            variants={sectionVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              Why Builders Choose Bitcoin:
            </span>
            <br />
            <span className="text-white">A Naval-Inspired Field Guide</span>
          </motion.h1>

          <motion.div 
            className="prose prose-xl prose-invert max-w-none mb-12"
            variants={sectionVariants}
          >
            <p className="text-xl md:text-4xl font-satoshi mb-4 leading-relaxed text-zinc-300">
              The real game is wealth—assets that compound while you sleep and free you to think beyond the next paycheck.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="max-w-5xl mx-auto px-6 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="prose prose-lg prose-invert max-w-none mb-8"
          variants={sectionVariants}
        >
          <p className="text-xl md:text-3xl font-satoshi mb-6 leading-relaxed">
            That insight detonated across the internet in 2018 when entrepreneur-investor Naval Ravikant posted his legendary tweetstorm and later unpacked it in the podcast episode.
          </p>
          
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 my-12">
            <ul className="list-none space-y-6 mb-0 text-xl font-epilogue">
              <li className="flex items-start">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mr-4 mt-1 flex-shrink-0">
                  <span className="text-black font-bold">1</span>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 font-semibold">Seek wealth, not money or status.</span>
              </li>
              <li className="flex items-start">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mr-4 mt-1 flex-shrink-0">
                  <span className="text-black font-bold">2</span>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 font-semibold">Money is how we transfer time and wealth.</span>
              </li>
              <li className="flex items-start">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mr-4 mt-1 flex-shrink-0">
                  <span className="text-black font-bold">3</span>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 font-semibold">Ignore people playing status games.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Video Card with Premium Shadow */}
        <motion.div variants={sectionVariants} className="mb-24 relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur-sm opacity-50"></div>
          <Card className="relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-[0_20px_80px_-20px_rgba(234,179,8,0.3)]">
            <CardContent className="p-0">
              <div className="relative pt-[56.25%] w-full">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/KyfUysrNaco" 
                  title="Naval Ravikant — How to Get Rich (Without Getting Lucky)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Sections with Premium Design */}


        <motion.div variants={sectionVariants} className="mb-20">
          <div className="flex items-center mb-6">
            <div className="h-px w-8 bg-yellow-400 mr-4"></div>
            <h2 className="text-2xl md:text-3xl font-boska font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              Leverage in a Digital Frontier
            </h2>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-8">
            <p className="text-xl font-satoshi leading-relaxed text-zinc-300">
             You won&apos;t find freedom trading hours for dollars. To get truly wealthy, you need equity—own a piece of something that scales.

              Wealth is created by solving problems people don&apos;t yet know they have—at scale.

              So choose a game worth playing for decades. Surround yourself with allies who compound value, not extract it.

              The greatest returns—wealth, wisdom, love—compound over time.

              Build rare, specific knowledge. It will feel like play to you, but look like work to everyone else.

              Code and media are leverage without permission. You can deploy both while you sleep.

              An army of invisible robots is at your disposal—coded, stored, and humming in data centers. Use them.
            </p>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="mb-16">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/3"></div>
            
            <h2 className="text-3xl md:text-4xl font-boska font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              Listen, Then Build
            </h2>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl font-satoshi mb-8 leading-relaxed text-zinc-300">
                This isn&apos;t a blueprint. It&apos;s a compass.

                It explores Naval&apos;s mental models—compounding, infinite games, engineering your own luck.

                Don&apos;t just listen. Absorb the signal. Then write your own script—in code, in sats, in skin.

                Press play. Download the philosophy. Deploy it on-chain.

                Wealth compounds. So does wisdom. So does trust.

                This thread isn&apos;t about getting rich.
                It&apos;s about getting free.
              </p>
              
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
