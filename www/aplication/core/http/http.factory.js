(function () {
  'use strict';

  angular
    .module('app')
    .factory('httpSrv', factory);

  function factory($http, APPCONFIG, toastSrv, routeSrv, $q) {
    return {
      post: post,
      get: get
      /* put,
       delete: del*/
    };

    //////////

    function post(ruta, parametros) {
      return util('post', ruta, parametros);
    }

    function get(ruta, parametros) {
      return util('get', ruta, parametros);
    }

    /*function del(ruta, parametros) {
     return util('delete', ruta, parametros);
     }

     function put(ruta, parametros) {
     return util('put', ruta, parametros);
     }*/

    ////////// priv

    function util(method, ruta, parametros) {
      //loadingSrv.show();
      return $http[method](APPCONFIG.ipServer + ruta, parametros)
        .then(function (res) {
          return res.data;
        })
        .catch(handleError)
        .finally(function () {
          //loadingSrv.hide();
        });
    }

    function handleError(err) {
      if (err.status === 401) {
        //routeSrv.go('app.usuario.login');
      } else if (err.status === -1) {
        //toastSrv.error('Se ha perdido la conexión');
      }
      return $q.reject(err);
    }
  }
}());
