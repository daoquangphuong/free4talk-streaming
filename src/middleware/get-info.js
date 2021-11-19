const prettyBytes = require('pretty-bytes');
const { getCurrentVersion } = require('../update');
const files = require('../models/files');
const config = require('../config');

module.exports = async function getInfo(req, res, next) {
  try {
    const ver = await getCurrentVersion();
    const fileInfo = await files.getInfo();
    next({
      ver,
      path: config.torrent.path,
      size: prettyBytes(fileInfo.length),
    });
  } catch (e) {
    next(e);
  }
};
