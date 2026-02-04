const { App, AwsLambdaReceiver } = require("@slack/bolt");
const { registerHandlers } = require("../../src/registerHandlers");
const { requireEnv } = require("../../src/requireEnv");
require("dotenv").config();

requireEnv(["SLACK_BOT_TOKEN", "SLACK_SIGNING_SECRET"]);

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  receiver: awsLambdaReceiver,
  processBeforeResponse: true,
});

registerHandlers(app);

const slackHandlerPromise = awsLambdaReceiver.start();

module.exports.handler = async (event, context, callback) => {
  const slackHandler = await slackHandlerPromise;
  return slackHandler(event, context, callback);
};
