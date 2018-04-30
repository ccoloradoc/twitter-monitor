const frequency = require('./data/frequency');
const MonitorService = require('commons').MonitorService;
const Twitter = require('commons').Twitter;
const Facebook = require('commons').Facebook;

const monitorService = new MonitorService();
const twitterAPI = new Twitter();
const fb = new Facebook();

console.log(`>> ${new Date()} - Searching for today deputy`);

function frequencyDistribution(deputy, frequency) {
  let below = 0, equals = 0, above = 0;

  frequency.forEach(item => {
    if(deputy.attendances > item.quantity) {
      below += item.frequency;
    } else if(deputy.attendances === item.quantity) {
      equals = item.frequency;
    } else {
      above += item.frequency;
    }
  });

  return { below, equals, above };
}

function quote(distribution) {
  if(distribution.below > 230)
    return `se posiciona en los mejores ${(100 - (distribution.below * 100 / 500)).toFixed(0)}% de la #CamaraDeDiputados #LXIII`;
  return `hay ${500 - distribution.below - distribution.equals} diputados con mejor asistencia en #CamaraDeDiputados #LXIII`;
}

monitorService.findAllDeputies({ type: 'Mayoría Relativa' })
  .then(deputies => {
    let deputy = deputies[0];
    let distribution = frequencyDistribution(deputy, frequency);
    let position = quote(distribution);
    let account = deputy.twitter ? `@${deputy.twitter}`: '';
    let tweet = `Te presentamos a ${deputy.displayName} ${account} diputado del distrito ${deputy.area} de #${deputy.state.replace(/\s/g,'')} #${deputy.party.toUpperCase()}, con ${deputy.attendances}/165 asistencias ${position}, conoce mas sobre tu diputado en #ContactoLegislativo`;
    let message = `Te presentamos a ${deputy.displayName} diputado del distrito ${deputy.area} de #${deputy.state.replace(/\s/g,'')} #${deputy.party.toUpperCase()}, con ${deputy.attendances}/165 asistencias ${position}, conoce mas sobre tu diputado en #ContactoLegislativo`;
    let link = `https://contactolegislativo.com/camara-de-diputados/LXIII/${deputy.slug}`;

    console.log(`>> ${message} ${link}`);
    twitterAPI.tweet(`${tweet} ${link}`)
    .then(() => {
      deputy.lastPublishedDate = new Date();
      deputy.save(() => {
        console.log(`>> Tweet successfull & deputy saved`);
        monitorService.close();
      });

      fb.post(message, link).then(post => {
        console.log(`>> Post published successfully ${post.data.id}`);
      });

    })
    .catch(err => {
      // 187 - Status Duplicated
      if(err.errors.length > 0 && err.errors[0].code == 187) {
        deputy.lastPublishedDate = new Date();
        deputy.save(() => {
          console.log(`>> Tweet successfull & deputy saved`);
          monitorService.close();
        });
      }
    });
  })
  .catch(err => console.log(err));
