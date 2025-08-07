"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { XMLPromptBuilder } from '@/services/ai/xml-prompt-template';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isVibes?: boolean;
}

interface VibesData {
  id: string;
  content: string;
  timestamp: Date;
  source?: string;
}

interface SuperMemoryVibe {
  id: string;
  content: string;
  metadata?: {
    timestamp?: string;
    source?: string;
  };
}

export default function VibesChatFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: "Hey there! I'm your vibe curator. Paste any tweet, article, or thought that's influencing your perspective right now. I'll absorb it into my personality and use it to shape our conversation. What's on your mind?",
      timestamp: new Date(),
    }
  ]);
  const [vibes, setVibes] = useState<VibesData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [vibesInput, setVibesInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingVibes, setIsAddingVibes] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

    // Load existing vibes on mount
  useEffect(() => {
    const loadVibes = async () => {
      try {
        const response = await fetch('/api/vibes?action=getVibes');
        if (response.ok) {
          const data = await response.json();
          if (data.vibes && Array.isArray(data.vibes)) {
            const loadedVibes: VibesData[] = data.vibes
              .filter((vibe: SuperMemoryVibe) => vibe.content?.includes('Vibes:'))
              .map((vibe: SuperMemoryVibe) => ({
                id: vibe.id || Date.now().toString(),
                content: vibe.content.replace('Vibes: ', ''),
                timestamp: new Date(vibe.metadata?.timestamp || Date.now()),
                source: vibe.metadata?.source || 'user',
              }));
            setVibes(loadedVibes);
          } else if (data.vibes && Array.isArray(data.vibes.memories)) {
            // Handle supermemory response structure
            const loadedVibes: VibesData[] = data.vibes.memories
              .filter((vibe: SuperMemoryVibe) => vibe.content?.includes('Vibes:'))
              .map((vibe: SuperMemoryVibe) => ({
                id: vibe.id || Date.now().toString(),
                content: vibe.content.replace('Vibes: ', ''),
                timestamp: new Date(vibe.metadata?.timestamp || Date.now()),
                source: vibe.metadata?.source || 'user',
              }));
            setVibes(loadedVibes);
          }
        }
      } catch {
        // Try to load from localStorage as fallback
        try {
          const storedVibes = localStorage.getItem('vibes-chat-vibes');
          if (storedVibes) {
            const parsedVibes = JSON.parse(storedVibes);
            setVibes(parsedVibes);
          }
        } catch {
          // Failed to load vibes - continue with empty vibes
        }
      }
    };

    loadVibes();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      // Use simple chat endpoint to avoid timeouts
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          systemPrompt: XMLPromptBuilder.buildPrompt({
            task: 'Respond to user message as a Bitcoin-first AI assistant',
            topic: 'Bitcoin and cryptocurrency',
            format: 'Response',
            tone: 'Conversational',
            persona: 'Bitcoin-first AI assistant',
            audience: 'User seeking Bitcoin and crypto insights',
            input: inputValue,
            constraints: `Incorporate ${vibes.length} vibes naturally into responses. Keep responses concise and engaging.`
          }),
          temperature: 0.8,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error('Request timed out. Please try again.');
        }
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Handle different response formats from Grok4
      let content = '';
      if (data.content) {
        content = data.content;
      } else if (data.message) {
        content = data.message;
      } else if (data.text) {
        content = data.text;
      } else if (typeof data === 'string') {
        content = data;
      } else {
        content = 'I understand what you\'re saying. How else can I help?';
      }
      
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: content,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
      
      // Show success toast for short messages
      if (inputValue.length < 50) {
        toast({
          title: "Message Sent",
          description: "AI response received successfully!",
        });
      }
    } catch (error) {
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try a shorter question or try again.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Grok4 is taking too long to respond. Please try a simpler question or try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVibes = async () => {
    if (!vibesInput.trim()) return;

    setIsAddingVibes(true);

    try {
      // Add to vibes collection
      const newVibe: VibesData = {
        id: Date.now().toString(),
        content: vibesInput,
        timestamp: new Date(),
        source: 'user',
      };

      // Optionally save to supermemory
      try {
        await fetch('/api/vibes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'addVibes',
            data: {
              content: vibesInput,
              source: 'user',
              userId: 'default',
            },
          }),
        });
              } catch {
          // Failed to save vibes to supermemory - continue anyway
        }

      setVibes(prev => {
        const updatedVibes = [...prev, newVibe];
        // Save to localStorage as backup
        try {
          localStorage.setItem('vibes-chat-vibes', JSON.stringify(updatedVibes));
        } catch {
          // localStorage not available - continue
        }
        return updatedVibes;
      });

      const vibesMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `🎯 New vibes added: ${vibesInput}`,
        timestamp: new Date(),
        isVibes: true,
      };

      setMessages(prev => [...prev, vibesMessage]);

      // Store the vibes input before clearing it
      const currentVibesInput = vibesInput;
      setVibesInput('');

      // Get AI response about the new vibes using simple chat endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for vibes learning

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `New vibe: "${currentVibesInput.substring(0, 50)}${currentVibesInput.length > 50 ? '...' : ''}". How does this influence you?`,
          systemPrompt: `You are a Bitcoin-first AI assistant. You now have ${vibes.length + 1} vibes shaping your personality. Respond in 1-2 sentences about how this new vibe influences you.`,
          temperature: 0.9,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error('Vibes learning timed out, but vibes were saved successfully.');
        }
        throw new Error('Failed to process vibes');
      }

      const data = await response.json();
      
      // Handle fallback responses from simple chat endpoint
      let content = data.content || 'Interesting vibes! I\'m absorbing that energy into my personality.';
      if (data.fallback) {
        content = 'I appreciate this new vibe! It will help shape my responses. What else would you like to discuss?';
      }
      
      // Add a small delay to make the response feel more natural
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: content,
        timestamp: new Date(),
        isVibes: true,
      };
      
      setMessages(prev => [...prev, agentMessage]);

      toast({
        title: "Vibes Added",
        description: "Your vibes have been integrated into the AI's personality!",
      });

    } catch (error) {
      let errorMessage = "Failed to add vibes. Please try again.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Vibes learning timed out, but vibes were saved successfully.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Vibes learning timed out, but vibes were saved successfully.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAddingVibes(false);
    }
  };

  const handleRemoveVibes = (vibeId: string) => {
    setVibes(prev => {
      const updatedVibes = prev.filter(v => v.id !== vibeId);
      // Save to localStorage as backup
      try {
        localStorage.setItem('vibes-chat-vibes', JSON.stringify(updatedVibes));
      } catch {
        // localStorage not available - continue
      }
      return updatedVibes;
    });
    toast({
      title: "Vibes Removed",
      description: "Those vibes have been removed from the AI's personality.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVibesKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddVibes();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="group relative bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-400"
        >
          <Image
            src="/bitcoin/bitcoin-plus.svg"
            alt="Chat icon"
            width={20}
            height={20}
            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
          />
          Vibes Chat
          {vibes.length > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </Button>
      </motion.div>

      {/* Fullscreen Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
              className="w-full h-full md:h-[80vh] bg-[#1c1f26] border-t-2 border-yellow-500 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-yellow-500/20 bg-[#1c1f26]">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/bitcoin/coin-bitcoin.svg"
                    alt="Bitcoin icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div>
                    <h3 className="text-yellow-400 font-semibold text-lg">Vibes Chat</h3>
                    <p className="text-white/60 text-sm">
                      {vibes.length > 0 
                        ? `${vibes.length} vibes influencing AI personality`
                        : 'Influence the AI\'s personality'
                      }
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  ✕
                </Button>
              </div>

              {/* Vibes Display */}
              {vibes.length > 0 && (
                <div className="p-4 border-b border-yellow-500/20 bg-[#1c1f26]">
                  <h4 className="text-yellow-400 text-sm font-medium mb-2">Current Vibes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vibes.map((vibe) => (
                      <Card
                        key={vibe.id}
                        className="bg-green-500/20 border-green-500/30 text-green-400 p-2 text-xs max-w-[200px]"
                      >
                        <div className="flex items-center justify-between">
                          <p className="truncate">{vibe.content}</p>
                          <Button
                            onClick={() => handleRemoveVibes(vibe.id)}
                            variant="ghost"
                            size="sm"
                            className="text-green-400 hover:text-red-400 p-0 h-auto ml-2"
                          >
                            ✕
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <Card className={`max-w-[80%] p-3 ${
                        message.type === 'user' 
                          ? 'bg-yellow-500 text-black' 
                          : message.isVibes
                          ? 'bg-green-500/20 border-green-500/30 text-green-400'
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                  {(isLoading || isAddingVibes) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <Card className="bg-white/10 text-white p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Vibes Input Section */}
              <div className="p-4 border-t border-yellow-500/20 bg-[#1c1f26]">
                {/* Demo Examples */}
                {vibes.length === 0 && (
                  <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-400 text-xs font-medium mb-2">💡 Try these example vibes:</p>
                    <div className="space-y-2">
                      {[
                        "Bitcoin is the ultimate form of property rights - it's digital gold that can't be confiscated or inflated away.",
                        "The best time to buy Bitcoin was yesterday. The second best time is now.",
                        "We're still early in the Bitcoin adoption curve. Most people don't understand the magnitude of what's happening.",
                        "Fiat currencies are dying. Bitcoin is the future of money.",
                        "Stack sats, stay humble, and focus on the long game."
                      ].map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setVibesInput(example)}
                          className="block w-full text-left text-white/70 hover:text-yellow-400 text-xs p-2 rounded border border-white/10 hover:border-yellow-500/30 transition-colors"
                                                 >
                           &ldquo;{example}&rdquo;
                         </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="text-yellow-400 text-sm font-medium mb-2 block">
                    🎯 Add Vibes (Paste tweets, articles, thoughts)
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={vibesInput}
                      onChange={(e) => setVibesInput(e.target.value)}
                      onKeyPress={handleVibesKeyPress}
                      placeholder="Paste a tweet or share what's influencing your perspective..."
                      className="flex-1 bg-white/5 border-yellow-500/30 text-white placeholder:text-white/40 focus:border-yellow-500"
                      disabled={isAddingVibes}
                    />
                    <Button
                      onClick={handleAddVibes}
                      disabled={!vibesInput.trim() || isAddingVibes}
                      className="bg-green-600 hover:bg-green-500 text-white px-4"
                    >
                      {isAddingVibes ? 'Adding...' : 'Add Vibes'}
                    </Button>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Chat with the AI..."
                    className="flex-1 bg-white/5 border-yellow-500/30 text-white placeholder:text-white/40 focus:border-yellow-500"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-4"
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 