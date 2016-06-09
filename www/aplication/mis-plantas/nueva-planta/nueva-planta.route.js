(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.mis-plantas.nueva-planta', {
      cache: false,
      url: '/nueva-planta',
      templateUrl: 'aplication/mis-plantas/nueva-planta/nueva-planta.html',
      controller: 'NuevaPlanta'
    });
  }
}());
