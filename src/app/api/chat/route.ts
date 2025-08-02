import { Grok4Service } from '../grok4/grok4';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 15; // 15 seconds timeout for simple chat

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

    // Simple chat without web search or complex processing
    const completion = await Grok4Service.chatCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: temperature,
      max_tokens: 200, // Very short responses for vibes learning
    });

    const content = completion.choices[0]?.message?.content || 'I understand. How else can I help?';

    return NextResponse.json({
      content: content,
      success: true
    });

  } catch {
    // Simple chat error occurred
    
    // Provide a fallback response instead of an error
    const fallbackResponses = [
      "I understand what you're asking about. As a Bitcoin-first AI assistant, I'm here to help with crypto insights, market analysis, and Bitcoin education. What specific aspect would you like to explore?",
      "Great question! I'm your Bitcoin-focused AI assistant. I can help with everything from basic Bitcoin concepts to advanced trading strategies. What's on your mind?",
      "I'm here to help with all things Bitcoin and crypto! Whether it's understanding blockchain technology, market trends, or investment strategies, I've got you covered. What would you like to know?",
      "As your Bitcoin-first AI assistant, I'm ready to dive into crypto discussions, market analysis, and Bitcoin education. What can I help you with today?"
    ];
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return NextResponse.json({
      content: randomResponse,
      success: true,
      fallback: true
    });
  }
} 