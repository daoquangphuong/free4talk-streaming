const path = require('path');
const fs = require('fs');
const { axiosFetch } = require('./models/axios');
const config = require('./config');

const ROOT = config.isDEV ? path.resolve(__dirname, '../dest') : config.cwd;

const GIT_ENDPOINT = `https://github.com/daoquangphuong/free4talk-streaming/tree/master/dest`;
const GIT_RAW_ENDPOINT = `https://raw.githubusercontent.com/daoquangphuong/free4talk-streaming/master/dest`;

const getCurrentVersion = async () => {
  try {
    if (!fs.existsSync(path.resolve(ROOT, 'package.json'))) {
      return `0.0.0`;
    }
    const packageJson = fs.readFileSync(
      path.resolve(ROOT, 'package.json'),
      'utf8'
    );
    const json = JSON.parse(packageJson);
    const { version } = json;
    return version;
  } catch (e) {
    console.error(e);
    return `0.0.0`;
  }
};

const getGitFolder = async () => {
  const { data } = await axiosFetch({
    url: `${GIT_ENDPOINT}`,
    method: 'GET',
    responseType: 'text',
    transformResponse: [res => res],
  });
  const payloadMatch = data.match(/>({"payload":.+?})</);
  if (!payloadMatch) {
    throw new Error('not found payloadMatch');
  }
  const { payload } = JSON.parse(payloadMatch[1]);
  const files = payload.tree.items.map(i => i.name);
  return files;
};

const getGitFile = async filePath => {
  const { data } = await axiosFetch({
    url: `${GIT_RAW_ENDPOINT}/${filePath}`,
    method: 'GET',
    responseType: 'text',
    transformResponse: [res => res],
  });
  return data;
};

const getNextVersion = async () => {
  try {
    const packageJson = await getGitFile('package.json');
    const json = JSON.parse(packageJson);
    const { version } = json;
    return version;
  } catch (e) {
    console.error(e);
    return `0.0.0`;
  }
};

const updateFile = async fileName => {
  const fileContent = await getGitFile(fileName);
  fs.writeFileSync(path.resolve(ROOT, fileName), fileContent, 'utf8');
};

const checkHasNewVersion = (currentVer, nextVer) => {
  const c = currentVer.split('.');
  const n = nextVer.split('.');
  while (c.length < n.length) {
    c.push('0');
  }
  while (n.length < c.length) {
    n.push('0');
  }
  return n.some((v, k) => v > c[k]);
};

const checkHasServerFile = () => {
  return fs.existsSync(path.resolve(config.serverFile));
};

const check = async () => {
  const currentVer = await getCurrentVersion();
  const nextVer = await getNextVersion();
  const hasNewVersion = checkHasNewVersion(currentVer, nextVer);
  const hasServerFile = checkHasServerFile();
  if (!hasNewVersion && hasServerFile) {
    return;
  }
  console.info(`Has New Version ${nextVer}`);
  console.info('Updating...');
  console.info('Please wait...');
  const folder = await getGitFolder();
  let seq = Promise.resolve();
  folder.sort((a, b) => {
    const aP = a === 'package.json';
    const bP = b === 'package.json';
    return aP - bP;
  });
  folder.forEach((fileName, idx) => {
    seq = seq.then(async () => {
      console.info(`${idx + 1}/${folder.length} Updating ${fileName}`);
      await updateFile(fileName);
    });
  });

  await seq;
};

module.exports = {
  getCurrentVersion,
  getNextVersion,
  check,
};
