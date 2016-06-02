/**
 * @ngdoc factory
 * @name loadingSrv
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('loadingSrv', factory);

  function factory($ionicLoading, $cordovaSpinnerDialog) {
    var manual = false; // Indica si está en modo manual
    var enabled = true; // Indica si está habilitado el spinner
    var isMobile = typeof cordova !== 'undefined';

    return {
      show : show,
      hide : hide,
      disable : disable,
      enable : enable
    };

    /////////

    /**
     * @ngdoc method
     * @name loadingSrv.show
     * @param {object} args
     * @param {boolean} args.manual
     */
    function show(args) {
      if (enabled) {
        if (!manual) {
          args = args || {manual: false};
          manual = Boolean(args.manual);
          hybridShow();
        }
      }
    }

    /*
     * Si se ha ejecutado show({manual: true})
     * No queremos ocultarlo automáticamente,
     * sólo si args.manual (Si es manual el hide)
     */
    /**
     * @ngdoc method
     * @name loadingSrv.hide
     * @param {object} args
     * @param {boolean} args.manual
     */
    function hide(args) {
      if (enabled) {
        args = args || {manual: false};
        if (!manual || args.manual) {
          hybridHide();
          manual = false;
        }
      }
    }

    /**
     * @ngdoc method
     * @name loadingSrv.disable
     */
    function disable() {
      enabled = false;
    }

    /**
     * @ngdoc method
     * @name loadingSrv.enable
     */
    function enable() {
      enabled = true;
    }

    ///////// priv

    function hybridShow() {
      if (isMobile) {
        $cordovaSpinnerDialog.show();
      } else {
        $ionicLoading.show({
          showBackdrop: false
        });
      }
    }

    function hybridHide() {
      if (isMobile) {
        $cordovaSpinnerDialog.hide();
      } else {
        $ionicLoading.hide();
      }
    }
  }
}());
