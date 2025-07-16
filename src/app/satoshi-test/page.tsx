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
    { value: 'crypto_price', label: 'Crypto Price' },
    { value: 'x_sentiment', label: 'X Sentiment' },
    { value: 'market_data', label: 'Market Data' }
  ];

  const exampleQueries = [
    { query: 'Validate this new DeFi protocol', mode: 'validator' },
    { query: 'Analyze MSTR fundamentals', mode: 'analyst' },
    { query: 'Explain Lightning Network simply', mode: 'educator' },
    { query: 'Review this Bitcoin wallet UI design', mode: 'designer' },
    { query: 'Generate interview questions for Michael Saylor', mode: 'interviewer' },
    { query: 'Write a whitepaper on Bitcoin adoption', mode: 'consultant' },
    { query: 'Research Bitcoin energy consumption', mode: 'researcher' },
    { query: 'What is Bitcoin price?', mode: 'crypto_price' },
    { query: 'Analyze Bitcoin sentiment on X', mode: 'x_sentiment' },
    { query: 'Get current market data', mode: 'market_data' }
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
          message,
          mode,
          options: {}
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse(data.content);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: { query: string; mode: string }) => {
    setMessage(example.query);
    setMode(example.mode);
  };

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">
            🧠 Enhanced Satoshi Agent
          </h1>
          <p className="text-gray-300 text-lg">
            Test the multi-modal personality boost features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-[#1c1f26] p-6 rounded-lg border border-yellow-500">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Input</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  {modes.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message here..."
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white h-32 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="w-full bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '🤔 Satoshi is thinking...' : '🚀 Ask Satoshi'}
              </button>
            </form>

            {/* Example Queries */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                Example Queries
              </h3>
              <div className="space-y-2">
                {exampleQueries.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example)}
                    className="block w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="text-yellow-400 font-medium">{example.mode}:</span> {example.query}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Response Section */}
          <div className="bg-[#1c1f26] p-6 rounded-lg border border-yellow-500">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Satoshi&apos;s Response</h2>
            
            {loading && (
              <div className="text-center py-8">
                <div className="animate-pulse text-yellow-500 text-lg">
                  🤔 Satoshi is analyzing...
                </div>
              </div>
            )}

            {response && (
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono">
                  {response}
                </pre>
              </div>
            )}

            {!response && !loading && (
              <div className="text-center py-8 text-gray-500">
                <p>Enter a message and select a mode to test Satoshi&apos;s enhanced capabilities.</p>
              </div>
            )}
          </div>
        </div>

        {/* Capabilities Overview */}
        <div className="mt-8 bg-[#1c1f26] p-6 rounded-lg border border-yellow-500">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Enhanced Capabilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">🔍 Validator</h3>
              <p className="text-sm text-gray-300">Validate crypto projects using Satoshi frameworks</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">📊 Analyst</h3>
              <p className="text-sm text-gray-300">Analyze stocks with Bitcoin-first perspective</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">🎓 Educator</h3>
              <p className="text-sm text-gray-300">Simplify complex concepts with analogies</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">🎨 Designer</h3>
              <p className="text-sm text-gray-300">Provide UX/UI critique with Bitcoin principles</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">🎤 Interviewer</h3>
              <p className="text-sm text-gray-300">Generate insightful interview questions</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">📝 Consultant</h3>
              <p className="text-sm text-gray-300">Write strategic whitepapers</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">🔬 Researcher</h3>
              <p className="text-sm text-gray-300">Conduct academic research</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">💰 Crypto Price</h3>
              <p className="text-sm text-gray-300">Get crypto prices with Satoshi commentary</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2">📱 X Sentiment</h3>
              <p className="text-sm text-gray-300">Analyze X sentiment with Satoshi perspective</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 