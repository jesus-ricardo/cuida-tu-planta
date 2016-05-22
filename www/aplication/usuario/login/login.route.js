(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.usuario.login', {
      cache: false,
      url: '/login',
      templateUrl: 'aplication/usuario/login/login.html',
      controller: 'Login'
    });
  }
}());
