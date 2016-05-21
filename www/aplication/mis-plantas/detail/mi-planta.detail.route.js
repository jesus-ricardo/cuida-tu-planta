(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.mis-plantas.detail', {
      url: '/detail/:id',
      templateUrl: '/aplication/mis-plantas/detail/mi-planta.detail.html',
      controller: 'MiPlantaDetail',
      resolve: {
        planta: function (misPlantasSrv, $stateParams) {
          return misPlantasSrv.getPlanta($stateParams.id);
        }
      }
    });
  }
}());
