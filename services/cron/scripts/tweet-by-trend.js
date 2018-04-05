const Twitter = require('commons').Twitter;
const twitterAPI = new Twitter();
const weekday = require('./data/weekday');

console.log(`>> ${new Date()} - Searching for top trending`);

twitterAPI.trends('23424900').then((trends) => {
  let filterTrends = trends.filter(trend => !weekday.includes(trend.name));
  let trend = filterTrends[0];
  let tweet = `¿Sabes que diputado te representa? #ContactoLegislativo te ayuda a ubicar y visualizar su desempeño de manera sencilla ${trend.name} https://contactolegislativo.com`;
  console.log(`>> ${tweet}`);
  twitterAPI.tweet(tweet).then(() => {
    console.log('>> Tweet successfull');
  });
});
