const crypto = require("crypto");
const config = require("config");

const secret = Buffer.alloc(32, config?.private?.secretUpdateRomesMetiers || "1234");
const algo = "aes-256-ctr";
const inputEncoding = "utf8";
const outputEncoding = "hex";
const weakIv = Buffer.alloc(16, 0); // iv 0000... volontairement

const encrypt = (value) => {
  const cipher = crypto.createCipheriv(algo, secret, weakIv);
  let crypted = cipher.update(value, inputEncoding, outputEncoding);
  crypted += cipher.final(outputEncoding);
  return crypted.toString();
};

const decrypt = (value) => {
  const decipher = crypto.createDecipheriv(algo, secret, weakIv);
  let decrypted = decipher.update(value, outputEncoding, inputEncoding);
  decrypted += decipher.final(inputEncoding);
  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
