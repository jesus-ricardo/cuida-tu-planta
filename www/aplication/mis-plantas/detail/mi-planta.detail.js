(function () {
  'use strict';

  angular.module('app')
    .controller('MiPlantaDetail', controller);

  function controller($scope, routeSrv) {
    $scope.goBack = goBack;


   ////
    function goBack(){
    routeSrv.go('app.mis-plantas.list');
    }
  }
}());
