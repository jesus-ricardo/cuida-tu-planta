(function () {
  'use strict';

  angular.module('app')
    .controller('Config', controller);

  function controller($scope, $ionicModal, $localStorage, $rootScope, $window) {
  	$scope.openTemas = openTemas;
  	$scope.descartaTemas = descartaTemas;
  	$scope.cambiaTema = cambiaTema;

  	$ionicModal.fromTemplateUrl('aplication/configuracion/modal/temas.modal.html',
  		{scope: $scope, animation: 'slide-in-up'}).then(function (modal) {
  			$scope.modalTemas = modal;
  		});
  	function openTemas() {
  		$scope.modalTemas.show();
  	}
  	function descartaTemas() {
  		$scope.modalTemas.hide();	
  	}
  	function cambiaTema(tema) {
  		$localStorage.tema = tema;
  		$rootScope.tema = tema;
  		$scope.modalTemas.hide();
  		$window.location.reload();
  	}
  }
}());
