(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.detail', {
      cache: false,
      url: '/detail/:id',
      templateUrl: '/aplication/detail2/mi-planta.detail.html',
      controller: 'MiPlantaDetail2',
      resolve: {
        planta: function (misPlantasSrv2, $stateParams) {
          return misPlantasSrv2.getPlanta($stateParams.id);
        }
      }
    });
  }
}());
