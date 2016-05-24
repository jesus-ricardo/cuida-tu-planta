var express = require('express');
var routes = require('../routes/index.js');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongoDB = require('./libs/mongoDB.js');
/*
module.exports.selectFichero=function(req,res){
	res.json(fichero);
};
module.exports.getIdFichero=function(req,res){
  var id=req.params.id;
  var actor={};
  for (var f=0,itera=true;f<fichero.length && itera;f++){
  	if (fichero[f].id==id){
  		actor=fichero[f];
  		itera=false;
  	}
  }
  res.json(actor);
};
module.exports.getpIdFichero=function(req,res){
  var id=req.body.id;
  var actor=[{}];
  for (var f=0,itera=true;f<fichero.length && itera;f++){
  	if (fichero[f].id==id){
  		actor[0]=fichero[f];
  		itera=false;  	}
  }
  res.json(actor);
};
module.exports.modificaFicheroActor=function(req,res){
  var actor=req.body.actor;
  console.log(actor);
  for (var f=0,itera=true;f<fichero.length && itera;f++){
  	console.log("iterando fichero[f].id"+fichero[f].id+"_ actor.id"+actor.id);
  	if (fichero[f].id==actor.id){
  		fichero[f]=actor;
  		console.log("entroo");
  		itera=false;
  	}
  }
  console.log(fichero);
  res.status(200).end();
};
module.exports.insertaFicheroActor=function(req,res){
    var actor=req.body.actor;
	fichero.push(actor);
	res.status(200).end();
}
module.exports.eliminaFicheroActor=function(req,res){
    var actor=req.body.actor;
	for (var f=0,itera=true;f<fichero.length && itera;f++){
		if (fichero[f].id==actor.id){
			fichero.splice(f,1);
			itera=false;
		}
	}
	res.status(200).end();
}
module.exports.insertaMysqlActor=function(req,res){
    var actor=req.body.actor;
    var conect=connection.createConnection();
	conect.connect();
	var sql=mysql.format("insert into actores (id,first_name,last_name) values(?,?,?)",
		                                  [actor.id,actor.first_name,actor.last_name]);
	conect.query(sql,function(err,rows,fields){
		if (err) {
			conect.end();
			res.status(500).end();
			return;
		}
		res.json("insertado correctamente");
	});
}
module.exports.modificaMysqlActor=function(req,res){
	var actor=req.body.actor;
	var conect=connection.createConnection();
	conect.connect();
	console.log(actor);
	conect.query(mysql.format("update actores set first_name=?,last_name=? where id=?",
									[actor.first_name,actor.last_name,actor.id]),
	function(err,rows,fields){
		if (err){
			res.status(500).end();
		}
		res.status(200).end();
		conect.end();
	});
}
module.exports.eliminaMysqlActor=function(req,res){
	var id=req.body.id;
	var conect=connection.createConnection();
	conect.connect();
	conect.query(mysql.format("delete from actores where id=?",[id]),function(err,rows,fields){
		console.log(rows);
		res.json(rows);
		conect.end();
	});
}
module.exports.selectMysql=function(req,res){
	var conect=connection.createConnection();
	conect.connect();
	conect.query("select * from actores order by last_name",function(err,rows,fields){
		console.log(rows);
		res.json(rows);
	});
	conect.end();
}
module.exports.getIdMysql=function(req,res){
	var id=req.body.id;
	var conect=connection.createConnection();
	conect.connect();
	conect.query(mysql.format("select * from actores where id=?",[id]),function(err,rows,fields){
		console.log(rows);
		res.json(rows);
	});
	conect.end();
}
*/
mongoDB.conecta('localhost',27017,'plantas');
module.exports.plantaDatos = plantaDatos;
module.exports.insertUser = insertUser;
module.exports.getUser  = getUser;
module.exports.userLogin  = userLogin;
module.exports.insertPlanta = insertPlanta;
module.exports.selectPlantas = selectPlantas;
module.exports.getPlanta = getPlanta;
module.exports.insertRegistro = insertRegistro;
module.exports.insertUser = insertUser;
module.exports.insertFotoPrincipalPlanta = insertFotoPrincipalPlanta;

module.exports.pruebaDB = pruebaDB;

//////

function plantaDatos (req,res) {
	res.json({nombre: 'jacinto'});
}
function insertUser(req,res) {
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    if(err) { return console.dir(err); }

    var collection = db.collection('user');

    collection.insert({name: 'juan',password: 'juan'}, function (err, result) {
      if (err) {
        console.log('fallo al insertar');
      }
      console.log(result);
      res.json(result);
    });
  });
}

function getUser(req,res,next) {
  if (isObjectID(req.params.id)) {
    var objetId = mongo.ObjectID(req.params.id);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    if(err) { return console.dir(err); }

    var collection = db.collection('user');
    collection.findOne({_id: objetId}, function (err, result) {
      if (err) {
        console.log('fallo al hacer get');
        res.status(500).json({message: 'fallo al hacer el get'});
        return;
      }
      if (result == null) {
        console.log('no encontrado');
        res.status(404).json({message: 'no encontrado'});
        return;
      }
      console.log(result);
      res.json(result);
    });
  });
}
function userLogin(req, res) {
  var usuario = req.body;
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    var collection = db.collection('user');
    //compara usuario y password en la bd
    collection.find({name: usuario.nombre, password: usuario.password}).toArray(function(err, result) {
      console.log(result);
      if (result.length==0) {
        res.status(400).json({message: 'login incorrecto'});
        return;
      }
      res.json(result);
      });
  });
  console.log(usuario);
}
function insertPlanta(req, res) {
  console.log(req.body.idUser);
  console.log(req.body.data);
  var idUser = req.body.idUser;
  var data = req.body.data;
  console.log(data);
  //creamos un objectID a partir del id del usuario
  if (isObjectID(idUser)) {
    var objetId = mongo.ObjectID(idUser);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    if(err) { return console.dir(err); }
    var collection = db.collection('user');
    var existePlanta = collection.find({"plantas.id": data.idPlanta}).toArray(function(err, result){
      console.log(result.length);
      if (result.length == 0) {
        collection.updateOne({_id: objetId}, {$push: {"plantas": {id: data.idPlanta, nombre: data.nombre, fechaNacimiento: data.fechaNacimiento, descripcion: data.descripcion, registros: [], fotos: []}}}, function (err, result){
          if (err) {
            res.status(500).json({message: 'no se pudo insertar planta'});
            return;
          }
          res.status(200).json({message: 'planta insertada'});
        });
      } else {
        res.status(400).json({message: 'Id planta ya existe'});
        return;
      }
    });
  });
}
function selectPlantas(req, res) {
  console.log(req.params);
  if (isObjectID(req.params.idUser)) {
    var objectId = mongo.ObjectID(req.params.idUser);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    if(err) { return console.dir(err); }
    var collection = db.collection('user');

    collection.find({_id: objectId},{"plantas": 1, _id: 0}).toArray(function(err, result) {
      console.log(result[0].plantas);
      res.json(result[0].plantas);
    });
  });
}

function getPlanta(req, res) {
  var idPlanta = req.params.idPlanta.toString();
  var idUsuario = mongoDB.getObjectID(req.params.idUser);
  if (idUsuario == null) {res.json({message: 'mal id usuario'}); return;}
  console.log(idPlanta);
  console.log(idUsuario);
  mongoDB.find('user', {_id: idUsuario, "plantas.id": idPlanta},{'plantas.$': 1}).then(function (data){
    console.log('then');
    console.log(data);
    res.status(200).json(data[0].plantas[0]);return;
  }).catch(function (err){
    console.log('error');
    console.log(err);
    res.json(err);return;
  })
}

function insertRegistro(req, res) {
  var data = req.body;
  console.log(req);
  //datos de prueba
  data.idPlanta = 222;
  data.humedad = 30;
  data.ph = 10;
  data.luz = 300;
  mongoDB.opera('insert', 'registro',{
    id: data.idPlanta,humedad: data.humedad,ph: data.ph, luz: data.luz,fecha: new Date()})
    .then(function(data){
    console.log('insertado');
    console.log(data);
    res.json(data);return;
  }).catch(function (err){
    console.log('no insertado');
    console.log(err);
    res.json(err);return;
  });
}

function insertUser(req, res) {

  var data = req.body;
  console.log(data);
  mongoDB.opera('insert','user',{name: data.nombre, password: data.password, apellido1: data.apellido1,apellido2: data.apellido2,email: data.email, plantas: []})
    .then(function data(){
      console.log('usuario insertado correctamente');
      res.json(data);return;
    }).catch(function(err){
    console.log('fallo al insertar usuario');
    if (err.code == 11000){
      res.status(400).json({message: 'nombre de usuario ya registrado'});
    }
    res.status(500).json(err);return;
  })
}

function insertFotoPrincipalPlanta(req, res) {
  var file = req.file;
  console.log(file);
  res.status(200).json({message: 'foto recibida'});return;
}


function pruebaDB(req, res) {
  mongoDB.conecta('localhost',27017,'plantas');
  mongoDB.find('user', {_id: mongo.ObjectID("573b3cb013724b6c13a8a560")},{"plantas": 1, _id: 0}).then(function(data){
    res.json(data[0].plantas);

  }).catch(function(err){
    res.json(err);return;
  });
}

//libs
function isObjectID(id) {
  return (id.match(/^[0-9a-fA-F]{24}$/));
}
