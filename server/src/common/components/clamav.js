const NodeClam = require("clamscan");

//"clamav:3310"
//"127.0.0.1:3310"

module.exports = async () => {
  async function createClamscan() {
    // You'll need to specify your socket or TCP connection info
    const clamscan = await new NodeClam().init({
      debugMode: true, // This will put some debug info in your js console
      clamdscan: {
        host: "127.0.0.1",
        port: 3310,
        bypassTest: false,
      },
    });

    const scanString = async (fileContent) => {
      const Readable = require("stream").Readable;
      const rs = Readable();

      console.log("fileContent: ", fileContent.length);
      //rs.push("X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*");
      rs.push(fileContent);
      rs.push(null);

      /*const result = await clamscan.scanStream(rs, (err, result) => {
        console.log(err, result, result.isInfected);
        if (err) {
          console.log("scan error ", err);
          return "scan_error";
        }
        console.log("ICI");
        if (result.isInfected) {
          return "infected";
        }
        console.log("LA");
        return "clean";
      });*/
      let { file, isInfected, viruses } = await clamscan.scanStream(rs);

      console.log("scan result : ", isInfected, viruses);

      var path = require("path");

      console.log(path.resolve("./src/assets/test_eicar.pdf"));
      ({ file, isInfected, viruses } = await clamscan.isInfected(path.resolve("./src/assets/test_eicar.pdf")));

      console.log("scan result with path : ", file, isInfected, viruses);

      return isInfected;
    };

    return {
      scanner: clamscan,
      scanString,
      getVersion: async () => {
        return await clamscan.getVersion();
      },
    };
  }

  return { ...(await createClamscan()) };
};

/*
var tcpPortUsed = require("tcp-port-used");

let promise;
async function getClamscan(uri) {
  if (promise) {
    return promise;
  }

  return new Promise((resolve, reject) => {
    let [host, port] = uri.split(":");
    tcpPortUsed
      .waitUntilUsedOnHost(parseInt(port), host, 500, 30000)
      .then(() => {
        let clamscan = new NodeClam().init({
          clamdscan: {
            host,
            port,
          },
        });
        resolve(clamscan);
      })
      .catch(reject);
  });
}


module.exports = async (uri) => {
  async function getScanner() {
    let clamscan = await getClamscan(uri);
    let scanStream = clamscan.passthrough();
    let scanResults = new Promise((resolve) => {
      scanStream.on("scan-complete", (res) => {
        resolve(res);
      });
    });

    return {
      scanStream,
      getScanResults: () => scanResults,
    };
  }

  return { getScanner };
};
*/
