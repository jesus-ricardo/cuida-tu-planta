(function () {
  'use strict';

  angular.module('app')
    .controller('NuevaPlanta', controller);


  function controller($scope, routeSrv, misPlantasSrv, toastSrv) {
    $scope.data = {
      idPlanta: null,
      nombre: null,
      fechaNacimiento: new Date(),
      descripcion: ''
    }
    $scope.goBack = goBack;
    $scope.insertPlanta = insertPlanta;
    //$scope.takePicture = takePicture;

    ////

    /*function takePicture() {
      var options = {
        quality: 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 1
      };

      misPlantasSrv.getPicture(options).then(function (imageData) {
        $scope.picture = imageData;
      }, function (err) {
        console.log(err);
      });

    }*/

    function insertPlanta() {
      console.log($scope.nuevaPlantaForm);
      if ($scope.nuevaPlantaForm.$valid) {
        console.log('insertando planta');
        misPlantasSrv.insertPlanta($scope.data).then(function (data){
          console.log(data)
          toastSrv.success('planta creada');
          routeSrv.go('app.mis-plantas.list');
        }).catch(function (err){
          console.log(err.data.message);
          toastSrv.error(err.data.message || 'no se pudo crear planta');
        });
      } else {
        showErrors();
      }
    }
    function showErrors() {
      if ($scope.nuevaPlantaForm.idPlanta.$invalid){
        toastSrv.error('identificador de planta obligatorio');
      } else if ($scope.nuevaPlantaForm.nombre.$invalid){
        toastSrv.error('nombre de planta obligatorio');
      } else if ($scope.nuevaPlantaForm.descripcion.$invalid) {
        toastSrv.error('descripcion obligatoria');
      }
      else{
        toastSrv.error('formulario invalido');
      }
    }

    function goBack() {
      routeSrv.go('app.mis-plantas.list');
    }
  }
}());
