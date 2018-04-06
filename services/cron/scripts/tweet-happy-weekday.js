const Twitter = require('commons').Twitter;
const weekdayHashtag = require('./data/weekday');
const weekday = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado', 'domingo'];
const twitterAPI = new Twitter();

const date = new Date();
console.log(`>> ${date} - Calculating weekday`);

twitterAPI.trends('23424900').then((trends) => {
  // Iterate all trends
  let weekdayTrend = trends.find(trend => {
    // If current trend contains a weekday, we will pick that trend
    return weekday.some(day => trend.name.toLowerCase().indexOf(day) > -1);
  })

  // If trend found display trend, otherwise display predefined hashtag
  let hashtag = weekdayTrend ? weekdayTrend.name : weekdayHashtag[date.getDay()];

  let tweet = `¿Sabes que diputado te representa? #ContactoLegislativo te ayuda a ubicar y visualizar su desempeño de manera sencilla ${hashtag} https://contactolegislativo.com`;
  console.log(`>> ${tweet}`);
  twitterAPI.tweet(tweet).then(() => {
      console.log('>> Tweet successfull');
  });
});
