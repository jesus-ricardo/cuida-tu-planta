var express = require('express');
var routes = require('../routes/index.js');
var mongo = require('mongodb');
var mongoDB = require('./libs/mongoDB.js');
var fs = require('fs');
var app = require('../app.js');

module.exports.getUser = getUser;
module.exports.userLogin = userLogin;
module.exports.insertPlanta = insertPlanta;
module.exports.selectPlantas = selectPlantas;
module.exports.getPlanta = getPlanta;
module.exports.insertRegistro = insertRegistro;
module.exports.insertUser = insertUser;
module.exports.insertFotoPrincipalPlanta = insertFotoPrincipalPlanta;
module.exports.estadoActual = estadoActual;
module.exports.getEstadoPlanta = getEstadoPlanta;
module.exports.pruebaDB = pruebaDB;
module.exports.eliminarRegistro = eliminarRegistro;
module.exports.eliminarPlanta = eliminarPlanta;

//////



function getUser(req, res, next) {
  if (isObjectID(req.params.id)) {
    var objetId = mongo.ObjectID(req.params.id);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
  // Connect to the db
    var collection = app.db.collection('user');
    collection.findOne({_id: objetId}, function (err, result) {
      if (err) {
        res.status(500).json({message: 'fallo al hacer el get'});
        return;
      }
      if (result == null) {
        res.status(404).json({message: 'no encontrado'});
        return;
      }
      res.json(result);
    });
}
function userLogin(req, res) {
  var usuario = req.body;
  // Connect to the db
    var collection = app.db.collection('user');
    //compara usuario y password en la bd
    collection.find({
      name: usuario.nombre,
      password: usuario.password
    }).toArray(function (err, result) {
      if (result.length == 0) {
        res.status(400).json({message: 'login incorrecto'});
        return;
      }
      res.json(result);
    });
}
function eliminarPlanta(req, res) {
  var idUser = req.body.idUser;
  var idPlanta = req.body.idPlanta;
  if (isObjectID(idUser)) {
    var objetId = mongo.ObjectID(idUser);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
  mongoDB.remover('user',{_id: objetId}, {
    "plantas": {
      id: idPlanta
    }
  }).then(function (data) {
      return res.status(200).json(data);
    }).catch(function (err) {
    return res.json(err);
  });
}

function insertPlanta(req, res) {
  var idUser = req.body.idUser;
  var data = req.body.data;
  //creamos un objectID a partir del id del usuario
  if (isObjectID(idUser)) {
    var objetId = mongo.ObjectID(idUser);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
    var collection = app.db.collection('user');
    var existePlanta = collection.find({"plantas.id": data.idPlanta}).toArray(function (err, result) {
      if (result.length == 0) {
        collection.updateOne({_id: objetId}, {
          $push: {
            "plantas": {
              id: data.idPlanta,
              nombre: data.nombre,
              fechaNacimiento: data.fechaNacimiento,
              descripcion: data.descripcion,
              registros: [],
              fotos: []
            }
          }
        }, function (err, result) {
          if (err) {
            res.status(500).json({message: 'no se pudo insertar planta'});
            return;
          }
          return res.status(200).json(result);
        });
      } else {
        res.status(400).json({message: 'Id planta ya existe'});
        return;
      }
    });
}


function selectPlantas(req, res) {
  if (isObjectID(req.params.idUser)) {
    var objectId = mongo.ObjectID(req.params.idUser);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
  mongoDB.find('user', {_id: objectId}, {"plantas": 1, _id: 0}).then(function (data) {
    return res.status(200).json(data[0].plantas);
  }).catch(function (err) {
    return res.json(err);
  })

}

function getPlanta(req, res) {
  var idPlanta = req.params.idPlanta;
  var idUsuario = mongoDB.getObjectID(req.params.idUser);
  if (idUsuario == null) {
    res.json({message: 'mal id usuario'});
    return;
  }
  mongoDB.find('user', {
    _id: idUsuario,
    "plantas.id": idPlanta
  }, {'plantas.$': 1}).then(function (data) {
    res.status(200).json(data[0].plantas[0]);
    return;
  }).catch(function (err) {
    res.json(err);
    return;
  })
}
////planta/registro',{idUser: $localStorage.user._id, data: estado});
function insertRegistro(req, res) {
  console.log(req.body.idUser);
  console.log(req.body.data);
}

function insertUser(req, res) {
  var data = req.body;
  mongoDB.opera('insert', 'user', {
      name: data.nombre,
      password: data.password,
      apellido1: data.apellido1,
      apellido2: data.apellido2,
      email: data.email,
      plantas: []
    })
    .then(function data(data) {
      console.log('usuario insertado correctamente');
      return res.json(data);
    }).catch(function (err) {
    console.log('fallo al insertar usuario');
    if (err.code == 11000) {
      res.status(400).json({message: 'nombre de usuario ya registrado'});
    }
    res.status(500).json(err);
    return;
  })
}

function insertFotoPrincipalPlanta(req, res) {
  var file = req.file;
  var filePath = req.file.filename + '.jpg';
  fs.rename('./uploads/' + req.file.filename, './uploads/' + filePath, function (err) {
    if (err) {
      res.status(500).json({message: 'fallo al renombrar'});
      return;
    }
    var data = req.body;
    var idUsuario = mongoDB.getObjectID(data.idUsuario);

    mongoDB.opera('update', 'user', {
      _id: idUsuario,
      "plantas.id": data.idPlanta
    }, {"$set": {"plantas.$.fotoPerfil": filePath}}).then(function (data) {
      res.status(200).json({message: 'foto recibida'});
      return;
    }).catch(function (err) {
      res.status(500).json({message: 'error al subir foto'});
      return;
    });
  });

  //db.user.update({name: 'juan', "plantas.idPlanta": 2},{$set:
  // {"plantas.$.fotoPerfil": 'fotop'}});
}

function estadoActual(req, res) {
  var data = req.params;
  mongoDB.opera('update', 'estado', {
      idPlanta: data.idPlanta
    }, {
      "$set": {
        luz: data.luz,
        humedad: data.humedad,
        hExt: data.hExt,
        tExt: data.tExt,
        date: new Date()
      }
    }, {upsert: true})
    .then(function (data) {
      res.json(data);
    }).catch(function (err) {
    res.status(500).json({message: 'no se pudo insertar'});
    return;
  });

}

function eliminarRegistro(data) {
  mongoDB.remover('registro', {idPlanta: data.idPlanta})
    .then(function (data) {
      return res.json(data);
    }).catch(function (err) {
    res.json(err);
    return err;
  });
}

//db.registro.find({'idPlanta':'1'}).sort({date:-1}).limit(1);
function getEstadoPlanta(req, res) {
  var idPlanta = req.params.idPlanta.toString();
  mongoDB.extraer('estado', {idPlanta: idPlanta}, {date: -1})
    .then(function (data) {
      return res.json(data);
    }).catch(function (err) {
    res.json(err);
    return err;
  });
}


function pruebaDB(req, res) {
  mongoDB.conecta('localhost', 27017, 'plantas');
  mongoDB.find('user', {_id: mongo.ObjectID("573b3cb013724b6c13a8a560")}, {
    "plantas": 1,
    _id: 0
  }).then(function (data) {
    res.json(data[0].plantas);

  }).catch(function (err) {
    res.json(err);
    return;
  });
}

//libs
function isObjectID(id) {
  return (id.match(/^[0-9a-fA-F]{24}$/));
}
