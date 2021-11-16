const torrent = require('../models/torrent');

const getSegment = (range, size) => {
  let [start, end] = range.replace(/bytes=/, '').split('-');
  start = parseInt(start, 10);
  end = end ? parseInt(end, 10) : size - 1;

  if (!Number.isNaN(start) && Number.isNaN(end)) {
    end = size - 1;
  }
  if (Number.isNaN(start) && !Number.isNaN(end)) {
    start = size - end;
    end = size - 1;
  }

  return { start, end };
};

module.exports = async function getVideo(req, res, next) {
  try {
    const { url, path } = req.query;

    const file = await torrent.getFile(url, path);

    const size = file.length;
    const { range } = req.headers;
    let stream;
    if (range) {
      /** Extracting Start and End value from Range Header */
      const { start, end } = getSegment(range, size);
      // Handle unavailable range request
      if (start >= size || end >= size) {
        // Return the 416 Range Not Satisfiable.
        res.writeHead(416, {
          'Content-Range': `bytes */${size}`,
        });
        res.end();
        return;
      }

      /** Sending Partial Content With HTTP Code 206 */
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
      });

      stream = file.createReadStream({ start, end });
    } else {
      res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'video/mp4',
      });

      stream = file.createReadStream();
    }

    stream.pipe(res);

    res.on('close', () => {
      stream.destroy();
    });
  } catch (e) {
    next(e);
  }
};
