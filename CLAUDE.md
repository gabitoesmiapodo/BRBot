# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                            # Run bot locally (port 3000)
npm test                             # Run all Jest tests
npx jest tests/brbDetector.test.js   # Run a single test file
netlify deploy --prod                # Deploy to production
```

## Architecture

Slack bot ([@slack/bolt](https://slack.dev/bolt-js/)) that reacts with emoji when a message contains "brb" (word-boundary matched, case-insensitive).

**Two runtime modes:**
- **Local**: `app.js` starts a Bolt app on a port
- **Production**: `netlify/functions/slack.js` wraps Bolt with `AwsLambdaReceiver` for Netlify Functions

**Flow**: message received -> `brbDetector` checks for match -> `reactWithEmoji` adds reactions via Slack API (`already_reacted` errors are swallowed).

## Environment Variables

Required in `.env` (local) or Netlify site settings (production):
- `SLACK_BOT_TOKEN` -- Bot OAuth token (`xoxb-...`)
- `SLACK_SIGNING_SECRET` -- from Slack app Basic Information page

## Conventions

- Plain JavaScript (no TypeScript)
- Tests live in `tests/` mirroring `src/` filenames
