const NodeClam = require("clamscan");
const config = require("config");
var tcpPortUsed = require("tcp-port-used");
const logger = require("../logger");

async function getClamscan() {
  const port = 3310;
  const host = config.env === "local" ? "localhost" : "clamav";

  return new Promise((resolve, reject) => {
    tcpPortUsed
      .waitUntilUsedOnHost(parseInt(port), host, 500, 30000)
      .then(() => {
        console.log("le port clamav est en écoute");
        const params = {
          debugMode: config.env === "local" ? true : false, // This will put some debug info in your js console
          clamdscan: {
            host,
            port,
            bypassTest: false,
          },
        };

        let clamscan = new NodeClam().init(params);
        resolve(clamscan);
      })
      .catch(reject);
  });
}

module.exports = async () => {
  async function createClamscan() {
    logger.error(`env ? ${config.env}`);

    try {
      //logger.error("Clamav init : " + JSON.stringify(params));

      const clamscan = await getClamscan(); //await new NodeClam().init(params);

      const scanString = async (fileContent) => {
        const Readable = require("stream").Readable;

        /*
      const eicarStr = "X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*";
      const utf8Encode = new TextEncoder();
      const eicarByteArray = utf8Encode.encode(eicarStr);
      const eicarBuffer = Buffer.from(eicarByteArray);
      const rs = Readable.from(eicarBuffer);
      let { isInfected, viruses } = await clamscan.scanStream(rs);
      console.log("scan result EICAR String : ", isInfected, viruses);
      */

        // le fichier est encodé en base 64 à la suite d'un en-tête.
        const decodedAscii = Readable.from(
          Buffer.from(fileContent.substring(fileContent.indexOf(";base64,") + 8), "base64").toString("ascii")
        );
        const rs = Readable.from(decodedAscii);
        const { isInfected, viruses } = await clamscan.scanStream(rs);

        if (isInfected) {
          console.log("VIRUS : ", isInfected, viruses);
        }

        return isInfected;
      };

      return {
        scanner: clamscan,
        scanString,
        getVersion: async () => {
          return await clamscan.getVersion();
        },
      };
    } catch (err) {
      console.log("error init clamav ", err);
      logger.error("Error initializing clamav connexion", err);
      return {};
    }
  }

  return { ...(await createClamscan()) };
};
