(function () {
  'use strict';

  angular.module('app')
    .factory('routeSrv', factory);

  function factory($ionicNativeTransitions, $state) {

    return {
      go: go
    };

    //////////

    /*
     * Opciones disponibles:
     * direction: [left|right|up|down] Cambia la animación
     * reload: [true|false] Indica si vamos limpiar la cache y recargar datos
     */
    function go(state, stateParams, options) {
      options = {};
      options.type = 'slide';
      options.direction = options.direction || 'left';
      return goTo(state, stateParams, options);
    }

    ////////// priv

    function goTo(state, stateParams, effects) {
      if (ionic.Platform.is('browser')) {
        $state.go(state, stateParams, effects);
      } else {
        $ionicNativeTransitions.stateGo(state, stateParams, effects);
      }
    }
  }
}());
