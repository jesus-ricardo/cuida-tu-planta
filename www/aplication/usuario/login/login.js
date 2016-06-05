(function () {
  'use strict';

  angular.module('app')
    .controller('Login', controller);

  function controller($scope, usuarioSrv, $localStorage, routeSrv, toastSrv) {
    $scope.data = {
      nombre: 'juan',
      password: 'juan'
    };
    $scope.registroData = {
      nombre: '',
      apellido1: '',
      apellido2: '',
      password: '',
      email: ''
    };
    $scope.loguear = true;
    $scope.login = login;
    $scope.registrar = registrar;
    $scope.setLoguear = setLoguear;
    $scope.setRegistro = setRegistro;

    function login() {
      if ($scope.loginForm.$valid) {
        console.log($scope.data);
        usuarioSrv.login($scope.data).then(function (user) {
          $localStorage.user = user[0];
          console.log(user[0]);
          toastSrv.success('login realizado');
          routeSrv.go('app.mis-plantas.list');
        }).catch(function () {
          toastSrv.error('Login falló');
        });
      } else {
        showErrors();
      }
    }

    function showErrors() {
      if ($scope.loginForm.nombre.$invalid) {
        toastSrv.error('usuario obligatorio');
      } else if ($scope.loginForm.password.$invalid) {
        toastSrv.error('contraseña obligatoria');
      } else {
        toastSrv.error('formulario invalido');
      }
    }

    function registrar() {
      if ($scope.loginForm.$valid) {
        usuarioSrv.insertUsuario($scope.registroData).then(function () {
          toastSrv.success('cuenta creada');
        }).catch(function (err) {
          console.log(err);
          toastSrv.error(err.data.message || 'Fallo al crear la cuenta');
        })
      } else {
        showErrorsRegistro();
      }
    }

    function showErrorsRegistro() {
      if ($scope.loginForm.nombreRegistro.$invalid) {
        toastSrv.error('Usuario obligatorio');
      } else if ($scope.loginForm.apellido1Registro.$invalid) {
        toastSrv.error('Primer apellido obligatorio');
      } else if ($scope.loginForm.apellido2Registro.$invalid) {
        toastSrv.error('Segundo apellido invalido');
      } else if ($scope.loginForm.emailRegistro.$invalid) {
        toastSrv.error('Email invalido');
      } else if ($scope.loginForm.passwordRegistro.$invalid) {
        toastSrv.error('Contraseña obligatoria');
      } else {
        toastSrv.error('Formulario inválido');
      }
    }

    function setLoguear() {
      $scope.loguear = true;
    }

    function setRegistro() {
      $scope.loguear = false;
    }
  }
}());
