/**
 * @ngdoc factory
 * @name toastSrv
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('toastSrv', factory);
  function factory($cordovaToast, toastr, $ionicPopup) {
    return {
      confirm: confirm,
      confirmDelete: confirmDelete,
      error: error,
      info: info,
      success: success,
      warn: warn
    };

    //////////

    /**
     * @ngdoc method
     * @name toastSrv.confirm
     * @param {string} titulo
     * @param {string} mensaje
     * @returns {Promise}
     */
    function confirm(titulo, mensaje) {
      return $ionicPopup.confirm({
        title: titulo,
        template: mensaje,
        cancelText: 'No', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: '', // String (default: 'button-default'). The type of the Cancel button.
        okText: 'Si', // String (default: 'OK'). The text of the OK button.
        okType: 'button-acttiv' // String (default: 'button-positive'). The type of the OK button.
      });
    }

    /**
     * @ngdoc method
     * @name toastSrv.confirmDelete
     * @returns {Promise}
     */
    function confirmDelete() {
      return $ionicPopup.confirm({
        title: 'Confirmación',
        template: '¿Está seguro?',
        cancelText: 'No', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: '', // String (default: 'button-default'). The type of the Cancel button.
        okText: 'Si', // String (default: 'OK'). The text of the OK button.
        okType: 'button-acttiv' // String (default: 'button-positive'). The type of the OK button.
      });
    }

    /**
     * @ngdoc method
     * @name toastSrv.error
     * @param {string} message
     */
    function error(message) {
      show('error', message);
    }


    /**
     * @ngdoc method
     * @name toastSrv.info
     * @param {string} message
     */
    function info(message) {
      show('info', message);
    }

    /**
     * @ngdoc method
     * @name toastSrv.success
     * @param {string} message
     */
    function success(message) {
      show('success', message);
    }

    /**
     * @ngdoc method
     * @name toastSrv.warn
     * @param {string} message
     */
    function warn(message) {
      show('warning', message);
    }

    ////////// priv

    function show(type, message) {
      if (ionic.Platform.is('browser')) {
        toastr[type](message);
      } else {
        $cordovaToast.show(message, 'long', 'bottom');
      }
    }
  }
}());
