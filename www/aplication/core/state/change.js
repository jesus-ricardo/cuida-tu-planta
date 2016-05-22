(function () {
  'use strict';

  angular
    .module('app')
    .run(run);
  function run($rootScope, $ionicPopup, routeSrv, $localStorage) {
    $rootScope.$on('$stateChangeError', function (event, a1, a2, a3, a4, err) {
      console.log(err);
      if (err.status == -1) {
        $ionicPopup.alert({
          title: 'Compruebe su conexión',
          content: 'Problema conectando al servidor'
        });
      }
    });
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if ($localStorage.user == null && toState.name != 'app.usuario.login') {
        event.preventDefault();
        routeSrv.go('app.usuario.login');
      }
    });
  }
})();
