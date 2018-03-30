const Term = require('commons').Term;
const mongoose = require('mongoose');
const deputies = require('./terms');

mongoose.connect('mongodb://mongo/monitor');



var newTerm = new Term({
  slug: 'uknown',
  name: 'uknown',
  monitor: false
});

// call the built-in save method to save to the database
newTerm.save(function(err) {
  if (err) throw err;
});


let terms = deputies.map(deputy => {
  return {
    slug: deputy.slug,
    name: deputy.twitter,
    monitor: true
  };
});

Term.collection.insert(terms, (err, docs) => {
  if (err) console.log(err);
});

function onInsert(err, docs) {

}
