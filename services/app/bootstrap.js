const Term = require('./models/term');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/monitor');

const terms = ['#TodosDeViajeYYo', '#ParaEstarDeBuenasYo'];

terms.forEach(term => {
  var newTerm = new Term({ name: term });

  // call the built-in save method to save to the database
  newTerm.save(function(err) {
    if (err) throw err;
  });
})
