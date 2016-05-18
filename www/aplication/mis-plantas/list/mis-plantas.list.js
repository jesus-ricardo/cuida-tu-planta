(function () {
  'use strict';

  angular.module('app')
    .controller('MisPlantas', controller);

  function controller($scope, routeSrv) {

    $scope.goDetail = goDetail;
    $scope.goNuevaPlanta = goNuevaPlanta;

    //////

    function goNuevaPlanta(){
      routeSrv.go('app.mis-plantas.nueva-planta');
    }
    function goDetail() {
     routeSrv.go('app.mis-plantas.detail');
    }
  }
}());
