"use client";

import { useState, useRef, useEffect } from 'react';
import { SATOSHI_EXAMPLE_QUERIES_CATEGORIZED } from '@/app/ask-satoshi/example-queries';
import React from 'react';
import ReactMarkdown from 'react-markdown';

// Persona icon and description map - using backend-expected keys
const personaMeta: Record<string, { icon: string; label: string; desc: string }> = {
  multimodal: { icon: '🤖', label: 'Multi-Modal (Auto-detect)', desc: 'Auto-selects the best expert persona for your query.' },
  Validator: { icon: '🔍', label: 'Validator', desc: 'Validates crypto projects using Satoshi frameworks.' },
  Analyst: { icon: '📊', label: 'Analyst', desc: 'Analyzes stocks and markets with a Bitcoin-first perspective.' },
  Educator: { icon: '🎓', label: 'Educator', desc: 'Explains complex concepts in simple terms.' },
  Designer: { icon: '🎨', label: 'Designer', desc: 'Provides UX/UI critique with Bitcoin principles.' },
  Interviewer: { icon: '🎤', label: 'Interviewer', desc: 'Generates insightful interview questions.' },
  Consultant: { icon: '📝', label: 'Consultant', desc: 'Writes strategic whitepapers and reports.' },
  Researcher: { icon: '🔬', label: 'Researcher', desc: 'Conducts academic research and synthesis.' },
  MarketResearcher: { icon: '📈', label: 'Market Researcher', desc: 'Deep-dives into market trends and outperformance.' },
  IdeaValidator: { icon: '✅', label: 'Idea Validator', desc: 'Critically assesses new crypto or business ideas.' },
  ContentCreator: { icon: '🗞️', label: 'Content Creator', desc: 'Generates Bitcoin-native content.' },
  ViralCreator: { icon: '🚀', label: 'Viral Creator', desc: 'Creates viral content for maximum engagement.' },
  EnhancedViralCreator: { icon: '🚀', label: 'Enhanced Viral Creator', desc: 'Creates platform-specific, human-feeling viral content.' },
  PlatformAdaptation: { icon: '🔄', label: 'Platform Adaptation', desc: 'Adapts content for different platforms.' },
  MultiPlatformStrategy: { icon: '📊', label: 'Multi-Platform Strategy', desc: 'Creates comprehensive content strategies.' },
  StrategicAdvisor: { icon: '🧠', label: 'Strategic Advisor', desc: 'Advises on business, investment, or technical strategy.' },
  VisualExplainer: { icon: '🖼️', label: 'Visual Explainer', desc: 'Creates visual analogies, diagrams, or meme ideas.' },
  UltimateTutor: { icon: '🏆', label: 'Ultimate Tutor', desc: 'Personalized, step-by-step teaching for any level.' },
  SatoshiBot: { icon: '₿', label: 'Satoshi Bot', desc: 'Answers as Satoshi Nakamoto himself.' },
  WealthHacker: { icon: '💰', label: 'Wealth Hacker', desc: 'Cracks hidden wealth codes and income streams.' },
};

// Helper to get a valid persona key that matches backend expectations
function getValidPersonaKey(mode: string): string {
  // Map frontend-friendly keys to backend-expected keys
  const keyMap: Record<string, string> = {
    'crypto_price': 'Analyst',
    'x_sentiment': 'Analyst',
    'market_researcher': 'MarketResearcher',
    'idea_validator': 'IdeaValidator',
    'content_creator': 'ContentCreator',
    'viral_creator': 'ViralCreator',
    'enhanced_viral_creator': 'EnhancedViralCreator',
    'platform_adaptation': 'PlatformAdaptation',
    'multi_platform_strategy': 'MultiPlatformStrategy',
    'strategic_advisor': 'StrategicAdvisor',
    'visual_explainer': 'VisualExplainer',
    'ultimate_tutor': 'UltimateTutor',
  };
  
  return keyMap[mode] || (personaMeta[mode] ? mode : 'multimodal');
}

export default function SatoshiTestPage() {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('multimodal');
  const [response, setResponse] = useState<string>('');
  const [persona, setPersona] = useState<string>('');
  const [autoDetected, setAutoDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const responseRef = useRef<HTMLDivElement>(null);
  const [showPersonaDesc, setShowPersonaDesc] = useState(false);

  // Create modes list with proper mapping
  const modes = [
    { value: 'multimodal', label: 'Multi-Modal (Auto-detect)' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'Validator', label: 'Validator' },
    { value: 'Educator', label: 'Educator' },
    { value: 'Designer', label: 'Designer' },
    { value: 'Interviewer', label: 'Interviewer' },
    { value: 'Consultant', label: 'Consultant' },
    { value: 'Researcher', label: 'Researcher' },
    { value: 'MarketResearcher', label: 'Market Researcher' },
    { value: 'IdeaValidator', label: 'Idea Validator' },
    { value: 'ContentCreator', label: 'Content Creator' },
    { value: 'ViralCreator', label: 'Viral Creator' },
    { value: 'EnhancedViralCreator', label: 'Enhanced Viral Creator' },
    { value: 'PlatformAdaptation', label: 'Platform Adaptation' },
    { value: 'MultiPlatformStrategy', label: 'Multi-Platform Strategy' },
    { value: 'StrategicAdvisor', label: 'Strategic Advisor' },
    { value: 'VisualExplainer', label: 'Visual Explainer' },
    { value: 'UltimateTutor', label: 'Ultimate Tutor' },
    { value: 'SatoshiBot', label: 'Satoshi Bot' },
    { value: 'WealthHacker', label: 'Wealth Hacker' },
  ];

  const categorizedQueries = SATOSHI_EXAMPLE_QUERIES_CATEGORIZED;

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    setResponse('');
    setError('');
    setPersona('');
    setAutoDetected(false);
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout
    
    try {
      const personaKey = getValidPersonaKey(mode);
      const res = await fetch('/api/satoshi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          input: message.trim(), 
          mode: personaKey, 
          options: {}, 
          stream: true 
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        let errorMsg = 'Failed to get response from Satoshi';
        try {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await res.json();
            errorMsg += `: ${errorData.error || res.statusText}`;
          } else {
            const textResponse = await res.text();
            errorMsg += `: ${res.status} ${res.statusText}`;
            if (textResponse.length < 500) {
              errorMsg += ` - ${textResponse}`;
            }
          }
        } catch {
          errorMsg += `: ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }

      // Handle streaming response like grok420
      const reader = res.body?.getReader();
      if (reader) {
        let assistantContent = '';
        setPersona(personaKey);
        setAutoDetected(!mode || mode === 'multimodal' || mode === 'Multi-Modal (Auto-detect)');
        
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = new TextDecoder().decode(value);
            assistantContent += chunk;
            setResponse(assistantContent); // Update with accumulating content
          }
        }
        
        setLoading(false);
        
        // After streaming, try to parse as JSON and extract 'processed' field
        try {
          const parsed = JSON.parse(assistantContent);
          const finalResponse = parsed.processed || parsed.content || parsed.error || assistantContent;
          setResponse(finalResponse);
        } catch {
          // If not JSON, use the raw content
          setResponse(assistantContent);
        }
      } else {
        // Fallback: non-streaming - expect JSON
        try {
          const data = await res.json();
          const finalResponse = data.processed || data.content || data.error || 'No response content received from Satoshi';
          setResponse(finalResponse);
          setPersona(data.persona || personaKey);
          setAutoDetected(!mode || mode === 'multimodal' || mode === 'Multi-Modal (Auto-detect)');
                 } catch {
           // If JSON parsing fails, try as text
           const textResponse = await res.text();
           setResponse(textResponse || 'No response content received from Satoshi');
           setPersona(personaKey);
           setAutoDetected(!mode || mode === 'multimodal' || mode === 'Multi-Modal (Auto-detect)');
         }
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setError('Error: Request timed out. Please try again.');
      } else {
        setError(`Error: ${error instanceof Error ? error.message : 'Failed to connect to Satoshi API'}`);
      }
      setLoading(false);
    } finally {
      clearTimeout(timeout);
    }
  };

  const handleExampleClick = (example: string) => {
    setMessage(example);
  };

  const handleRetry = () => {
    setMode('multimodal');
    setError('');
    setResponse('');
    setPersona('');
    setAutoDetected(false);
  };

  // Helper to render structured output
  function renderStructuredResponse(resp: string, persona: string, autoDetected: boolean): React.ReactNode {
    if (!resp) return <></>;
    const meta = personaMeta[persona] || personaMeta['multimodal'];
    return (
      <div className="relative bg-black/60 border-2 border-yellow-500 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl cursor-pointer" onClick={() => setShowPersonaDesc((v) => !v)} title="About this persona">{meta.icon}</span>
          <span className="font-bold text-yellow-400 text-lg" style={{ fontFamily: 'inherit' }}>{meta.label}</span>
          <span className="ml-2 text-xs text-yellow-300 bg-yellow-500/10 px-2 py-1 rounded">{autoDetected ? 'Auto-detected' : 'Manual'}</span>
          {showPersonaDesc && (
            <span className="ml-4 text-xs text-yellow-200 bg-yellow-500/20 px-2 py-1 rounded shadow-lg absolute top-0 left-40 z-10">{meta.desc}</span>
          )}
        </div>
        <hr className="border-yellow-500/30 mb-4" />
        <div className="prose prose-invert text-white/90 text-sm sm:text-base leading-relaxed">
          <ReactMarkdown>{resp}</ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 sm:p-6 lg:p-8 pt-32 sm:pt-36 lg:pt-40">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Frame 1: Satoshi's Response Frame - Now at top */}
        <div className="w-full">
          <div className="bg-[#1c1f26] backdrop-blur-sm border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
              <span className="mr-2">🧠</span> Satoshi&apos;s Response
            </h2>
            <div className="bg-black/40 border border-yellow-500/20 rounded-lg p-4 min-h-[120px]" ref={responseRef}>
              {loading && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500 mb-4" />
                  <div className="text-yellow-400 text-lg font-bold">Satoshi is thinking...</div>
                </div>
              )}
              {error && (
                <div className="bg-red-900 text-red-200 p-4 rounded mb-4 flex items-center gap-4">
                  <span>{error}</span>
                  <button
                    className="ml-4 px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition-colors"
                    onClick={handleRetry}
                  >
                    Retry
                  </button>
                </div>
              )}
              {!loading && !error && response && renderStructuredResponse(response, persona, autoDetected)}
              {!loading && !error && !response && (
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
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {Object.entries(categorizedQueries).map(([category, queries]) => (
                  <div key={category}>
                    <div className="text-yellow-400 font-semibold text-xs mb-1 mt-2 uppercase tracking-wider">{category}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {queries.map((query, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleExampleClick(query)}
                          className="bg-black/40 border border-yellow-500/20 rounded px-3 py-2 text-xs text-white/80 hover:bg-yellow-500/10 hover:border-yellow-400 transition-colors duration-200 text-left"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 