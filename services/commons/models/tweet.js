// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var tweet = require('./helper/tweet');
var user = require('./helper/user');

tweet.user = user;
// create a Tweet
const TweetSchema = new Schema({
  term: String,
  data: tweet,
  quality: {
    user: {
      verified: Boolean,
      name_complexity: Number,
      profile_compexity: Number,
      has_profile_image: Boolean,
      has_background_image: Boolean,
      has_description: Boolean,
      has_numeric_screen_name: Number ,
      antiquity: Number,
      followers: Number,
      friends: Number,
      statuses: Number
    },
    tweet: {
      complexity: Number,
      hashtags: Number,
      mentions: Number,
      is_reply: Boolean
    }
  }
});

// the schema is useless so far
// we need to create a model using it
const Tweet = mongoose.model('Tweet', TweetSchema);

// make this available to our users in our Node applications
module.exports = Tweet;
