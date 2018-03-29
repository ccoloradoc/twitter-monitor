const Twit = require('twit')
const config = require('../config');
const T = new Twit(config.mongo);
const Tweet = require('../models/tweet');
const Term = require('../models/term');

function incomeMessage(tweet) {
  console.log(`<< Stream ${this.term.name} - Incoming @${tweet.user.screen_name} - ${tweet.text}`);
  // create a new user called chris
  var newTweet = new Tweet({
    term: this.term.name,
    data: tweet
  });

  let _self = this;
  // call the built-in save method to save to the database
  newTweet.save(function(err) {
    if (err) {
      console.log(err)
      throw err;
    }

    Term.findByIdAndUpdate(_self.term._id, { $inc: { references: 1 }}, function(err, data){});
    console.log('  + Stored');
  });
}

class TwitterStream {
  constructor(term) {
    this.term = term;
    console.log(`>> Creating stream ${term.name}`)
    this.stream = T.stream('statuses/filter', { track: term.name, language: 'es' });
    this.stream.on('tweet', incomeMessage.bind(this));
  }
}

module.exports = TwitterStream;

//
// T.get('search/tweets', { q: 'diputado', count: 1, geocode: '19.432241,-99.177254,100km' }, function(err, data, response) {
//   printer(data.statuses);
// })
//
// function printer(twitts) {
//   twitts.forEach(twit => {
//     // console.log(`>> ${twit.id} - ${twit.text} (${twit.truncated})`);
//     console.log(`   ${JSON.stringify(twit)}`);
//   });
// }

// T.post('statuses/update', { status: '#ContactoLegislativo'}, (err, data, response) => {
//   console.log(data);
// });
