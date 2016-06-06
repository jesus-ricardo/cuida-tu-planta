(function () {
  'use strict';

  angular.module('app')
    .controller('MiPlantaDetail2', controller);

  function controller($scope, routeSrv, planta, APPCONFIG, misPlantasSrv, $interval,
                      loadingSrv, toastSrv) {
    loadingSrv.disable();
    var intervalPromise;
    $scope.goBack = goBack;
    $scope.goRegistro = goRegistro;
    $scope.planta = planta;
    $scope.arduino = false;
    $scope.foto = '';
    $scope.getUrlPlanta = getUrlPlanta;
    $scope.obtenerEstado = obtenerEstado;
    $scope.eliminar = eliminar;
    $scope.data = {
      humedad: '',
      luz: '',
      hExt: '',
      tExt: ''
    };
    function goRegistro() {
      routeSrv.go('app.mis-plantas.registro-actividad', {id: planta.id});
    }

    function goBack() {
      routeSrv.go('app.mis-plantas.list');

    }

    function getUrlPlanta() {
      if (planta.fotoPerfil == null) {
        return null
      }
      $scope.foto = APPCONFIG.ipServer + '/' + planta.fotoPerfil;
    }

    function eliminar() {
      toastSrv.confirm('Confirmación', '¿Seguro que desea eliminar esta planta?')
        .then(function (res) {
          if (res) {
            misPlantasSrv.eliminarPlanta(planta.id).then(function () {
              routeSrv.go('app.mis-plantas.list');
            });
          }
        });


    }

    function obtenerEstado() {
      misPlantasSrv.obtenerEstado(planta.id).then(function (data) {
        if (data) {
          $scope.arduino = true;
          $scope.data = {
            humedad: data.humedad,
            luz: data.luz,
            hExt: data.hExt,
            tExt: data.tExt
          }
        } else {
          $scope.arduino = false;
          $interval.cancel(intervalPromise);
        }
      });
    }
    $scope.$on('$stateChangeSuccess', function() {
      getUrlPlanta();
      intervalPromise = $interval(function () {
        obtenerEstado();
      }, 1000);
      $scope.$on('$destroy', function () {
        loadingSrv.enable();
        if (intervalPromise)
          $interval.cancel(intervalPromise);
      });
    });

  }
}());
