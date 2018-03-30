const mongoose = require('mongoose');
const Tweet  = require('../models/tweet');
const Term  = require('../models/term');

class MonitorService {
  constructor() {
    mongoose.connect('mongodb://mongo/monitor');
  }

  findAllTerms(limit) {
    return new Promise((resolve, reject) => {
      Term
      .find({})
      .limit(limit || 20)
      .sort({ "references": -1 })
      .exec((err, terms) => {
        if (err) reject(err);
        resolve(terms);
      });
    });
  }

  findTweetByTerm(term, offset, limit) {
    return new Promise((resolve, reject) => {
      Tweet
      .find({ term: term })
      .skip(offset)
      .limit(limit)
      .sort({ "data.created_at": -1 })
      .exec((err, tweets) => {
        if (err) reject(err);
        resolve(tweets);
      });
    });
  }

  countTweetByTerm(term) {
    return new Promise((resolve, reject) => {
      // console.log('Query Tweets for', term)
      Tweet
      .find({ term: term })
      .count()
      .exec((err, count) => {
        if (err) reject(err);
        // console.log(`${count.length} count`)
        resolve(count);
      });
    });
  }

}

module.exports = MonitorService;
