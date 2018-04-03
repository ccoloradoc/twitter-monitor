// Utilities
const assert = require('chai').assert;
const TwitterStream = require('../services/twitter-stream');
// Loading test data
const mockTerms = require('./mock/terms');
const mockTweets = require('./mock/tweets');
// Loading database
const mongoose = require('mongoose');
const Tweets = require('../models/tweet');
const Retweets = require('../models/retweet');
// Setup database
mongoose.connect('mongodb://localhost:27017/test_monitor');

const twitterStream = new TwitterStream(mockTerms);

describe('TwitterStream', function() {
  before(function(done) {
    Promise.all([
      Tweets.remove({}),
      Retweets.remove({})
    ]).then(() => {

      done();
    });
  });

  after(function() {
    mongoose.connection.close();
  })

  describe('#constructor()', function() {
    it('should parse terms correctly', function() {
      tmp = new TwitterStream(mockTerms);
      assert.equal(tmp.track.length, 3);
    })
  });

  describe('#incomeMessage()', function() {

    it('should save tweet without error', function(done) {
      let tweet = mockTweets['tweet'];
      twitterStream.incomeMessage(tweet)
      .then(results => {
        assert.equal(results.length, 1);
        assert.equal(results[0].data.text, tweet.text);
        done();
      })
      .catch(err => {
        done(err);
      })
    });

    it('should save retweet without error', function(done) {
      let tweet = mockTweets['retweet'];
      twitterStream.incomeMessage(tweet)
      .then(results => {
        assert.equal(results.length, 1);
        assert.equal(results[0].text, tweet.text);
        assert.equal(results[0].tweet.text, tweet.text);
        assert.equal(results[0].users[results[0].users.length - 1].screen_name, tweet.user.screen_name);
        done();
      })
      .catch(err => {
        done(err);
      })
    });

    it('should save multiple retweet without error', function(done) {
      let tweet = mockTweets['retweet'];
      twitterStream.incomeMessage(tweet)
      .then(results => {
        assert.equal(results.length, 1);
        assert.equal(results[0].nModified, 1);
        done();
      })
      .catch(err => {
        done(err);
      })
    });
  });

});
