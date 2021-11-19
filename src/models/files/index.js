const fs = require('fs');
const util = require('util');
const getFolderSize = util.promisify(require('get-folder-size'));
const config = require('../../config');

const cache = {};

const getInfo = async () => {
  if (!cache.length || Date.now() - cache.time > 5000) {
    cache.length = !fs.existsSync(config.torrent.path)
      ? 0
      : await getFolderSize(config.torrent.path);
    cache.time = Date.now();
  }
  return { length: cache.length };
};

module.exports = {
  getInfo,
};
