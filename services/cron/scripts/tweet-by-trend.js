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
  let tweet = `#ContactoLegislativo te ayuda a identificar a tu diputado en 4 sencillos pasos ${hashtag} Entra ya a nuestro portal! https://contactolegislativo.com/quien-es-mi-diputado`;
  console.log(`>> ${tweet}`);
  twitterAPI.tweet(tweet).then(() => {
    console.log('>> Tweet successfull');
  });
});
