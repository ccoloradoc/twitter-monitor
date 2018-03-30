const Twit = require('twit')
const config = require('../config');
const T = new Twit(config.mongo);
const Tweet = require('../models/tweet');
const Term = require('../models/term');

function incomeMessage(tweet) {
  let text = tweet.truncated ? tweet.extended_tweet.full_text : tweet.text;
  let currentTerm = this.termSet.find(term => text.indexOf(term.name) >= 0);
  console.log(`<< Stream ${currentTerm ? currentTerm.name : 'uknown'} - Incoming @${tweet.user.screen_name} - ${text}`);

  // create a new user called chris
  var newTweet = new Tweet({
    term: currentTerm ? currentTerm.name : 'uknown',
    data: tweet
  });

  // call the built-in save method to save to the database
  newTweet.save(function(err) {
    if (err) {
      console.log(err)
      throw err;
    }

    if(currentTerm)
      Term.findByIdAndUpdate(currentTerm._id, { $inc: { references: 1 }}, function(err, data){});
    else
      Term.findOneAndUpdate({"term" : "uknown" }, { $inc: { references: 1 }}, function(err, data){});

    console.log('  + Stored');
  });
}

class TwitterStream {
  constructor(termSet) {
    this.termSet = termSet;
    this.track = termSet
      .filter(term => term.monitor )
      .map(term => term.name.replace('@',''));

    console.log(`>> Creating stream ${this.track}`);
    
    this.stream = T.stream('statuses/filter', { track: this.track, language: 'es' });
    this.stream.on('tweet', incomeMessage.bind(this));
    this.stream.on('parser-error', msg => console.log(`>> Parse Error ${msg}`));
    this.stream.on('error', msg => console.log(`>> Error ${msg}`));
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
