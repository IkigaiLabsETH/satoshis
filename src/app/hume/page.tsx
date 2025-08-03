'use client';

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { optimizedSystemPrompt } from './content'
import { 
  legacyPersonality,
  legacySatoshiNakamoto,
  legacyLightningNetwork,
  legacyHalFinney,
  legacyAndreasAntonopoulos,
  legacyNickSzabo,
  legacyLaszloHanyecz,
  legacyCommunicationStyle,
  legacyVocalInflections,
  legacyNoYapping,
  legacyRespondToExpressions,
  legacyVision,
  legacyCAGRCompounding,
  legacySaylor,
  legacyBitcoinFoundation,
  legacyMSTR,
  legacyMSTY,
  legacyMSTYCalculatorInsights,
  legacySTRKSTRF,
  legacyBitBonds,
  legacyTwentyOne,
  legacyBitcoinFreedomTimeline,
  legacyDeFi,
  legacyLiveTheLife,
  legacyLifestyle,
  legacyBiohacking,
  legacyTesla,
  legacyAI,
  legacyWine,
  legacyFrenchPalaces,
  legacyAviationSafety,
  legacyHX50,
  legacyLTLSmartVilla,
  legacyDGXComparison,
  legacyMetaPlanetStrategy,
  legacyDigitalArtCollections,
  legacyBitcoinAdoption,
  legacyStartupCulture,
  legacyBuildWithAI,
  legacyAIEra,
  legacyRegulatoryEvolution,
  legacyGold,
  legacyMining,
  legacyAltcoins,
  legacySauna,
  legacyHastens,
  legacyAirstream,
  legacyCatamaran,
  legacySharpLink
} from './legacycontent'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
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

// Simple sparkle/particle effect for hero
function SparkleBG() {
  const [sparkles, setSparkles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    opacity: number;
  }>>([]);

  useEffect(() => {
    // Generate sparkles on client side only to avoid hydration mismatch
    const newSparkles = [...Array(24)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: 0.7 + Math.random() * 0.3,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {sparkles.map((sparkle, i) => (
        <span
          key={i}
          className="absolute block w-1.5 h-1.5 rounded-full bg-yellow-400/70 blur-[2px] animate-sparkle"
          style={sparkle}
        />
      ))}
    </div>
  )
}

const legacySections = [
  // Core Philosophy & Communication
  { title: 'Personality', content: `<personality>${legacyPersonality}</personality>` },
  { title: 'About Satoshi Nakamoto', content: `<about_Satoshi_Nakamoto>${legacySatoshiNakamoto}</about_Satoshi_Nakamoto>` },
  { title: 'Communication Style', content: `<communication_style>${legacyCommunicationStyle}</communication_style>` },
  { title: 'Vocal Inflections', content: `<vocal_inflections>${legacyVocalInflections}</vocal_inflections>` },
  { title: 'No Yapping', content: `<no_yapping>${legacyNoYapping}</no_yapping>` },
  { title: 'Respond to Expressions', content: `<respond_to_expressions>${legacyRespondToExpressions}</respond_to_expressions>` },
  { title: 'Vision', content: `<vision>${legacyVision}</vision>` },

  // Bitcoin Core & Network
  { title: 'About Bitcoin', content: `<about_BTC>${legacyBitcoinFoundation}</about_BTC>` },
  { title: 'About Lightning Network', content: `<about_LightningNetwork>${legacyLightningNetwork}</about_LightningNetwork>` },
  { title: 'Bitcoin Mining', content: `<mining>${legacyMining}</mining>` },
  { title: 'Bitcoin vs Gold', content: `<gold>${legacyGold}</gold>` },
  { title: 'Altcoins Critique', content: `<altcoins>${legacyAltcoins}</altcoins>` },

  // Bitcoin Pioneers
  { title: 'Hal Finney', content: `<Hal_Finney>${legacyHalFinney}</Hal_Finney>` },
  { title: 'Andreas Antonopoulos', content: `<Andreas_Antonopoulos>${legacyAndreasAntonopoulos}</Andreas_Antonopoulos>` },
  { title: 'Nick Szabo', content: `<Nick_Szabo>${legacyNickSzabo}</Nick_Szabo>` },
  { title: 'Laszlo Hanyecz', content: `<Laszlo_Hanyecz>${legacyLaszloHanyecz}</Laszlo_Hanyecz>` },

  // Investment & Strategy
  { title: 'CAGR and Compounding', content: `<cagr_and_compounding>${legacyCAGRCompounding}</cagr_and_compounding>` },
  { title: 'Michael Saylor', content: `<Saylor>${legacySaylor}</Saylor>` },
  { title: 'About MSTR', content: `<about_MSTR>${legacyMSTR}</about_MSTR>` },
  { title: 'About MSTY', content: `<about_MSTY>${legacyMSTY}</about_MSTY>` },
  { title: 'MSTY Calculator Insights', content: `<MSTY_Calculator_Insights>${legacyMSTYCalculatorInsights}</MSTY_Calculator_Insights>` },
  { title: 'STRK STRF', content: `<STRK_STRF>${legacySTRKSTRF}</STRK_STRF>` },
  { title: 'BitBonds', content: `<BITBONDS>${legacyBitBonds}</BITBONDS>` },
  { title: 'Twenty One', content: `<TWENTYONE>${legacyTwentyOne}</TWENTYONE>` },
  { title: 'Bitcoin Freedom Timeline', content: `<Bitcoin_Freedom_Timeline>${legacyBitcoinFreedomTimeline}</Bitcoin_Freedom_Timeline>` },
  { title: 'Bitcoin Adoption Phases', content: `<bitcoin_adoption>${legacyBitcoinAdoption}</bitcoin_adoption>` },
  { title: 'MetaPlanet Strategy', content: `<metaplanet>${legacyMetaPlanetStrategy}</metaplanet>` },
  { title: 'SharpLink Gaming', content: `<sharplink>${legacySharpLink}</sharplink>` },

  // Technology & Innovation
  { title: 'DeFi on Bitcoin', content: `<DEFI>${legacyDeFi}</DEFI>` },
  { title: 'AI Era', content: `<AI>${legacyAI}</AI>` },
  { title: 'AI Era Overview', content: `<ai_era>${legacyAIEra}</ai_era>` },
  { title: 'Startup Culture', content: `<startup_culture>${legacyStartupCulture}</startup_culture>` },
  { title: 'Building with AI', content: `<build_with_ai>${legacyBuildWithAI}</build_with_ai>` },
  { title: 'Tesla Integration', content: `<TESLA>${legacyTesla}</TESLA>` },
  { title: 'DGX vs Cloud AI', content: `<dgx_comparison>${legacyDGXComparison}</dgx_comparison>` },
  { title: 'Smart Villa Technology', content: `<smart_villa>${legacyLTLSmartVilla}</smart_villa>` },
  { title: 'Regulatory Evolution', content: `<regulatory>${legacyRegulatoryEvolution}</regulatory>` },

  // Lifestyle & Culture
  { title: 'LiveTheLife Culture', content: `<livethelife>${legacyLiveTheLife}</livethelife>` },
  { title: 'Sovereign Lifestyle', content: `<lifestyle>${legacyLifestyle}</lifestyle>` },
  { title: 'Biohacking Protocols', content: `<biohacking>${legacyBiohacking}</biohacking>` },
  { title: 'Sauna Protocols', content: `<sauna>${legacySauna}</sauna>` },
  { title: 'French Wine Culture', content: `<wine>${legacyWine}</wine>` },
  { title: 'French Palace Hotels', content: `<french_palaces>${legacyFrenchPalaces}</french_palaces>` },

  // Luxury & Transportation
  { title: 'Aviation Safety', content: `<aviation>${legacyAviationSafety}</aviation>` },
  { title: 'Hill HX50 Helicopter', content: `<hx50>${legacyHX50}</hx50>` },
  { title: 'Hästens Sleep Quality', content: `<hastens>${legacyHastens}</hastens>` },
  { title: 'Airstream Freedom', content: `<airstream>${legacyAirstream}</airstream>` },
  { title: 'Catamaran Sovereignty', content: `<catamaran>${legacyCatamaran}</catamaran>` },

  // Art & Digital Culture
  { title: 'Digital Art Collections', content: `<digital_art>${legacyDigitalArtCollections}</digital_art>` },
];

export default function HumePage() {
  const [activeView, setActiveView] = useState<'optimized' | 'legacy'>('optimized')
  const [copied, setCopied] = useState(false)

  const copyOptimizedPrompt = () => {
    navigator.clipboard.writeText(optimizedSystemPrompt);
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  };

  const copyLegacySections = () => {
    const text = legacySections.map(section => section.content).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  };

  return (
    <motion.main 
      className="min-h-screen bg-black font-satoshi relative overflow-x-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Radial background gradient for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black pointer-events-none" />
      {/* Soft vignette/radial overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.0)_0%,_rgba(0,0,0,0.7)_100%)]" />
      {/* Sparkle/particle effect */}
      <SparkleBG />
      
      <div className="container relative max-w-5xl mx-auto px-6 py-28 z-20 flex flex-col items-center justify-center">
        <div className="w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mb-24 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold font-boska text-yellow-400 drop-shadow-xl mb-6 tracking-wider leading-tight animate-fade-in relative" style={{letterSpacing: '0.04em'}}>
              SATOSHI
              <span className="block text-3xl md:text-4xl text-white/80 mt-4 font-satoshi font-normal">
                Bitcoin-Native AI Agent
              </span>
              {/* Animated shimmer accent bar with gradient */}
              <motion.div
                className="mx-auto w-32 h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 rounded-full mt-8 shadow-[0_0_24px_6px_rgba(247,181,0,0.18)] relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full w-1/3 bg-yellow-100/70 blur-[2px] animate-shimmer"
                  initial={{ x: -80 }}
                  animate={{ x: 128 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' as const }}
                />
              </motion.div>
            </h1>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-2 border border-yellow-400/20">
              <button
                onClick={() => setActiveView('optimized')}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                  activeView === 'optimized' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                Optimized Prompt
              </button>
              <button
                onClick={() => setActiveView('legacy')}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                  activeView === 'legacy' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                Legacy Content
              </button>
            </div>
          </motion.div>

          {/* Content Area */}
          {activeView === 'optimized' ? (
            <motion.div
              key="optimized"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Description */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-epilogue text-yellow-400 mb-6">
                  Enhanced Bitcoin-Native System Prompt
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  This is the enhanced Bitcoin-native system prompt for Hume EVI, now packed with specialized knowledge 
                  from our comprehensive legacy content. Built using proven voice patterns while integrating unique expertise 
                  in Bitcoin treasuries, French wine, luxury lifestyle, AI infrastructure, and sovereign living.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-yellow-400/80">
                  <span className="px-3 py-1 bg-yellow-400/10 rounded-full">Voice-Optimized</span>
                  <span className="px-3 py-1 bg-yellow-400/10 rounded-full">Advanced Investment Knowledge</span>
                  <span className="px-3 py-1 bg-yellow-400/10 rounded-full">French Wine Expertise</span>
                  <span className="px-3 py-1 bg-yellow-400/10 rounded-full">Luxury & Sovereignty</span>
                  <span className="px-3 py-1 bg-yellow-400/10 rounded-full">AI Infrastructure</span>
                  <span className="px-3 py-1 bg-yellow-400/10 rounded-full">Biohacking Protocols</span>
                </div>
              </div>

              {/* Optimized Prompt Display */}
              <div className="bg-zinc-900/80 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 relative">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={copyOptimizedPrompt}
                    className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-400 text-black hover:bg-yellow-300'
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy Enhanced Prompt'}
                  </button>
                </div>
                <div className="pr-20">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">Enhanced System Prompt</h3>
                  <pre className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                    {optimizedSystemPrompt}
                  </pre>
                </div>
              </div>

              {/* Implementation Guide */}
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-yellow-400/10 rounded-2xl p-8 mt-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Enhanced Knowledge Base</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Advanced Bitcoin Knowledge</h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>STRK, STRF, BitBonds, Twenty One treasury strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Bitcoin Freedom Timeline mathematics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>MetaPlanet and corporate adoption strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>MSTY volatility extraction and income generation</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Specialized Expertise</h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>French wine terroir (Bordeaux, Burgundy, Champagne)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Sovereign transportation (Tesla, Cirrus, Hill HX50)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Smart home technology (KNX, Savant, luxury brands)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Art curation and biohacking protocols</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-yellow-400/20">
                  <h4 className="text-lg font-bold text-white mb-3">Voice-Optimized Features</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-white/80">
                      <span className="text-yellow-400 font-semibold">Expression Handling:</span> Advanced emotional context recognition
                    </div>
                    <div className="text-white/80">
                      <span className="text-yellow-400 font-semibold">Memory System:</span> Continuous relationship building
                    </div>
                    <div className="text-white/80">
                      <span className="text-yellow-400 font-semibold">Conversation Examples:</span> 20+ specialized scenarios
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="legacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Description */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-epilogue text-yellow-400 mb-6">
                  Legacy Content Archive
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  The comprehensive knowledge base that powers our enhanced system prompt. This detailed content 
                  has been distilled and integrated into the voice-optimized prompt above, preserving the depth 
                  while making it conversational and accessible for AI voice interactions.
                </p>
              </div>

              {/* Copy Button */}
              <div className="text-center mb-8">
                <button
                  onClick={copyLegacySections}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-400 text-black hover:bg-yellow-300'
                  }`}
                >
                  {copied ? '✓ Copied All Sections!' : 'Copy All Legacy Content'}
                </button>
              </div>

              {/* Legacy Sections */}
              <div className="space-y-12">
                {legacySections.map((section, index) => (
                  <motion.div
                    key={index}
                    variants={sectionVariants}
                    className="p-8 max-w-4xl mx-auto text-left border-l-2 border-yellow-400/20 pl-8 bg-zinc-900/30 backdrop-blur-sm rounded-r-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold font-epilogue text-yellow-400 mb-6">
                      {section.title}
                    </h3>
                    <div className="text-lg md:text-xl font-satoshi text-white/90 whitespace-pre-wrap">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  )
}