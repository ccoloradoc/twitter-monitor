const Twitter = require('commons').Twitter;
const weekday = require('./data/weekday');
const twitterAPI = new Twitter();

console.log(`>> ${new Date()} - Calculating weekday`);

const d = new Date();
const hashtag = weekday[d.getDay()];

twitterAPI.trends('23424900').then((trend) => {
  let tweet = `¿Sabes que diputado te representa? #ContactoLegislativo te ayuda a ubicar y visualizar su desempeño de manera sencilla ${hashtag} https://contactolegislativo.com`;
  console.log(`>> ${tweet}`);
  twitterAPI.tweet(tweet).then(() => {
      console.log('>> Tweet successfull');
  });
});
