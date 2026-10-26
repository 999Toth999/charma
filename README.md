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
