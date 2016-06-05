(function () {
  'use strict';

  angular.module('app')
    .controller('MisPlantas', controller);

  function controller($scope, plantas, $state, APPCONFIG, routeSrv) {
    $scope.plantas = plantas;
    $scope.goDetail = goDetail;
    $scope.goNuevaPlanta = goNuevaPlanta;
    $scope.getUrlPlanta = getUrlPlanta;


    //////

    function goNuevaPlanta() {
      $state.go('app.nueva-planta');
    }

    function goDetail(id) {
      routeSrv.go('app.detail', {id: id});
    }

    function getUrlPlanta(fotoPerfil){
      if (fotoPerfil == null) {return null}
      return APPCONFIG.ipServer+'/'+fotoPerfil;
    }
  }
}());
