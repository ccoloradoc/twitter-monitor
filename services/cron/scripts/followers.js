const Twit = require('twit');
const T = new Twit({
  "consumer_key":         "cYCSRy020QBnTrbKV099ounxC",
  "consumer_secret":      "7DsflCNOdZO4BCpjDGZtwbjxaagZslHBxF4qxss0hpmpQ7k6Mr",
  "access_token":         "4729180717-B49yZ6rDEni2hb926L53uv7ChbLF6yWr22MHjI5",
  "access_token_secret":  "i05xVP4XvLENV4RPKLJyEmO6ERdCNTFMYfE2xn2MJKY3T",
  "timeout_ms":           60000
});

T.get('friends/list', {screen_name: 'clegislativomx', count: 3}, (err, data, response) => {
  console.log(data);
  let friends = data.users.map(item => {
    return item.screen_name;
    //console.log(`${item.live_following ? '+' : '>'} ${item.screen_name} - ${item.following} ${item.live_following} ${item.follow_request_sent}`)
  })

  T.get('friendships/lookup', { screen_name: friends }, (err, data, response) => {
    data.forEach(user => {
      console.log(`> ${user.screen_name} - ${user.connections}`)
    })
  });
})
