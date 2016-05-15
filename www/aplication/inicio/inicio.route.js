(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.animador', {
      url: '/inicio',
      templateUrl: 'aplication/inicio/inicio.html',
      controller: 'Inicio'
    });
  }
}());
