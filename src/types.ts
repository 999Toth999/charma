export type TraitId =
  | 'aggressiveness'
  | 'assertiveness'
  | 'empathy'
  | 'charisma'
  | 'conscientiousness'
  | 'emotionalStability'
  | 'openness'
  | 'riskAppetite'
  | 'ambition';

export interface TraitDefinition {
  id: TraitId;
  label: string;
  description: string;
}

export interface TraitEstimate {
  score: number;
  confidence: number;
  sources: string[];
}

export interface CharacterProfile {
  id: string;
  name: string;
  aliases?: string[];
  context?: string;
  traits: Partial<Record<TraitId, TraitEstimate>>;
}

export interface ScoredTrait {
  id: TraitId;
  label: string;
  description: string;
  score: number;
  confidence: number;
  sources: string[];
}

export interface ScoredProfile {
  id: string;
  name: string;
  traits: ScoredTrait[];
}
