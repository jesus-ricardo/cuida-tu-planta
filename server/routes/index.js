var express = require('express');
var router = express.Router();
//multer
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
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
router.get('/user/new',appController.insertUser);
router.get('/user/get/:id',appController.getUser);
router.post('/user/login',appController.userLogin);
router.post('/user/insert',appController.insertUser);

router.post('/planta/new',appController.insertPlanta);
router.post('/planta/eliminar',appController.eliminarPlanta);
router.post('/planta/registro',appController.insertRegistro); //Inserta nuevo resgistro del estado de la planta
router.get('/estadoActual/:idPlanta/:luz/:humedad',appController.estadoActual); //recibe estado desde arduino
router.get('/planta/estadoActual/:idPlanta',appController.getEstadoPlanta); //recoge estado
router.get('/planta/select/:idUser',appController.selectPlantas);
router.get('/planta/get/:idUser/:idPlanta',appController.getPlanta);
router.post('/upload', upload.single('planta'),appController.insertFotoPrincipalPlanta);


router.get('/pruebaDB',appController.pruebaDB);

module.exports = router;
