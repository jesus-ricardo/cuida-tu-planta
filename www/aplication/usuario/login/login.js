(function () {
  'use strict';

  angular.module('app')
    .controller('Login', controller);

  function controller($scope, usuarioSrv, $localStorage) {
    $scope.data = {
      nombre: 'juan',
      password: 'juan'
    }
    $scope.login = login;

    function login() {
      console.log($scope.loginForm);
      if ($scope.loginForm.$valid){
        console.log('conectando');
        usuarioSrv.login($scope.data).then(function (user){
          $localStorage.user = user.data[0];
          console.log(user.data[0]);
          console.log('login realizado');
        }).catch((err)=>{
          console.log('Login falló');
        });
      } else{
        showErrors();
      }
    }
    function showErrors(){
      if ($scope.loginForm.nombre.$invalid){
        console.log('usuario obligatorio');
      } else if ($scope.loginForm.password.$invalid) {
        console.log('contraseña obligatoria');
      } else {
        console.log('formulario invalido');
      }
    }
  }
}());
