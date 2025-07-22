// Satoshi Utils Service Module
import { NextResponse } from 'next/server';

// Helper: Format LLM timeout response
export function formatLLMTimeoutResponse(): string {
  return `Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.\n\n**Warning:** LLM timed out after 15 seconds. Partial data shown.\n\n*Suggestions:*\n- Try a more focused question.\n- Wait a moment and try again if the system is busy.`;
}

// Helper: Format API error response
export function formatAPIErrorResponse(persona: string, warningMsg: string): Response {
  const suggestions = `\n\n*Suggestions:*\n- Try your request again in a few moments.\n- Rephrase your question for a more focused answer.\n- If this issue persists, please let us know!`;
  const bitcoinNarrative = 'Bitcoin is the signal. Even when data is missing, the narrative remains: decentralization, sound money, and antifragility. Stay sovereign.';
  return NextResponse.json({
    persona,
    prompt: '',
    processed: `${bitcoinNarrative}\n\n**Warning:** An error occurred while fetching data: ${warningMsg}\n\nPartial or no data is available at this time.${suggestions}`,
    dataSourceUsed: []
  }, { status: 200 });
} 