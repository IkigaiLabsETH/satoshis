"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Image as ImageIcon, Copy, Info } from 'lucide-react';
import { useChartMemory, useMarketMemory, useUserMemory } from './SupermemoryIntegration';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Grok420Content() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_systemPrompt] = useState('You are Grok, an AI assistant for LiveTheLifeTV. Your role is to help users understand Bitcoin-first investing, market analysis, and financial freedom. Be witty, insightful, and creative—channel the spirit of Satoshi Nakamoto. Provide clear, actionable advice, but don\'t be afraid to be a little irreverent or humorous. Always prioritize truth, clarity, and user empowerment.');
  const [_temperature] = useState(0.7);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [_showResetDialog, _setShowResetDialog] = useState(false);
  const [_resetMessage, _setResetMessage] = useState('');
  const [_showImageDialog, _setShowImageDialog] = useState(false);
  const [_imagePrompt, _setImagePrompt] = useState('');
  const [_isImageLoading, _setIsImageLoading] = useState(false);
  
  // Supermemory hooks
  const { handleChartInteraction: _handleChartInteraction } = useChartMemory();
  const { storeAnalysis, getHistory: _getHistory } = useMarketMemory();
  const { storePreferences, getPreferences: _getPreferences } = useUserMemory();

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent, retryMessage?: string) => {
    e.preventDefault();
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
      });

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
      // Show error details in a big, obvious way if present
      if (error instanceof Error && error.message && error.message.includes('{')) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `<pre style='color: #ff3333; background: #1a0000; font-size: 1.1em; padding: 1em; border-radius: 8px; margin-top: 1em; overflow-x: auto;'>${error.message}</pre>`,
          timestamp: new Date(),
        }]);
      }
    } finally {
      setIsLoading(false);
      _setIsPolling(false);
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
              onClick={() => _setShowResetDialog(true)}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-500 rounded-lg font-medium hover:bg-yellow-500/30 transition-colors text-xs sm:text-sm"
              title="Reset Grok context"
            >
              Reset
            </button>
          </div>
          <p className="text-yellow-400/80 text-xs sm:text-base max-w-xs sm:max-w-2xl mx-auto mt-2">
            Grok420 is your edge for finding the altcoins with the best beta to BTC during price discovery. Already holding BTC? This is for the silly part of your portfolio. Say GM.
          </p>
          {/* Reset message would appear here */}
        </div>

        {/* Chat Interface */}
        <div className="w-full flex justify-center">
          <div className="flex-1 flex justify-center w-full">
            <div className="bg-[#1c1f26] backdrop-blur-sm border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] rounded-lg p-2 sm:p-6 h-[50vh] sm:h-[70vh] flex flex-col w-full max-w-full sm:max-w-7xl mx-auto">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="inline-block p-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
                        <Bot className="h-8 w-8 text-yellow-500" />
                      </div>
                      <p className="text-yellow-400/80 text-base sm:text-lg font-bold">Talk to Satoshi</p>
                      <p className="text-white/50 text-xs sm:text-sm mt-2">&ldquo;If you don&rsquo;t believe it or don&rsquo;t get it, I don&rsquo;t have the time to try to convince you, sorry.&rdquo;</p>
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
                            <p className="text-white/90 whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: message.content }} />
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
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Grok4 anything..."
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper functions
  function handleCopyMessage(_content: string, _id: string) {
    // Implementation would go here
  }
} 