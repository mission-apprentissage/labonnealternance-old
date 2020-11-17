const assert = require("assert");
const httpTests = require("../../utils/httpTests");
const isSemver = require("is-semver");

httpTests(__filename, ({ startServer }) => {
  
  it("Vérifie que la route répond", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/version");

    assert.strictEqual(response.status, 200);
  });

  it("Vérifie que la route répond avec une version au format semver", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/version");

    assert(isSemver(response.data.version));
  });

});
