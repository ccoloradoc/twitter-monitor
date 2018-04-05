const mongoose = require('mongoose');
const Tweet  = require('../models/tweet');
const Retweet  = require('../models/retweet');
const Term  = require('../models/term');
const Deputy  = require('../models/deputy');
const DAY_MS = 86400000;

class MonitorService {
  constructor() {
    mongoose.connect('mongodb://mongo/monitor');
  }

  findAllTerms(limit, sort) {
    return new Promise((resolve, reject) => {
      Term
      .find({})
      .limit(limit || 20)
      .sort(sort)
      .exec((err, terms) => {
        if (err) reject(err);
        resolve(terms);
      });
    });
  }

  findAllTweet(createdAt, offset, limit) {
    return new Promise((resolve, reject) => {
      Tweet
      .find({ "data.timestamp_ms": { $gte: createdAt || Date.now() - DAY_MS } })
      .skip(offset)
      .limit(limit)
      .sort({ "data.created_at": -1 })
      .exec((err, tweets) => {
        if (err) reject(err);
        resolve(tweets);
      });
    });
  }

  countAllTweet(createdAt) {
    return new Promise((resolve, reject) => {
      Tweet
      .find({ "data.timestamp_ms": { $gte: createdAt || Date.now() - DAY_MS } })
      .count()
      .exec((err, count) => {
        if (err) reject(err);
        resolve(count);
      });
    });
  }

  findTweetByTerm(term, createdAt, offset, limit) {
    return new Promise((resolve, reject) => {
      Tweet
      .find({ term: term, "data.timestamp_ms": { $gte: createdAt || Date.now() - DAY_MS } })
      .skip(offset)
      .limit(limit)
      .sort({ "data.created_at": -1 })
      .exec((err, tweets) => {
        if (err) reject(err);
        resolve(tweets);
      });
    });
  }

  countTweetByTerm(term, createdAt) {
    return new Promise((resolve, reject) => {
      // console.log('Query Tweets for', term)
      Tweet
      .find({ term: term, "tweet.timestamp_ms": { $gte: createdAt || Date.now() - DAY_MS } })
      .count()
      .exec((err, count) => {
        if (err) reject(err);
        // console.log(`${count.length} count`)
        resolve(count);
      });
    });
  }

  findRTByTerm(term, createdAt, offset, limit) {
    return new Promise((resolve, reject) => {
      Retweet
      .find({ term: term, "tweet.timestamp_ms": { $gte: createdAt || Date.now() - DAY_MS } })
      .skip(offset)
      .limit(limit)
      .sort({ "tweet.created_at": -1 })
      .exec((err, tweets) => {
        if (err) reject(err);
        resolve(tweets);
      });
    });
  }

  countRTByTerm(term, createdAt) {
    return new Promise((resolve, reject) => {
      // console.log('Query Tweets for', term)
      Retweet
      .find({ term: term, "data.timestamp_ms": { $gte: createdAt || Date.now() - DAY_MS } })
      .count()
      .exec((err, count) => {
        if (err) reject(err);
        // console.log(`${count.length} count`)
        resolve(count);
      });
    });
  }

  findAllDeputies(filter) {
    return new Promise((resolve, reject) => {
      Deputy
      .find(filter)
      .sort({ "lastPublishedDate": 1, "displayName": 1 })
      .exec((err, deputies) => {
        if (err) reject(err);
        resolve(deputies);
      });
    });
  }

  batchInsert(Model, items) {
    Model.insertMany(items, { ordered: true }, (err, docs) => {
      if (err) console.log(err);
      console.log('Inserted', docs.length ? docs.length: 'uknown' );
    });
  }

  close() {
    mongoose.connection.close();
  }
}

module.exports = MonitorService;
