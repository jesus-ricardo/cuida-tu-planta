(function () {
  'use strict';

  angular.module('app')
    .controller('NuevaPlanta', controller);


  function controller($scope, routeSrv, misPlantasSrv) {
    $scope.data = {
      idPlanta: null,
      nombre: null,
      fechaNacimiento: new Date()
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
          console.log('planta creada');
        }).catch(function (err){
          console.log(err.message);
        });
      } else {
        showErrors();
      }
    }
    function showErrors() {
      if ($scope.nuevaPlantaForm.idPlanta.$invalid){
        console.log('identificador de planta obligatorio');
      } else if ($scope.nuevaPlantaForm.nombre.$invalid){
        console.log('nombre de planta obligatorio');
      } else{
        console.log('formulario invalido');
      }
    }

    function goBack() {
      routeSrv.go('app.mis-plantas.list');
    }
  }
}());
