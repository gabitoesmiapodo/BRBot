# BRB Reaction Bot Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Spanish-word scolding bot with a BRB detector that reacts to every BRB message using two emoji.

**Architecture:** Single Bolt listener hosted on Netlify detects `/\bbrb\b/i` matches, then calls `client.reactions.add` twice. Helper centralizes reaction error handling and logs unexpected Slack failures.

**Tech Stack:** Node.js 18+, @slack/bolt 3.x, Netlify Functions, Jest (unit tests).

---

### Task 1: Refresh Dependencies & Repo Scaffolding

**Files:**
- Modify: `package.json`
- Create: `package-lock.json`

**Step 1: Update dependencies**

Run: `npm install @slack/bolt@latest dotenv@latest`
Expected: `package.json` and lock file capture the new versions.

**Step 2: Review changes**

Run: `git status`
Expected: `package.json` + lock show modifications.

**Step 3: Leave staged for later**

Defer committing until implementation complete per repo workflow.

### Task 2: Implement BRB Detector & Reaction Helper

**Files:**
- Modify: `app.js`
- Create: `src/brbDetector.js`
- Create: `src/reactWithEmoji.js`

**Step 1: Detector utility**

`src/brbDetector.js`

```js
const BRB_REGEX = /(\bbrb\b)/i;

function containsBRB(text = "") {
  return BRB_REGEX.test(text);
}

module.exports = { containsBRB };
```

**Step 2: Reaction helper**

`src/reactWithEmoji.js`

```js
async function reactWithEmoji(client, { channel, timestamp, emoji }) {
  try {
    await client.reactions.add({ channel, timestamp, name: emoji });
  } catch (error) {
    if (error.data?.error === "already_reacted") {
      return;
    }
    console.error("Failed to add reaction", { channel, timestamp, emoji, error });
    throw error;
  }
}

module.exports = { reactWithEmoji };
```

**Step 3: Rewrite `app.js`**

```js
const { App } = require("@slack/bolt");
const { containsBRB } = require("./src/brbDetector");
const { reactWithEmoji } = require("./src/reactWithEmoji");
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message(async ({ message, client }) => {
  if (!message?.text || !containsBRB(message.text)) {
    return;
  }

  const payload = { channel: message.channel, timestamp: message.ts };
  await reactWithEmoji(client, { ...payload, emoji: "waving-from-afar-right" });
  await reactWithEmoji(client, { ...payload, emoji: "wave" });
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bot is running!");
})();
```

**Step 4: Manual test**

Run: `node app.js`
Expected: typing `brb.` in a channel with the bot adds both reactions.

### Task 3: Add Unit Tests

**Files:**
- Modify: `package.json` (test script + dev deps)
- Create: `tests/brbDetector.test.js`
- Create: `tests/reactWithEmoji.test.js`

**Step 1: Install Jest**

Run: `npm install --save-dev jest`
Update `package.json` scripts:

```json
"scripts": {
  "start": "node app.js",
  "test": "jest"
}
```

**Step 2: Detector tests**

`tests/brbDetector.test.js`

```js
const { containsBRB } = require("../src/brbDetector");

describe("containsBRB", () => {
  test.each([
    "brb",
    "BRB",
    "brb.",
    "hey, brb!",
    "i'll brb real quick"
  ])("matches %s", (text) => {
    expect(containsBRB(text)).toBe(true);
  });

  test.each([
    "barb",
    "brbbb",
    "b rb",
    "br",
    "bbb"
  ])("ignores %s", (text) => {
    expect(containsBRB(text)).toBe(false);
  });
});
```

**Step 3: Reaction helper tests**

`tests/reactWithEmoji.test.js`

```js
const { reactWithEmoji } = require("../src/reactWithEmoji");

function createClient(mockImpl) {
  return { reactions: { add: jest.fn(mockImpl) } };
}

describe("reactWithEmoji", () => {
  const payload = { channel: "C123", timestamp: "123.456", emoji: "wave" };

  it("adds reaction when call succeeds", async () => {
    const client = createClient(() => Promise.resolve());
    await expect(reactWithEmoji(client, payload)).resolves.toBeUndefined();
  });

  it("swallows already_reacted errors", async () => {
    const client = createClient(() =>
      Promise.reject({ data: { error: "already_reacted" } })
    );
    await expect(reactWithEmoji(client, payload)).resolves.toBeUndefined();
  });

  it("rethrows other errors", async () => {
    const err = new Error("nope");
    const client = createClient(() => Promise.reject(err));
    await expect(reactWithEmoji(client, payload)).rejects.toBe(err);
  });
});
```

**Step 4: Run tests**

Run: `npm test`
Expected: All suites pass.

### Task 4: Slack Setup Checklist Doc

**Files:**
- Create: `docs/plans/2026-02-04-slack-setup.md`

**Step 1: Document scopes and steps**

Include OAuth scopes (`channels:history`, `reactions:write`, `chat:write` if needed), event subscriptions (`message.channels`, `message.groups`, `message.im` as desired), bot/user token notes, environment variable mapping, Netlify deploy steps, and install instructions.

### Task 5: Final Verification & Commit

**Step 1: Run lint/tests**

Run: `npm test`
Expected: PASS.

**Step 2: Manual Slack check**

Deploy to Netlify or run locally, confirm emoji reactions on sample messages.

**Step 3: Commit**

Run:

```bash
git add app.js src docs package.json package-lock.json tests
git commit -m "feat: react to brb messages"
```

**Step 4: Deploy**

Run: `netlify deploy --prod` (or existing pipeline) once ready.
