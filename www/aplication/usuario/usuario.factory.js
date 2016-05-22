(function () {
  'use strict';

  angular.module('app')
    .factory('usuarioSrv', factory);

  function factory($http, APPCONFIG) {
    return {
      login: login,
      insertUsuario: insertUsuario
    };

    //////////
    function login(user) {
      console.log(user);
      return $http.post(APPCONFIG.ipServer + '/user/login',user);
    }
    function insertUsuario(user) {
      return $http.post(APPCONFIG.ipServer + '/user/insert',user);
    }
  }
}());
