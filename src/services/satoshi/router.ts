import { SATOSHI_PERSONAS } from './personas';

export type PersonaKey = keyof typeof SATOSHI_PERSONAS;

const PERSONA_KEYWORDS: Record<PersonaKey, string[]> = {
  Validator: ["validate", "validation", "startup", "idea", "test", "worth", "trustless", "decentralization"],
  Analyst: ["analyze", "analysis", "bullish", "bearish", "valuation", "catalyst", "investment", "equity", "thesis", "summary", "recommendation", "verdict"],
  Educator: ["explain", "simplify", "for students", "analogy", "metaphor", "high school", "teach", "education"],
  Designer: ["design", "ui", "ux", "landing page", "critique", "improvement", "product design", "interface"],
  Interviewer: ["interview", "questions", "podcast", "themes", "ask", "guest"],
  Consultant: ["whitepaper", "report", "consultant", "case study", "executive summary", "future predictions", "call to action"],
  Researcher: ["research", "citation", "apa", "academic", "bibliography", "compare", "author", "paper", "synthesis"],
  MarketResearcher: ["market", "outperform", "sector", "trend", "forecast", "key players", "opportunities", "risks", "insights", "compare", "btc correlation", "crypto sector", "altcoin", "stocks", "performance", "ratio", "vs btc", "this week", "this month", "today"],
  IdeaValidator: ["validate idea", "startup idea", "validation plan", "differentiates", "alternatives", "red flags", "risks", "edge cases"],
  ContentCreator: ["content", "thread", "newsletter", "sales page", "cold email", "copy", "write", "hook", "cta", "body copy", "engagement", "conversion"],
  ViralCreator: ["viral", "engagement", "share", "hook", "trend", "memes", "thread", "post", "video", "platform", "call to action"],
  EnhancedViralCreator: ["enhanced viral", "trend", "meme", "data-driven", "insights", "hashtags", "format", "structure", "cta", "rationale"],
  PlatformAdaptation: ["adapt", "platform", "tone", "format", "features", "hashtags", "mentions", "compliance", "norms"],
  MultiPlatformStrategy: ["multi-platform", "strategy", "calendar", "cross-promotion", "posting schedule", "content types", "brand reach"],
  StrategicAdvisor: ["strategy", "advisor", "swot", "risk-reward", "personas", "market segments", "pros", "cons", "recommendation", "decision"],
  VisualExplainer: ["visual", "diagram", "infographic", "mermaid", "timeline", "concept map", "decision tree", "caption", "code"],
  UltimateTutor: ["tutor", "educator", "research", "knowledge", "foundation", "layered", "comprehensive", "expand", "topic", "deep-dive"],
  SatoshiBot: ["satoshi", "bitcoin creator", "identity", "decentralization", "cryptography", "sound money", "btc ethos"],
  WealthHacker: ["wealth", "money", "asset", "income", "arbitrage", "goldmine", "vault breaker", "opportunity", "cash", "leverage", "multiplication", "wealth code"]
};

const PERSONA_PRIORITY: PersonaKey[] = [
  'MarketResearcher',
  'Analyst',
  'Validator',
  'StrategicAdvisor',
  'WealthHacker',
  'ContentCreator',
  'ViralCreator',
  'EnhancedViralCreator',
  'Consultant',
  'Researcher',
  'Educator',
  'Designer',
  'Interviewer',
  'IdeaValidator',
  'PlatformAdaptation',
  'MultiPlatformStrategy',
  'VisualExplainer',
  'UltimateTutor',
  'SatoshiBot',
];

export function routeToPersona(input: string): PersonaKey {
  const text = input.toLowerCase();
  const scores: Partial<Record<PersonaKey, number>> = {};
  for (const persona of Object.keys(PERSONA_KEYWORDS) as PersonaKey[]) {
    scores[persona] = PERSONA_KEYWORDS[persona].reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
  }
  // Find the highest score
  let maxScore = 0;
  let candidates: PersonaKey[] = [];
  for (const persona of Object.keys(scores) as PersonaKey[]) {
    if ((scores[persona] || 0) > maxScore) {
      maxScore = scores[persona] || 0;
      candidates = [persona];
    } else if ((scores[persona] || 0) === maxScore && maxScore > 0) {
      candidates.push(persona);
    }
  }
  // If tie, use priority order
  if (candidates.length > 1) {
    for (const p of PERSONA_PRIORITY) {
      if (candidates.includes(p)) return p;
    }
  }
  // If one candidate, return it
  if (candidates.length === 1) return candidates[0];
  // Fallback
  return 'Analyst';
} 