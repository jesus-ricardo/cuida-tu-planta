(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/app/usuario/login");
    $stateProvider.state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'aplication/core/app/app.html',
      controller: 'App'
    });
  }
}());
