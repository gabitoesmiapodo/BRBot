const { containsAwayPattern } = require("./awayDetector");
const { reactWithEmoji } = require("./reactWithEmoji");

function registerHandlers(app) {
  app.message(async ({ message, client }) => {
    if (!message?.text || !containsAwayPattern(message.text)) {
      return;
    }

    const payload = { channel: message.channel, timestamp: message.ts };
    await reactWithEmoji(client, { ...payload, emoji: "waving-from-afar-right" });
    await reactWithEmoji(client, { ...payload, emoji: "wave" });
  });
}

module.exports = { registerHandlers };
