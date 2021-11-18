const express = require('express');
const bodyParser = require('body-parser');
const delay = require('../middleware/delay');
const ping = require('../middleware/ping');
const error = require('../middleware/error');
const json = require('../middleware/json');
const update = require('../middleware/update');
const getInfo = require('../middleware/get-info');
const getFiles = require('../middleware/get-files');
const getVideo = require('../middleware/get-video');

const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
  router.use(delay());
}

router.use('/ping', ping);

router.use(json('before'));

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.use(json('after'));

router.post('/post/update', update);

router.post('/get/info', getInfo);

router.post('/get/files', getFiles);

router.get('/get/video', getVideo);

// error handler
router.use(error);

module.exports = router;
