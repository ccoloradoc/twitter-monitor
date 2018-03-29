var Twit = require('twit')

var T = new Twit({
  consumer_key:         'cYCSRy020QBnTrbKV099ounxC',
  consumer_secret:      '7DsflCNOdZO4BCpjDGZtwbjxaagZslHBxF4qxss0hpmpQ7k6Mr',
  access_token:         '4729180717-B49yZ6rDEni2hb926L53uv7ChbLF6yWr22MHjI5',
  access_token_secret:  'i05xVP4XvLENV4RPKLJyEmO6ERdCNTFMYfE2xn2MJKY3T',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


// T.get('search/tweets', { q: 'diputado', count: 1, geocode: '19.432241,-99.177254,100km' }, function(err, data, response) {
//   printer(data.statuses);
// })

function printer(twitts) {
  twitts.forEach(twit => {
    // console.log(`>> ${twit.id} - ${twit.text} (${twit.truncated})`);
    console.log(`   ${JSON.stringify(twit)}`);
  });
}

// T.post('statuses/update', { status: '#ContactoLegislativo'}, (err, data, response) => {
//   console.log(data);
// });

var stream = T.stream('statuses/filter', { track: '@navaslp', language: 'es' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
});
