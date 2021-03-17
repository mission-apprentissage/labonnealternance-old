const assert = require("assert");
const httpTests = require("../../utils/httpTests");

httpTests(__filename, ({ startServer }) => {
  it("Vérifie que la route répond", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/updateRomesMetiers");

    assert.strictEqual(response.status, 200);
    assert.ok(response.data.error.indexOf("secret_missing") >= 0);
  });

  it("Vérifie que le service refuse un mauvais secret", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/updateRomesMetiers?secret=123");

    assert.ok(response.data.error.indexOf("wrong_secret") >= 0);
  });
});
