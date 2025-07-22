// Unit tests for satoshiPersona service module
// This file is intended to be run with Vitest or Jest
import { describe, it, expect } from 'vitest';

import { normalizePersonaMode, routeToPersona } from './satoshiPersona';

describe('satoshiPersona service', () => {
  it('normalizePersonaMode returns multimodal for undefined or variants', () => {
    expect(normalizePersonaMode(undefined)).toBe('multimodal');
    expect(normalizePersonaMode('multimodal')).toBe('multimodal');
    expect(normalizePersonaMode('multi-modal')).toBe('multimodal');
    expect(normalizePersonaMode('multi_modal')).toBe('multimodal');
    expect(normalizePersonaMode('MULTIMODAL')).toBe('multimodal');
  });

  it('normalizePersonaMode normalizes known keys', () => {
    expect(normalizePersonaMode('viral_creator')).toBe('ViralCreator');
    expect(normalizePersonaMode('analyst')).toBe('Analyst');
    expect(normalizePersonaMode('educator')).toBe('Educator');
  });

  it('routeToPersona returns a string (stub)', () => {
    expect(typeof routeToPersona('analyze BTC')).toBe('string');
  });
}); 