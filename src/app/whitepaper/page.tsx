'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { FileText, Code, ChevronDown, Download, ExternalLink, Bitcoin } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const shimmer = {
  hidden: { backgroundPosition: '0% 0%' },
  visible: { 
    backgroundPosition: '200% 0%',
    transition: { 
      repeat: Infinity, 
      duration: 3, 
      ease: "linear"
    }
  }
}

const AccordionItem = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      className="border-b border-yellow-500/30"
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? 'rgba(234, 179, 8, 0.08)' : 'transparent',
        boxShadow: isOpen ? '0 4px 20px rgba(234, 179, 8, 0.15)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02, x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span 
          className="text-xl font-medium"
          animate={{ 
            color: isOpen ? '#F7DF1E' : '#FFFFFF'
          }}
        >
          {title}
        </motion.span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring" as const, stiffness: 200 }}
        >
          <ChevronDown className="h-6 w-6 text-yellow-500" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-4 text-white/90"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function WhitepaperPage() {
  const controls = useAnimation()
  
  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'radial-gradient(circle at bottom right, rgba(234,179,8,0.15), transparent 40%), radial-gradient(circle at top left, rgba(234,179,8,0.1), transparent 30%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Improved mobile responsiveness */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" as const, stiffness: 50 }}
          className="text-center py-12 md:py-16 pt-16 md:pt-24"
        >
          <motion.div 
            className="inline-block mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" as const, stiffness: 100 }}
          >
            <motion.div
              animate={{ 
                boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 30px rgba(234, 179, 8, 0.8)', '0 0 0 rgba(234, 179, 8, 0)']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="rounded-full p-3 md:p-4 bg-black/80"
            >
              <Bitcoin className="h-14 w-14 md:h-20 md:w-20 text-yellow-400" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="font-epilogue text-4xl md:text-5xl font-bold tracking-tight lg:text-7xl mb-4"
            style={{ textShadow: '0 0 8px rgba(234, 179, 8, 0.5)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 inline-block"
              initial="hidden"
              animate="visible"
              variants={shimmer}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              Bitcoin Whitepaper
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-3 md:mt-6 text-base md:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Executive Summary of Bitcoin: A Peer-to-Peer Electronic Cash System
          </motion.p>
          
          <motion.p 
            className="mt-2 text-base md:text-lg leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Author: Satoshi Nakamoto | Published: 2008
          </motion.p>
          
          <motion.div
            className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }
              }}
              className="w-full sm:w-auto"
            >
              <Button asChild variant="outline" className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 text-black border-yellow-500 hover:bg-yellow-400 hover:border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <a 
                  href="https://bitcoin.org/bitcoin.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-2"
                >
                  <Download className="h-4 w-4" />
                  Download Whitepaper
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button asChild variant="outline" className="w-full sm:w-auto text-yellow-500 border border-yellow-500/50 bg-black/30 hover:bg-yellow-500/10 backdrop-blur-sm">
                <a 
                  href="https://bitcoin.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Bitcoin.org
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Document Image - Improved for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, type: "spring" as const, stiffness: 50 }}
          className="mt-6 md:mt-16"
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.a 
            href="https://bitcoin.org/bitcoin.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block"
            animate={{ 
              boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse" as const
              }
            }}
          >
            <motion.div 
              className="relative p-3 md:p-5 border-[3px] border-yellow-500 bg-black rounded-sm"
              style={{ 
                boxShadow: '0 0 30px rgba(234, 179, 8, 0.3), 5px 5px 0px 0px rgba(234, 179, 8, 1)',
              }}
              whileHover={{
                boxShadow: '0 0 50px rgba(234, 179, 8, 0.5), 8px 8px 0px 0px rgba(234, 179, 8, 1)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="absolute top-0 left-0 w-full h-full opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(234,179,8,0.2) 0%, transparent 100%)',
                }}
              />
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/90">
                  <motion.div 
                    className="w-full max-w-3xl p-4 md:p-8 bg-black/80 border border-yellow-500/60"
                    style={{ 
                      boxShadow: 'inset 0 0 30px rgba(234, 179, 8, 0.2)'
                    }}
                    whileHover={{
                      boxShadow: 'inset 0 0 40px rgba(234, 179, 8, 0.3)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
                      <div className="text-yellow-400 text-lg md:text-2xl font-bold mb-2 md:mb-0">Bitcoin: A Peer-to-Peer Electronic Cash System</div>
                      <div className="text-white/50 text-sm">October 31, 2008</div>
                    </div>
                    <div className="text-white/80 text-xs md:text-sm mb-4 md:mb-6">
                      Abstract. A purely peer-to-peer version of electronic cash would allow online
                      payments to be sent directly from one party to another without going through a
                      financial institution. Digital signatures provide part of the solution, but the main
                      benefits are lost if a trusted third party is still required to prevent double-spending...
                    </div>
                    <div className="flex justify-end">
                      <div className="text-white/70">Satoshi Nakamoto</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Purpose & Problem */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" as const, stiffness: 50 }}
          className="mt-16"
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <motion.div
            animate={{ 
              boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse" as const
              }
            }}
          >
            <Card className="border-2 border-yellow-400 bg-black/60 backdrop-blur-sm overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-300 to-yellow-500"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              <div className="p-8 relative">
                <h2 className="text-2xl font-bold text-yellow-400" style={{ textShadow: '0 0 8px rgba(234, 179, 8, 0.5)' }}>Purpose & Problem</h2>
                <div className="mt-6 text-white/90">
                  <p className="mb-4">
                    Traditional online payments rely on centralized financial institutions to serve as trusted third parties. This model:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Enables reversals and disputes, increasing costs.</li>
                    <li>Prevents non-reversible micropayments, which limits use cases like digital content or casual transfers.</li>
                    <li>Forces merchants to trust customers, raising privacy and fraud risks.</li>
                  </ul>
                  <p className="mt-4">
                    Satoshi&apos;s solution is a decentralized peer-to-peer payment system that eliminates the need for trust by using cryptographic proof and a consensus mechanism.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Core Innovation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, type: "spring" as const, stiffness: 50 }}
          className="mt-8"
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <motion.div
            animate={{ 
              boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse" as const
              }
            }}
          >
            <Card className="border-2 border-yellow-400 bg-black/60 backdrop-blur-sm overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-yellow-300"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              <div className="p-8 relative">
                <h2 className="text-2xl font-bold text-yellow-400" style={{ textShadow: '0 0 8px rgba(234, 179, 8, 0.5)' }}>Core Innovation: Solving Double Spending Without a Central Authority</h2>
                <div className="mt-6 text-white/80">
                  <p>Bitcoin introduces a system where:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Transactions are publicly broadcasted.</li>
                    <li>A distributed timestamp server orders them using proof-of-work (PoW).</li>
                    <li>All nodes maintain a shared, immutable ledger (blockchain).</li>
                  </ul>
                  <p className="mt-4">
                    By chaining blocks of transactions together with computationally expensive hashing, Bitcoin ensures that the longest chain reflects the majority&apos;s consensus and the most CPU effort.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Key Components Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Key Components */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0, type: "spring" as const, stiffness: 50 }}
            className="h-full"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="h-full"
              initial="hidden"
              animate={{ 
                boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }
              }}
            >
              <Card className="h-full border-2 border-yellow-400 bg-black/60 backdrop-blur-sm overflow-hidden">
                <motion.div 
                  className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-yellow-300 to-yellow-500"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
                <div className="p-8 relative">
                  <h2 className="text-2xl font-bold text-yellow-400" style={{ textShadow: '0 0 8px rgba(234, 179, 8, 0.5)' }}>Key Components</h2>
                  <div className="mt-8 space-y-6">
                    <AccordionItem title="Transactions">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Coins = chain of digital signatures.</li>
                        <li>Each transaction is signed by the current owner and passed to the next.</li>
                        <li>Public verification is possible, but preventing double-spending requires consensus.</li>
                      </ul>
                    </AccordionItem>
                    
                    <AccordionItem title="Timestamp Server">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Timestamps are created by hashing a block of transactions and publishing the hash.</li>
                        <li>Each block includes the hash of the previous block, forming a chain—a secure history.</li>
                      </ul>
                    </AccordionItem>

                    <AccordionItem title="Proof-of-Work (PoW)">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Similar to Hashcash by Adam Back.</li>
                        <li>Nodes (miners) solve a puzzle: find a hash with leading zeros.</li>
                        <li>The difficulty adjusts over time to control block production rate (~10 min).</li>
                        <li>PoW secures the network.</li>
                        <li>Deters manipulation (to change history, you must outwork the entire network).</li>
                        <li>Provides a voting mechanism: 1 CPU = 1 vote.</li>
                      </ul>
                    </AccordionItem>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Network Protocol */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0, type: "spring" as const, stiffness: 50 }}
            className="h-full"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="h-full"
              initial="hidden"
              animate={{ 
                boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }
              }}
            >
              <Card className="h-full border-2 border-yellow-400 bg-black/60 backdrop-blur-sm overflow-hidden">
                <motion.div 
                  className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-yellow-300"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
                <div className="p-8 relative">
                  <h2 className="text-2xl font-bold text-yellow-400" style={{ textShadow: '0 0 8px rgba(234, 179, 8, 0.5)' }}>The Network Protocol</h2>
                  <div className="mt-6 text-white/90">
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Transactions are broadcast to all nodes.</li>
                      <li>Each node groups transactions into a block.</li>
                      <li>They compete to find a valid PoW.</li>
                      <li>Once found, the block is broadcasted and accepted only if:
                        <ul className="list-disc pl-6 mt-2">
                          <li>All transactions are valid.</li>
                          <li>None are double-spent.</li>
                        </ul>
                      </li>
                      <li>Nodes begin mining the next block using the previous block&apos;s hash.</li>
                    </ol>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-medium text-yellow-300">Fork Handling:</h3>
                      <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Temporary forks can occur.</li>
                        <li>Nodes resolve forks by always working on the longest valid chain.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Technical Details Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Incentive Mechanism */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, type: "spring" as const, stiffness: 50 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="h-full"
              initial="hidden"
              animate={{ 
                boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }
              }}
            >
              <Card className="h-full border-2 border-yellow-400 bg-black/60 backdrop-blur-sm relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 border-2 border-yellow-400/30 rounded-[inherit] pointer-events-none"
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.9, 1.05, 0.9]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="p-6 relative">
                  <div className="flex items-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <FileText className="h-8 w-8 text-yellow-400 mr-3" />
                    </motion.div>
                    <h3 className="text-xl font-medium text-yellow-300" style={{ textShadow: '0 0 6px rgba(234, 179, 8, 0.5)' }}>Incentive Mechanism</h3>
                  </div>
                  <div className="text-white/90">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The first transaction in each block creates new coins (the block reward).</li>
                      <li>This rewards miners for contributing CPU resources.</li>
                      <li>Over time, rewards transition to transaction fees, creating a sustainable incentive.</li>
                      <li>This dual system encourages honest behavior (honest mining is more profitable than fraud).</li>
                      <li>Distributes coins without a central authority.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Scalability & Disk Space */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring" as const, stiffness: 50 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="h-full"
              initial="hidden"
              animate={{ 
                boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }
              }}
            >
              <Card className="h-full border-2 border-yellow-400 bg-black/60 backdrop-blur-sm overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-yellow-300"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
                <div className="p-8 relative">
                  <h2 className="text-2xl font-bold text-yellow-400" style={{ textShadow: '0 0 8px rgba(234, 179, 8, 0.5)' }}>Scalability & Disk Space</h2>
                  <div className="mt-6 text-white/90">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Uses Merkle Trees to store transaction hashes efficiently.</li>
                      <li>Old transaction data can be pruned without breaking the chain integrity.</li>
                      <li>Headers alone (80 bytes/block) suffice for SPV (light) clients.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Simplified Payment Verification */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, type: "spring" as const, stiffness: 50 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="h-full"
              initial="hidden"
              animate={{ 
                boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }
              }}
            >
              <Card className="h-full border-2 border-yellow-400 bg-black/60 backdrop-blur-sm relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 border-2 border-yellow-400/30 rounded-[inherit] pointer-events-none"
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.9, 1.05, 0.9]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="p-6 relative">
                  <div className="flex items-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Code className="h-8 w-8 text-yellow-400 mr-3" />
                    </motion.div>
                    <h3 className="text-xl font-medium text-yellow-300" style={{ textShadow: '0 0 6px rgba(234, 179, 8, 0.5)' }}>Simplified Payment Verification</h3>
                  </div>
                  <div className="text-white/90">
                    <p>Lightweight clients can verify payments by:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Storing only block headers.</li>
                      <li>Requesting Merkle paths for specific transactions.</li>
                      <li>Security depends on honest majority.</li>
                      <li>Suitable for casual users; not robust against advanced attacks (e.g., Sybil attacks).</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, type: "spring" as const, stiffness: 50 }}
          className="mt-16"
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <motion.div
            initial="hidden"
            animate={{ 
              boxShadow: ['0 0 0 rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.6)', '0 0 0 rgba(234, 179, 8, 0)']
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse" as const
              }
            }}
          >
            <Card className="border-[3px] border-yellow-400 bg-gradient-to-br from-yellow-500/10 via-black/70 to-yellow-500/10 backdrop-blur-sm overflow-hidden">
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at bottom right, rgba(234,179,8,0.3), transparent 70%)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              <div className="p-8 relative">
                <motion.h2 
                  className="text-3xl font-bold text-yellow-400"
                  style={{ textShadow: '0 0 10px rgba(234, 179, 8, 0.6)' }}
                  animate={{
                    textShadow: ['0 0 10px rgba(234, 179, 8, 0.3)', '0 0 20px rgba(234, 179, 8, 0.7)', '0 0 10px rgba(234, 179, 8, 0.3)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  Conclusion
                </motion.h2>
                <div className="mt-6 text-white/90">
                  <p className="mb-4">
                    Bitcoin is a decentralized, secure, trustless payment network powered by cryptographic proof and economic incentives. By eliminating central authorities, it opens the door to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Frictionless global payments.</li>
                    <li>Censorship-resistant finance.</li>
                    <li>A novel form of digital scarcity.</li>
                  </ul>
                  <p className="mt-4">The system is:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Self-governing via CPU-powered consensus.</li>
                    <li>Robust through simplicity and decentralization.</li>
                    <li>Transparent yet privacy-conscious.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-16 pt-8 border-t border-yellow-500/50 text-center text-white/60"
        >
          <p>The Bitcoin Whitepaper was published by Satoshi Nakamoto on October 31, 2008.</p>
          <motion.p 
            className="mt-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.a 
              href="https://bitcoin.org/bitcoin.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
              style={{ textShadow: '0 0 5px rgba(234, 179, 8, 0.3)' }}
              whileHover={{ textShadow: '0 0 8px rgba(234, 179, 8, 0.6)' }}
            >
              bitcoin.org/bitcoin.pdf
            </motion.a>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
} 