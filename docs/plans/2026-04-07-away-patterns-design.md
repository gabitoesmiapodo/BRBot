# Expanded Away Pattern Detection

## Goal

Expand the BRB detector to recognize a wide set of "stepping away" phrases in English and Spanish, with fuzzy matching for natural variants (diminutives, inserted words).

## Patterns

All patterns are case-insensitive.

### Abbreviations

| Regex            | Examples          |
|------------------|-------------------|
| `\bbrb\b`       | brb, BRB          |
| `\bafk\b`       | afk, AFK          |
| `\bbbs\b`       | bbs               |
| `\bbbiab\b`     | bbiab             |

### English phrases

| Regex                                                       | Examples                              |
|-------------------------------------------------------------|---------------------------------------|
| `\bbe right back\b`                                        | be right back, I'll be right back     |
| `\bi'?ll be back\b`                                        | I'll be back, ill be back             |
| `\bbe back\s+(soon\b\|in\s)`                               | be back soon, be back in 5            |
| `\bback in\s+(a\s+)?(bit\|minute\|moment\|sec\|few\|[0-9])` | back in a bit, back in 5 min        |
| `\bstepping\s+(away\|out)\b`                               | stepping away, stepping out           |
| `\baway for\s+(a\s+)?(bit\|moment\|minute\|few\|while)`   | away for a bit, away for a while      |
| `\bgotta\s+(run\|go)\b`                                    | gotta run, gotta go                   |

### Spanish phrases

| Regex                                              | Examples                              |
|----------------------------------------------------|---------------------------------------|
| `\b(ya\|ahorita?)\s+(vuelvo\|vengo\|regreso)\b`   | ya vuelvo, ahorita regreso            |
| `\b(vuelvo\|vengo\|regreso)\s+en\b`               | vuelvo en un rato, regreso en 5 min   |
| `\bsalgo\s+un(os)?\s+\w+`                         | salgo un rato, salgo unos minutitos   |
| `\bme\s+ausento\b`                                | me ausento, me ausento un momento     |
| `\bvoy\s+y\s+(vuelvo\|vengo)\b`                   | voy y vuelvo, voy y vengo             |
| `\benseguida\s+(vuelvo\|vengo\|regreso)\b`        | enseguida vuelvo                      |
| `\bno\s+(me\s+)?tardo\b`                          | no tardo, no me tardo                 |

## Changes

1. Rename `src/brbDetector.js` -> `src/awayDetector.js`
   - Export `containsAwayPattern(text)` instead of `containsBRB(text)`
   - Store patterns as an array of RegExp, return true if any matches
2. Rename `tests/brbDetector.test.js` -> `tests/awayDetector.test.js`
   - Expand test cases for each pattern group
3. Update `src/registerHandlers.js` import
4. Update `CLAUDE.md` to reflect the new module name

## Verification

- `npm test` passes with all new test cases
- Manual: send messages in Slack containing each pattern, verify emoji reactions appear
