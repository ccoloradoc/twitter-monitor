const MonitorService = require('commons').MonitorService;
const TwitterStream = require('commons').TwitterStream;

const monitorService = new MonitorService();

console.log('>> Service up')

monitorService.findAllTerms(360).then(terms => {
  let limit = 15;
  let streams = [];
  for(i = 0; i < terms.length / limit; i++ ) {
    // console.log(`Split ${i * limit} to ${(i * limit ) + limit} from ${terms.length}`)
    let stream = terms.slice(i * limit, (i * limit) + limit)
    streams.push(stream);
  }

  // console.log(streams.length)
  // streams.forEach(stream => console.log(`>> ${stream.length}`))

  let Streams = streams.map(streamSet => {
    return new TwitterStream(streamSet);
  });
});
