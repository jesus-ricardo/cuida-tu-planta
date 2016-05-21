(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.mis-plantas.detail', {
      url: '/detail',
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
