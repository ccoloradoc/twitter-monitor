const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  created_at: Date,
  id: Number,
  id_str: String,
  text: String,
  display_text_range: Array,
  source: String,
  truncated: Boolean,
  in_reply_to_status_id: Number,
  in_reply_to_status_id_str: String,
  in_reply_to_user_id: Number,
  in_reply_to_user_id_str: String,
  in_reply_to_screen_name: String,
  place: Schema.Types.Mixed,
  contributors: Array,
  is_quote_status: Boolean,
  extended_tweet: {
    full_text: String,
    display_text_range: Array,
    entities: {
      hashtags: Array,
      urls: Array,
      user_mentions: Array,
      symbols: Array
    }
  },
  quote_count: Number,
  reply_count: Number,
  retweet_count: Number,
  favorite_count: Number,
  entities: {
     hashtags: Array,
     urls: Array,
     user_mentions: Array,
     symbols: Array
   },
  favorited: Boolean,
  retweeted: Boolean,
  filter_level: String,
  lang: String,
  timestamp_ms: Number
};
