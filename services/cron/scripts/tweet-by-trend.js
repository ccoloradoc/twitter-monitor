const Twitter = require('commons').Twitter;
const twitterAPI = new Twitter();
const weekday = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado', 'domingo'];

console.log(`>> ${new Date()} - Searching for top trending`);

twitterAPI.trends('23424900').then((trends) => {
  // Iterate all trends
  let nonWeekdayTrend = trends.find(trend => {
    // If current trend contains a weekday, we will NOT pick that trend
    return !weekday.some(day => trend.name.toLowerCase().indexOf(day) > -1);
  })

  let hashtag = nonWeekdayTrend ? nonWeekdayTrend.name : '#SomosCiudadanosResponsables';
  let tweet = `¿Sabes que diputado te representa? #ContactoLegislativo te ayuda a ubicar y visualizar su desempeño de manera sencilla ${hashtag} https://contactolegislativo.com`;
  console.log(`>> ${tweet}`);
  twitterAPI.tweet(tweet).then(() => {
    console.log('>> Tweet successfull');
  });
});
