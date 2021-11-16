process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');

const app = express();

app.use('/streaming', cors(), routes);

app.listen(config.port, () => {
  console.info(
    `
Free4Talk-Streaming-Server is started.
You can comeback Free4Talk and start to use Streaming.
  `.trim()
  );
  if (process.env.NODE_ENV !== 'production') {
    console.info(
      `You can now view free4talk-streaming-server in the browser. \n\n http://localhost:${config.port} \n`
    );
  }
});
