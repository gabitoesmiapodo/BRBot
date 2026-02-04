const { containsBRB } = require("../src/brbDetector");

describe("containsBRB", () => {
  test.each([
    "brb",
    "BRB",
    "brb.",
    "hey, brb!",
    "i'll brb real quick",
  ])("matches %s", (text) => {
    expect(containsBRB(text)).toBe(true);
  });

  test.each([
    "barb",
    "brbbb",
    "b rb",
    "br",
    "bbb",
  ])("ignores %s", (text) => {
    expect(containsBRB(text)).toBe(false);
  });
});
