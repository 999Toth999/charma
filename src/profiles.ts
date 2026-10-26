import type { CharacterProfile } from './types.js';

export const CHARACTER_PROFILES: CharacterProfile[] = [
  {
    id: 'steve-jobs',
    name: 'Steve Jobs',
    context: 'Co-founder of Apple; measured from biographies, keynote transcripts and public interviews.',
    traits: {
      aggressiveness: { score: 68, confidence: 0.72, sources: ['Isaacson biography', 'Stanford commencement (2005)', 'Macworld keynotes'] },
      assertiveness: { score: 84, confidence: 0.78, sources: ['Isaacson biography', 'iPhone keynote (2007)'] },
      empathy: { score: 38, confidence: 0.7, sources: ['Isaacson biography', 'interviews'] },
      charisma: { score: 90, confidence: 0.8, sources: ['Stanford commencement (2005)', 'keynote transcripts'] },
      conscientiousness: { score: 62, confidence: 0.7, sources: ['Isaacson biography'] },
      emotionalStability: { score: 32, confidence: 0.75, sources: ['Isaacson biography', 'biography of wounds'] },
      openness: { score: 88, confidence: 0.82, sources: ['Isaacson biography', 'keynote transcripts'] },
      riskAppetite: { score: 76, confidence: 0.7, sources: ['product bets (iMac, iPod, iPhone, NeXT)'] },
      ambition: { score: 94, confidence: 0.8, sources: ['Isaacson biography', 'Stanford commencement (2005)'] },
    },
  },
  {
    id: 'brian-tracy',
    name: 'Brian Tracy',
    context: 'Leadership coach and author; measured from published interviews and books.',
    traits: {
      aggressiveness: { score: 55, confidence: 0.7, sources: ['interviews', 'The Psychology of Selling'] },
      assertiveness: { score: 68, confidence: 0.75, sources: ['interviews', 'The Psychology of Selling'] },
      empathy: { score: 62, confidence: 0.75, sources: ['interviews', 'books'] },
      charisma: { score: 66, confidence: 0.72, sources: ['interviews', 'podcasts'] },
      conscientiousness: { score: 78, confidence: 0.8, sources: ['books', 'courses'] },
      emotionalStability: { score: 60, confidence: 0.75, sources: ['interviews'] },
      openness: { score: 55, confidence: 0.7, sources: ['books'] },
      riskAppetite: { score: 60, confidence: 0.7, sources: ['interviews'] },
      ambition: { score: 80, confidence: 0.8, sources: ['books', 'interviews'] },
    },
  },
];
