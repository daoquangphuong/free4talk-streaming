process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const { Worker } = require('worker_threads');
const path = require('path');
const update = require('./update');

const main = async () => {
  await update.check();
  const worker = new Worker(path.resolve(__dirname, 'server.js'));
  worker.on('message', data => {
    if (data && data.event === 'update') {
      worker.terminate();
      main().catch(console.error);
    }
  });
  worker.on('error', console.error);
  worker.on('exit', code => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
};

main().catch(console.error);
