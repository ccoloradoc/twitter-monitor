// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tweet = require('./helper/tweet');

// create a Tweet
const RetweetSchema = new Schema({
  term: String,
  text: String,
  tweet: tweet,
  users: Array
});

// the schema is useless so far
// we need to create a model using it
const Tweet = mongoose.model('Retweet', RetweetSchema);

// make this available to our users in our Node applications
module.exports = Tweet;
