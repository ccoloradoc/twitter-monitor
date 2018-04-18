const Twit = require('twit')
const config = require('../config');
const T = new Twit(config.mongo);

class UserStream {

  start() {
    this.stream = T.stream('user', { stringify_friend_ids: true });

    this.stream.on('follow', this.onFollow.bind(this));

    this.stream.on('unfollow', this.onUnfollow.bind(this));
  }

  on(event, fnc) {
    this.stream.on(event, fnc);
  }

  onFollow(data) {
    console.log(`>> follow @${data.source.screen_name} has FOLLOWED @${data.target.screen_name}`)
  }

  onUnfollow(data) {
    console.log(`>> unfollow @${data.source.screen_name} has UNFOLLOWED @${data.target.screen_name}`)
  }

}

module.exports = UserStream;
