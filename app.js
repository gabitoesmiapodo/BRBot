const { App } = require("@slack/bolt");
const { registerHandlers } = require("./src/registerHandlers");
const { requireEnv } = require("./src/requireEnv");
require("dotenv").config();

requireEnv(["SLACK_BOT_TOKEN", "SLACK_SIGNING_SECRET"]);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

registerHandlers(app);

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bot is running!");
})();
