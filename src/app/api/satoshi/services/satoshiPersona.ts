// Satoshi Persona Service Module

// Normalizes persona mode string to canonical form
export function normalizePersonaMode(mode: string | undefined): string {
  if (!mode) return 'multimodal';
  const m = mode.toLowerCase();
  if (
    m === 'multimodal' ||
    m === 'multi-modal' ||
    m === 'multi_modal' ||
    m.includes('multi-modal') ||
    m.includes('multimodal')
  ) {
    return 'multimodal';
  }
  // Convert snake_case or lower to PascalCase or known keys
  // e.g., 'viral_creator' -> 'ViralCreator', 'analyst' -> 'Analyst'
  return mode
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
}

// Routes input to a persona (stub: replace with your actual logic)
export function routeToPersona(_input: string): string {
  // TODO: Implement actual routing logic based on input
  // For now, always return 'multimodal'
  return 'multimodal';
} 