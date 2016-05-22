(function () {
  'use strict';

  angular.module('app')
    .controller('MisPlantas', controller);

  function controller($scope, routeSrv, plantas) {


    $scope.plantas = plantas;

    $scope.goDetail = goDetail;
    $scope.goNuevaPlanta = goNuevaPlanta;

    //////

    function goNuevaPlanta() {
      routeSrv.go('app.mis-plantas.nueva-planta');
    }

    function goDetail(id) {
      routeSrv.go('app.mis-plantas.detail', {id: id});
    }
  }
}());
