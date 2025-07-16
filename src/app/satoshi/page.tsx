"use client";

import { useState } from 'react';

export default function SatoshiTestPage() {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('multimodal');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const modes = [
    { value: 'multimodal', label: 'Multi-Modal (Auto-detect)' },
    { value: 'validator', label: 'Validator' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'educator', label: 'Educator' },
    { value: 'designer', label: 'Designer' },
    { value: 'interviewer', label: 'Interviewer' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'market_researcher', label: 'Market Researcher' },
    { value: 'idea_validator', label: 'Idea Validator' },
    { value: 'content_creator', label: 'Content Creator' },
    { value: 'strategic_advisor', label: 'Strategic Advisor' },
    { value: 'visual_explainer', label: 'Visual Explainer' },
    { value: 'ultimate_tutor', label: 'Ultimate Tutor' },
    { value: 'crypto_price', label: 'Crypto Price' },
    { value: 'x_sentiment', label: 'X Sentiment' }
  ];

  const exampleQueries = [
    'gm',
    'Validate this Bitcoin idea: Lightning Network for micropayments',
    'Analyze MicroStrategy\'s Bitcoin treasury strategy',
    'Generate interview questions for Hal Finney',
    'What assets are outperforming Bitcoin today?',
    'Analyze Bitcoin sentiment on X',
    'Explain the trustless nature of Bitcoin',
    'Research the history of digital cash before Bitcoin',
    'Design a Bitcoin-first business model',
    'Consult on Bitcoin adoption in emerging markets',
    'What is the current Bitcoin price and network stats?',
    'Compare Bitcoin to traditional banking systems',
    'Validate this DeFi protocol: AAVE lending mechanics',
    'Analyze Coinbase\'s regulatory challenges',
    'Generate interview questions for Nick Szabo',
    'Research the Cypherpunk movement and Bitcoin origins',
    'Design a Bitcoin Lightning payment system',
    'Consult on Bitcoin mining decentralization',
    'What are the top Bitcoin outperformers this week?',
    'Analyze Bitcoin ETF flows and institutional adoption',
    'Explain Bitcoin\'s proof-of-work security model',
    'Research Bitcoin\'s energy consumption vs traditional banking',
    'Design a Bitcoin-native DAO governance structure',
    'Consult on Bitcoin privacy tools and CoinJoin',
    'What is Bitcoin\'s network hash rate and difficulty?',
    'Compare Bitcoin to Ethereum\'s consensus mechanism',
    'Validate this Bitcoin scaling solution: Layer 2 adoption',
    'Analyze Bitcoin halving cycles and price impact',
    'Generate interview questions for Andreas Antonopoulos',
    'Research Bitcoin\'s monetary policy and 21M supply',
    'Design a Bitcoin cold storage security protocol',
    'Consult on Bitcoin Lightning Network routing optimization',
    'What Bitcoin metrics indicate bullish vs bearish sentiment?',
    'Analyze Bitcoin\'s correlation with traditional markets',
    'Explain Bitcoin\'s UTXO model vs account-based systems',
    'Research Bitcoin\'s adoption in authoritarian regimes',
    'Design a Bitcoin-based identity verification system',
    'Consult on Bitcoin node operation and network health',
    'Conduct market research on Bitcoin mining industry',
    'Validate this startup idea: Bitcoin Lightning payments app',
    'Create a newsletter about Bitcoin adoption trends',
    'Analyze the strategic decision to invest in Bitcoin mining',
    'Generate a visual diagram of Bitcoin\'s network architecture',
    'Conduct comprehensive research on Bitcoin\'s energy debate'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/satoshi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          mode,
          options: {}
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.content || 'No response received');
      } else {
        setResponse('Error: Failed to get response from Satoshi');
      }
    } catch {
      setResponse('Error: Failed to connect to Satoshi API');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setMessage(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 sm:p-6 lg:p-8 pt-32 sm:pt-36 lg:pt-40">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Frame 1: Satoshi's Response Frame - Now at top */}
        <div className="w-full">
          <div className="bg-[#1c1f26] backdrop-blur-sm border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
              <span className="mr-2">🧠</span> Satoshi&apos;s Response
            </h2>
            
            <div className="bg-black/40 border border-yellow-500/20 rounded-lg p-4">
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-pulse text-yellow-500 text-lg mb-4">
                    🤔 Satoshi is analyzing...
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
              
              {!loading && response && (
                <div className="text-white/90 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              )}
              
              {!loading && !response && (
                <div className="text-gray-400 text-center py-8 text-sm sm:text-base">
                  Ask Satoshi anything about Bitcoin, crypto, or technology...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Frame 2: Input Frame */}
        <div className="w-full">
          <div className="bg-[#1c1f26] backdrop-blur-sm border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4 flex items-center">
              <span className="mr-2">📝</span> Ask Satoshi
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
                >
                  {modes.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Satoshi anything..."
                  className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-yellow-400 resize-none"
                  rows={4}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                {loading ? '🤔 Thinking...' : '🚀 Ask Satoshi'}
              </button>
            </form>
            
            <div className="mt-6">
              <h3 className="text-white/80 text-sm font-medium mb-3">Example Queries:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                {exampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(query)}
                    className="bg-black/40 border border-yellow-500/20 rounded px-3 py-2 text-xs text-white/80 hover:bg-yellow-500/10 hover:border-yellow-400 transition-colors duration-200 text-left"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 