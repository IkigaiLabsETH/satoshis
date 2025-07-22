// Satoshi Persona Service Module

// Normalizes persona mode string to canonical form
export function normalizePersonaMode(mode: string | undefined): string {
  if (!mode) return 'multimodal';
  const m = mode.toLowerCase().replace(/\s|_/g, '');
  if (
    m === 'multimodal' ||
    m === 'multimodal(autodetect)' ||
    m === 'multi-modal' ||
    m === 'multi_modal' ||
    m.includes('multi-modal') ||
    m.includes('multimodal')
  ) {
    return 'multimodal';
  }
  // Map common frontend dropdown values to canonical personas
  if (m === 'cryptoprice' || m === 'crypto-price' || m === 'price') {
    return 'Analyst';
  }
  // Convert snake_case or lower to PascalCase or known keys
  // e.g., 'viral_creator' -> 'ViralCreator', 'analyst' -> 'Analyst'
  return mode
    .split(/[_\s]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
}

// Routes input to a persona (stub: replace with your actual logic)
export function routeToPersona(_input: string): string {
  // For now, always return 'multimodal'
  return 'multimodal';
} 