import { describe, expect, it } from 'vitest';
import { CHARACTER_PROFILES } from '../src/profiles';
import { SCORE_MAX, SCORE_MIN, scoreAllProfiles, scoreProfile } from '../src/engine';
import { TRAIT_MAP } from '../src/traits';

describe('scoring engine', () => {
  it('clamps scores into the 0-100 range', () => {
    const scored = scoreProfile({
      id: 'test',
      name: 'Test',
      traits: { aggressiveness: { score: 250, confidence: 0.5, sources: ['test'] } },
    });
    const aggressiveness = scored.traits.find((t) => t.id === 'aggressiveness');
    expect(aggressiveness?.score).toBe(SCORE_MAX);
  });

  it('clamps confidence into 0-1', () => {
    const scored = scoreProfile({
      id: 'test',
      name: 'Test',
      traits: { empathy: { score: 50, confidence: 4, sources: ['test'] } },
    });
    const empathy = scored.traits.find((t) => t.id === 'empathy');
    expect(empathy?.confidence).toBe(1);
  });

  it('scores all bundled character profiles', () => {
    const scored = scoreAllProfiles(CHARACTER_PROFILES);
    expect(scored).toHaveLength(CHARACTER_PROFILES.length);
    for (const profile of scored) {
      expect(profile.traits.length).toBeGreaterThan(0);
      for (const trait of profile.traits) {
        expect(trait.score).toBeGreaterThanOrEqual(SCORE_MIN);
        expect(trait.score).toBeLessThanOrEqual(SCORE_MAX);
        expect(trait.confidence).toBeGreaterThanOrEqual(0);
        expect(trait.confidence).toBeLessThanOrEqual(1);
        expect(trait.sources.length).toBeGreaterThan(0);
      }
    }
  });

  it('exposes the expected trait catalogue', () => {
    expect(TRAIT_MAP.assertiveness.label).toBe('Assertiveness');
    expect(Object.keys(TRAIT_MAP)).toHaveLength(9);
  });
});
