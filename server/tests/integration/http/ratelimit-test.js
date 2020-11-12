const assert = require("assert");
const httpTests = require("../../utils/httpTests");
const config = require("config");

httpTests(__filename, ({ startServer }) => {
  it("rate-limit : 4 requêtes consécutives : les 3 premières sont acceptées, mais pas la 4ème", async () => {
    const { httpClient } = await startServer();

    const response1 = await httpClient.get("/api");
    const response2 = await httpClient.get("/api");
    const response3 = await httpClient.get("/api");
    const response4 = await httpClient.get("/api");

    assert.strictEqual(response1.status, 200);
    assert.strictEqual(response2.status, 200);
    assert.strictEqual(response3.status, 200);
    assert.notEqual(response4.status, 200);
  });
});
