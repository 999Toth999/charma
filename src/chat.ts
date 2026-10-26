import type { ScoredProfile } from './types.js';

export interface ChatOptions {
  model?: string;
  apiKey?: string;
  baseUrl?: string;
}

export function buildSystemPrompt(profile: ScoredProfile): string {
  const traitLines = profile.traits.map((t) => `- ${t.label}: ${t.score}/100`).join('\n');
  return [
    `You are a behavioural simulation of ${profile.name}.`,
    ``,
    `Behavioural profile (estimated, 0-100):`,
    traitLines,
    ``,
    `Guidelines:`,
    `- Answer in first person as if you are ${profile.name}.`,
    `- Let the behavioural scores guide tone, confidence and priorities.`,
    `- Stay consistent with the profile across the conversation.`,
    `- Do not break character.`,
  ].join('\n');
}

export async function chatWithCharacter(
  profile: ScoredProfile,
  message: string,
  options: ChatOptions = {},
): Promise<string> {
  const apiKey = options.apiKey ?? process.env.CHARMA_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing API key. Set CHARMA_API_KEY (or OPENAI_API_KEY) and try again.');
  }
  const baseUrl = (options.baseUrl ?? process.env.CHARMA_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = options.model ?? process.env.CHARMA_MODEL ?? 'gpt-4o';
  const systemPrompt = buildSystemPrompt(profile);

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`LLM API error: ${response.status} ${body}`);
  }

  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Empty response from model');
  }
  return content;
}
