// Satoshi Prompt Builder Service Module

// Helper: Estimate token count (stub, replace with actual encoder if needed)
export function estimateTokens(text: string): number {
  // TODO: Use actual encoder for token estimation
  return Math.ceil(text.length / 4);
}

// Helper: Trim context block to a max number of lines
export function trimContextBlock(block: string, maxLines: number = 2): string {
  const lines = block.split('\n');
  if (lines.length <= maxLines + 1) return block;
  return lines.slice(0, maxLines + 1).join('\n') + '\n...';
}

// Main: Build context block and trim prompt to fit token limits
export function buildPromptContext({
  btcQuote,
  marketData,
  personaPrompt,
  brandDnaPrompt
}: {
  btcQuote: string;
  marketData: string;
  personaPrompt: string;
  brandDnaPrompt: string;
  // The rest are omitted for speed
}) {
  // Only include the most essential context
  const realtimeContext = `\n# Real-Time Market Data\n${btcQuote}${marketData}`;
  const prompt = `${realtimeContext}\n\n${brandDnaPrompt}\n\n${personaPrompt}`;
  const tokenEstimate = Math.ceil(prompt.length / 4);
  const trimLevel = 1;
  // No trimming loop needed for minimal context
  // eslint-disable-next-line no-console
  console.log('LLM prompt (minimal) length:', prompt.length, 'tokens:', tokenEstimate);
  const llmMaxTokens = 500;
  return { prompt, llmMaxTokens, tokenEstimate, trimLevel };
} 