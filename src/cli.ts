#!/usr/bin/env node
import { CHARACTER_PROFILES } from './profiles.js';
import { scoreAllProfiles } from './engine.js';
import type { ScoredProfile } from './types.js';

const args = process.argv.slice(2);

function getFlagValue(flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) return undefined;
  return value;
}

function main(): void {
  const characterId = getFlagValue('--character') ?? 'steve-jobs';
  const asJson = args.includes('--json');

  const scored = scoreAllProfiles(CHARACTER_PROFILES).find((p) => p.id === characterId);

  if (!scored) {
    console.error(`Unknown character: ${characterId}`);
    console.error(`Known characters: ${CHARACTER_PROFILES.map((p) => p.id).join(', ')}`);
    process.exit(1);
  }

  if (asJson) {
    console.log(JSON.stringify(scored, null, 2));
    return;
  }

  console.log(`Character Behavioural Profile: ${scored.name}`);
  console.log('='.repeat(50));
  for (const trait of scored.traits) {
    const filled = Math.round((trait.score / 10) * 2);
    const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
    console.log(`${trait.label.padEnd(22)} ${String(trait.score).padStart(3)}/100  conf=${(trait.confidence * 100).toFixed(0)}%  ${bar}`);
  }
}

main();
