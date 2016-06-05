/**
 * @ngdoc factory
 * @name misPlantasSrv
 */
(function () {
  'use strict';

  angular.module('app')
    .factory('misPlantasSrv', factory);

  function factory($q, $localStorage, httpSrv ) {

    return {
      insertPlanta: insertPlanta,
      selectPlantas: selectPlantas,
      getPlanta: getPlanta,
      insertRegistro: insertRegistro,
      obtenerEstado: obtenerEstado,
      eliminarPlanta: eliminarPlanta
      //
    };


    //////////
    /**
     * @ngdoc method
     * @name misPlantasSrv.insertPlanta
     * @param {object} planta
     * @returns {promise}
     */
    function insertPlanta(planta) {
      return httpSrv.post('/planta/new', {idUser: $localStorage.user._id,
        data: planta
      });
    }

    /**
     * @ngdoc method
     * @name misPlantasSrv.selectPlantas
     * @returns {promise}
     */
    function selectPlantas() {
      return httpSrv.get('/planta/select/' + $localStorage.user._id);
    }
    /**
     * @ngdoc method
     * @name misPlantasSrv.getPlanta
     * @param {object} idPlanta
     * @returns {promise}
     */
    function getPlanta(idPlanta) {
      return httpSrv.get('/planta/get/' + $localStorage.user._id + '/' + idPlanta)
        .then(function (data) {
          return data;
        });
    }
    /**
     * @ngdoc method
     * @name misPlantasSrv.eliminarPlanta
     * @param {object} id
     * @returns {promise}
     */
    function eliminarPlanta(id) {
      return httpSrv.post('/planta/eliminar', {idUser: $localStorage.user._id, idPlanta: id});
    }
    /**
     * @ngdoc method
     * @name misPlantasSrv.insertRegistro
     * @param {object} estado
     * @returns {promise}
     */
    function insertRegistro(estado) {
      return httpSrv.post('/planta/registro', {idUser: $localStorage.user._id, data: estado});
    }
    /**
     * @ngdoc method
     * @name misPlantasSrv.obtenerEstado
     * @param {number} idPlanta
     * @returns {promise}
     */
    function obtenerEstado(idPlanta) {
      return httpSrv.get('/planta/estadoActual/' + idPlanta).then(function (data) {
        return data;
      });
    }
  }
}());
