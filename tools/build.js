const fsExtra = require('fs-extra');
const webpack = require('webpack');
const path = require('path');

function webpackBundle(config) {
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.info(stats.toString());
      if (stats.hasErrors()) {
        return reject(new Error('Webpack compilation errors'));
      }

      return resolve();
    });
  });
}

const root = path.resolve(__dirname, '..');

const serverPath = path.resolve(root, 'src');
const deployPath = path.resolve(root, 'dest');

const webpackConfig = {
  mode: 'production',
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false,
  },
  entry: {
    index: path.resolve(serverPath, 'index.js'),
    server: path.resolve(serverPath, 'server.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(deployPath),
  },
  devtool: 'source-map',
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  // externals: [
  //   (context, request, callback) => {
  //     if (/^[^./].*$/.test(request)) {
  //       return callback(null, `require("${request}");`);
  //     }
  //     return callback();
  //   },
  // ],
  // plugins: [
  //   new webpack.BannerPlugin({
  //     banner: 'require("source-map-support").install();',
  //     raw: true,
  //     entryOnly: false,
  //   }),
  // ],
};

async function deploy() {
  await fsExtra.remove(deployPath);

  await fsExtra.ensureDir(deployPath);

  await webpackBundle(webpackConfig);

  const includeServerCopy = ['package.json'];

  includeServerCopy.forEach(item => {
    fsExtra.copySync(
      path.resolve(serverPath, item),
      path.resolve(deployPath, item)
    );
  });
}

Promise.resolve()
  .then(() => {
    return deploy();
  })
  .catch(err => {
    console.error(err);
  });
