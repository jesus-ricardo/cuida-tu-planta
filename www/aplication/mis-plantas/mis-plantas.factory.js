(function () {
  'use strict';

  angular.module('app')
    .factory('misPlantasSrv', factory);

  function factory($q, $localStorage, httpSrv) {


    return {
      getPicture: getPicture,
      insertPlanta: insertPlanta,
      selectPlantas: selectPlantas,
      getPlanta: getPlanta
      //
    };

    //////////
    function getPicture(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      }, options);

      return q.promise;
    }


    function insertPlanta(planta) {
      return httpSrv.post('/planta/new', {idUser: $localStorage.user._id, data: planta});
    }

    function selectPlantas() {
      return httpSrv.get('/planta/select/' + $localStorage.user._id).then(function (res) {
        return res;
      });
    }

    function getPlanta(idPlanta) {
      return httpSrv.get('/planta/get/' + $localStorage.user._id + '/' + idPlanta).then(function (res) {
        return res;
      });
    }
  }
}());
