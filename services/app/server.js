// server.js
// load the things we need
const express = require('express');
const app = express();
const index = require('./routes/index');

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.use('/', index);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || '3000');

app.listen(port);

console.log(`Listening ${port}`);
