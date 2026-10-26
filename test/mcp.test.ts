import { describe, expect, it } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createCharmaMcpServer } from '../src/mcp';

describe('charma MCP server', () => {
  it('lists characters', async () => {
    const client = new Client({ name: 'test-client', version: '0.0.0' });
    const server = createCharmaMcpServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

    try {
      const tools = await client.listTools();
      const names = tools.tools.map((t) => t.name);
      expect(names).toContain('list_characters');
      expect(names).toContain('get_character_profile');
      expect(names).toContain('build_persona_context');
    } finally {
      await Promise.all([client.close(), server.close()]);
    }
  });

  it('gets a character profile', async () => {
    const client = new Client({ name: 'test-client', version: '0.0.0' });
    const server = createCharmaMcpServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

    try {
      const result = await client.callTool({
        name: 'get_character_profile',
        arguments: { characterId: 'steve-jobs' },
      });
      const text = (result.content as Array<{ type: string; text?: string }>)
        .map((c) => c.text ?? '')
        .join('');
      const profile = JSON.parse(text);
      expect(profile.id).toBe('steve-jobs');
      expect(profile.traits).toHaveLength(9);
    } finally {
      await Promise.all([client.close(), server.close()]);
    }
  });

  it('builds persona context', async () => {
    const client = new Client({ name: 'test-client', version: '0.0.0' });
    const server = createCharmaMcpServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

    try {
      const result = await client.callTool({
        name: 'build_persona_context',
        arguments: { characterId: 'steve-jobs', message: 'hi' },
      });
      const text = (result.content as Array<{ type: string; text?: string }>)
        .map((c) => c.text ?? '')
        .join('');
      const context = JSON.parse(text);
      expect(context.characterId).toBe('steve-jobs');
      expect(context.systemPrompt).toContain('Steve Jobs');
    } finally {
      await Promise.all([client.close(), server.close()]);
    }
  });
});
