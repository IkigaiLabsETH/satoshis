"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import VibesChatFooter from '@/components/VibesChatFooter';

export default function ChatPageClient() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[40vh] flex flex-col items-center justify-center pt-10"
      >
        <div className="w-full max-w-4xl mx-auto px-4 pt-12 pb-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center space-y-6 text-center"
          >
            <div className="flex items-center justify-center mt-0 mb-8">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-6 py-2 border-2 border-yellow-500 bg-black/60 shadow-[0_2px_16px_0_rgba(247,181,0,0.10)] backdrop-blur font-satoshi font-semibold text-yellow-400 text-lg tracking-wide hover:bg-yellow-500 hover:text-black transition-all duration-300"
              >
                <Image
                  src="/bitcoin/coin-bitcoin.svg"
                  alt="Bitcoin logo for back to home button"
                  width={22}
                  height={22}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  priority
                />
                Back to Home
              </Link>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 tracking-tight font-boska uppercase">
              Talk to Satoshi
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Your Bitcoin-first AI assistant powered by Grok4. Ask complex questions, get detailed insights, and shape the AI's personality with your vibes.
            </p>
          </motion.div>

          {/* Enhanced divider */}
          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-yellow-500/20"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-black px-4">
                <Image
                  src="/bitcoin/coin-bitcoin.svg"
                  alt="Decorative Bitcoin icon"
                  width={28}
                  height={28}
                  className="w-7 h-7 text-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,199,0,0.15),rgba(0,0,0,0))] backdrop-blur-[200px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black pointer-events-none" />
      </motion.div>

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Chat Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center justify-center py-16"
        >
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-8 font-boska uppercase tracking-tight">
              What Can You Ask?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500/30 p-6 hover:border-yellow-500 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/bitcoin/bitcoin-plus.svg"
                    alt="Bitcoin analysis icon"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="text-yellow-400 font-semibold mb-3 text-lg">Complex Analysis</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Ask about Bitcoin halving cycles, market dynamics, technical analysis, and investment strategies with detailed responses.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500/30 p-6 hover:border-yellow-500 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/bitcoin/bitcoin-plus.svg"
                    alt="Personality icon"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="text-yellow-400 font-semibold mb-3 text-lg">Personality Vibes</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Share tweets, thoughts, or vibes to shape the AI's personality and get responses that match your energy and perspective.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500/30 p-6 hover:border-yellow-500 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/bitcoin/bitcoin-plus.svg"
                    alt="Insights icon"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="text-yellow-400 font-semibold mb-3 text-lg">Market Insights</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Get real-time market analysis, price predictions, and insights on Bitcoin, altcoins, and the broader crypto ecosystem.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="bg-transparent p-4">
            <h3 className="text-yellow-400 font-semibold mb-2 text-base">Important Disclaimer</h3>
            <p className="text-white/70 leading-relaxed text-[10px]">
              This AI chat is for educational purposes only. Not financial advice. 
              Always do your own research and consult with qualified professionals before making investment decisions. 
              Past performance is not indicative of future results. Investing involves risk of loss.
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Vibes Chat Footer */}
      <VibesChatFooter />
    </div>
  );
} 