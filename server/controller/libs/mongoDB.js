var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

module.exports.conecta = conecta;
module.exports.find = find;
module.exports.getObjectID = getObjectID;
module.exports.opera = opera;

var host = null;
var port = null;
var db = null;
var urlConexion = null;

function conecta(hostP, portP, dbP) {
  host = hostP;
  port = portP;
  db = dbP;
  urlConexion  = 'mongodb://' + host + ':' + port + '/' + db;
}

function find(colect, query, projection) {
  return new Promise(function (resolve, reject) {
      if (urlConexion == null) {
        reject({messaje: 'conexion no esta definida'});
      }
      console.log(urlConexion);
      MongoClient.connect(urlConexion, function(err, db) {
        if(err) { reject({message: 'error al conectar'}) }
        var collection = db.collection(colect);

        collection.find(query, projection).toArray(function(err, result) {
          if (err){reject(err)}
          resolve(result);
        });
      });
  });

}
function insert(colect, query, projection) {
  return new Promise(function (resolve, reject) {
    if (urlConexion == null) {
      reject({messaje: 'conexion no esta definida'});
    }
    console.log(urlConexion);
    MongoClient.connect(urlConexion, function(err, db) {
      if(err) { reject({message: 'error al conectar'}) }
      var collection = db.collection(colect);

      collection.insert(query, projection,function(err, result) {
        if (err){reject({message: 'no se pudo hacer la query'})}
        resolve(result);
      });
    });
  });

}
function opera(accion, colect,query, projection) {
  return new Promise(function (resolve, reject) {
    if (urlConexion == null) {
      reject({messaje: 'conexion no esta definida'});
    }
    console.log(urlConexion);
    MongoClient.connect(urlConexion, function(err, db) {
      if(err) { reject({message: 'error al conectar'}) }
      var collection = db.collection(colect);
      if (accion == 'insert' ||accion == 'update'){
        collection[accion](query, projection,function(err, result) {
          if (err){reject(err)}
          resolve(result);
        });
      } else{
      collection[accion](query, projection).toArray(function(err, result) {
        if (err){reject({message: 'no se pudo hacer la query'})}
        resolve(result);
      });
      }
    });
  });
}

function getObjectID(id) {
  if (isObjectID(id)) {
    return objectId = mongo.ObjectID(id);
  }
  else {
    return null;
  }
}

function isObjectID(id) {
  return (id.match(/^[0-9a-fA-F]{24}$/));
}
