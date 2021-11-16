const ms = require('ms');
const { axiosFetch } = require('../axios');

const cache = {};

const getTrackers = async () => {
  if (cache.trackers && Date.now() - cache.at < ms('1h')) {
    return cache.trackers;
  }

  const { data } = await axiosFetch({
    url: 'https://newtrackon.com/api/stable',
    method: 'GET',
  });

  const trackers = (data || '')
    .split('\n')
    .filter(Boolean)
    .map(i => i.replace('/announce', ''));

  if (trackers.length) {
    cache.trackers = trackers;
    cache.at = Date.now();
  }

  return trackers;
};

module.exports = {
  getTrackers,
};
