const Term = require('commons').Term;
const deputies = require('./data/terms');
const MonitorService = require('commons').MonitorService;
const monitorService = new MonitorService();

Term.remove({}).then(() => {
  let terms = deputies.map(deputy => {
    return {
      slug: deputy.slug,
      name: deputy.twitter,
      monitor: true
    };
  });

  terms.push({ slug: 'uknown', name: 'uknown', monitor: false });
  terms.push({ slug: 'diputado', name: 'diputado', monitor: false });

  monitorService.batchInsert(terms);
});
