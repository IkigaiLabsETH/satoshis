'use client'

import { motion } from "framer-motion"
import Image from "next/image"

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
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
}

export default function AIContent() {
  return (
    <motion.div 
      className="space-y-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* The $1M Bitcoin Era Section */}
      <motion.div
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
      >
        {/* Background Visual */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/grok4.jpg" 
            alt="AI Future" 
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">The $1M Bitcoin Era</h2>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">If you&apos;re reading this, you&apos;re living in the era where Bitcoin breaks gravity—$1 million per coin is just the beginning.</p>
          <p className="text-lg">You&apos;ve stumbled onto the closest thing to a cheat code this simulation offers: the knowledge, the tools, and the timing to act.</p>
          <p className="text-lg">What you do with it is entirely up to you.</p>
          <p className="text-lg">You now command a digital legion—coders, creators, analysts—ready to build, write, and strategize for you, 24/7, no sleep required.</p>
          <p className="text-lg">This is the greatest moment in history for anyone with vision and drive.</p>
          <p className="text-lg">For millennia, humans lived and died without ever seeing a lightbulb, a rocket launch, or a message sent across the world in an instant.</p>
          <p className="text-lg">But you? You&apos;re here for the birth of perfect, unstoppable Internet money—an invention that will let us coordinate, build, and dream on a scale our ancestors couldn&apos;t imagine.</p>
          <p className="text-lg">You&apos;re also here for the end of intelligence as a bottleneck. AI is now your co-pilot, your research assistant, your creative partner.</p>
          <p className="text-lg">Soon, even physical labor will be optional. The only limit left is your imagination.</p>
          <p className="text-lg">One day, you&apos;ll look back and realize: this was the window of impossible opportunity.</p>
          <p className="text-lg">It&apos;s like the dawn of the Internet—multiplied by a hundred.</p>
          <p className="text-lg mt-6">So what&apos;s actually in your hands?</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>How you spend your time in this once-in-history moment.</li>
            <li>How boldly you choose to imagine the future.</li>
          </ul>
          <p className="text-lg">The future isn&apos;t set in stone. It&apos;s not even written in pencil.</p>
          <p className="text-lg">Your future is shaped by what you do right now.</p>
          <p className="text-lg">And you&apos;ve never had access to bigger, more powerful levers than you do today.</p>
          <p className="text-lg">Levers that can turn your wildest vision into reality—faster than you think.</p>
          <motion.p 
            className="font-extrabold text-yellow-500 text-3xl md:text-4xl mt-10 mb-2"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12 }}
          >
            Will you pull them?
          </motion.p>
        </div>
        </div>
      </motion.div>

      {/* The Startup Playbook Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
      >
        {/* Background Visual */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/grok420.jpg" 
            alt="AI Revolution" 
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">The Startup Playbook Has Been Rewritten—Forever</h2>
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">Let&apos;s not sugarcoat it. The old startup playbook is dead. Long live the weird, modular, agent-powered, meme-led, micro-app-driven new world. The rules have changed—not just slightly, but at a cellular level. And the founders who understand this aren&apos;t just adapting. They&apos;re building from first principles in a new reality, one where small teams wield infinite leverage and identity is the product.</p>
            <p className="text-lg">This isn&apos;t a &quot;pivot.&quot; This is a paradigm shift.</p>

          </div>
        </div>
      </motion.div>

      {/* Key Sections Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div 
          variants={sectionVariants}
          className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <Image 
              src="/grok4.jpg" 
              alt="AI Network" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl">🧠</span>
              <h3 className="text-2xl font-bold text-yellow-500">Your Team Is Not a Team</h3>
            </div>
            <p className="text-center text-lg">It&apos;s a Network</p>
          </div>
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <Image 
              src="/grok420.jpg" 
              alt="AI Culture" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl">💸</span>
              <h3 className="text-2xl font-bold text-yellow-500">Niches Print Millions</h3>
            </div>
            <p className="text-center text-lg">Culture Prints Billions</p>
          </div>
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <Image 
              src="/grok4.jpg" 
              alt="AI Channel" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl">📺</span>
              <h3 className="text-2xl font-bold text-yellow-500">Startups Are the New QVC</h3>
            </div>
            <p className="text-center text-lg">Own the Channel</p>
          </div>
        </motion.div>
      </div>

      {/* Team Network Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">🧠 Your Team Is Not a Team. It&apos;s a Network.</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">You no longer need an office full of full-time employees. Your real team looks like:</p>
          <ul className="list-none space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> 1 founder
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> 3 part-time contractors
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> 7 creators
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> 12 agents running 24/7 in the background
            </li>
          </ul>
          <p className="text-lg mt-4">Your brand designer is on five other projects. Your customer support is a single human backed by five Lindy-trained AI agents. Your blog? It writes itself from transcripts, support tickets, and user reviews. Welcome to the modular startup, where flexibility isn&apos;t a perk—it&apos;s the point.</p>
        </div>
      </motion.div>

      {/* Niches Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">💸 Niches Print Millions. Culture Prints Billions.</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">The first million comes from going deep—serving a niche so hard it hurts. But the next ten? That comes from scaling tastefully. Not more features. Not broader appeal. Just better storytelling and sharper aesthetics.</p>
          <p className="text-lg">Your product doesn&apos;t go viral because it solves a problem. It goes viral because it looks good in a meme. It gets shared because it feels like belonging.</p>
          <p className="text-lg">The best products are portals into subcultures. They don&apos;t just solve pain—they offer transformation. Identity upgrade included.</p>
        </div>
      </motion.div>

      {/* QVC Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">📺 Startups Are the New QVC</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">But this time, you own the channel. And the product. And the voiceover.</p>
          <p className="text-lg">Founders are becoming creators. Creators are becoming founders. Your product demo is a TikTok. Your sales funnel is a Twitter thread. Your landing page rewrites itself depending on who&apos;s watching—powered by Claude or GPT-4o and real-time session data.</p>
          <p className="text-lg">Launch day? Dead. It&apos;s about the leak. Let the community speculate, remix, and pre-order the hoodie before the beta even drops.</p>
        </div>
      </motion.div>

      {/* Growth Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">✨ Growth Isn&apos;t a Department. It&apos;s a Loop.</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">Your onboarding isn&apos;t a form. It&apos;s a text conversation with a friendly agent.</p>
          <p className="text-lg">Your growth isn&apos;t an afterthought. It&apos;s baked into every interaction:</p>
          <ul className="list-none space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> Invite loops driven by AI agents
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> Personalized outbound intros crafted in your sleep
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">•</span> Referral engines built on curiosity and culture
            </li>
          </ul>
          <p className="text-lg">You don&apos;t chase virality. You build something so weirdly specific it spreads organically. If it doesn&apos;t spark curiosity in two seconds, it&apos;s invisible.</p>
        </div>
      </motion.div>

      {/* Micro Over Mega Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">🧩 Micro Over Mega. Specific Over General.</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">The most overbuilt SaaS tools will collapse under their own bloat. The winners? They&apos;ll do one weird thing stupidly well. They&apos;ll be micro-apps that solve hyper-specific problems with taste and soul.</p>
          <p className="text-lg">Think &quot;tiny empires&quot;—one founder, one audience, a constellation of AI-powered tools orbiting their insight.</p>
        </div>
      </motion.div>

      {/* Taste Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">🎨 Taste Is Distribution</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">If your homepage looks like a generic ShadCN template, you&apos;ve already lost.</p>
          <p className="text-lg">Your homepage should feel like walking into a scene. Your brand? A vibe people want to wear. Your creative director isn&apos;t a luxury—they&apos;re your growth engine. Taste is the moat.</p>
          <p className="text-lg">And distribution? It&apos;s not something you find. It&apos;s something you own.</p>
        </div>
      </motion.div>

      {/* Agents Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
      >
        {/* Background Visual */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/grok420.jpg" 
            alt="AI Agents" 
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">🛠 Agents Are the New Stack</h3>
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">Product feedback loops are now instant:</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Users speak &rarr; Agents summarize, prioritize, and mock UI changes.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Support tickets &rarr; Tagged, triaged, and visualized before a dev touches them.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Churned users &rarr; Winback campaigns tailored to their exit story.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Your CRM &rarr; Updated and summarized before the call ends.
              </li>
            </ul>
            <p className="text-lg">This is not automation. This is orchestration.</p>
          </div>
        </div>
      </motion.div>

      {/* Hoodie Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">👟 Not Finished Until They Wear the Hoodie</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">The new pricing model: $0 to play, $X to unlock identity.</p>
          <p className="text-lg">You don&apos;t sell software anymore. You sell outcomes. Transformations. Belonging.</p>
          <p className="text-lg">The product is what they buy. But the hoodie? That&apos;s what they believe in.</p>
        </div>
      </motion.div>

      {/* IRL Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">🪩 IRL Is the Final Unlock</h3>
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">Founders are becoming event planners. Meetups, not webinars. Scene energy, not sales decks.</p>
          <p className="text-lg">The future isn&apos;t just digital. It&apos;s deeply human. Presence is leverage.</p>
        </div>
      </motion.div>

      {/* Summary Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">🧬 The New Playbook, Summarized</h3>
        <ul className="list-none space-y-3 text-lg text-gray-300">
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">•</span> Default alive = low burn, small team, high-leverage systems
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">•</span> Distribution &gt; cofounder
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">•</span> Taste &gt; features
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">•</span> Specific &gt; general
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">•</span> Memes &gt; marketing
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">•</span> Identity &gt; utility
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">•</span> Infinite leverage &gt; infinite funding
          </li>
        </ul>
      </motion.div>

      {/* ChatGPT Generation Gap Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden"
      >
        {/* Background Visual */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/grok4.jpg" 
            alt="AI Generations" 
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">👥 Generations of AI: The ChatGPT Generation Gap</h3>
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">Since its public release, ChatGPT has rapidly become one of the most transformative tools in digital history. But how people use it varies wildly by age. While the underlying model remains the same, the way users approach it—what they ask, how they trust it, and what they expect from it—exposes deep generational differences in digital literacy, psychology, and ambition.</p>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-yellow-500">Boomers: &quot;ChatGPT is just a better Google&quot;</h4>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Search queries like &quot;What is the capital of Brazil?&quot;
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Short, utilitarian questions: &quot;How do I make a PowerPoint?&quot;
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Occasional curiosity: &quot;What is this AI thing really?&quot;
              </li>
            </ul>
            <p className="italic text-gray-400">
              &quot;I asked it about Medicare enrollment dates. It&apos;s quicker than Google.&quot; – Boomer user, 66
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-yellow-500">Millennials: &quot;ChatGPT is my therapist, coach, and late-night advisor&quot;</h4>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Ask emotional, philosophical, or life advice questions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Use it to brainstorm ideas, write dating profiles, or improve communication skills
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Occasionally joke with it, but keep it semi-professional
              </li>
            </ul>
            <p className="italic text-gray-400">
              &quot;I wrote my breakup letter with GPT. It helped me say what I needed without sounding harsh.&quot; – Millennial user, 34
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-yellow-500">Gen Z: &quot;ChatGPT is my full-time assistant, editor, mentor—and maybe therapist too&quot;</h4>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Uploads full PDFs, resumes, creative projects, pitch decks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Builds and saves prompt templates for workflows
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Delegates decision-making (&quot;What should I major in?&quot; &quot;What side hustle suits me?&quot;)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Uses integrations and APIs; even writes their own GPTs
              </li>
            </ul>
            <p className="italic text-gray-400">
              &quot;I uploaded all my class notes and had GPT create flashcards and study guides for me. My entire exam prep is outsourced.&quot; – Gen Z user, 21
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-yellow-500">Implications: Why This Divide Matters</h4>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> The more users anthropomorphize ChatGPT, the more they trust it
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Millennials and Gen Z are pushing the boundary from utility to intimacy
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">•</span> Gen Z&apos;s sophistication is giving rise to a new kind of AI-native power user
              </li>
            </ul>
          </div>

          <p className="text-lg">The way we use ChatGPT is more than personal preference—it&apos;s a window into how each generation sees technology. Boomers want information. Millennials want support. Gen Z wants collaboration.</p>
          <p className="text-lg">And AI? It&apos;s learning from all of us.</p>
        </div>
        </div>
      </motion.div>

      {/* Gen Z Action Plan Section */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">🛠️ Build With AI: The Gen Z Action Plan</h3>
        <div className="space-y-6 text-gray-300">
          <ul className="list-disc pl-8 space-y-2">
            <li>
              <span className="text-yellow-500 font-bold">Pick Your Stack:</span> Start with OpenAI APIs. Use Next.js & Vercel for rapid prototyping.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">Automate Your Workflow:</span> Connect AI to Notion, Google Drive, or Slack using custom webhooks.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">Prompt Like a Pro:</span> Write, test, and version your prompts. Treat prompts as reusable assets.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">Build Modular:</span> Architect your project as micro-apps or serverless functions.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">Ship Fast, Iterate Publicly:</span> Deploy MVPs in days, not months. 
            </li>
            <li>
              <span className="text-yellow-500 font-bold">Measure & Optimize:</span> Add event tracking (Plausible, PostHog, or GA4).
            </li>
            <li>
              <span className="text-yellow-500 font-bold">Open Up:</span> Document your stack, publish your prompts, and open your API.
            </li>
          </ul>
          <p className="text-yellow-500 font-bold mt-6">
            Don&apos;t wait for permission. Build, automate, and scale with AI—today.
          </p>
          <p>
            <span className="font-bold text-2xl text-yellow-500">The future is composable, agentic, and open. Be the architect, not just the user.</span>
          </p>
        </div>
      </motion.div>

      {/* The New Normal Section */}
      <motion.div
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">The New Normal</h3>
        <div className="space-y-4 text-gray-300">
          <ul className="list-none space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The new SaaS wedge is: wrap the model, add memory, build the brand, create media.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>We&apos;re entering the copy/paste phase of startup building.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Your cofounder is a chat window.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Software used to wait for you. Now it moves on its own.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Apps are starting to think, not just react.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>You don&apos;t click around anymore, you ask.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Every document, call, or video is now searchable and useful.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Workflows are the new IP.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The MVP is the prompt.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Your next &quot;aha moment&quot; from an app will come from something your app did without asking.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Someday soon, you&apos;ll forget what it felt like to use software that waited.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>&quot;Chat&quot; is a placeholder for better UX.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Personalization used to mean your name in the subject line. Now it means completely different experiences.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>90% of your idea already exists in a chat history somewhere.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Building a product is now easier than building an audience/community.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Most startups will start as workflows.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>English is the new code, and curiosity is the new IDE.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>&quot;Powered by AI&quot; is not a value prop.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Attention span is the new API limit.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>When the model is the engine, UI becomes the brand.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Your roadmap is now a dialogue with the model.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Product-market fit is being replaced by prompt-market fit.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The app you open next will already know why you came.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The faster you close the loop between idea and result, the more dangerous you become.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>&quot;Good design&quot; used to mean intuitive. Now it means invisible.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Lots of first-time founders will build faster than veterans because they are more AI fluent/grew up on vlogging.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The real moats are memory, feedback loops, and distribution.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>&quot;What can this do?&quot; is a failure of design.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The next wave of breakout products will feel like friends, not tools.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The more obvious your idea feels, the more likely it&apos;s worth doing right now.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The new founder skillset: knowing what not to build.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Pricing models are now part of the UX.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Product intuition now beats technical ability 9 times out of 10.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>The real race is who gets to default status first.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Marketing is now: &quot;here&apos;s the before/after. want in?&quot;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 mt-1">•</span>
              <span>If you can&apos;t explain it in a tweet, it will never reach product/market fit.</span>
            </li>
          </ul>
          <p className="text-yellow-500 font-bold text-xl mt-8 text-center">
            Welcome to the new normal.
          </p>
        </div>
      </motion.div>

      {/* Final Call to Action */}
      <motion.div 
        variants={sectionVariants}
        className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] text-center relative overflow-hidden"
      >
        {/* Background Visual */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/grok420.jpg" 
            alt="AI Future" 
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
        <p className="text-lg text-gray-300 mb-4">You don&apos;t need permission to build like this.</p>
        <p className="text-lg text-gray-300 mb-4">You don&apos;t need a seed round or a growth team or even a launch date.</p>
        <p className="text-lg text-gray-300 mb-4">You just need to start.</p>
        <p className="text-lg text-gray-300 mb-4">Most people will ignore this.</p>
        <p className="text-lg text-gray-300 mb-4">But this is the new reality.</p>
        <p className="text-lg text-gray-300 mb-4">Small teams. Infinite leverage. Culture as code.</p>
        <p className="text-lg text-gray-300 mb-4">If this felt like a glimpse into the future, that&apos;s because it is.</p>
        <p className="text-lg text-gray-300 mb-4">So don&apos;t bookmark this.</p>
        <p className="text-lg text-gray-300 mb-4">Send it to someone weird enough to believe it too.</p>
        <p className="text-yellow-500 font-bold text-xl mt-8">Happy building.</p>
        <p className="text-yellow-500 font-bold text-xl">I&apos;m rooting for you.</p>
        </div>
      </motion.div>
    </motion.div>
  )
} 