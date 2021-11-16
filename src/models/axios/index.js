const axios = require('axios');

const defaultConfigs = {
  headers: { 'Accept-Encoding': '' },
  timeout: 10000,
  decompress: false,
  validateStatus() {
    return true;
  },
};

const axiosFetch = axios.create({
  ...defaultConfigs,
});

module.exports = {
  axios,
  axiosFetch,
};
