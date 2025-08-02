import { Grok4Service } from '../grok4/grok4';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 45; // 45 seconds timeout for complex questions

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, systemPrompt = "You are a Bitcoin-first AI assistant.", temperature = 0.8 } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Use Grok4 for complex questions with longer timeout
    const completion = await Grok4Service.chatCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: temperature,
      max_tokens: 1500, // Allow longer, more meaningful responses for complex questions
    });

    const content = completion.choices[0]?.message?.content || 'I understand. How else can I help?';

    return NextResponse.json({
      content: content,
      success: true
    });

  } catch {
    // Grok4 error occurred - use smart fallback
    
    // Get the message from the request body for fallback logic
    let userMessage = '';
    try {
      const body = await request.json();
      userMessage = body.message || '';
    } catch {
      userMessage = '';
    }
    
    // Smart fallback based on the user's question
    const lowerMessage = userMessage.toLowerCase();
    let smartResponse = '';
    
    if (lowerMessage.includes('what is bitcoin') || lowerMessage.includes('what is btc')) {
      smartResponse = "Bitcoin is the world's first decentralized digital currency, created in 2009 by Satoshi Nakamoto. It operates on blockchain technology, allowing peer-to-peer transactions without intermediaries like banks. Bitcoin is often called 'digital gold' due to its limited supply (21 million coins) and store-of-value properties. It's the foundation of the entire cryptocurrency ecosystem and represents financial sovereignty and censorship resistance.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('chart')) {
      smartResponse = "I'd love to give you real-time Bitcoin price data, but my market data connection is currently limited. Bitcoin's price is influenced by factors like institutional adoption, regulatory news, macroeconomic conditions, and market sentiment. For live prices, I recommend checking CoinGecko, CoinMarketCap, or your preferred exchange. What specific aspect of Bitcoin's market behavior interests you?";
    } else if (lowerMessage.includes('buy') || lowerMessage.includes('invest') || lowerMessage.includes('purchase')) {
      smartResponse = "Bitcoin investment strategies vary based on your goals and risk tolerance. Many follow 'DCA' (Dollar Cost Averaging) - buying small amounts regularly regardless of price. Others prefer lump-sum investments or timing market cycles. Remember: only invest what you can afford to lose, and consider Bitcoin as a long-term store of value rather than a get-rich-quick scheme. What's your investment timeline and risk profile?";
    } else if (lowerMessage.includes('blockchain') || lowerMessage.includes('technology') || lowerMessage.includes('how does it work')) {
      smartResponse = "Bitcoin's blockchain is a distributed ledger that records all transactions in blocks linked together cryptographically. Each block contains multiple transactions, and once added, it's nearly impossible to alter. Miners validate transactions and secure the network through proof-of-work consensus. This creates a trustless system where no single entity controls the network. The technology enables censorship-resistant, borderless, and permissionless financial transactions.";
    } else if (lowerMessage.includes('satoshi') || lowerMessage.includes('creator') || lowerMessage.includes('founder')) {
      smartResponse = "Satoshi Nakamoto is the pseudonymous creator of Bitcoin, who published the Bitcoin whitepaper in 2008 and launched the network in 2009. Their true identity remains unknown, though many theories exist. Satoshi's vision was to create 'a peer-to-peer electronic cash system' that would eliminate the need for trusted third parties in financial transactions. They disappeared from the community in 2010, leaving Bitcoin to develop organically.";
    } else {
      // Generic but helpful response
      smartResponse = "I'm experiencing a temporary connection issue with my AI model, but I'm still here to help! As your Bitcoin-first assistant, I can discuss crypto markets, blockchain technology, and investment strategies. What specific aspect of Bitcoin or crypto would you like to explore?";
    }
    
    return NextResponse.json({
      content: smartResponse,
      success: true,
      fallback: true
    });
  }
} 