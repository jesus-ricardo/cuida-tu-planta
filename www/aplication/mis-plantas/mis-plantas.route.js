(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.mis-plantas', {
      abstract: true,
      url: '/mis-plantas',
      template: '<ion-nav-view></ion-nav-view>'
    });
  }
}());
