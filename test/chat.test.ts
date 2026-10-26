import { describe, expect, it } from 'vitest';
import { buildSystemPrompt } from '../src/chat';
import { scoreAllProfiles } from '../src/engine';

describe('chat system prompt', () => {
  it('embeds the character name and trait scores', () => {
    const scored = scoreAllProfiles([
      {
        id: 'test',
        name: 'Test Character',
        traits: {
          assertiveness: { score: 70, confidence: 0.8, sources: ['test'] },
        },
      },
    ])[0];

    const prompt = buildSystemPrompt(scored);
    expect(prompt).toContain('Test Character');
    expect(prompt).toContain('Assertiveness: 70/100');
    expect(prompt).toContain('first person');
  });

  it('uses the bundled Steve Jobs profile', () => {
    const scored = scoreAllProfiles([
      {
        id: 'steve-jobs',
        name: 'Steve Jobs',
        traits: {
          assertiveness: { score: 84, confidence: 0.78, sources: ['Isaacson biography'] },
        },
      },
    ])[0];

    expect(buildSystemPrompt(scored)).toContain('Steve Jobs');
  });
});
