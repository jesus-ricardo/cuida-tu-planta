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
      //routeSrv.go('app.mis-plantas.nueva-planta');
      $state.go('app.nueva-planta');
    }

    function goDetail(id) {
      routeSrv.go('app.mis-plantas.detail', {id: id});
      //$state.go('app.mis-plantas.detail', {id: id});
    }
    function getUrlPlanta(fotoPerfil){
      if (fotoPerfil == null) {return null}
      return APPCONFIG.ipServer+'/'+fotoPerfil;
    }
  }
}());
