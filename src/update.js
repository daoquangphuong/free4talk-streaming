const path = require('path');
const fs = require('fs');
const { axiosFetch } = require('./models/axios');

const ROOT =
  process.env.NODE_ENV !== 'production'
    ? path.resolve(__dirname, '../dest')
    : path.resolve(__dirname);

const GIT_ENDPOINT = `https://github.com/daoquangphuong/free4talk-streaming/tree/master/dest`;
const GIT_RAW_ENDPOINT = `https://raw.githubusercontent.com/daoquangphuong/free4talk-streaming/master/dest`;

const getCurrentVersion = async () => {
  try {
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
  const fileMatches = data.match(
    /"\/daoquangphuong\/free4talk-streaming\/blob\/master\/dest\/(.+?)"/g
  );
  const files = fileMatches.map(item => {
    const match = item.match(
      /"\/daoquangphuong\/free4talk-streaming\/blob\/master\/dest\/(.+?)"/
    );
    return match[1];
  });
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

const check = async () => {
  const currentVer = (await getCurrentVersion()).split('.');
  const nextVer = (await getNextVersion()).split('.');
  while (currentVer.length < nextVer.length) {
    currentVer.push('0');
  }
  while (nextVer.length < currentVer.length) {
    nextVer.push('0');
  }
  const hasNewVersion = nextVer.some((v, k) => v > currentVer[k]);
  if (!hasNewVersion) {
    return;
  }
  console.info(`Has New Version ${nextVer.join('.')}`);
  console.info('Updating...');
  console.info('Please wait...');
  const folder = await getGitFolder();
  let seq = Promise.resolve();
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
