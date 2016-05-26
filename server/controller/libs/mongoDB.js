var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

module.exports.conecta = conecta;
module.exports.find = find;
module.exports.getObjectID = getObjectID;
module.exports.opera = opera;
module.exports.extraer = extraer;

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
function extraer(colect, query, ordenado) {
  console.log('1');
  return new Promise(function (resolve, reject) {
    if (urlConexion == null) {
      reject({messaje: 'conexión no esta definida'});
    }
    console.log(urlConexion);
    MongoClient.connect(urlConexion, function(err, db) {
      if(err) { reject({message: 'error al conectar'}) }
      var collection = db.collection(colect);
      console.log('2');
      var cursor = collection.find(query);
      cursor.sort(ordenado);
      cursor.limit(1);
      //Skip specified records. 0 for skipping 0 records.
      cursor.skip(0);
      //Lets iterate on the result
      cursor.each(function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          resolve(doc);
        }
      });
    });
  });
  /*  var cursor = collection.find(query);
   cursor.sort(ordenado);

   cursor.limit(1);

   //Skip specified records. 0 for skipping 0 records.
   cursor.skip(0);

   //Lets iterate on the result
   cursor.each(function (err, doc) {
   if (err) {
   console.log('err');
   console.log(err);
   } else {
   console.log('doc');
   console.log(doc);
   return doc;
   }
   });*/
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
