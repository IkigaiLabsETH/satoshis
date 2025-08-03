'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

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

export default function DGXPage() {
  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">
              AI Infrastructure • On-Premise Computing • Future of AI
            </p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                AI Agents Unleashed
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">
                Why Owning a DGX Spark Beats Cloud APIs in the Coming Decade
              </p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

          {/* Featured Video Section */}
          <motion.section variants={sectionVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-500">Featured Video</h2>
            <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/6p4U1kSiegg"
                  title="NVIDIA DGX Spark: The Future of AI Computing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-yellow-500 mb-2">
                  NVIDIA DGX Spark: The Future of AI Computing
                </h3>
                <p className="text-white/80">
                  Discover how NVIDIA&apos;s DGX Spark is revolutionizing AI development by bringing data-center-grade 
                  capabilities to your desktop. Learn about its powerful architecture and how it enables 
                  next-generation AI applications.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* Strategic Edge Section */}
          <motion.section variants={sectionVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-500">Owning vs Renting Intelligence: The Strategic Edge</h2>
            <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <p className="text-lg text-white/90 mb-6">
                Relying on an AI API is a bit like renting intelligence. It&apos;s quick to start and requires no upfront hardware, 
                but you sacrifice control, incur ongoing costs, and expose yourself to the landlord&apos;s rules.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <h3 className="text-yellow-500 font-semibold">Independence and Control</h3>
                    <p className="text-white/80">With a self-hosted model, you&apos;re not at the mercy of a provider&apos;s changing terms</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <h3 className="text-yellow-500 font-semibold">Data Privacy and Governance</h3>
                    <p className="text-white/80">Keep your data in-house, under your strict governance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <h3 className="text-yellow-500 font-semibold">Differentiation and Customization</h3>
                    <p className="text-white/80">Freedom to fine-tune on your proprietary data</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <h3 className="text-yellow-500 font-semibold">No Hard Limits or Censorship</h3>
                    <p className="text-white/80">Remove usage quotas and content filters</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <div>
                    <h3 className="text-yellow-500 font-semibold">Long-Term Cost Efficiency</h3>
                    <p className="text-white/80">Predictable costs that amortize over time</p>
                  </div>
                </li>
              </ul>
            </Card>
          </motion.section>

          {/* Technical Comparison Section */}
          <motion.section variants={sectionVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-500">Technical Face-off: NVIDIA DGX Spark vs Cloud AI APIs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">DGX Spark (Owned On-Prem)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Large upfront hardware cost, then low incremental cost per use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Ultra-low latency on local network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Limited by hardware capacity, great for steady workloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Total freedom to choose or switch models</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Cloud API (OpenAI/Anthropic)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>No upfront cost, but pay-as-you-go for every call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Adds network latency for each request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Virtually unlimited on-demand scaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Limited to provider&apos;s models</span>
                  </li>
                </ul>
              </Card>
            </div>
          </motion.section>

          {/* New Possibilities Section */}
          <motion.section variants={sectionVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-500">Agents Unchained: New Possibilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Creative Agents & Autonomous Ideation</h3>
                <p className="text-white/80">
                  Enable fluid creative workflows with real-time iteration and feedback loops
                </p>
              </Card>
              <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Real-Time Decisioning</h3>
                <p className="text-white/80">
                  Achieve millisecond-level response times for critical applications
                </p>
              </Card>
              <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Multimodal AI Pipelines</h3>
                <p className="text-white/80">
                  Integrate multiple models for complex, multi-modal AI applications
                </p>
              </Card>
            </div>
          </motion.section>

          {/* Additional Video Section */}
          <motion.section variants={sectionVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-500">The Future of AI Computing</h2>
            <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/X9cHONwKkn4"
                  title="The Future of AI Computing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-yellow-500 mb-2">
                  The Future of AI Computing
                </h3>
                <p className="text-white/80">
                  Explore the cutting-edge developments in AI computing and how they&apos;re shaping the future of technology.
                  Learn about the latest advancements and their implications for businesses and developers.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* Conclusion Section */}
          <motion.section variants={sectionVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-yellow-500">The Next Decade Belongs to the Builders</h2>
            <Card className="p-6 border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <p className="text-lg text-white/90">
                The future belongs to the builders who own their tools. By running your AI agents on infrastructure you control, 
                you&apos;re not just using AI – you&apos;re ushering in a new class of AI, one that will drive breakthroughs and businesses 
                in ways we are only beginning to imagine.
              </p>
            </Card>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
