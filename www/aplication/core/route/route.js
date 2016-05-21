(function () {
  'use strict';

  angular.module('app')
    .factory('routeSrv', factory);

  function factory($ionicNativeTransitions, $state, $ionicHistory) {

    return {
      clearIonicHistory: clearIonicHistory,
      go: go,
      back: back
    };

    //////////

    function clearIonicHistory() {
      $ionicHistory.clearHistory();
    }

    /*
     * Opciones disponibles:
     * direction: [left|right|up|down] Cambia la animación
     * reload: [true|false] Indica si vamos limpiar la cache y recargar datos
     */
    function go(state, stateParams, options) {
      options = {};
      options.type = 'slide';
      options.direction = options.direction || 'left';
      if (options.reload === true) {
        return $ionicHistory.clearCache().then(function () {
          return goTo(state, stateParams, options);
        });
      }
      return goTo(state, stateParams, options);
    }

    function back(optionsParams) {
      var options = optionsParams || {reload: false};
      if (
        $ionicHistory.viewHistory()
          .histories[$ionicHistory.currentHistoryId()].stack.length > 1
      ) {
        if (options.reload === true) {
          $ionicHistory.clearCache().then(function () {
            $ionicHistory.goBack();
          });
        } else {
          $ionicHistory.goBack();
        }
      } else if (ionic.Platform.is('browser')) {
        go('app.mis-plantas.list', {}, {direction: 'up'});
      } else {
            ionic.Platform.exitApp();
      }
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
