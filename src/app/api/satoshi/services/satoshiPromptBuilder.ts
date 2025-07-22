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
  insiderSentimentData,
  earningsData,
  ipoData,
  companyNewsData,
  analystData,
  priceTargetData,
  webSearch,
  xSentiment,
  satoshiMarket,
  personaPrompt,
  brandDnaPrompt
}: {
  btcQuote: string;
  marketData: string;
  insiderSentimentData: string;
  earningsData: string;
  ipoData: string;
  companyNewsData: string;
  analystData: string;
  priceTargetData: string;
  webSearch: string;
  xSentiment: string;
  satoshiMarket: string;
  personaPrompt: string;
  brandDnaPrompt: string;
}): { prompt: string; llmMaxTokens: number; tokenEstimate: number; trimLevel: number } {
  let realtimeContext = `\n# Real-Time Market Data\n${btcQuote}${marketData}${insiderSentimentData}${earningsData}${ipoData}${companyNewsData}${analystData}${priceTargetData}\n\n# Latest Web Search\n${webSearch}\n\n# X Sentiment\n${xSentiment}\n\n# Satoshi Market Context\n${satoshiMarket}\n`;
  const MAX_PROMPT_TOKENS = 2048;
  let prompt = `${realtimeContext}\n\n${brandDnaPrompt}\n\n${personaPrompt}`;
  let tokenEstimate = estimateTokens(prompt);
  let trimLevel = 2;
  while (tokenEstimate > MAX_PROMPT_TOKENS && trimLevel > 0) {
    realtimeContext = `\n# Real-Time Market Data\n${trimContextBlock(btcQuote, trimLevel)}${trimContextBlock(marketData, trimLevel)}${trimContextBlock(insiderSentimentData, trimLevel)}${trimContextBlock(earningsData, trimLevel)}${trimContextBlock(ipoData, trimLevel)}${trimContextBlock(companyNewsData, trimLevel)}${trimContextBlock(analystData, trimLevel)}${trimContextBlock(priceTargetData, trimLevel)}\n\n# Latest Web Search\n${trimContextBlock(webSearch, trimLevel)}\n\n# X Sentiment\n${trimContextBlock(xSentiment, trimLevel)}\n\n# Satoshi Market Context\n${trimContextBlock(satoshiMarket, trimLevel)}`;
    prompt = `${realtimeContext}\n\n${brandDnaPrompt}\n\n${personaPrompt}`;
    tokenEstimate = estimateTokens(prompt);
    trimLevel--;
  }
  if (tokenEstimate > MAX_PROMPT_TOKENS) {
    realtimeContext = `\n# Real-Time Market Data\n${trimContextBlock(btcQuote, 1)}${trimContextBlock(marketData, 1)}\n`;
    prompt = `${realtimeContext}\n\n${brandDnaPrompt}\n\n${personaPrompt}`;
    tokenEstimate = estimateTokens(prompt);
    // eslint-disable-next-line no-console
    console.warn('Prompt aggressively trimmed to fit token limit.');
  }
  // eslint-disable-next-line no-console
  console.log('LLM prompt length:', prompt.length, 'chars,', tokenEstimate, 'tokens');
  let llmMaxTokens = 1000;
  if (tokenEstimate > 1500) llmMaxTokens = 500;
  return { prompt, llmMaxTokens, tokenEstimate, trimLevel };
} 