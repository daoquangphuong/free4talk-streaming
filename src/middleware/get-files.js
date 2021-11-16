const torrent = require('../models/torrent');

module.exports = async function getFiles(req, res, next) {
  try {
    const { url } = req.body;

    const files = await torrent.getMp4Files(url);

    next({
      files: files.map(file => ({
        name: file.name,
        path: file.path,
        length: file.length,
      })),
    });
  } catch (e) {
    next(e);
  }
};
