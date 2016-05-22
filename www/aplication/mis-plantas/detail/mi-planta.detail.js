(function () {
  'use strict';

  angular.module('app')
    .controller('MiPlantaDetail', controller);

  function controller($scope, routeSrv, planta) {
    $scope.goBack = goBack;
    $scope.goRegistro = goRegistro;
    $scope.planta = planta;
    ////
    function goRegistro(){
      routeSrv.go('app.mis-plantas.registro-actividad',{id: planta.id});
    }
    function goBack() {
      routeSrv.go('app.mis-plantas.list');
    }
  }
}());
