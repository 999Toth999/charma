import { TRAIT_DEFINITIONS } from './traits.js';
import type { CharacterProfile, ScoredProfile, ScoredTrait } from './types.js';

export const SCORE_MIN = 0;
export const SCORE_MAX = 100;

function clampScore(value: number): number {
  const rounded = Math.round(value);
  if (Number.isNaN(rounded)) return 0;
  return Math.min(SCORE_MAX, Math.max(SCORE_MIN, rounded));
}

function clampConfidence(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function scoreProfile(profile: CharacterProfile): ScoredProfile {
  const scoredTraits: ScoredTrait[] = TRAIT_DEFINITIONS.map((definition) => {
    const estimate = profile.traits[definition.id];
    return {
      id: definition.id,
      label: definition.label,
      description: definition.description,
      score: estimate ? clampScore(estimate.score) : 0,
      confidence: estimate ? clampConfidence(estimate.confidence) : 0,
      sources: estimate ? [...estimate.sources] : [],
    };
  });

  return {
    id: profile.id,
    name: profile.name,
    traits: scoredTraits,
  };
}

export function scoreAllProfiles(profiles: CharacterProfile[]): ScoredProfile[] {
  return profiles.map(scoreProfile);
}
