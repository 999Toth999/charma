#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { CHARACTER_PROFILES } from './profiles.js';
import { scoreAllProfiles } from './engine.js';
import { buildSystemPrompt } from './chat.js';

export const CHARMA_MCP_SERVER_INFO = { name: 'charma', version: '0.1.0' };

export function createCharmaMcpServer() {
  const server = new McpServer(
    { name: CHARMA_MCP_SERVER_INFO.name, version: CHARMA_MCP_SERVER_INFO.version },
    { capabilities: { tools: {} } },
  );

  server.tool(
    'list_characters',
    'List the available character behavioural profiles.',
    async () => ({
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            CHARACTER_PROFILES.map((p) => ({ id: p.id, name: p.name, context: p.context })),
          ),
        },
      ],
    }),
  );

  server.tool(
    'get_character_profile',
    'Get the behavioural profile of a character with 0-100 trait scores and confidence.',
    { characterId: z.string() },
    async (args: { characterId: string }) => {
      const profile = scoreAllProfiles(CHARACTER_PROFILES).find((p) => p.id === args.characterId);
      if (!profile) {
        throw new Error(`Unknown character: ${args.characterId}`);
      }
      return { content: [{ type: 'text', text: JSON.stringify(profile) }] };
    },
  );

  server.tool(
    'build_persona_context',
    'Build an in-character system prompt for chatting with a character.',
    { characterId: z.string(), message: z.string().optional() },
    async (args: { characterId: string; message?: string }) => {
      const profile = scoreAllProfiles(CHARACTER_PROFILES).find((p) => p.id === args.characterId);
      if (!profile) {
        throw new Error(`Unknown character: ${args.characterId}`);
      }
      const systemPrompt = buildSystemPrompt(profile);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ characterId: profile.id, name: profile.name, systemPrompt }) },
        ],
      };
    },
  );

  return server;
}

async function main(): Promise<void> {
  const server = createCharmaMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

void main();
