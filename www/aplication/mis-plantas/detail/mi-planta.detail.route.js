(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.mi-planta.detail', {
      url: '/detail/',
      templateUrl: '/aplication/mis-plantas/detail/mi-planta.detail.html',
      controller: 'MiPlantaDetail',
      resolve: {
        // planta: function (misPlantasSrv) {
        //   return misPlantasSrv.get();
        // }
      }
    });
  }
}());
