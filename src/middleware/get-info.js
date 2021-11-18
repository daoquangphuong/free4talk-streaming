const { getCurrentVersion } = require('../update');
const config = require('../config');

module.exports = async function getInfo(req, res, next) {
  try {
    const ver = await getCurrentVersion();
    next({
      ver,
      path: config.torrent.path,
    });
  } catch (e) {
    next(e);
  }
};
