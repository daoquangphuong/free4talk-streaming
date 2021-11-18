const prettyBytes = require('pretty-bytes');
const torrent = require('../models/torrent');
const config = require('../config');

module.exports = async function getFiles(req, res, next) {
  try {
    const { url } = req.body;

    const files = await torrent.getMp4Files(url);

    next({
      files: files.map(file => ({
        name: file.name,
        path: file.path,
        length: file.length,
        size: prettyBytes(file.length),
        url: `http://localhost:${
          config.port
        }/streaming/get/video?url=${encodeURIComponent(
          url
        )}&path=${encodeURIComponent(file.path)}`,
      })),
    });
  } catch (e) {
    next(e);
  }
};
