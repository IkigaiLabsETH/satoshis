import { Metadata } from 'next';
import { Suspense } from 'react';
import ChatPageClient from '@/components/chat/ChatPageClient';

export const metadata: Metadata = {
  title: 'Talk to Satoshi - Bitcoin AI Chat | LiveTheLifeTV',
  description: 'Have a conversation with Satoshi. Ask complex Bitcoin questions, get insights on crypto markets, and shape the AI\'s personality with your vibes. Your Bitcoin-first AI assistant powered by Grok4.',
  keywords: [
    'Bitcoin AI chat',
    'Satoshi AI',
    'Bitcoin assistant',
    'Crypto AI',
    'Grok4 Bitcoin',
    'AI personality',
    'Bitcoin vibes',
    'Crypto insights',
    'Bitcoin-first AI',
    'Digital gold assistant',
  ],
};

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <ChatPageClient />
    </Suspense>
  );
} 