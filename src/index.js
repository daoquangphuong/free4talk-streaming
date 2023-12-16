process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const { Worker } = require('worker_threads');
const config = require('./config');
const update = require('./update');

setTimeout(() => {}, 30000); // to keep process work in 30 seconds.

const main = async () => {
  await update.check();
  const worker = new Worker(config.serverFile);
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
