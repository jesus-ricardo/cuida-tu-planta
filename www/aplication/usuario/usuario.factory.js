(function () {
  'use strict';

  angular.module('app')
    .factory('usuarioSrv', factory);

  function factory($http) {
    return {
      login: login
    };

    //////////
    function login(user) {
      console.log(user);
      return $http.post('http://localhost:7777/user/login',user);
    }
  }
}());
