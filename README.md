# charma

**Character Behavioural Percentage Framework.**

Quantify the personality of known figures as explainable **0–100 behavioural metrics** — aggressiveness, assertiveness, empathy, charisma, conscientiousness, emotional stability, openness, risk appetite, ambition — with per-trait confidence scores and source attribution.

## Install

```bash
npm install -g charma
```

## Usage

```bash
charma --character steve-jobs
charma --character brian-tracy
charma --character steve-jobs --json
charma chat --character steve-jobs --message "Tell me why I should change the world."
```

## Traits

| Trait | Axis |
| --- | --- |
| Aggressiveness | Drive to compete / confront |
| Assertiveness | Clear expression & decision defence |
| Empathy | Perspective-taking capacity |
| Charisma | Influence & inspiration |
| Conscientiousness | Organisation & follow-through |
| Emotional Stability | Calm under pressure |
| Openness | Curiosity / novelty |
| Risk Appetite | Willingness to take risks |
| Ambition | Drive toward higher goals |

## Presets

- `steve-jobs` — Apple co-founder; measured from biographies, keynote transcripts, interviews.
- `brian-tracy` — Leadership coach/author; measured from published interviews and books.

## Chat with a character

```bash
charma chat --character steve-jobs --message "hi, tell me about yourself"
```

Uses the behavioural profile to build an in-character system prompt and sends it to an OpenAI-compatible LLM endpoint.

Set `CHARMA_API_KEY` (or `OPENAI_API_KEY`) and optionally `CHARMA_BASE_URL` / `CHARMA_MODEL` to point at a compatible provider.

## MCP Server (use it from any AI agent)

```bash
charma-mcp
```

Tools exposed:

- `list_characters`
- `get_character_profile` — full 0–100 trait scores with confidence + sources
- `build_persona_context` — in-character system prompt for chat

Wire it into any MCP client, e.g. Claude Code / Claude Desktop / OpenCode / Codex / Antigravity:

```json
{
  "mcpServers": {
    "charma": {
      "command": "npx",
      "args": ["charma-mcp"]
    }
  }
}
```

## Library usage

```ts
import { CHARACTER_PROFILES, scoreProfile } from 'charma';

const scored = scoreProfile(CHARACTER_PROFILES[0]);
// scored.traits -> [{ id, label, score, confidence, sources }]
```

## Disclaimer

Scores are triangulated behavioural estimates, **not** clinical or psychological assessments. Accuracy is bounded, confidence values reflect source agreement, and presets are expert-derived snapshots — not ground truth.

## Roadmap

- Multi-source weighted aggregation engine
- NLP pipelines (speech, text) for new characters
- Web dashboard + radar visualisation
- Community trait contributions

## License

MIT
