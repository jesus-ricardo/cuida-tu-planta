/**
 * Created by rjara on 8/04/16.
 */
(function () {
  'use strict';

  angular.module('app')
    .factory('misPlantasSrv', factory);

  function factory($filter, $http) {


    return {
      select: select,
      get: get
      //
    };

    //////////
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
  }
}());
