"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import PriceTicker from '@/components/PriceTicker';
import Modal from '@/components/Modal';
import BullPeakSignals from '@/components/BullPeakSignals';
import MandoMinutes from '@/components/MandoMinutes';
import Mindshare from '@/components/Mindshare';
import Flows from '@/components/Flows';

import Link from 'next/link';

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'bullpeak' | 'mandominutes' | 'mindshare' | 'flows'>('bullpeak');

  const openModal = (type: 'bullpeak' | 'mandominutes' | 'mindshare' | 'flows') => {
    setActiveModal(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[80vh] flex flex-col items-center justify-center pt-10"
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
                href="/platforms/msty/bitcoin"
                className="group inline-flex items-center gap-2 px-6 py-2 border-2 border-yellow-500 bg-black/60 shadow-[0_2px_16px_0_rgba(247,181,0,0.10)] backdrop-blur font-satoshi font-semibold text-yellow-400 text-lg tracking-wide hover:bg-yellow-500 hover:text-black transition-all duration-300"
              >
                <Image
                  src="/bitcoin/coin-bitcoin.svg"
                  alt="Bitcoin logo for Bitcoin-First Strategy button"
                  width={22}
                  height={22}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  priority
                />
                Bitcoin-First Strategy
              </Link>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 tracking-tight font-boska uppercase">
              ₿ different
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              <button
                onClick={() => openModal('bullpeak')}
                className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
              >
                <Image
                  src="/bitcoin/bitcoin-plus.svg"
                  alt="Icon for Bull Market Peak Indicators tool"
                  width={18}
                  height={18}
                  className="w-4 h-4"
                />
                Bull Market Peak Indicators
                <Image
                  src="/bitcoin/bitcoin-plus.svg"
                  alt="Icon for Bull Market Peak Indicators tool"
                  width={18}
                  height={18}
                  className="w-4 h-4"
                />
              </button>
              <button
                onClick={() => openModal('mandominutes')}
                className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-200 ml-4"
              >
                News
                <Image
                  src="/bitcoin/bitcoin-plus.svg"
                  alt="Icon for Mando Minutes market updates"
                  width={18}
                  height={18}
                  className="w-4 h-4"
                />
              </button>
            </p>
          </motion.div>

          <div className="relative z-10 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-[#1c1f26] rounded-lg border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] overflow-hidden max-w-4xl mx-auto"
            >
              <PriceTicker />
            </motion.div>
          </div>

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {activeModal === 'bullpeak' && <BullPeakSignals />}
        {activeModal === 'mandominutes' && <MandoMinutes />}
        {activeModal === 'mindshare' && <Mindshare />}
        {activeModal === 'flows' && <Flows />}
      </Modal>

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Core Strategy section stays the same */}


        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center justify-center py-32"
        >
          {/* Radial background inspired by voice page */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(247,181,0,0.10)_0%,_rgba(0,0,0,0)_80%)] blur-2xl" />
          </div>
          <div className="relative z-10 text-center">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">
              Ask Him Anything • Your AHA Moment
            </p>
            <h2 className="text-5xl sm:text-6xl font-bold text-yellow-400 mb-6 font-boska uppercase tracking-tight">
              Talk to Satoshi
            </h2>
            <div className="flex flex-col items-center justify-center mb-8 space-y-6">
              <div className="flex items-center justify-center">
                <div className="h-px w-16 bg-yellow-500/30"></div>
                <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">
                  &ldquo;If you don&apos;t believe it or don&apos;t get it, I don&apos;t have the time to try to convince you, sorry.&rdquo;
                </p>
                <div className="h-px w-16 bg-yellow-500/30"></div>
              </div>
              <p className="text-center text-white/90 max-w-2xl leading-relaxed font-satoshi">
                Tesla doesn&apos;t sell cars. They sell the future. Red Bull doesn&apos;t sell energy. They sell thrill. Bitcoin doesn&apos;t sell ₿ coin. It sells freedom. Bitcoin-first investing and financial freedom. BTC: store of value. ETH: fintech rails. NFTs: contemporary art world. Don’t overthink it.
              </p>
            </div>
            <Link
              href="/voice"
              className="group inline-flex items-center gap-3 rounded-lg bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] px-8 py-4 text-xl font-semibold text-white hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              <Image
                src="/bitcoin/bitcoin-plus.svg"
                alt="Bitcoin icon for Talk to Satoshi button"
                width={28}
                height={28}
                className="w-7 h-7 group-hover:scale-110 transition-transform"
                priority
              />
              Unlock Insights
            </Link>
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
              This website and its tools are for educational purposes only. Not financial advice. 
              Always do your own research and consult with qualified professionals before making investment decisions. 
              Past performance is not indicative of future results. Investing involves risk of loss.
              
              Warning: Many investors have experienced significant wealth leakage through multiple conversions between Bitcoin and Bitcoin-related equities (MSTR, Metaplanet, etc.) at various mNAV multiples. This pattern of trading often leads to diminished Bitcoin holdings over time. Remember: making a single conversion at an mNAV multiple requires patience until Bitcoin per share catches up. Bitcoin Treasury companies should not be treated as meme coins - exercise extreme caution and maintain long-term perspective. TLDR: stack stats - stay humble.
            </p>
          </div>
        </motion.div>
      </div>
      

    </div>
  );
} 