(function () {
  'use strict';

  angular.module('app')
    .controller('MiPlantaDetail', controller);

  function controller($scope, routeSrv, planta) {
    $scope.goBack = goBack;
    $scope.planta = planta;


    ////
    function goBack() {
      routeSrv.go('app.mis-plantas.list');
    }
  }
}());
