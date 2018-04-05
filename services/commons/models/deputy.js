// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a Tweet
const DeputySchema = new Schema({
  id: Number,
  type: String,
  state: String,
  area: Number,
  party: String,
  displayName: String,
  slug: String,
  birth: String,
  twitter: String,
  attendances: Number,
  latestAttendance: Date,
  lastPublishedDate: {
    type: Date,
    default: function() {
      return Date.now();
    }}
});

// the schema is useless so far
// we need to create a model using it
const Deputy = mongoose.model('Deputy', DeputySchema);

// make this available to our users in our Node applications
module.exports = Deputy;
