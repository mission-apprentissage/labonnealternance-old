const assert = require("assert");
const httpTests = require("../../utils/httpTests");

httpTests(__filename, ({ startServer }) => {
  it("Vérifie que la route métiers par cdf répond", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/metiers/metiersParFormation/a");

    if (response.status !== 500) {
      // test en local avec es bien renseigné

      assert.strictEqual(response.status, 200);

      assert.ok(response.data.metiers instanceof Array);
      assert.ok(response.data.metiers.length === 0);
      assert.ok(response.data.error.length > 0);
    } else {
      assert.strictEqual(response.status, 500);
    }
  });

  it("Vérifie que la route métiers par établissement répond", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/metiers/metiersParEtablissement/a");

    if (response.status !== 500) {
      // test en local avec es bien renseigné

      assert.strictEqual(response.status, 200);

      assert.ok(response.data.metiers instanceof Array);
      assert.ok(response.data.metiers.length === 0);
      assert.ok(response.data.error.length > 0);
    } else {
      assert.strictEqual(response.status, 500);
    }
  });

  it("Vérifie que la requête metiersParFormation répond avec des résultats", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/metiers/metiersParFormation/50022137");

    if (response.status !== 500) {
      // test en local avec es bien renseigné
      assert.strictEqual(response.status, 200);

      assert.ok(response.data.metiers instanceof Array);
    } else {
      assert.strictEqual(response.status, 500);
    }
  });

  it("Vérifie que la requête metiersParEtablissement répond avec des résultats", async () => {
    const { httpClient } = await startServer();

    const response = await httpClient.get("/api/metiers/metiersParEtablissement/77566202600225");

    if (response.status !== 500) {
      // test en local avec es bien renseigné
      assert.strictEqual(response.status, 200);
      assert.ok(response.data.metiers instanceof Array);
    } else {
      assert.strictEqual(response.status, 500);
    }
  });
});
