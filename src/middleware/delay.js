module.exports = (timeout = 1000) => {
  return async function delay(req, res, next) {
    await new Promise(resolve => setTimeout(resolve, timeout));
    next();
  };
};
