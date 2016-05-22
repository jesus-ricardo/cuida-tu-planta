(function () {
  'use strict';

  angular.module('app')
    .factory('misPlantasSrv', factory);

  function factory($q, $http, $localStorage, APPCONFIG) {


    return {
      select: select,
      get: get,
      getPicture: getPicture,
      insertPlanta: insertPlanta,
      selectPlantas: selectPlantas,
      getPlanta: getPlanta
      //
    };

    //////////
    function getPicture(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }

    function select() {
      return [
        {id_planta: 1,nombre: "planta1",descripcion: "blablalbalbal",
          fechaInicio: "4 de mayo de 2016",
          dias: "32",
          estadio: "Crecimiento",
          pathFoto:'aplication/core/images/poto1.jpg'},
        {id_planta: 2,nombre: "planta1",descripcion: "blablalbalbal",
          fechaInicio: "4 de mayo de 2016",
          dias: "32",
          estadio: "Crecimiento",
          pathFoto:'aplication/core/images/poto1.jpg'},
        {id_planta: 3,nombre: "planta1",descripcion: "blablalbalbal",
          fechaInicio: "4 de mayo de 2016",
          dias: "32",
          estadio: "Crecimiento",
           pathFoto:'aplication/core/images/poto1.jpg'},
        {id_planta: 4,nombre: "planta1",descripcion: "blablalbalbal",
          fechaInicio: "4 de mayo de 2016",
          dias: "32",
          estadio: "Floracion",
          pathFoto:'aplication/core/images/poto1.jpg'}
      ]
    }

    function get() {
      return  {id_planta: 4,nombre: "planta1",descripcion: "blablalbalbal",
        fechaInicio: "4 de mayo de 2016",
        dias: "32",
        estadio: "Floracion",
        pathFoto:'aplication/core/images/poto1.jpg'}
    }

    function insertPlanta(planta) {
      console.log('planta factory');
      console.log(planta);
      return $http.post(APPCONFIG.ipServer + '/planta/new',{idUser: $localStorage.user._id, data: planta});
    }
    function selectPlantas() {
      return $http.get(APPCONFIG.ipServer + '/planta/select/' + $localStorage.user._id).then(function (res){
          return res.data;
        });
    }
    function getPlanta(idPlanta) {
      return $http.get(APPCONFIG.ipServer + '/planta/get/' + $localStorage.user._id+'/'+idPlanta).then(function (res){
        return res.data;
      });
    }
  }
}());
