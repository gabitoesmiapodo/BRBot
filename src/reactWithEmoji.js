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
