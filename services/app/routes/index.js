const express = require('express');
const router = express.Router();
const MonitorService = require('commons').MonitorService;

const monitorService = new MonitorService();
const default_offset = 0;
const default_limit = 10;

router.get('/', function(req, res, next) {
  monitorService.findAllTerms(1000).then(terms => {
    let term = terms.length === 0 ? '' : terms[0].name;
    Promise.all([
      monitorService.findTweetByTerm(term, parseInt(default_offset), parseInt(default_limit)),
      monitorService.countTweetByTerm(term)
    ])
    .then(data => {
      res.render('index', {
        terms: terms,
        tweets: data[0],
        count: data[1],
        offset: default_offset,
        limit: default_limit,
        selected: term
      });
    });
  });
});

router.get('/term/:term', function(req, res, next) {
  const offset = req.query.offset || default_offset;
  const limit = req.query.limit || default_limit;
  const term = req.params.term;
  // console.log(`/term/${term}?offset=${offset}&limit=${limit}`)
  Promise.all([
    monitorService.findAllTerms(500),
    monitorService.findTweetByTerm(`${term}`, parseInt(offset), parseInt(limit)),
    monitorService.countTweetByTerm(`${term}`)
  ]).then(data => {
    // console.log(`${term} resolved ${data[1].length}`)
    res.render('index', {
      terms: data[0],
      tweets: data[1],
      count: data[2],
      offset: offset,
      limit: limit,
      selected: term
    });
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
