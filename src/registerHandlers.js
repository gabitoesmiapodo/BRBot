const { containsAwayPattern } = require("./awayDetector");
const { reactWithEmoji } = require("./reactWithEmoji");

const SKIN_TONES = ["", "::skin-tone-2", "::skin-tone-3", "::skin-tone-4", "::skin-tone-5", "::skin-tone-6"];

function randomSkinTone() {
  return SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)];
}

function registerHandlers(app) {
  app.message(async ({ message, client }) => {
    if (!message?.text || !containsAwayPattern(message.text)) {
      return;
    }

    const payload = { channel: message.channel, timestamp: message.ts };
    await reactWithEmoji(client, { ...payload, emoji: "waving-from-afar-right" });
    await reactWithEmoji(client, { ...payload, emoji: `wave${randomSkinTone()}` });
    await reactWithEmoji(client, { ...payload, emoji: "BRBot" });
  });
}

module.exports = { registerHandlers };
