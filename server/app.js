// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index.js');
var MongoClient = require('mongodb').MongoClient;
var db = 'db';
/*var http= require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);*/

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;        // set our port
app.use(express.static('../www'));
app.use(express.static('uploads'));
MongoClient.connect("mongodb://localhost:27017/plantas", function(err, database) {
  if(err) {
    console.log('no se pudo conectar a la base de datos');
    throw err;
  }

  db = database;
  module.exports.db = db;
  console.log('db creada');

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
});
