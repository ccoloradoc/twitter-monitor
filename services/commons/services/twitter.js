const Twit = require('twit')
const config = require('../config');
const T = new Twit(config.mongo);

class Twitter {
  tweet(status) {
    return new Promise((resolve, reject) => {
      T.post('statuses/update', { status: status }, (err, data, response) => {
        if(data.errors) {
          reject(data);
        } else {
          resolve(data);
        }
      });
    });
  }

  friends(screenName, count, cursor) {
    return new Promise((resolve, reject) => {
      T.get('friends/list', {screen_name: screenName, count: count, cursor: cursor }, (err, data, response) => {
        let friends = data.users.map(item => {
          return item.screen_name;
        })

        T.get('friendships/lookup', { screen_name: friends }, (err, friends, response) => {
          let status = {};
          friends.forEach(friend => { status[friend.screen_name] = friend; });
          resolve({
            users: data.users,
            status: status,
            count: count,
            next_cursor: data.next_cursor,
            next_cursor_str: data.next_cursor_str
          });
        });
      });
    });
  }

  trends(woeid) {
    return new Promise((resolve, reject) => {
      T.get('trends/place', {id: woeid}, (err, data, response) => {
        let trends = data[0].trends.filter(trend => !trend.promoted_content && trend.name.indexOf('#') > -1);
        resolve(trends);
      })
    });
  }

  directMessage(recipent, text) {
    let event = {
      type: 'message_create',
      message_create: {
        target: {
          recipient_id: recipent
        },
        message_data: {
          text: text
        }
      }
    };

    return new Promise((resolve, reject) => {
      T.post('direct_messages/events/new', { event: event }, (err, data, response) => {
        if(data.errors) {
          reject(data);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Twitter;
