'use client'

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

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

export default function TimePage() {
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
      
      <div className="container relative max-w-4xl mx-auto px-6 py-28 z-20 flex flex-col items-center justify-center">
        <div className="w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mb-24 text-left"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold font-boska text-yellow-400 drop-shadow-xl mb-6 tracking-wider leading-tight animate-fade-in relative text-left" style={{letterSpacing: '0.04em'}}>
              TIME IS THE RAREST ASSET: HOW I STOPPED SELLING MINE AND STARTED BUYING IT BACK
              {/* Animated shimmer accent bar with gradient */}
              <motion.div
                className="ml-0 w-28 h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 rounded-full mb-10 shadow-[0_0_24px_6px_rgba(247,181,0,0.18)] relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full w-1/3 bg-yellow-100/70 blur-[2px] animate-shimmer"
                  initial={{ x: -80 }}
                  animate={{ x: 96 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' as const }}
                />
              </motion.div>
            </h1>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            className="mb-24 p-0 max-w-3xl mx-auto text-left border-l-2 border-yellow-400/20 pl-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="space-y-6 text-xl md:text-2xl font-satoshi text-white/90 animate-fade-in">
              <p>In 1999, I sold my most precious asset—my time—for $100 an hour. It felt like winning. Most people I knew were earning far less, locked into daily routines that ate away at their lives. I was young, driven, and building a name. But deep inside, I knew something was off. We measure success by how much we earn, but we should measure it by how much time we own.</p>
              
              <p>Time is the only non-renewable asset. You can lose money and make it back. You can lose a house and rebuild. But when you lose time, it&apos;s gone. No refund, no restart.</p>

              <h2 className="text-2xl md:text-3xl font-bold font-epilogue text-yellow-400 mb-8 animate-fade-in">From Earning to Designing</h2>
              
              <p>That realization hit me early. So I pivoted. I stopped building for others and began designing a lifestyle I wouldn&apos;t need a vacation from. The internet was still young, chaotic, and full of promise. I tapped into it—not for virality, not for clout, but for leverage. I learned to generate money online. Not just to earn, but to detach income from labor. To escape the hourly model entirely. To build systems that paid me while I lived.</p>

              <p>I was no longer selling time—I was buying it back.</p>

              <h2 className="text-2xl md:text-3xl font-bold font-epilogue text-yellow-400 mb-8 animate-fade-in">The First Billion-Dollar Idea</h2>
              
              <p>A few years later, I was ready to launch what would now be called a billion-dollar idea—YouTube avant la lettre. Before the world had the bandwidth for streaming, before VCs were begging for pitch decks, I had the vision, the model, and the courage. I sat down with a billionaire who believed in it too. He had the hardware, the know-how, and the capital. We were aligned. But then he lost the elections—and with them, his appetite for the venture.</p>

              <p>He pivoted. Offered me a high-income job instead.</p>

              <p>I said no. My time was not for sale. I only build if I have skin in the game. The deal died on the spot. But I walked away with my sovereignty intact.</p>

              <h2 className="text-2xl md:text-3xl font-bold font-epilogue text-yellow-400 mb-8 animate-fade-in">A New Continent, a New Chapter</h2>
              
              <p>Fast forward five years. I moved to a new continent, chasing waves and a new chapter. The world&apos;s best point break was my office. And again, the universe sent another billionaire my way. Another chance. Another conversation. Another job offer.</p>

              <p>Again, I said no. Again, I chose time over titles. He respected it. We didn&apos;t build together—but we surfed together. That was the real collaboration. Saltwater, sunrises, and shared values.</p>

              <h2 className="text-2xl md:text-3xl font-bold font-epilogue text-yellow-400 mb-8 animate-fade-in">The Real Flex: Owning Your Time</h2>
              
              <p>The world teaches us to climb ladders. But the real flex isn&apos;t the view from the top—it&apos;s not needing the ladder at all. I live slow and loud. I spend my days surfing, reading, building only what I love, with people who vibe with the mission. I met a woman who loves me for who I am, not what I have. We&apos;re building a life. Not a résumé.</p>

              <p>And I live off less than most people spend on coffee and rent. I don&apos;t chase luxury—I redefine it. Good food, clean water, deep focus, long walks, real presence. That&apos;s the real wealth.</p>

              <h2 className="text-2xl md:text-3xl font-bold font-epilogue text-yellow-400 mb-8 animate-fade-in">Bitcoin: A Time Machine for Value</h2>
              
              <p>And here&apos;s the kicker—while I was buying back my time, I also bought Bitcoin. Not just as an investment, but as a philosophy. Because Bitcoin isn&apos;t just digital gold—it&apos;s frozen time.</p>

              <p>Every satoshi I hold represents the time I didn&apos;t waste chasing paper promises. Every block is an archive of human energy—mined, recorded, immutable. Bitcoin is the antidote to fiat decay, to inflated lives, to the lie that working more means living more.</p>

              <p>Bitcoin stores the value of your time, so you can store your sovereignty.</p>

              <h2 className="text-2xl md:text-3xl font-bold font-epilogue text-yellow-400 mb-8 animate-fade-in">The Takeaway</h2>
              
              <p>So here&apos;s my message to you, if you&apos;re stuck trading your life for income:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Start designing a lifestyle instead of earning a living.</li>
                <li>Buy time, don&apos;t sell it.</li>
                <li>And if you have some money? Don&apos;t save it in a currency built to decay. Save it in time. Save it in Bitcoin.</li>
              </ul>

              <p>Because we don&apos;t get a second life. But if we&apos;re smart about the first one, we only need one.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}
