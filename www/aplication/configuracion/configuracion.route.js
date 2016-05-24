(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.config', {
      url: '/config',
      templateUrl: 'aplication/configuracion/configuracion.html',
      controller: 'Config'
    });
  }
}());
