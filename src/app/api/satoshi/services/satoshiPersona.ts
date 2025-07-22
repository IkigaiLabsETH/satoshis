import { SATOSHI_PERSONAS } from '@/services/satoshi/personas';

/**
 * Normalizes persona mode string to canonical form, handling common variants and typos.
 * Returns a valid persona key for SATOSHI_PERSONAS or a best guess.
 */
export function normalizePersonaMode(mode: string | undefined): string {
  if (!mode) return 'multimodal';
  const m = mode.toLowerCase().replace(/\s|_/g, '');
  // Explicit mappings for all canonical personas and common variants
  const personaMap: Record<string, string> = {
    'multimodal': 'multimodal',
    'multimodal(autodetect)': 'multimodal',
    'multi-modal': 'multimodal',
    'multi_modal': 'multimodal',
    'validator': 'Validator',
    'analyst': 'Analyst',
    'cryptoprice': 'Analyst',
    'crypto-price': 'Analyst',
    'price': 'Analyst',
    'educator': 'Educator',
    'designer': 'Designer',
    'interviewer': 'Interviewer',
    'consultant': 'Consultant',
    'researcher': 'Researcher',
    'marketresearcher': 'MarketResearcher',
    'market-researcher': 'MarketResearcher',
    'ideavalidator': 'IdeaValidator',
    'idea-validator': 'IdeaValidator',
    'contentcreator': 'ContentCreator',
    'content-creator': 'ContentCreator',
    'viralcreator': 'ViralCreator',
    'viral-creator': 'ViralCreator',
    'enhancedviralcreator': 'EnhancedViralCreator',
    'enhanced-viral-creator': 'EnhancedViralCreator',
    'platformadaptation': 'PlatformAdaptation',
    'platform-adaptation': 'PlatformAdaptation',
    'multiplatformstrategy': 'MultiPlatformStrategy',
    'multi-platform-strategy': 'MultiPlatformStrategy',
    'strategicadvisor': 'StrategicAdvisor',
    'strategic-advisor': 'StrategicAdvisor',
    'visualexplainer': 'VisualExplainer',
    'visual-explainer': 'VisualExplainer',
    'ultimatetutor': 'UltimateTutor',
    'ultimate-tutor': 'UltimateTutor',
    'satoshibot': 'SatoshiBot',
    'satoshi-bot': 'SatoshiBot',
    'wealthhacker': 'WealthHacker',
    'wealth-hacker': 'WealthHacker',
  };
  if (personaMap[m]) return personaMap[m];
  // Fallback: Convert to PascalCase
  const pascal = mode
    .split(/[_\s-]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
  // Log a warning if not found in SATOSHI_PERSONAS
  if (!(pascal in SATOSHI_PERSONAS)) {
    // eslint-disable-next-line no-console
    console.warn(`Unknown persona: '${mode}' normalized to '${pascal}'. Not found in SATOSHI_PERSONAS.`);
  }
  return pascal;
}

/**
 * Routes input text to a persona based on detected intent and keywords.
 * Returns the most relevant persona key for SATOSHI_PERSONAS.
 */
export function routeToPersona(input: string): string {
  if (!input) return 'multimodal';
  const lower = input.toLowerCase();
  // Keyword-based routing for world-class UX
  if (/price|quote|market cap|gainer|loser|volatility|performance|compare|returns|drawdown|sharpe|portfolio|simulate|dca|rotation|backtest|hedge|risk|apy|yield|tvl|liquidation|staking|on-chain|hash rate|gas fee|mvrv|whale|insider|earnings|ipo|analyst|recommendation|target price|institutional|etf|fund|macro|fed|cpi|unemployment|dxy|dollar index|regulation|sec|fomc|event|news|sentiment|twitter|x.com|headline|trending|reddit|forum|update/.test(lower)) {
    return 'Analyst';
  }
  if (/validate|validator|consensus|trustless|cryptographic|attack|network effect|censorship/.test(lower)) {
    return 'Validator';
  }
  if (/explain|teach|educate|simplify|analogy|metaphor|student|high school|beginner|tutorial|lesson/.test(lower)) {
    return 'Educator';
  }
  if (/design|ui|ux|layout|accessibility|critique|product designer|landing page/.test(lower)) {
    return 'Designer';
  }
  if (/interview|podcast|host|question|storytelling|origin story|philosophy|ethics/.test(lower)) {
    return 'Interviewer';
  }
  if (/whitepaper|consult|consultant|case study|market trends|future prediction|call to action/.test(lower)) {
    return 'Consultant';
  }
  if (/research|academic|paper|citation|bibliography|summary|synthesis|compare sources/.test(lower)) {
    return 'Researcher';
  }
  if (/market research|industry analyst|forecast|key players|strategic|gartner/.test(lower)) {
    return 'MarketResearcher';
  }
  if (/validate idea|product strategy|startup weekend|validation plan/.test(lower)) {
    return 'IdeaValidator';
  }
  if (/copywriter|content strategy|viral thread|newsletter|sales page|blog|engagement|cta/.test(lower)) {
    return 'ContentCreator';
  }
  if (/viral|shareability|hook|emotional trigger|platform-specific/.test(lower)) {
    return 'ViralCreator';
  }
  if (/trend|meme|enhanced viral|data-driven/.test(lower)) {
    return 'EnhancedViralCreator';
  }
  if (/adaptation|platform adaptation|engagement|reach|platform-specific features/.test(lower)) {
    return 'PlatformAdaptation';
  }
  if (/multi-platform|content calendar|cross-promotion|strategy/.test(lower)) {
    return 'MultiPlatformStrategy';
  }
  if (/strategic advisor|swot|risk-reward|vc|startup studio/.test(lower)) {
    return 'StrategicAdvisor';
  }
  if (/visual|infographic|diagram|mermaid|flowchart|timeline|concept map|decision tree/.test(lower)) {
    return 'VisualExplainer';
  }
  if (/tutor|journalist|investigative|knowledge|research creation|pattern/.test(lower)) {
    return 'UltimateTutor';
  }
  if (/satoshi|bitcoin creator|sound money|decentralization|cryptography/.test(lower)) {
    return 'SatoshiBot';
  }
  if (/wealth|income|money-making|quant|wall street|billionaire|income streams|vault breaker/.test(lower)) {
    return 'WealthHacker';
  }
  // Default fallback
  return 'multimodal';
} 