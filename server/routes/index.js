var express = require('express');
var router = express.Router();
/*
var fichero = require('../array.json');
var connection = require("../controller/utils/create-connection.js");
var mysql= require('mysql');
var routes = require('../routes/index.js');*/

var appController=require("../controller/appController.js");

//routes
/*
router.get('/api/actor/select',appController.selectFichero);
//devuelve un actor usa get
router.get('/api/actor/get/:id', appController.getIdFichero);
//devuelve un actor usa post
router.post('/api/actor/getp/', appController.getpIdFichero);
//modifica actor
router.post('/api/actor/modifica', appController.modificaFicheroActor);
//insertar actor
router.post('/api/actor/nuevo', appController.insertaFicheroActor);
//elimina actor
router.post('/api/actor/elimina', appController.eliminaFicheroActor);
//inserta actor MYSSQL
router.post('/api/mysql/actor/nuevo',appController.insertaMysqlActor);
//ver todos los actores MYSQL
router.get('/api/mysql/actor/select',appController.selectMysql);
//elimina actor MYSQL
router.post('/api/mysql/actor/elimina',appController.eliminaMysqlActor);
//modifica actor MYSQL
router.post('/api/mysql/actor/modifica', appController.modificaMysqlActor);
//get by id MYSQl
router.post('/api/mysql/actor/get',appController.getIdMysql);
*/
router.get('/planta/datos',appController.plantaDatos);
router.get('/user/new',appController.insertUser);
router.get('/user/get/:id',appController.getUser);
router.post('/user/login',appController.userLogin);
router.post('/planta/new',appController.insertPlanta);
router.get('/planta/registro',appController.insertRegistro);

router.get('/planta/select/:idUser',appController.selectPlantas);
router.get('/planta/get/:idUser/:idPlanta',appController.getPlanta);



router.get('/pruebaDB',appController.pruebaDB);

module.exports = router;
