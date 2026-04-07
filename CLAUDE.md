# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                            # Run bot locally (port 3000)
npm test                             # Run all Jest tests
npx jest tests/awayDetector.test.js  # Run a single test file
netlify deploy --prod                # Deploy to production
netlify deploy --prod --skip-functions-cache  # Deploy bypassing function cache
netlify dev --live                   # Local dev server with public tunnel
```

## Architecture

Slack bot ([@slack/bolt](https://slack.dev/bolt-js/)) that reacts with emoji when a message contains "brb" (word-boundary matched, case-insensitive).

**Two runtime modes:**
- **Local**: `app.js` starts a Bolt app on a port
- **Production**: `netlify/functions/slack.js` wraps Bolt with `AwsLambdaReceiver` for Netlify Functions

**Flow**: message received -> `awayDetector` checks for match -> `reactWithEmoji` adds reactions via Slack API (`already_reacted` errors are swallowed).

## Environment Variables

Required in `.env` (local) or Netlify site settings (production):
- `SLACK_BOT_TOKEN` -- Bot OAuth token (`xoxb-...`)
- `SLACK_SIGNING_SECRET` -- from Slack app Basic Information page

## Slack Event Subscriptions URL

In the Slack app settings (api.slack.com/apps) under Event Subscriptions, the Request URL must point to the Netlify function endpoint:

- **Production**: `https://<netlify-site>.netlify.app/.netlify/functions/slack`
- **Local dev** (`netlify dev --live`): `https://<live-id>--<site>.netlify.live/.netlify/functions/slack`

When switching between local and production, update this URL accordingly. Slack will verify the endpoint with a challenge request.

## Conventions

- Plain JavaScript (no TypeScript)
- Tests live in `tests/` mirroring `src/` filenames
