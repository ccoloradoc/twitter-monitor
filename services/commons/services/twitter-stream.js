const Twit = require('twit')
const config = require('../config');
const T = new Twit(config.mongo);
const Tweet = require('../models/tweet');
const Retweet = require('../models/retweet');
const Term = require('../models/term');

class TwitterStream {
  constructor(termSet) {
    this.termSet = termSet;
    this.track = termSet
      .filter(term => term.monitor )
      .map(term => term.name.replace('@',''));
    this.year = (new Date()).getFullYear();
  }

  start() {
    console.log(`>> Creating stream ${this.track}`);

    this.stream = T.stream('statuses/filter', { track: this.track, language: 'es' });
    this.stream.on('tweet', this.incomeMessage.bind(this));
    this.stream.on('parser-error', msg => console.log(`>> Parse Error ${msg}`));
    this.stream.on('error', msg => console.log(`>> Error ${msg}`));
  }

  processRT(tweet, term) {
    const termName = term ? term.name : 'uknown';
    const filter = { term: termName, text: tweet.text };

    return new Promise((resolve, reject) => {
      Retweet.findOne(filter, (err, retweet) => {
        if(err) {
          reject(err);
        } else if(retweet) {
          Retweet.update({ _id: retweet._id }, { $push: { "users": tweet.user } }, { multi: false }, (err, raw) => {
            if(err) reject(err);
            resolve(raw);
          });
        } else {
          var cleanTweet = Object.assign({}, tweet);
          delete cleanTweet['user'];
          var newRT = new Retweet({
            term: termName,
            text: tweet.text,
            tweet: cleanTweet,
            users: [tweet.user]
          });

          // call the built-in save method to save to the database
          newRT.save(function(err, rt) {
            if (err) reject(err);

            if(term)
              Term.findByIdAndUpdate(term._id, { $inc: { rt: 1 }}, function(err, data){});
            else
              Term.findOneAndUpdate({"name" : termName }, { $inc: { rt: 1 }}, function(err, data){});

            resolve(rt);
          });
        }
      });
    });
  }

  createTweet(tweet, term) {
    let entities = tweet.truncated ? tweet.extended_tweet.entities : tweet.entities;
    let spaces = tweet.user.name.match(/\s/g);
    let uppercase = tweet.user.name.match(/[A-Z]/g);
    let user = {
      verified: tweet.user.verified,
      name_complexity: (spaces ? spaces.length : 0) + (uppercase ? uppercase.length : 0),
      profile_compexity: 0,
      has_profile_image: tweet.user.profile_image_url_https !== "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
      has_background_image: tweet.user.profile_background_image_url_https !== null,
      has_description: tweet.user.description !== null,
      has_numeric_screen_name: tweet.user.screen_name.search(/\d+/i) < 0 ? 0 : tweet.user.screen_name.match(/\d/g).length ,
      antiquity: this.year - (new Date(tweet.user.created_at)).getFullYear(),
      followers: tweet.user.followers_count,
      friends: tweet.user.friends_count,
      statuses: tweet.user.statuses_count
    };

    user.profile_compexity =
      user.has_profile_image * 0.4
      + user.has_background_image * 0.2
      + user.has_description * 0.4
      - user.has_numeric_screen_name * 0.05;

    let tweetQuality = {
      hashtags: entities.hashtags.length,
      mentions: entities.user_mentions.length,
      is_reply: tweet.in_reply_to_status_id === null
    };

    tweetQuality.complexity = tweetQuality.hashtags + tweetQuality.mentions + tweetQuality.is_reply;

    return new Tweet({
      term: term ? term.name : 'uknown',
      quality: {
        user: user,
        tweet: tweetQuality
      },
      data: tweet
    });
  }

  saveTweet(tweet, term) {
    var newTweet = this.createTweet(tweet, term);

    return new Promise((resolve, reject) => {
      newTweet.save((err, product, numAffected) => {
        if (err) reject(err);
        if(term)
          Term.findByIdAndUpdate(term._id, { $inc: { tweet: 1 }}, function(err, data){});
        else
          Term.findOneAndUpdate({"name" : newTweet.term }, { $inc: { tweet: 1 }}, function(err, data){});

        resolve(product);
      });
    });
  }

  process(text, tweet, term) {
    if(text.startsWith('RT')) {
      return this.processRT(tweet, term);
    } else {
      return this.saveTweet(tweet, term);
    }
  }

  incomeMessage(tweet) {
    // Identify full text
    let text = tweet.truncated ? tweet.extended_tweet.full_text : tweet.text;
    // Identify terms involved
    let terms = this.termSet.filter(term => text.indexOf(term.name) >= 0 || `@${tweet.user.screen_name}` === term.name);

    console.log(`<< Stream[${terms.length}]  - Incoming @${tweet.user.screen_name} - ${text}`);

    if(terms.length === 0) {
      return Promise.all([this.process(text, tweet)]);
    } else {
      let processes = terms.map(term => this.process(text, tweet, term));
      return Promise.all(processes);
    }
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
