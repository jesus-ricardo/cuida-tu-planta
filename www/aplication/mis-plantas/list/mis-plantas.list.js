(function () {
  'use strict';

  angular.module('app')
    .controller('MisPlantas', controller);

  function controller($scope) {

    $scope.goDetail = goDetail;


    //////

    function goDetail() {
     //$state.go('app.mis-plantas.detail',{},{});
    }
  }
}());
