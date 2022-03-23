const crypto = require("crypto");
const config = require("config");

const secretLba = Buffer.alloc(32, config?.private?.secretUpdateRomesMetiers || "1234");
const secret1j1s = Buffer.alloc(32, config?.private?.secret1j1s || "5678");

const algo = "aes-256-ctr";
const inputEncoding = "utf8";
const outputEncoding = "hex";
const weakIv = Buffer.alloc(16, 0); // iv 0000... volontairement

const encrypt = ({ value, iv, secret }) => {
  const cipher = crypto.createCipheriv(algo, secret || secretLba, iv || weakIv);
  let crypted = cipher.update(value, inputEncoding, outputEncoding);
  crypted += cipher.final(outputEncoding);
  return crypted.toString();
};

const encryptFor1j1s = ({ value, iv }) => {
  return encrypt({ value, iv, secret: secret1j1s });
};

const encryptMailWithIV = ({ value }) => {
  const iv = crypto.randomBytes(16);

  if (value) {
    return {
      email: encrypt({ value, iv }),
      iv: iv.toString(outputEncoding),
    };
  } else return { email: "" };
};

const encryptIdWithIV = (id) => {
  const iv = crypto.randomBytes(16);

  if (id) {
    return {
      id: encrypt({ value: id, iv }),
      iv: iv.toString(outputEncoding),
    };
  } else return { id: "" };
};

const decrypt = (value, iv) => {
  const decipher = crypto.createDecipheriv(algo, secretLba, iv || weakIv);
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
  encryptFor1j1s,
  encryptMailWithIV,
  encryptIdWithIV,
  decrypt,
  decryptWithIV,
};
