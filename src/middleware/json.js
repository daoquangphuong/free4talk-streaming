function beforeJsonParse(req, res, next) {
  if (req.method !== 'POST') {
    next();
    return;
  }
  if (req.query.a) {
    req.headers['content-type'] = 'application/json';
    delete req.query.a;
  }
  next();
}

function afterJsonParse(req, res, next) {
  if (req.method !== 'POST') {
    next();
    return;
  }
  if (req.body && req.body.body) {
    req.body = req.body.body;
  }
  next();
}

module.exports = function json(type) {
  return type === 'before' ? beforeJsonParse : afterJsonParse;
};
