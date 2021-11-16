// eslint-disable-next-line
module.exports = function error(err, req, res, next) {
  if (err instanceof Error) {
    console.error(err.stack);
    res.set({ Connection: 'close' });
    res.status(500).json({
      success: false,
      type: err.type,
      title: err.title,
      error: err.message,
      data: null,
    });
  } else if (err instanceof Buffer) {
    res.set({
      'Content-Type': 'application/json',
      'Content-Length': err.length,
    });
    res.write(err);
    res.end();
  } else {
    res.json({
      success: true,
      error: null,
      data: err,
    });
  }
};
