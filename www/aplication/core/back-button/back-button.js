(function () {
  'use strict';

  angular
    .module('app')
    .run(run);


  //////////

  function run(routeSrv, $ionicPlatform) {
    $ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
      routeSrv.back();
    }, 101);
  }
}());
