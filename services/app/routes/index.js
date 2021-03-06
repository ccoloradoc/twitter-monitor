const express = require('express');
const router = express.Router();
const MonitorService = require('commons').MonitorService;
const Twitter = require('commons').Twitter;

const monitorService = new MonitorService();
const twitterService = new Twitter();

const default_followers = 50;
const default_offset = 0;
const default_limit = 10;
const default_createdAt = 86400000;

router.get('/', function(req, res, next) {
  const offset = req.query.offset || default_offset;
  const limit = req.query.limit || default_limit;
  const followers = req.query.followers || default_followers;
  const createdAt = req.query.createdAt || Date.now() - default_createdAt;
  Promise.all([
    monitorService.findAllTweet(createdAt, followers, parseInt(offset), parseInt(limit)),
    monitorService.countAllTweet(createdAt, followers)
  ])
  .then(data => {
    res.render('index', {
      tweets: data[0],
      count: data[1],
      followers: parseInt(followers),
      offset: parseInt(offset),
      limit: parseInt(limit)
    });
  });

});

router.get('/terms', (req, res, next) => {
  monitorService.findAllTerms(500, { tweet: -1 }).then(terms => {
    res.render('terms', {
      terms: terms,
      selected: { name: '' }
    });
  });
});

router.get('/friends', (req, res, next) => {
  const cursor = req.query.cursor || -1;
  const count = req.query.count || 50;

  twitterService.friends('clegislativomx', count, cursor).then(data => {
    res.render('friends', data);
  });
});

router.get('/trends', (req, res, next) => {
  twitterService.trends('23424900').then(trends => {
    res.render('trends', trends);
  });
});

router.get('/tw/:term', function(req, res, next) {
  const offset = req.query.offset || default_offset;
  const limit = req.query.limit || default_limit;
  const createdAt = req.query.createdAt || Date.now() - default_createdAt;
  const term = req.params.term;
  // console.log(`/term/${term}?offset=${offset}&limit=${limit}`)
  Promise.all([
    monitorService.findAllTerms(500, { tweet: -1 }),
    monitorService.findTweetByTerm(`${term}`, createdAt, parseInt(offset), parseInt(limit)),
    monitorService.countTweetByTerm(`${term}`, createdAt)
  ]).then(data => {
    // console.log(`${term} resolved ${data[1].length}`)
    let selected = data[0].find(item => item.name === term);
    res.render('tweet', {
      terms: data[0],
      tweets: data[1],
      count: data[2],
      offset: offset,
      limit: limit,
      selected: selected
    });
  }).catch(err => {
    console.log(err);
  });
});

router.get('/rt/:term', function(req, res, next) {
  const offset = req.query.offset || default_offset;
  const limit = req.query.limit || default_limit;
  const createdAt = req.query.createdAt || Date.now() - default_createdAt;
  const term = req.params.term;
  // console.log(`/term/${term}?offset=${offset}&limit=${limit}`)
  Promise.all([
    monitorService.findAllTerms(500, { rt: -1 }),
    monitorService.findRTByTerm(`${term}`, createdAt, parseInt(offset), parseInt(limit)),
    monitorService.countRTByTerm(`${term}`, createdAt)
  ]).then(data => {
    // console.log(`${term} resolved ${data[1].length}`)
    let selected = data[0].find(item => item.name === term);
    // console.log(data[1])
    res.render('rt', {
      terms: data[0],
      rts: data[1],
      count: data[2],
      offset: offset,
      limit: limit,
      selected: selected
    });
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
