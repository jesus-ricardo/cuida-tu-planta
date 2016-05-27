(function () {
  'use strict';

  angular.module('app')
    .controller('RegistroActividad', controller);

  function controller($scope, routeSrv, planta, toastSrv) {
    $scope.goBack = goBack;
    $scope.update = update;
    $scope.planta = planta;
    console.log(planta);

    $scope.data={
      humedad: 20,
      temperatura:23,
      ph:5,
      luz:3223,
      nota:'',
      fecha: new Date()
    };
    ////
    function goBack() {
      routeSrv.go('app.mis-plantas.detail',{id: planta.id});
    }
    function update(){
      toastSrv.confirm('confirmacíón','¿Guardar registro?').then(function (res){
        if(res){

        }
      });
    }
  }
}());
