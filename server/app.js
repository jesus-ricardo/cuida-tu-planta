// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 7777;        // set our port
app.use(express.static('../www'));
//errores
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
//rutas
app.use('/',routes);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
