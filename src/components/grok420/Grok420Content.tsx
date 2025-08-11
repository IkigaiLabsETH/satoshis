"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Image as ImageIcon, Copy, Info, BarChart3, Brain, ListChecks } from 'lucide-react';
import { useChartMemory, useMarketMemory, useUserMemory, useSupermemory } from './SupermemoryIntegration';
import EquityResearchForm, { EquityResearchReport } from './EquityResearchForm';
import type { EquityResearchData } from './EquityResearchForm';
import MemoryPanel from './MemoryPanel';
import { getBtcAdvisorDecision } from '@/lib/api-client';
import type { DecisionOutput } from '@/services/advisor/btc/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Strict type for live BTC advisor meta to avoid explicit any casts
type LiveMeta = {
  m30Change?: number;
  stChange?: number;
  hrChg?: number;
  txChg?: number;
  price?: number;
  sma200?: number;
  dxySlope?: number;
  realSlope?: number;
  dominanceAdj?: number;
  fngVal?: number;
};

export default function Grok420Content() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_systemPrompt] = useState('You are Grok, an AI assistant for LiveTheLifeTV. Your role is to help users understand Bitcoin-first investing, market analysis, and financial freedom. Be witty, insightful, and creative—channel the spirit of Satoshi Nakamoto. Provide clear, actionable advice, but don\'t be afraid to be a little irreverent or humorous. Always prioritize truth, clarity, and user empowerment.');
  const [_temperature] = useState(0.7);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [_showResetDialog, _setShowResetDialog] = useState(false);
  const [_resetMessage, _setResetMessage] = useState('');
  const [_showImageDialog, _setShowImageDialog] = useState(false);
  const [_imagePrompt, _setImagePrompt] = useState('');
  const [_isImageLoading, _setIsImageLoading] = useState(false);
  
  // Supermemory hooks
  const { handleChartInteraction: _handleChartInteraction } = useChartMemory();
  const { storeAnalysis, getHistory: _getHistory } = useMarketMemory();
  const { storePreferences, getPreferences: _getPreferences } = useUserMemory();
  const { storeOutperformWatchlist, getOutperformWatchlists } = useSupermemory();

  type ImageHistoryItem = {
    id: string;
    url: string;
    prompt: string;
    revisedPrompt?: string;
    size: string;
    moderation: boolean;
    timestamp: Date;
  };
  
  const [_imageHistory, _setImageHistory] = useState<ImageHistoryItem[]>([]);
  const [_lastImagePrompt, _setLastImagePrompt] = useState('');
  const [_isPolling, _setIsPolling] = useState(false);
  const [_showInfoDialog, _setShowInfoDialog] = useState(false);
  const [_copiedMessageId, _setCopiedMessageId] = useState<string | null>(null);
  const [_mainImageIdx] = useState(_imageHistory.length - 1);
  const [_showImagePreview, _setShowImagePreview] = useState(false);
  const [_lastUserMessage, _setLastUserMessage] = useState<string | null>(null);
  const [_timeoutError, _setTimeoutError] = useState<string | null>(null);
  const [isGodmode, _setIsGodmode] = useState(false); // GODMODE disabled - always false
  const [showEquityResearch, setShowEquityResearch] = useState(false);
  const [equityResearchData, setEquityResearchData] = useState<EquityResearchData | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [baseAsset, setBaseAsset] = useState<'BTC' | 'ETH'>('BTC');
  const [horizon, setHorizon] = useState<'1-3 months' | '3-6 months' | '1-4 weeks'>('1-3 months');
  const [timeoutMs, setTimeoutMs] = useState<number>(15000);
  const [useCachedFallback, setUseCachedFallback] = useState<boolean>(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Restore persisted chat
  useEffect(() => {
    try {
      const raw = localStorage.getItem('grok420:messages');
      if (raw && messages.length === 0) {
        const parsed = JSON.parse(raw) as Array<Omit<Message, 'timestamp'> & { timestamp: string }>;
        const restored: Message[] = parsed.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        if (restored.length > 0) setMessages(restored);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist chat on change
  useEffect(() => {
    try {
      localStorage.setItem(
        'grok420:messages',
        JSON.stringify(messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })))
      );
    } catch {}
  }, [messages]);

  const handleAutoAnalysis = async () => {
    setIsLoading(true);
    
    try {
      // Fetch MSTR vs BTC analysis
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch('/api/grok4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Analyze MSTR vs BTC performance, fundamentals, and investment thesis. Focus on why MSTR is the ultimate Bitcoin proxy stock and how it compares to direct BTC investment.',
          systemPrompt: 'You are a Bitcoin-first investment analyst. Focus on MSTR as the premier Bitcoin proxy stock. Compare MSTR vs BTC performance, fundamentals, and investment strategy. Be bullish on Bitcoin and MSTR.',
          temperature: 0.7,
          stream: false,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }

      const analysisContent = await response.text();
      
      const analysisMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: analysisContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, analysisMessage]);
      
      // Store this analysis in Supermemory
      try {
        await storeAnalysis({
          type: 'market_analysis',
          symbol: 'MSTR-BTC',
          timeframe: 'comparison',
          analysis: {
            prediction: analysisContent,
            confidence: 0.8,
            indicators: ['MSTR', 'BTC'],
            reasoning: 'MSTR vs BTC comparison analysis'
          }
        });
      } catch {
        // Failed to store analysis
      }
      
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ **Analysis Error**
        
I couldn't fetch the latest MSTR vs BTC analysis right now. But here's what you need to know:

**MSTR (MicroStrategy) - The Bitcoin Proxy King:**
• **Bitcoin Holdings:** 214,400+ BTC (~$13.5B)
• **Strategy:** Convert all cash to Bitcoin
• **Performance:** Often outperforms BTC due to leverage
• **Risk:** Higher volatility than direct BTC

**Why MSTR vs BTC:**
- MSTR gives you Bitcoin exposure in traditional markets
- They're the purest Bitcoin play available
- Michael Saylor's strategy is legendary

Try asking me about MSTR again or use the Research button above for detailed equity analysis!`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const _handleEliteAnalysis = async (ticker: string) => {
    setIsLoading(true);
    
    try {
      // Use the elite equity research framework
      const elitePrompt = `Act as an elite equity research analyst at a top-tier investment fund.

Your task is to analyze ${ticker} using both fundamental and macroeconomic perspectives. Structure your response according to the framework below.

Input Section:
Stock Ticker / Company Name: ${ticker}
Investment Thesis: Analyze ${ticker} as a high-growth technology company with strong market positioning
Goal: Provide comprehensive investment analysis with clear buy/hold/sell recommendation

Instructions:
Use the following structure to deliver a clear, well-reasoned equity research report:

1. Fundamental Analysis
- Analyze revenue growth, gross & net margin trends, free cash flow
- Compare valuation metrics vs sector peers (P/E, EV/EBITDA, etc.)
- Review insider ownership and recent insider trades

2. Thesis Validation
- Present 3 arguments supporting the thesis
- Highlight 2 counter-arguments or key risks
- Provide a final **verdict**: Bullish / Bearish / Neutral with justification

3. Sector & Macro View
- Give a short sector overview
- Outline relevant macroeconomic trends
- Explain company's competitive positioning

4. Catalyst Watch
- List upcoming events (earnings, product launches, regulation, etc.)
- Identify both **short-term** and **long-term** catalysts

5. Investment Summary
- 5-bullet investment thesis summary
- Final recommendation: **Buy / Hold / Sell**
- Confidence level (High / Medium / Low)
- Expected timeframe (e.g. 6–12 months)

Formatting Requirements:
- Use **markdown**
- Use **bullet points** where appropriate
- Be **concise, professional, and insight-driven**
- Do **not** explain your process just deliver the analysis

Use all available Finnhub data including financial statements, technical indicators, social sentiment, institutional ownership, and regulatory data to provide the most comprehensive analysis possible.`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch('/api/grok4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Generate elite equity research analysis for ${ticker} using comprehensive Finnhub data and the professional framework provided.`,
          systemPrompt: elitePrompt,
          temperature: 0.7,
          stream: false,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch elite analysis');
      }

      const analysisContent = await response.text();
      
      const analysisMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: analysisContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, analysisMessage]);
      
      // Store this analysis in Supermemory
      try {
        await storeAnalysis({
          type: 'market_analysis',
          symbol: ticker,
          timeframe: 'elite_research',
          analysis: {
            prediction: analysisContent,
            confidence: 0.9,
            indicators: [ticker],
            reasoning: `Elite equity research analysis for ${ticker}`
          }
        });
      } catch {
        // Failed to store analysis
      }
      
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ **Elite Analysis Error**
        
I couldn't generate the elite equity research analysis for ${ticker} right now. 

**What Elite Analysis Includes:**
• **Fundamental Analysis** - Revenue, margins, FCF, valuation metrics
• **Thesis Validation** - Supporting/counter arguments with verdict
• **Sector & Macro View** - Industry trends and competitive positioning
• **Catalyst Watch** - Short-term and long-term catalysts
• **Investment Summary** - Buy/Hold/Sell with confidence level

**Try Again:**
- Click the ${ticker} button again
- Use the "Elite Research" panel for detailed analysis
- Ask me directly: "Analyze ${ticker} with elite framework"`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-initialize with MSTR vs BTC analysis
  useEffect(() => {
    if (!hasInitialized && messages.length === 0) {
      setHasInitialized(true);
      
      // Auto-generate MSTR vs BTC analysis
      const autoMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `🚀 **Welcome to GROK420 - Your Bitcoin-First Investment Intelligence**

I'm automatically analyzing **MSTR (MicroStrategy) vs BTC** for you - the ultimate Bitcoin proxy stock that's been crushing it.

**📊 Quick MSTR vs BTC Check:**
• MSTR is the OG Bitcoin company - they've been buying BTC since 2020
• They hold over 214,000 BTC worth ~$13.5B
• Their strategy: Convert all cash to Bitcoin
• Performance: MSTR often outperforms BTC due to leverage effect

**🎯 Why MSTR vs BTC matters:**
- MSTR gives you Bitcoin exposure with stock market benefits
- They're the purest Bitcoin play in traditional markets
- Their Bitcoin strategy is legendary - "Buy Bitcoin, hold Bitcoin"

Let me fetch the latest data and give you a comprehensive MSTR vs BTC analysis...`,
        timestamp: new Date(),
      };
      
      setMessages([autoMessage]);
      
      // Auto-trigger MSTR analysis
      setTimeout(() => {
        handleAutoAnalysis();
      }, 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInitialized, messages.length]);

  const handleSubmit = async (e?: React.FormEvent, retryMessage?: string) => {
    if (e) e.preventDefault();
    const messageToSend = retryMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    _setIsPolling(false);
    _setLastUserMessage(messageToSend);
    _setTimeoutError(null);

    // Store user interaction in Supermemory
    try {
      await storePreferences('default-user', {
        timeframes: ['24h', '7d', 'YTD'],
        favoriteAssets: ['BTC', 'ETH'],
        alertSettings: {},
        analysisStyle: 'technical',
        lastQuery: messageToSend,
        timestamp: new Date().toISOString()
      });
    } catch {
      // Failed to store user preference
    }

    try {
      // Streaming support
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch('/api/grok4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          systemPrompt: _systemPrompt,
          temperature: _temperature,
          stream: !isGodmode, // Disable streaming for GODMODE
          ...(isGodmode && {
            mode: 'godmode'
          }),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMsg = 'Failed to get response from Grok4';
        let errorDetails = '';
        
        try {
          // Check if response is JSON (for backward compatibility)
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            if (errorData.details) {
              errorDetails += `\n${errorData.details}`;
            }
            if (errorData.error) {
              errorDetails += `\n${errorData.error}`;
            }
            errorMsg += errorDetails;
          } else {
            // Handle plain text responses (new format)
            const textResponse = await response.text();
            errorMsg += `\nServer returned: ${response.status} ${response.statusText}`;
            if (textResponse.length < 500) { // Only show short responses
              errorMsg += `\nResponse: ${textResponse}`;
            }
          }
        } catch (parseError) {
          errorMsg += `\nFailed to parse error response: ${parseError}`;
        }
        
        throw new Error(errorMsg);
      }

      // Handle GODMODE responses (JSON format)
      if (isGodmode) {
        try {
          const data = await response.json();
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.content || data.error || 'GODMODE response failed.',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMessage]);
        } catch (parseError) {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `GODMODE.EXE CRASHED - Failed to parse response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      } else {
        // Stream the response for normal mode
        const reader = response.body?.getReader();
        if (reader) {
          let assistantContent = '';
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMessage]);
          let done = false;
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
              const chunk = new TextDecoder().decode(value);
              assistantContent += chunk;
              
              // Update the message with the accumulated content
              setMessages(prev => prev.map(m =>
                m.id === assistantMessage.id ? { ...m, content: assistantContent } : m
              ));
            }
          }
          
          // After streaming, check for empty content
          if (!assistantContent.trim()) {
            setMessages(prev => prev.map(m =>
              m.id === assistantMessage.id ? { ...m, content: 'No response from Grok4. Please try again.' } : m
            ));
          }

          // Store analysis in Supermemory if it contains market analysis
          if (assistantContent.includes('BTC') || assistantContent.includes('analysis')) {
            try {
              await storeAnalysis({
                type: 'market_analysis',
                symbol: 'BTC',
                timeframe: '24h',
                analysis: {
                  prediction: assistantContent.substring(0, 200),
                  confidence: 0.7,
                  indicators: ['sentiment', 'technical'],
                  reasoning: assistantContent
                }
              });
                } catch {
      // Failed to store analysis
    }
          }
        } else {
          // Fallback: non-streaming - now expecting plain text
          try {
            const content = await response.text();
            const assistantMessage: Message = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: content.trim() || 'Grok4 did not return a response.',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, assistantMessage]);
          } catch {
            // Handle case where response is not text
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Grok4 returned an invalid response format. Please try again.`,
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
          }
        }
      }
    } catch (error) {
      // Error occurred
      let isTimeout = false;
      let errorMsg = '';
      if (error instanceof Error) {
        errorMsg = error.message;
        if (errorMsg.includes('timeout') || errorMsg.includes('504') || errorMsg.includes('taking too long')) {
          isTimeout = true;
        }
      }
      if (isTimeout) {
        _setTimeoutError('Grok4 is taking too long to respond. Please try again or check your network connection.');
      }
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error
          ? `Grok4 is having a Satoshi moment—${error.message}`
          : 'Grok4 is having a Satoshi moment—please try again soon.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      _setIsPolling(false);
    }
  };

  // BTC Advisor: compute stance and post concise answer to chat
  const handleBtcAdvisor = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      // Call live stance endpoint (falls back to server-side mapping)
      const live = await fetch('/api/advisor/btc/live', { cache: 'no-store' });
      const liveJson = live.ok ? await live.json() : { success: false };
      const decision: DecisionOutput = liveJson.success ? liveJson.data : await getBtcAdvisorDecision({});
      const stance = decision.summary?.stance ?? ((decision.details?.netScore ?? 0) > 0.25 ? 'Bullish' : (decision.details?.netScore ?? 0) < -0.25 ? 'Bearish' : 'Neutral');

      // Build human sentence: "We are bullish/bearish because ..."
      const labelMap: Record<string, string> = {
        macro: 'macro/liquidity',
        onchain: 'on-chain health',
        structure: 'market structure',
        stable: 'stablecoin/liquidity',
        sentiment: 'narrative/sentiment',
      };
      const signPhrase = (score: number) => (score > 0 ? 'supportive' : score < 0 ? 'a headwind' : 'neutral');
      const contribs = decision.details?.contributions
        ? [...decision.details.contributions].sort((a,b)=>Math.abs(b.contribution)-Math.abs(a.contribution))
        : [];
      const r1 = contribs[0];
      const r2 = contribs[1];
      const r3 = contribs[2];
      const because = r1
        ? `because ${labelMap[r1.key]} is ${signPhrase(r1.score)}${r2 ? ` and ${labelMap[r2.key]} is ${signPhrase(r2.score)}` : ''}${r3 ? `; ${labelMap[r3.key]} is ${signPhrase(r3.score)}` : ''}`
        : '';
      const brakesActive = decision.details?.brakesApplied && Object.values(decision.details.brakesApplied).some(Boolean);
      const brakesText = brakesActive
        ? `Brakes: ${Object.entries(decision.details!.brakesApplied).filter(([,v])=>v).map(([k])=>k.replaceAll('_',' ')).join(', ')}`
        : 'Brakes: none';

      // If neutral, show which thresholds weren’t met, using meta from live route if available
      let clarity = '';
      if (stance === 'Neutral' && liveJson?.meta) {
        const m = liveJson.meta as LiveMeta;
        const reasons: string[] = [];
        if (Math.abs(m.m30Change ?? 0) <= 0.05) reasons.push('30d price momentum < 5%');
        if (Math.abs(m.stChange ?? 0) <= 0.01) reasons.push('stablecoin growth < 1%');
        if (Math.abs(m.hrChg ?? 0) <= 0.02 || Math.abs(m.txChg ?? 0) <= 0.02) reasons.push('hash-rate/transactions change < 2%');
        if (typeof m.price === 'number' && typeof m.sma200 === 'number' && m.sma200 !== 0) {
          if (m.price <= m.sma200) reasons.push('below 200D MA');
        }
        clarity = reasons.length ? `\nWhy neutral: ${reasons.join('; ')}` : '';
      }

      // Build a more conversational summary using live meta when available
      const m: LiveMeta = (liveJson?.meta || {}) as LiveMeta;
      const pct = (x: number | undefined, digits = 1) =>
        typeof x === 'number' && Number.isFinite(x) ? `${(x * 100).toFixed(digits)}%` : 'n/a';
      const dist200d = ((): string => {
        if (typeof m.price === 'number' && typeof m.sma200 === 'number' && m.sma200 !== 0) {
          const d = (m.price - m.sma200) / m.sma200;
          const sign = d > 0 ? '+' : '';
          return `${sign}${(d * 100).toFixed(1)}% vs 200D`;
        }
        return 'n/a vs 200D';
      })();

      const lines: string[] = [];
      lines.push(`🧭 BTC Advisor — we’re ${stance.toLowerCase()} ${because ? because : ''}`.trim());
      lines.push(
        `Macro: ${dist200d}, DXY ${pct(m.dxySlope, 1)} over ~1m, real-yields slope ${(m.realSlope ?? 0).toFixed(2)}.`
      );
      lines.push(
        `On-chain: hash-rate ${pct(m.hrChg, 1)}, tx count ${pct(m.txChg, 1)} (30d).`
      );
      lines.push(
        `Structure & flows: BTC 30d momentum ${pct(m.m30Change, 1)}, stables (USDT+USDC) ${pct(m.stChange, 1)}; dominance tilt ${(m.dominanceAdj ?? 0) > 0 ? '+bullish' : (m.dominanceAdj ?? 0) < 0 ? '+alt/rotation' : 'flat'}.`
      );
      if (typeof m.fngVal === 'number') {
        lines.push(`Sentiment: Fear & Greed ${m.fngVal}/100 (${m.fngVal >= 60 ? 'greed' : m.fngVal <= 40 ? 'fear' : 'balanced'}).`);
      }
      lines.push(`${brakesText}`);
      if (clarity) lines.push(clarity.trim());

      const text = lines.join('\n');
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'BTC Advisor is unavailable right now. Please try again shortly.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // GM: curated morning brief with BTC-first lens
  const handleGM = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch('/api/gm', { method: 'POST', signal: controller.signal });
      clearTimeout(timeoutId);

      let text = 'GM — brief unavailable right now. Markets remain driven by BTC momentum, liquidity, and macro rates. Try again in a moment.';
      if (response.ok) {
        try {
          const json = await response.json();
          if (json?.success && typeof json.data === 'string') text = json.data;
        } catch {
          // fallback to plain text if needed
          text = await response.text();
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      try {
        await storeAnalysis({
          type: 'market_analysis',
          symbol: 'GM',
          timeframe: 'daily',
          analysis: {
            prediction: text.slice(0, 240),
            confidence: 0.7,
            indicators: ['btc', 'alts', 'macro'],
            reasoning: text,
          },
        });
      } catch {
        // ignore storage failure
      }
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'GM — Grok4 is slow right now. Please try again shortly.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // TSLA: concise one-paragraph brief from free Finnhub data
  const handleTslaBrief = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch('/api/stocks/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: 'TSLA' }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      let text = 'TSLA brief unavailable right now.';
      if (res.ok) {
        try {
          const json = await res.json();
          if (json?.success && typeof json.data === 'string') text = json.data;
        } catch {
          text = await res.text();
        }
      }
      const msg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };
      setMessages((p) => [...p, msg]);
    } catch {
      const err: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'TSLA brief failed. Please try again shortly.',
        timestamp: new Date(),
      };
      setMessages((p) => [...p, err]);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component logic would continue here
  // For brevity, I'm showing the key integration points

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      {/* Background with DNA yellow accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,199,0,0.15),rgba(0,0,0,0))] opacity-30 backdrop-blur-[200px]" />
      
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center flex-grow mx-auto px-2 sm:px-4 lg:px-8 mt-4">
        {/* Header */}
        <div className="text-center mb-2 flex flex-col items-center">
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="p-1 sm:p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            </div>
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Grok420
            </h1>
            <button
              onClick={() => _setShowInfoDialog(true)}
              className="p-1 sm:p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
              title="WTF is Grok 4?"
            >
              <Info className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
            </button>
            <button
              onClick={() => setIsMemoryOpen(true)}
              className="p-1 sm:p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
              title="Open Supermemory"
            >
              <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
            </button>
            <button
              onClick={() => _setShowResetDialog(true)}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-500 rounded-lg font-medium hover:bg-yellow-500/30 transition-colors text-xs sm:text-sm"
              title="Reset Grok context"
            >
              Reset
            </button>
            <button
              onClick={handleWatchlist}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-500 rounded-lg font-medium hover:bg-yellow-500/30 transition-colors text-xs sm:text-sm flex items-center gap-1"
              title="Outperform BTC Watchlist"
            >
              <ListChecks className="h-4 w-4" />
              Watchlist
            </button>
            <div className="hidden md:flex items-center gap-2 ml-2 text-yellow-400/80">
              <div className="flex items-center gap-1">
                <span>Base</span>
                <select value={baseAsset} onChange={(e) => setBaseAsset(e.target.value as 'BTC' | 'ETH')} className="bg-black/60 border border-yellow-500/30 rounded px-2 py-1">
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <span>Horizon</span>
                <select
                  value={horizon}
                  onChange={(e) => setHorizon(e.target.value as '1-3 months' | '3-6 months' | '1-4 weeks')}
                  className="bg-black/60 border border-yellow-500/30 rounded px-2 py-1"
                >
                  <option value="1-3 months">1-3m</option>
                  <option value="3-6 months">3-6m</option>
                  <option value="1-4 weeks">1-4w</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <span>Timeout</span>
                <select value={timeoutMs} onChange={(e) => setTimeoutMs(parseInt(e.target.value, 10))} className="bg-black/60 border border-yellow-500/30 rounded px-2 py-1">
                  <option value={10000}>10s</option>
                  <option value={15000}>15s</option>
                  <option value={20000}>20s</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={useCachedFallback} onChange={(e) => setUseCachedFallback(e.target.checked)} />
                Cached
              </label>
            </div>
            <button
              onClick={() => {
                setShowEquityResearch(!showEquityResearch);
                if (showEquityResearch) {
                  setEquityResearchData(null);
                }
              }}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-500 rounded-lg font-medium hover:bg-yellow-500/30 transition-colors text-xs sm:text-sm flex items-center gap-1"
              title="Elite Equity Research Analysis"
            >
              <BarChart3 className="h-4 w-4" />
              {showEquityResearch ? 'Close' : 'Elite Research'}
            </button>
            <button
              onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent, 'Analyze MSTR vs BTC performance and fundamentals')}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg font-medium hover:bg-green-500/30 transition-colors text-xs sm:text-sm flex items-center gap-1"
              title="Quick MSTR vs BTC Analysis"
            >
              <BarChart3 className="h-4 w-4" />
              MSTR vs BTC
            </button>
            <button
              onClick={handleTslaBrief}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500/20 border border-blue-500/40 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-colors text-xs sm:text-sm flex items-center gap-1"
              title="TSLA Brief"
            >
              <BarChart3 className="h-4 w-4" />
              TSLA
            </button>
          </div>
          <p className="text-yellow-400/80 text-xs sm:text-base max-w-xs sm:max-w-2xl mx-auto mt-2">
            <span className="font-bold text-yellow-400">MSTR vs BTC Focus:</span> Your Bitcoin-first investment intelligence. Find assets that outperform BTC, starting with MicroStrategy - the ultimate Bitcoin proxy stock. Say GM for market analysis.
          </p>
          {/* Reset message would appear here */}
        </div>

        {/* Chat Interface */}
        <div className="w-full flex justify-center">
          <div className="flex-1 flex justify-center w-full">
            <div className="bg-[#1c1f26] backdrop-blur-sm border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg p-2 sm:p-6 h-[50vh] sm:h-[70vh] flex flex-col w-full max-w-full sm:max-w-7xl mx-auto">
              {/* Equity Research Panel */}
              <AnimatePresence>
                {showEquityResearch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    {equityResearchData ? (
                      <EquityResearchReport data={equityResearchData} />
                    ) : (
                      <EquityResearchForm 
                        onSubmit={(data) => {
                          setEquityResearchData(data);
                          // Add a message to the chat about the analysis
                          const analysisMessage: Message = {
                            id: Date.now().toString(),
                            role: 'assistant',
                            content: `📊 **Equity Research Analysis Complete**\n\nI've analyzed the stock using Finnhub data and generated a comprehensive research report. The analysis includes fundamental metrics, insider activity, analyst consensus, and investment recommendations.\n\n**Key Finding:** ${data.thesisValidation.verdict} - ${data.thesisValidation.justification}\n\n**Recommendation:** ${data.investmentSummary.recommendation} (${data.investmentSummary.confidence} confidence)\n\nView the full report above for detailed analysis.`,
                            timestamp: new Date(),
                          };
                          setMessages(prev => [...prev, analysisMessage]);
                        }}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="inline-block p-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
                        <Bot className="h-8 w-8 text-yellow-500" />
                      </div>
                      <p className="text-yellow-400/80 text-base sm:text-lg font-bold">MSTR vs BTC Analysis Loading...</p>
                      <p className="text-white/50 text-xs sm:text-sm mt-2">Analyzing MicroStrategy - the ultimate Bitcoin proxy stock</p>
                      <div className="mt-4">
                        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-3 max-w-[95vw] sm:max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-yellow-500/20' : 'bg-yellow-500/10'}`}> 
                            {message.role === 'user' ? (
                              <User className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <Bot className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <div className={`p-3 sm:p-4 rounded-lg ${
                            message.role === 'user' 
                              ? 'bg-yellow-500/20 border border-yellow-500/30' 
                              : 'bg-black/40 border border-yellow-500/20'
                          } relative break-words text-sm sm:text-base`}>
                            <button
                              className="absolute top-2 right-2 p-1 rounded bg-yellow-500/10 hover:bg-yellow-500/30 transition-colors"
                              title="Copy message"
                              onClick={() => handleCopyMessage(message.content, message.id)}
                            >
                              <Copy className="h-4 w-4 text-yellow-400" />
                            </button>
                            {_copiedMessageId === message.id && (
                              <span className="absolute top-2 right-10 text-xs text-yellow-400 bg-black/80 px-2 py-1 rounded shadow">Copied!</span>
                            )}
                            <p className="text-white/90 whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                            <p className="text-xs text-yellow-400/50 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="p-2 rounded-full bg-yellow-500/10">
                        <Bot className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="p-4 rounded-lg bg-black/40 border border-yellow-500/20">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                          <span className="text-yellow-400/80">Grok4 is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit(undefined);
                    }
                  }}
                  placeholder="Try: 'TSLA analysis' or 'gm' for market overview..."
                  className="w-full sm:flex-1 bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white placeholder-yellow-400/50 focus:border-yellow-500 focus:outline-none text-sm sm:text-base"
                  disabled={isLoading || _isImageLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 text-black font-bold px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <Send className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => _setShowImageDialog(true)}
                  disabled={_isImageLoading}
                  className="w-full sm:w-auto bg-yellow-500/20 hover:bg-yellow-400/30 text-yellow-500 font-bold px-4 py-3 rounded-lg border border-yellow-500/30 transition-colors disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  title="Generate image with art direction prompt"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleGM}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-green-500/20 hover:bg-green-400/30 text-green-400 font-bold px-4 py-3 rounded-lg border border-green-500/30 transition-colors disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  title="Quick market overview"
                >
                  GM
                </button>
                <button
                  type="button"
                  onClick={handleBtcAdvisor}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-yellow-500/20 hover:bg-yellow-400/30 text-yellow-400 font-bold px-4 py-3 rounded-lg border border-yellow-500/30 transition-colors disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  title="BTC Advisor stance"
                >
                  BTC Advisor
                </button>
                <button
                  type="button"
                  onClick={handleTslaBrief}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-blue-500/20 hover:bg-blue-400/30 text-blue-400 font-bold px-4 py-3 rounded-lg border border-blue-500/30 transition-colors disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  title="TSLA Brief"
                >
                  TSLA
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Supermemory Modal */}
        <MemoryPanel isOpen={isMemoryOpen} onClose={() => setIsMemoryOpen(false)} />
      </div>
    </div>
  );

  // Helper functions
  function handleCopyMessage(content: string, id: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        _setCopiedMessageId(id);
        setTimeout(() => _setCopiedMessageId(null), 1500);
      });
    }
  }

  // Render Memory Panel
  
  async function handleWatchlist() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch('/api/grok4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Create a concise ${baseAsset}-relative outperform watchlist for the next ${horizon}.
Rules: Focus on assets likely to outperform ${baseAsset} on a risk-adjusted basis. Include ticker/symbol, quick thesis, high-level risk, a stop below key ${baseAsset}-relative level (e.g., ratio < 0.024), and a target ratio or catalyst.
Keep it brief and in markdown list format. If live data is unavailable, ${useCachedFallback ? 'use cached or last-known prices' : 'do not use cached data'}.`,
          systemPrompt: `You are a Bitcoin-first analyst. Default lens is performance relative to BTC.
- Avoid hype, no hashtags, no memes.
- Use professional tone consistent with LiveTheLifeTV.
- Prioritize BTC-relative rotation logic: scale-in above strength thresholds (e.g., ratio > 0.03), cut under weakness (e.g., ratio < 0.024).
- Include some stocks like MSTR if compelling.
- End with a one-line risk summary.`,
          temperature: 0.6,
          stream: false,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const text = response.ok ? await response.text() : 'Unable to generate watchlist right now.';

      // Post to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Try to parse minimal structure
      const list = {
        type: 'watchlist',
        base: baseAsset,
        horizon,
        methodology: 'BTC-relative momentum and rotation rules',
        raw: text,
      } as const;
      try {
        await storeOutperformWatchlist(list);
      } catch {
        // ignore storage failure
      }

      // Optionally surface prior lists
      try {
        const prior = await getOutperformWatchlists();
        if (prior.total > 0) {
          const priorMsg: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: `Loaded ${prior.total} prior watchlist snapshots from Supermemory. Open the Brain panel to review.`,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, priorMsg]);
        }
      } catch {}
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 3).toString(),
        role: 'assistant',
        content: 'Failed to generate or store the watchlist. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }
} 