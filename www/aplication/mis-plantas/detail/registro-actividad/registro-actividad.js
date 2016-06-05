(function () {
  'use strict';

  angular.module('app')
    .controller('RegistroActividad', controller);

  function controller($scope, routeSrv, planta, toastSrv, estado,
                      dateSrv, misPlantasSrv) {
    $scope.goBack = goBack;
    $scope.update = update;
    $scope.planta = planta;

    console.log(planta);
    if(estado) {
      $scope.arduino = true;
      $scope.data = {
        idPlanta: estado.idPlanta,
        humedad: estado.humedad,
        temperatura: 23,
        ph: 5,
        luz: estado.luz,
        nota: '',
        fecha: dateSrv.format(new Date())
      };
    }else {
      $scope.arduino = false;
      $scope.data = {
        idPlanta: '',
        humedad: '',
        temperatura: '',
        ph: '',
        luz: '',
        nota: '',
        fecha: dateSrv.format(new Date())
      };
    }
    ////
    function goBack() {
      routeSrv.go('app.mis-plantas.detail',{id: planta.id});
    }
    function update() {
      toastSrv.confirm('Confirmacíón','¿Guardar registro?').then(function (res){
        if(res){
          misPlantasSrv.insertRegistro($scope.data).then(function () {
            toastSrv.success('Estado registrado');
            routeSrv.go('app.mis-plantas.detail',{id: planta.id});
          }).catch(function (err) {
            toastSrv.error
            (err.data.message || 'No se pudo añadir registro, revise su conexión');
          });
        } else {
          showErrors();
        }
      });
    }
  }
}());
