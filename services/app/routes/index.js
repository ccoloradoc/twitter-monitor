const express = require('express');
const router = express.Router();
const MonitorService = require('commons').MonitorService;

const monitorService = new MonitorService();
const default_offset = 0;
const default_limit = 10;
const default_createdAt = 86400000;

router.get('/', function(req, res, next) {
  const offset = req.query.offset || default_offset;
  const limit = req.query.limit || default_limit;
  const createdAt = req.query.createdAt || Date.now() - default_createdAt;
  Promise.all([
    monitorService.findAllTweet(createdAt, parseInt(offset), parseInt(limit)),
    monitorService.countAllTweet(createdAt)
  ])
  .then(data => {
    res.render('index', {
      tweets: data[0],
      count: data[1],
      offset: parseInt(offset),
      limit: parseInt(limit)
    });
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
