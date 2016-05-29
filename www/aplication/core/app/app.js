// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngStorage', 'ionic-native-transitions', 'toastr',
  'ngCordova', 'btford.socket-io'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('App', controller);

function controller($scope, $localStorage, routeSrv) {

  $scope.close = close;
  $scope.usuario = $localStorage.user;
  $scope.goLogin = goLogin;
  $scope.goMisPlantas = goMisPlantas;
  $scope.goNuevaPlanta = goNuevaPlanta;
  $scope.goConfig = goConfig;
  /////

  function goLogin(){
    routeSrv.go('app.usuario.login', {}, {direction: 'left'});
  }

  function goMisPlantas(){
    routeSrv.go('app.mis-plantas.list', {}, {direction: 'left'});
  }
  function goNuevaPlanta(){
    routeSrv.go('app.nueva-planta', {}, {direction: 'left'});
  }

  function goConfig(){
    routeSrv.go('app.config', {}, {direction: 'left'});
  }
  function close() {
    ionic.Platform.exitApp();
  }

}
