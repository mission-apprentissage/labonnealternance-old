const assert = require("assert");
const { isOriginLocal } = require("../../src/common/utils/isOriginLocal");

describe(__filename, () => {
  it("Détection origine autorisée - retourne false si undefined ", () => {
    const result = isOriginLocal(undefined);
    assert.strictEqual(result, false);
  });

  it("Détection origine autorisée - retourne false si origine inconnue ", () => {
    const result = isOriginLocal("fauxDomaine");
    assert.strictEqual(result, false);
  });

  it("Détection origine autorisée - retourne true si origine connue localhost ", () => {
    const result = isOriginLocal("http://localhost:3003/");
    assert.strictEqual(result, true);
  });

  it("Détection origine autorisée - retourne true si origine connue labonnealternance.apprentissage.beta.gouv.fr", () => {
    const result = isOriginLocal("https://labonnealternance.apprentissage.beta.gouv.fr/");
    assert.strictEqual(result, true);
  });
});
