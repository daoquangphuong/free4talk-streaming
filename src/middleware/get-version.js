const { getCurrentVersion } = require('../update');

module.exports = async function getVersion(req, res, next) {
  try {
    const ver = await getCurrentVersion();
    next({
      ver,
    });
  } catch (e) {
    next(e);
  }
};
