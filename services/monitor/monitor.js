const MonitorService = require('commons').MonitorService;
const TwitterStream = require('commons').TwitterStream;

const monitorService = new MonitorService();

console.log('>> Service up')

monitorService.findAllTerms().then(terms => {
  let Streams = terms.map(term => {
    return new TwitterStream(term);
  });
});
