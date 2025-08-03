'use client'

import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
}

export default function FireContent() {
  return (
    <motion.div 
      className="min-h-screen bg-black text-white font-satoshi"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Bitcoin • Freedom • Purpose</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                ₿ Retirement
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">The climb is the point, not the summit</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

          {/* Featured Video Section */}
          <motion.div
            variants={sectionVariants}
            className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-6 [text-shadow:_0_1px_10px_rgba(234,179,8,0.2)]">
              Watch The Manifesto
            </h2>
            <div className="relative h-0 pb-[56.25%] overflow-hidden rounded-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/5VSGeuuqlsY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Main Content Section */}
          <motion.div 
            variants={sectionVariants}
            className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Fiat World Sold You a Dream
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">Work 9–5 for 40 years.</p>
              <p className="text-lg">Buy things you don&apos;t need.</p>
              <p className="text-lg">Then maybe—maybe—retire at 65.</p>
              <p className="text-lg">But by then, your spark&apos;s gone. Your edge dulled. Your art forgotten.</p>
            </div>
          </motion.div>

          {/* Bitcoin Way Section */}
          <motion.div 
            variants={sectionVariants}
            className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Bitcoin Way
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">At LiveTheLife.TV, we&apos;ve exited that simulation.</p>
              <p className="text-lg">Bitcoin taught us that freedom isn&apos;t found at the end—it&apos;s mined daily.</p>
              <p className="text-lg">Through proof-of-work. Through radical ownership. Through living now.</p>
              <p className="text-lg">Ask the fighters who spiraled after the belt.</p>
              <p className="text-lg">Or the founders who sold the company and lost the mission.</p>
              <p className="text-lg">That &quot;goal&quot; they chased? Fiat illusion.</p>
              <p className="text-lg">Because the climb—the purpose—was the only thing real.</p>
            </div>
          </motion.div>

          {/* Block Height Section */}
          <motion.div 
            variants={sectionVariants}
            className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Block Height Rises
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">Bitcoiners know this in their bones.</p>
              <p className="text-lg">The block height rises. The mission continues.</p>
              <p className="text-lg">No off switch. No bailouts. No retirement party.</p>
              <p className="text-lg">Just constant iteration. Signal through noise. Block after block.</p>
              <p className="text-lg">We live like that.</p>
            </div>
          </motion.div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={sectionVariants}
              className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">⛏</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Proof of Work
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Daily Mining of Freedom
              </p>
            </motion.div>
            <motion.div 
              variants={sectionVariants}
              className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🔑</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Radical Ownership
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Keys to Your Future
              </p>
            </motion.div>
            <motion.div 
              variants={sectionVariants}
              className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🎯</span>
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-500">
                  Live Now
                </h3>
              </div>
              <p className="text-center text-lg md:text-xl">
                Purpose Over Retirement
              </p>
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <motion.div 
            variants={sectionVariants}
            className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              The Call to Action
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">Whether it&apos;s shooting film in Cape Town&apos;s golden hour</p>
              <p className="text-lg">or building a Lightning-enabled app from a surf shack in Biarritz,</p>
              <p className="text-lg">we&apos;re not waiting for permission.</p>
              <p className="text-lg">We&apos;re living the life—on purpose, off-grid, on-chain.</p>
              <p className="text-lg">Our AI agents?</p>
              <p className="text-lg">They don&apos;t grow obsolete.</p>
              <p className="text-lg">They evolve. Learn. Meme. Stack cultural blocks like satoshis.</p>
              <p className="text-lg">And so should you.</p>
              <p className="text-lg">Because in this post-fiat world, retirement is a rugpull.</p>
              <p className="text-lg">But purpose? Purpose is antifragile.</p>
              <p className="text-lg">So pick your mountain.</p>
              <p className="text-lg">Maybe it&apos;s code. Maybe it&apos;s a camera.</p>
              <p className="text-lg">Maybe it&apos;s orange-pilling your city.</p>
              <p className="text-lg">Now climb.</p>
              <p className="text-lg">With conviction. With creativity. With curiosity.</p>
              <p className="text-lg">And when you reach the summit?</p>
              <p className="text-lg">You already know:</p>
              <div className="mt-8 p-6 bg-yellow-500/10 rounded-lg">
                <p className="text-2xl font-bold text-yellow-400 text-center">
                  ⛏ Build a weirder one.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 