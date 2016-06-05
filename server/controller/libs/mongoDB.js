var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var app = require('../../app.js');

module.exports.find = find;
module.exports.getObjectID = getObjectID;
module.exports.opera = opera;
module.exports.extraer = extraer;
module.exports.remover = remover;

function find(colect, query, projection) {
  return new Promise(function (resolve, reject) {
      var collection = app.db.collection(colect);
      collection.find(query, projection).toArray(function (err, result) {
        if (err) {
          reject(err)
        }
        resolve(result);
      });
    });
  }
function insert(colect, query, projection) {
  return new Promise(function (resolve, reject) {
      var collection = app.db.collection(colect);

      collection.insert(query, projection, function (err, result) {
        if (err) {
          reject({message: 'no se pudo hacer la query'})
        }
        resolve(result);
      });
  });

}
function extraer(colect, query, ordenado) {
  return new Promise(function (resolve, reject) {
      var collection = app.db.collection(colect);
      var cursor = collection.find(query);
      cursor.sort(ordenado);
      cursor.limit(1);
      //Skip specified records. 0 for skipping 0 records.
      cursor.skip(0);
      //Lets iterate on the result
      cursor.each(function (err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
  });
}
function remover(colet, arg, proyec) {
  return new Promise(function (resolve, reject) {
      app.db.collection(colet, function (err, tabla) {
        tabla.updateOne(arg, { $pull: proyec }, function (err, result) {
          if (err) {
            console.log(err);
          }
          return resolve(result);
        });
      });
  });
}
function opera(accion, colect, query, projection, options) {
  return new Promise(function (resolve, reject) {
      var collection = app.db.collection(colect);
      if (accion == 'insert' || accion == 'update') {
        collection[accion](query, projection, options, function (err, result) {
          if (err) {
            reject(err)
          }
          resolve(result);
        });
      }

      else {
        collection[accion](query, projection).toArray(function (err, result) {
          if (err) {
            reject({message: 'no se pudo hacer la query'})
          }
          resolve(result);
        });
      }
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
