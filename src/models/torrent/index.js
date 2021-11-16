const torrentStream = require('torrent-stream');
const tracker = require('../tracker');
const config = require('../../config');

const cache = {};

const getMp4Files = async (magnetUrl, destroy = true) => {
  const trackers = await tracker.getTrackers();
  const opts = {
    ...config.torrent,
    trackers,
  };
  const engine = torrentStream(magnetUrl, opts);

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      engine.destroy();
      reject(new Error('Get Magnet Info Timeout'));
    }, 30000);

    engine.on('ready', () => {
      clearTimeout(timeout);
      const mp4Files = engine.files.filter(file => {
        file.deselect();
        file.engine = engine;
        return file.name.endsWith('.mp4');
      });
      if (destroy) {
        engine.destroy();
      }
      resolve(mp4Files);
    });
  });
};

const getFile = async (magnetUrl, path) => {
  if (cache.file) {
    if (cache.magnetUrl === magnetUrl && cache.path === path) {
      return cache.file;
    }
    cache.file.engine.destroy();
  }
  const files = await getMp4Files(magnetUrl, false);
  const file = files.find(i => i.path === path);
  if (!file) {
    throw new Error('File is not found');
  }
  cache.magnetUrl = magnetUrl;
  cache.path = path;
  cache.file = file;
  return file;
};

module.exports = {
  getMp4Files,
  getFile,
};
