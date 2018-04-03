const Tweet = require('commons').Tweet;
const Retweet = require('commons').Retweet;
const MonitorService = require('commons').MonitorService;
const monitorService = new MonitorService();

Promise.all([
  Tweet.remove({}),
  Retweet.remove({})
]).then(() => {
  console.log('Database cleaned');
})
