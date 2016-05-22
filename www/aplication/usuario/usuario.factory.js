(function () {
  'use strict';

  angular.module('app')
    .factory('usuarioSrv', factory);

  function factory(httpSrv) {
    return {
      login: login,
      insertUsuario: insertUsuario
    };

    //////////
    function login(user) {
      return httpSrv.post('/user/login', user);    
    }

    function insertUsuario(user) {
      return httpSrv.post('/user/insert', user);
    }
  }
}());
