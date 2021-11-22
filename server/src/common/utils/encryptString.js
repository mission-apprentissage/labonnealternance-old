const crypto = require("crypto");
const config = require("config");

const secret = Buffer.alloc(32, config?.private?.secretUpdateRomesMetiers || "1234");
const algo = "aes-256-ctr";
const inputEncoding = "utf8";
const outputEncoding = "hex";
const weakIv = Buffer.alloc(16, 0); // iv 0000... volontairement

const encrypt = (value, iv) => {
  const cipher = crypto.createCipheriv(algo, secret, iv || weakIv);
  let crypted = cipher.update(value, inputEncoding, outputEncoding);
  crypted += cipher.final(outputEncoding);
  return crypted.toString();
};

const encryptMailWithIV = (value) => {
  const iv = crypto.randomBytes(16);

  if (value) {
    return {
      email: encrypt(value, iv),
      iv: iv.toString(outputEncoding),
    };
  } else return { email: "" };
};

const encryptIdWithIV = (id) => {
  const iv = crypto.randomBytes(16);

  if (id) {
    return {
      id: encrypt(id, iv),
      iv: iv.toString(outputEncoding),
    };
  } else return { id: "" };
};

const decrypt = (value, iv) => {
  const decipher = crypto.createDecipheriv(algo, secret, iv || weakIv);
  let decrypted = decipher.update(value, outputEncoding, inputEncoding);
  decrypted += decipher.final(inputEncoding);
  return decrypted.toString();
};

const decryptWithIV = (value, ivHex) => {
  const iv = Buffer.from(ivHex, "hex");
  return decrypt(value, iv);
};

module.exports = {
  encrypt,
  encryptMailWithIV,
  encryptIdWithIV,
  decrypt,
  decryptWithIV,
};
