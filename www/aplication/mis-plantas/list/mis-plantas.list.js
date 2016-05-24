(function () {
  'use strict';

  angular.module('app')
    .controller('MisPlantas', controller);

  function controller($scope, plantas, $state) {


    $scope.plantas = plantas;

    $scope.goDetail = goDetail;
    $scope.goNuevaPlanta = goNuevaPlanta;

    //////

    function goNuevaPlanta() {
      //routeSrv.go('app.mis-plantas.nueva-planta');
      $state.go('app.mis-plantas.nueva-planta');
    }

    function goDetail(id) {
      //routeSrv.go('app.mis-plantas.detail', {id: id});
      $state.go('app.mis-plantas.detail', {id: id});
    }
  }
}());
