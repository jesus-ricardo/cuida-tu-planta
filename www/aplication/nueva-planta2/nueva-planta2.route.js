(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.nueva-planta', {
      url: '/nueva-planta',
      templateUrl: 'aplication/nueva-planta2/nueva-planta2.html',
      controller: 'NuevaPlanta2'
    });
  }
}());
