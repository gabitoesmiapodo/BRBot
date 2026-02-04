const { reactWithEmoji } = require("../src/reactWithEmoji");

function createClient(mockImpl) {
  return { reactions: { add: jest.fn(mockImpl) } };
}

describe("reactWithEmoji", () => {
  const payload = { channel: "C123", timestamp: "123.456", emoji: "wave" };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("adds reaction when call succeeds", async () => {
    const client = createClient(() => Promise.resolve());
    await expect(reactWithEmoji(client, payload)).resolves.toBeUndefined();
    expect(client.reactions.add).toHaveBeenCalledWith({
      channel: payload.channel,
      timestamp: payload.timestamp,
      name: payload.emoji,
    });
  });

  it("swallows already_reacted errors", async () => {
    const client = createClient(() =>
      Promise.reject({ data: { error: "already_reacted" } })
    );
    await expect(reactWithEmoji(client, payload)).resolves.toBeUndefined();
  });

  it("rethrows other errors", async () => {
    const err = new Error("nope");
    jest.spyOn(console, "error").mockImplementation(() => {});
    const client = createClient(() => Promise.reject(err));
    await expect(reactWithEmoji(client, payload)).rejects.toBe(err);
  });
});
