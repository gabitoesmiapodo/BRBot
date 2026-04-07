const { containsAwayPattern, AWAY_PATTERNS } = require("../src/awayDetector")

describe("containsAwayPattern", () => {
  describe("each pattern matches its own examples", () => {
    AWAY_PATTERNS.forEach(({ regex, examples }) => {
      describe(String(regex), () => {
        test.each(examples)("matches %s", (text) => {
          expect(containsAwayPattern(text)).toBe(true)
        })
      })
    })
  })

  describe("non-matches", () => {
    test.each([
      "barb",
      "brbbb",
      "b rb",
      "br",
      "bbb",
      "hello everyone",
      "back to work",
      "go forward",
      "stepping on it",
      "I got a new car",
      "vuelvo a intentar",
      "salgo de la app",
      "",
    ])("ignores %s", (text) => {
      expect(containsAwayPattern(text)).toBe(false)
    })
  })

  test("handles undefined/null input", () => {
    expect(containsAwayPattern()).toBe(false)
    expect(containsAwayPattern(undefined)).toBe(false)
  })
})
