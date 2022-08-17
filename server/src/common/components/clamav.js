const NodeClam = require("clamscan");
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

/*
const NodeClam = require('clamscan');

// You'll need to specify your socket or TCP connection info
const clamscan = new NodeClam().init({
    clamdscan: {
        socket: '/var/run/clamd.scan/clamd.sock',
        host: '127.0.0.1',
        port: 3310,
    }
});
const Readable = require('stream').Readable;
const rs = Readable();

rs.push('foooooo');
rs.push('barrrrr');
rs.push(null);

clamscan.scanStream(stream, (err, isInfected) => {
    if (err) return console.error(err);
    if (isInfected) return console.log("Stream is infected! Booo!");
    console.log("Stream is not infected! Yay!");
});



*/

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
