(function(){
	angular.module('app').run(run);
      function run($localStorage, $rootScope) {
      	$rootScope.tema = $localStorage.tema || 'balanced';
      }
})();