const Term = require('commons').Term;
const Deputy = require('commons').Deputy;
const deputies = require('./data/deputies');
const MonitorService = require('commons').MonitorService;
const monitorService = new MonitorService();

Term.remove({}).then(() => {
  let terms = deputies.filter(deputy => deputy.twitter !== null ).map(deputy => {
    return {
      slug: deputy.slug,
      name: deputy.twitter,
      monitor: true
    };
  });

  terms.push({ slug: 'uknown', name: 'uknown', monitor: false });
  terms.push({ slug: 'diputado', name: 'diputado', monitor: true });
  console.log(`Attempt to save ${terms.length}`)
  monitorService.batchInsert(Term, terms);
});

Deputy.remove({}).then(() => {
  monitorService.batchInsert(Deputy, deputies);
});
