(function () {
  'use strict';

  angular.module('app')
    .controller('MiPlantaDetail', controller);

  function controller($scope) {
    $scope.goBack = goBack;


   ////
    function goBack(){
     // $ionicNativeTransitions.stateGo('app.mis-plantas.list');
    }
  }
}());
