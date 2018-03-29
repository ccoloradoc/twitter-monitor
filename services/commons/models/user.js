// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a User
var User = new Schema({
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
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', User);

// make this available to our users in our Node applications
module.exports = User;
