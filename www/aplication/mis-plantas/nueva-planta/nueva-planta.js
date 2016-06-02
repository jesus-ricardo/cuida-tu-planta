(function () {
  'use strict';

  angular.module('app')
    .controller('NuevaPlanta', controller);


  function controller($scope, $state, misPlantasSrv, toastSrv) {
    $scope.data = {
      idPlanta: null,
      nombre: null,
      fechaNacimiento: new Date(),
      descripcion: ''
    };
    $scope.goBack = goBack;
    $scope.insertPlanta = insertPlanta;
    //$scope.takePicture = takePicture;

    ////

    function insertPlanta() {

      if ($scope.nuevaPlantaForm.$valid) {

        misPlantasSrv.insertPlanta($scope.data).then(function () {
          toastSrv.success('planta creada');
          routeSrv.go('app.mis-plantas.list');
        }).catch(function (err) {
          console.log(err.data.message);
          toastSrv.error(err.data.message || 'no se pudo crear planta');
        });
      } else {
        showErrors();
      }
    }

    function showErrors() {
      if ($scope.nuevaPlantaForm.idPlanta.$invalid) {
        toastSrv.error('identificador de planta obligatorio');
      } else if ($scope.nuevaPlantaForm.nombre.$invalid) {
        toastSrv.error('nombre de planta obligatorio');
      } else if ($scope.nuevaPlantaForm.descripcion.$invalid) {
        toastSrv.error('descripcion obligatoria');
      }
      else {
        toastSrv.error('formulario invalido');
      }
    }

    function goBack() {
      $state.go('app.mis-plantas.list');
    }
  }
}());
