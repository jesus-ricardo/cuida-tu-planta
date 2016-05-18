(function () {
  'use strict';

  angular.module('app')
    .factory('misPlantasSrv', factory);

  function factory($q, $http, $localStorage) {


    return {
      select: select,
      get: get,
      getPicture: getPicture,
      insertPlanta: insertPlanta
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
      return $http.post('http://localhost:7777/planta/new',{idUser: $localStorage.user._id, data: planta});
    }
  }
}());
