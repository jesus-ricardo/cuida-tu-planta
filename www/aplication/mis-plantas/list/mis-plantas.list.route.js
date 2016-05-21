(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.mis-plantas.list', {
      url: '/list',
      templateUrl: 'aplication/mis-plantas/list/mis-plantas.list.html',
      controller: 'MisPlantas',
      resolve: {
         plantas: function (misPlantasSrv) {
           return misPlantasSrv.selectPlantas();
        }
      }

    })
    ;
  }
}());
