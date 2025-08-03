'use client';

import { motion } from 'framer-motion';

export default function DocuPage() {
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

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-4 relative">
        <div className="mb-16 relative z-10 text-center">
          <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">
            Our Story
          </p>
          <h1 className="text-center">
            <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
              LiveTheLife.TV
            </span>
          </h1>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-24 bg-yellow-500/30"></div>
            <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">
              We do not predict the future. We summon it.
            </p>
            <div className="h-px w-24 bg-yellow-500/30"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Featured Video Section */}
        <motion.div 
          className="relative mb-16"
          variants={cardVariants}
        >
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/oksraL7wN6Q"
                title="LiveTheLife.TV Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Story Description */}
        <motion.div 
          className="relative"
          variants={cardVariants}
        >
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <div className="relative z-10">
              <p className="text-lg text-white/90 leading-relaxed font-satoshi">
                Since 1999, we&apos;ve been chasing a vision most couldn&apos;t see. Before broadband, before &quot;streaming&quot; was a word, we built LiveTheLife.TV—a platform that wasn&apos;t just a URL but a prophecy. We delivered video quality 10x better than the pixelated mess of RealPlayer, fueled by a billionaire&apos;s dream to revolutionize media and politics. We weren&apos;t building webTV. We were crafting the future of storytelling.
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-satoshi mt-6">
                Then fate intervened. Our backer lost a national election, and with it, his appetite for disruption. The project stalled. The moment faded. Years later, on national TV, he called it his biggest regret: &quot;We could&apos;ve been YouTube before YouTube.&quot;
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-satoshi mt-6">
                Apple saw our spark, featuring us on their homepage as webTV pioneers. But being early is a brutal curse. Our burn rate was savage, our free-to-use model too radical for Europe&apos;s risk-averse capital. When the funding dried up, the dream flickered out.
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-satoshi mt-6">
                But we don&apos;t quit. We pivoted, spotting patterns others missed. In 2004, we pitched a wild idea: strangers renting homes to strangers to pay the mortgage. Palo Alto VCs laughed us out of the room. Years later, they backed Airbnb.
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-satoshi mt-6">
                Then came Bitcoin. We saw the signal in 2013—incorruptible money, math over trust, freedom in code. We bought in at $100, sold at $200 to cover a bill. When it crashed from $1,000, we exhaled. When it hit $20K? Pure agony. But at $3K, we doubled down. Bitcoin wasn&apos;t a trade—it was a revelation.
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-satoshi mt-6">
                It reshaped us: A tool for sovereignty. A rebellion against fiat&apos;s rot. A protocol for liberty.
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-satoshi mt-6">
                LiveTheLife.TV is back—not as a relic, but as a force. We&apos;re not chasing Web3 hype. We&apos;re building for a decentralized, creator-first world, aligned with Bitcoin&apos;s unyielding truth.
              </p>
              <p className="text-lg text-white/90 leading-relaxed font-satoshi mt-6">
                No VCs. No permission. No compromises.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Section */}
      <div className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950/5 to-black"></div>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="text-center">
            <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent mb-6"></div>
            <p className="text-white/40 uppercase tracking-widest text-xs font-light font-satoshi">
              LIVETHELIFE.TV • A JOURNEY TO MONETARY FREEDOM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 