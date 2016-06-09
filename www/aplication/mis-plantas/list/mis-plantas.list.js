(function () {
  'use strict';

  angular.module('app')
    .controller('MisPlantas', controller);

  function controller($scope, plantas, $state, APPCONFIG, routeSrv, toastSrv) {
    $scope.plantas = plantas;
    $scope.goDetail = goDetail;
    $scope.goNuevaPlanta = goNuevaPlanta;
    $scope.getUrlPlanta = getUrlPlanta;


    //////

    function goNuevaPlanta() {
      toastSrv.warn('nueva planta 1');
      $state.go('app.mis-plantas.nueva-planta');
    }

    function goDetail(id) {
      toastSrv.warn('detail 1');
      routeSrv.go('app.mis-plantas.detail', {id: id});
    }

    function getUrlPlanta(fotoPerfil){
      if (fotoPerfil == null) {return null}
      return APPCONFIG.ipServer+'/'+fotoPerfil;
    }
  }
}());
