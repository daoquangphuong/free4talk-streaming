const { getCurrentVersion } = require('../update');

module.exports = async function version(req, res, next) {
  try {
    const ver = await getCurrentVersion();
    next({
      ver,
    });
  } catch (e) {
    next(e);
  }
};
