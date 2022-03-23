const assert = require("assert");
const { isOriginLocal } = require("../../src/common/utils/isOriginLocal");
const { encrypt, decrypt } = require("../../src/common/utils/encryptString");

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
    const result = isOriginLocal("http://localhost:3003");
    assert.strictEqual(result, true);
  });

  it("Détection origine autorisée - retourne true si origine connue labonnealternance.apprentissage.beta.gouv.fr", () => {
    const result = isOriginLocal("https://labonnealternance.apprentissage.beta.gouv.fr/");
    assert.strictEqual(result, true);
  });

  it("Détection origine autorisée - retourne true si origine connue labonnealternance-recette.apprentissage.beta.gouv.fr/recherche-apprentissage?isTrainingOnly=1", () => {
    const result = isOriginLocal(
      "https://labonnealternance.apprentissage.beta.gouv.fr/recherche-apprentissage?isTrainingOnly=1"
    );
    assert.strictEqual(result, true);
  });

  it("Encryption décryption fonctionne", () => {
    const value = "Chaîne@crypter";

    const encryptedValue = encrypt({ value });
    const decryptedValue = decrypt(encryptedValue);

    assert.notStrictEqual(value, encryptedValue);
    assert.strictEqual(value, decryptedValue);
  });
});
