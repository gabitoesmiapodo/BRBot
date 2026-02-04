# Slack Setup Checklist – BRB Reaction Bot

## 1) Create the Slack App
- Go to https://api.slack.com/apps → “Create New App” → “From scratch”.
- Name: `BRB Reaction Bot` (or your choice). Workspace: target workspace.

## 2) Basic App Configuration
- **App-Level Token**: Not required for this bot (no Socket Mode).
- **Event Delivery URL**: Will be `https://<your-site>.netlify.app/.netlify/functions/slack` (set after deploy) or `https://<netlify-dev-url>/.netlify/functions/slack` when using `netlify dev --live`.

## 3) OAuth & Permissions
- **Bot Token Scopes (minimum):**
  - `channels:history` (receive message events in public channels)
  - `groups:history` (if you want private channels the bot is added to)
  - `im:history` (if you want DMs)
  - `reactions:write` (add emoji reactions)
  - `reactions:read` (optional, useful for debugging reaction behavior)
- **User Token Scopes:** none needed.
- Save changes.

## 4) Event Subscriptions
- Enable “Event Subscriptions”.
- Request URL: set to your Netlify function URL once deployed (or the live dev tunnel). Slack will expect 200 OK on the challenge.
- Subscribe to bot events:
  - `message.channels`
  - `message.groups` (only if you need private channels)
  - `message.im` (only if you need DMs)
- Save changes.

## 5) Install the App
- From “Install App”, click “Install to Workspace”.
- Copy the **Bot User OAuth Token** (`xoxb-...`).
- From “Basic Information”, copy the **Signing Secret**.

## 6) Configure Environment
- Set environment variables (Netlify UI → Site settings → Build & deploy → Environment):
  - `SLACK_BOT_TOKEN` = Bot token (`xoxb-...`)
  - `SLACK_SIGNING_SECRET` = Signing secret
- For local dev, create `.env` with the same keys (not committed).

## 7) Deploy to Netlify
- Ensure Netlify function exists at `netlify/functions/slack.js` (already in repo).
- Deploy: `netlify deploy --prod` or your CI/CD path. Verify the deployed URL matches the Event Request URL.
- If using `netlify dev --live` for testing, update the Slack Request URL temporarily to the live tunnel.

## 8) Channel Setup & Testing
- Add the bot to channels where you want BRB reactions (`/invite @BRB Reaction Bot`).
- Post sample messages:
  - `brb` / `BRB` / `brb.` / `hey, brb!` → expect `:waving-from-afar-right:` and `:wave:` reactions every time.
  - Non-matching text (`barb`, `brbbb`) → no reactions.
- Confirm behavior in any private channels/DMs you enabled via scopes/events.

## 9) Production Hardening (optional)
- Lock down scopes to only what you need (drop `message.groups`/`message.im` if unused).
- Rotate tokens/secrets periodically; update Netlify env vars accordingly.
- Monitor Netlify logs for reaction errors (look for “Failed to add reaction”).
