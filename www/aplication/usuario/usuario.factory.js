/**
 * @ngdoc factory
 * @name usuarioSrv
 */
(function () {
  'use strict';

  angular.module('app')
    .factory('usuarioSrv', factory);

  function factory(httpSrv, $http, APPCONFIG) {
    return {
      login: login,
      insertUsuario: insertUsuario
    };

    //////////
    /**
     * @ngdoc method
     * @name misPlantasSrv.login
     * @param {object} user
     * @returns {promise}
     */
    function login(user) {
      return $http.post(APPCONFIG.ipServer + '/user/login', user).then(function(data){return data.data;});
    }
    /**
     * @ngdoc method
     * @name misPlantasSrv.insertUsuario
     * @param {object} user
     * @returns {promise}
     */
    function insertUsuario(user) {
      return httpSrv.post('/user/insert', user);
    }
  }
}());
