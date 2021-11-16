const { parentPort } = require('worker_threads');

module.exports = async function update(req, res, next) {
  try {
    next(true);
    res.on('close', () => {
      parentPort.postMessage({ event: 'update' });
    });
  } catch (e) {
    next(e);
  }
};
