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
  userQuestion
}: {
  btcQuote: string;
  marketData: string;
  userQuestion: string;
}) {
  // Drastically shortened prompt for speed and efficiency
  const prompt = `# User Question\n${userQuestion}\n\n# Latest Market Data\n${btcQuote}${marketData}\n\n# Persona\nYou are Satoshi AI, a Bitcoin-first expert. Answer concisely, with technical accuracy and philosophical depth. Never use hashtags or meme slang.`;
  const tokenEstimate = Math.ceil(prompt.length / 4);
  const trimLevel = 1;
  // eslint-disable-next-line no-console
  console.log('LLM prompt (short) length:', prompt.length, 'tokens:', tokenEstimate);
  const llmMaxTokens = 1500;
  return { prompt, llmMaxTokens, tokenEstimate, trimLevel };
} 