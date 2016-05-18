(function () {
  'use strict';

  angular.module('app')
    .controller('MiPlantaDetail', controller);

  function controller($scope, $state) {
    $scope.goBack = goBack;


   ////
    function goBack(){
    $state.go('app.mis-plantas.list');
    }
  }
}());
