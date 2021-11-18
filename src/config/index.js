const path = require('path');
const os = require('os');
const fs = require('fs');

const isDEV = process.env.NODE_ENV !== 'production';

const CWD = isDEV
  ? path.resolve(__dirname, '../../tmp/free4talk')
  : path.resolve(fs.existsSync('/tmp') ? '/tmp' : os.tmpdir(), 'free4talk');

if (!fs.existsSync(CWD)) {
  fs.mkdirSync(CWD);
}

module.exports = {
  isDEV,
  cwd: CWD,
  serverFile: isDEV
    ? path.resolve(__dirname, '../server.js')
    : path.resolve(CWD, 'server.js'),
  port: 8888,
  torrent: {
    name: `torrent-stream`,
    connections: 100, // Max amount of peers to be connected to.
    uploads: 0, // Number of upload slots.
    tmp: CWD, // Root folder for the files storage.
    // Defaults to '/tmp' or temp folder specific to your OS.
    // Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
    path: path.resolve(CWD, 'downloads'), // Where to save the files. Overrides `tmp`.
    verify: true, // Verify previously stored data before starting
    // Defaults to true
    dht: true, // Whether or not to use DHT to initialize the swarm.
    // Defaults to true
    tracker: true, // Whether or not to use trackers from torrent file or magnet link
    // Defaults to true
    trackers: [],
    // Allows to declare additional custom trackers to use
    // Defaults to empty
    // storage: myStorage()  // Use a custom storage backend rather than the default disk-backed one
  },
};
