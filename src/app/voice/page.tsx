'use client'

import HumeService from "@/services/hume";
import { Loader } from '@/components/ai/Loader';
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import { clientLogger } from '@/utils/clientLogger';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mic, Phone } from 'lucide-react';

// Simple inline StartCall component that doesn't import external useVoice components
function InlineStartCall() {
  const { connect, status } = useVoice();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (err) {
      clientLogger.error('Connection failed:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  if (status?.value === 'connected') {
    return null;
  }

  return (
    <Button
      size="lg"
      className="relative w-full gap-3 font-semibold text-base py-4 sm:py-6 bg-gradient-to-r from-black via-zinc-900 to-black hover:bg-[#F7B500] hover:from-[#F7B500] hover:via-[#F7B500] hover:to-[#F7B500] text-[#F7B500] hover:text-black transition-all duration-300 ease-out border border-[#F7B500] shadow-[5px_5px_0px_0px_#F7B500] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] disabled:opacity-70 disabled:cursor-not-allowed rounded-md"
      onClick={handleConnect}
      disabled={isConnecting}
    >
      <Mic className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
      {isConnecting ? 'Connecting...' : 'Start Call'}
    </Button>
  );
}

// Simple inline Controls component
function InlineControls() {
  const { disconnect, status } = useVoice();

  if (status?.value !== 'connected') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full pb-6 sm:pb-8 px-4 sm:px-6 flex items-end justify-center z-50">
      <Button
        onClick={() => disconnect()}
        className="relative gap-3 font-semibold text-base py-4 sm:py-6 bg-gradient-to-r from-black via-zinc-900 to-black hover:bg-[#F7B500] hover:from-[#F7B500] hover:via-[#F7B500] hover:to-[#F7B500] text-[#F7B500] hover:text-black transition-all duration-300 ease-out border border-[#F7B500] shadow-[5px_5px_0px_0px_#F7B500] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] disabled:opacity-70 disabled:cursor-not-allowed rounded-md"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
        End Call
      </Button>
    </div>
  );
}

function VoiceExperience() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenRefreshInterval, setTokenRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hume');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch access token: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.accessToken) {
          throw new Error('Invalid access token received');
        }
        
        setAccessToken(data.accessToken);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to initialize voice';
        clientLogger.error('Voice init error:', message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    // Initial token fetch
    fetchToken();

    // Set up token refresh every 4 minutes (tokens typically expire in 5-10 minutes)
    const interval = setInterval(() => {
      clientLogger.info('Refreshing access token...');
      fetchToken();
    }, 4 * 60 * 1000);

    setTokenRefreshInterval(interval);

    // Cleanup interval on unmount
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => {
      if (tokenRefreshInterval) {
        clearInterval(tokenRefreshInterval);
      }
    };
  }, [tokenRefreshInterval]);

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
        <div className="relative z-10">
          <Loader color="yellow" />
        </div>
      </div>
    );
  }

  if (error || !accessToken) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
        <div className="relative z-10 max-w-md p-8 rounded-sm bg-black/50 backdrop-blur-xl border border-[#F7B500]/10">
          <p className="text-red-500 mb-6 text-center">{error || 'Unable to initialize voice interface'}</p>
          <Button
            size="lg"
            className="relative w-full gap-3 font-semibold text-base py-4 sm:py-6 bg-gradient-to-r from-black via-zinc-900 to-black text-[#F7B500] border border-[#F7B500] shadow-[5px_5px_0px_0px_#F7B500] rounded-md opacity-50"
            disabled
          >
            <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <VoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId={HumeService.defaultVoiceConfig.configId}
      hostname="api.hume.ai"
      debug={true}
      verboseTranscription={true}
      onMessage={(message) => {
        clientLogger.info('Voice message received:', message);
      }}
      onError={(error) => {
        clientLogger.error('Voice connection error:', error);
        setError(error?.message || 'Voice connection error');
      }}
      onOpen={() => {
        clientLogger.info('Voice connection opened');
        setError(null);
      }}
      onClose={() => {
        clientLogger.info('Voice connection closed');
      }}
    >
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
        
        {/* Top Line Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F7B500] to-transparent"></div>
        
        {/* Animated Circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#F7B500]/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#F7B500]/10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#F7B500]/10"
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="uppercase tracking-[0.4em] text-[#F7B500]/90 text-sm mb-4 font-light font-satoshi">
              Proof of Empathy
            </p>
            <h1 className="text-center mb-6">
              <span className="text-5xl md:text-6xl font-bold text-[#F7B500] tracking-tight [text-shadow:_0_1px_20px_rgba(247,181,0,0.3)] font-satoshi">
                Call Satoshi
              </span>
            </h1>
            <div className="flex items-center justify-center">
              <div className="h-px w-24 bg-[#F7B500]/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">
                Sovereignty • Trustlessness • Scarcity
              </p>
              <div className="h-px w-24 bg-[#F7B500]/30"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InlineStartCall />
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Controls - only rendered when connected */}
      <InlineControls />
    </VoiceProvider>
  );
}

export default function VoicePage() {
  return <VoiceExperience />;
}
