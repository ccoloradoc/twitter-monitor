// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a Tweet
const TweetSchema = new Schema({
  term: String,
  data: {
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
    user: {
       id: Number,
       id_str: String,
       name: String,
       screen_name: String,
       location: String,
       url: String,
       description: String,
       translator_type: String,
       protected: Boolean,
       verified: Boolean,
       followers_count: Number,
       friends_count: Number,
       listed_count: Number,
       favourites_count: Number,
       statuses_count: Number,
       created_at: String,
       utc_offset: Number,
       time_zone: String,
       geo_enabled: Boolean,
       lang: String,
       contributors_enabled: Boolean,
       is_translator: Boolean,
       profile_background_color: String,
       profile_background_image_url: String,
       profile_background_image_url_https: String,
       profile_background_tile: Boolean,
       profile_link_color: String,
       profile_sidebar_border_color: String,
       profile_sidebar_fill_color: String,
       profile_text_color: String,
       profile_use_background_image: Boolean,
       profile_image_url: String,
       profile_image_url_https: String,
       profile_banner_url: String,
       default_profile: Boolean,
       default_profile_image: Boolean,
       following: Array,
       follow_request_sent: Array,
       notifications: Array
    },
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
    timestamp_ms: String
  }
});

// the schema is useless so far
// we need to create a model using it
const Tweet = mongoose.model('Tweet', TweetSchema);

// make this available to our users in our Node applications
module.exports = Tweet;
