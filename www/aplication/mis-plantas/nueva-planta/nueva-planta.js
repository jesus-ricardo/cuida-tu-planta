(function () {
  'use strict';

  angular.module('app')
    .controller('NuevaPlanta', controller);


  function controller($scope, routeSrv, misPlantasSrv) {
    $scope.goBack = goBack;
    $scope.takePicture = takePicture;

    ////

    function takePicture() {
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

    }

    function goBack() {
      routeSrv.go('app.mis-plantas.list');
    }
  }
}());
