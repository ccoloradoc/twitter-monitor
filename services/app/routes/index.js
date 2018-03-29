const express = require('express');
const router = express.Router();
const MonitorService = require('commons').MonitorService;

const monitorService = new MonitorService();

router.get('/', function(req, res, next) {
  monitorService.findAllTerms().then(terms => {
    let term = terms.length === 0 ? '' : terms[0].name;
    monitorService.findTweetByTerm(term).then(tweets => {
      res.render('index', {
        terms: terms,
        tweets: tweets
      });
    });
  });
});

router.get('/term/:term', function(req, res, next) {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 5;
  // console.log(`/term/${req.params.term}?offset=${offset}&limit=${limit}`)
  Promise.all([
    monitorService.findAllTerms(),
    monitorService.findTweetByTerm(`#${req.params.term}`, parseInt(offset), parseInt(limit)),
    monitorService.countTweetByTerm(`#${req.params.term}`)
  ]).then(data => {
    // console.log(`${req.params.term} resolved ${data[1].length}`)
    res.render('index', {
      terms: data[0],
      tweets: data[1],
      count: data[2],
      offset: offset,
      limit: limit
    });
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
