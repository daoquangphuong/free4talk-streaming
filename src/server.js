if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  require('source-map-support').install();
}
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');

const app = express();

app.use('/streaming', cors(), routes);

app.listen(config.port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.info(
      `You can now view free4talk-streaming-server in the browser. \n\n http://localhost:${config.port} \n`
    );
    return;
  }
  console.info(
    `
---------------------------------------------------------
[      Free4Talk-Streaming-Server is now running.       ]
[                                                       ]
[   Comebacks Free4Talk and start to use Streaming.     ]
---------------------------------------------------------
  `
  );
});
