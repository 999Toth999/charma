import type { TraitDefinition, TraitId } from './types.js';

export const TRAIT_DEFINITIONS: TraitDefinition[] = [
  { id: 'aggressiveness', label: 'Aggressiveness', description: 'Drive to compete, confront opposition, or pursue goals forcefully.' },
  { id: 'assertiveness', label: 'Assertiveness', description: 'Ability to express needs, make decisions and defend positions clearly.' },
  { id: 'empathy', label: 'Empathy', description: 'Capacity to understand and share the feelings of others.' },
  { id: 'charisma', label: 'Charisma', description: 'Ability to attract, influence and inspire others socially.' },
  { id: 'conscientiousness', label: 'Conscientiousness', description: 'Organisational, discipline and follow-through behaviour.' },
  { id: 'emotionalStability', label: 'Emotional Stability', description: 'Ability to remain calm and resilient under pressure.' },
  { id: 'openness', label: 'Openness', description: 'Cognitive curiosity and receptiveness to novelty.' },
  { id: 'riskAppetite', label: 'Risk Appetite', description: 'Willingness to take strategic or financial risks.' },
  { id: 'ambition', label: 'Ambition', description: 'Drive to achieve higher goals and status.' },
];

export const TRAIT_MAP: Record<TraitId, TraitDefinition> = TRAIT_DEFINITIONS.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<TraitId, TraitDefinition>,
);
