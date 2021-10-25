const crypto = require("crypto");
const config = require("config");

const secret = Buffer.alloc(32, config?.private?.secretUpdateRomesMetiers || "1234");
const algo = "aes-256-ctr";
const inputEncoding = "utf8";
const outputEncoding = "hex";
const weakIv = Buffer.alloc(16, 0); // iv 0000... volontairement

const cipher = crypto.createCipheriv(algo, secret, weakIv);
const decipher = crypto.createDecipheriv(algo, secret, weakIv);

const encrypt = (value) => {
  let crypted = cipher.update(value, inputEncoding, outputEncoding);
  return crypted.toString();
};

const decrypt = (value) => {
  let decrypted = decipher.update(value, outputEncoding, inputEncoding);
  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
  test,
};
