(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/app/mis-plantas/list");
    $stateProvider.state('app', {
      cache: false,
      abstract: true,
      url: '/app',
      templateUrl: 'aplication/core/app/app.html',
      controller: 'App'
    });
  }
}());
