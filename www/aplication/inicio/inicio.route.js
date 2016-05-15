(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.inicio', {
      url: '/inicio',
      templateUrl: 'aplication/inicio/inicio.html',
      controller: 'Inicio'
    });
  }
}());
