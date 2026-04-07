const AWAY_PATTERNS = [
  // Abbreviations
  {
    regex: /\bbrb\b/i,
    examples: ["brb", "BRB", "brb.", "hey, brb!", "i'll brb real quick"],
  },
  { regex: /\bafk\b/i, examples: ["afk", "AFK", "going afk"] },
  { regex: /\bbbs\b/i, examples: ["bbs"] },
  { regex: /\bbbiab\b/i, examples: ["bbiab"] },

  // English phrases
  {
    regex: /\bbe right back\b/i,
    examples: ["be right back", "I'll be right back"],
  },
  { regex: /\bi'?ll be back\b/i, examples: ["I'll be back", "ill be back"] },
  {
    regex: /\bbe back\s+(soon\b|in\s)/i,
    examples: ["be back soon", "be back in 5", "be back in a bit"],
  },
  {
    regex: /\bback in\s+(a\s+)?(bit|minute|moment|sec|few|[0-9])/i,
    examples: [
      "back in a bit",
      "back in a minute",
      "back in a moment",
      "back in a sec",
      "back in few minutes",
      "back in 5 min",
    ],
  },
  {
    regex: /\bstepping\s+(away|out)\b/i,
    examples: ["stepping away", "stepping out", "stepping out for a bit"],
  },
  {
    regex: /\baway for\s+(a\s+)?(bit|moment|minute|few|while)/i,
    examples: [
      "away for a bit",
      "away for a moment",
      "away for a while",
      "away for few minutes",
    ],
  },
  { regex: /\bgotta\s+(run|go)\b/i, examples: ["gotta run", "gotta go"] },

  // Spanish phrases
  {
    regex: /\b(ya|ahor(it)?a)\s+(vuelvo|vengo|regreso)\b/i,
    examples: [
      "ya vuelvo",
      "ya vengo",
      "ya regreso",
      "ahora vuelvo",
      "ahorita vengo",
      "ahorita regreso",
    ],
  },
  {
    regex: /\b(vuelvo|vengo|regreso)\s+en\b/i,
    examples: ["vuelvo en un rato", "vengo en un ratito", "regreso en 5 min"],
  },
  {
    regex: /\bsalgo\s+un(os)?\s+\w+/i,
    examples: [
      "salgo un rato",
      "salgo un ratito",
      "salgo un momento",
      "salgo unos minutos",
      "salgo unos minutitos",
    ],
  },
  {
    regex: /\bme\s+ausento\b/i,
    examples: ["me ausento", "me ausento un momento"],
  },
  {
    regex: /\bvoy\s+y\s+(vuelvo|vengo)\b/i,
    examples: ["voy y vuelvo", "voy y vengo"],
  },
  {
    regex: /\benseguida\s+(vuelvo|vengo|regreso)\b/i,
    examples: ["enseguida vuelvo", "enseguida vengo", "enseguida regreso"],
  },
  { regex: /\bno\s+(me\s+)?tardo\b/i, examples: ["no tardo", "no me tardo"] },
]

function containsAwayPattern(text = "") {
  return AWAY_PATTERNS.some(({ regex }) => regex.test(text))
}

module.exports = { containsAwayPattern, AWAY_PATTERNS }
