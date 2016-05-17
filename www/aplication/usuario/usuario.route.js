(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/app/mis-plantas/list");
    $stateProvider.state('app.usuario', {
      abstract: true,
      url: '/usuario',
      template: '<ion-nav-view></ion-nav-view>',
    });
  }
}());
