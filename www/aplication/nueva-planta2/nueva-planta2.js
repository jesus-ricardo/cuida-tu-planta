(function () {
  'use strict';

  angular.module('app')
    .controller('NuevaPlanta2', controller);


  function controller($scope, $state, misPlantasSrv, toastSrv, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, APPCONFIG, $localStorage) {
    $scope.data = {
      idPlanta: null,
      nombre: null,
      fechaNacimiento: new Date(),
      descripcion: ''
    };
    $scope.goBack = goBack;
    $scope.insertPlanta = insertPlanta;
    //$scope.takePicture = takePicture;

    ////

    function insertPlanta() {

      if ($scope.nuevaPlantaForm.$valid) {

        misPlantasSrv.insertPlanta($scope.data).then(function () {
          toastSrv.success('planta creada');
          $scope.upload().then(function (result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            toastSrv.success('foto enviada correctamente al servidor');
            routeSrv.go('app.mis-plantas.list');
          }, function (err) {
            console.log("ERROR: " + JSON.stringify(err));
            toastSrv.error("ERROR: " + JSON.stringify(err));
            toastSrv.error('fallo al enviar foto al servidor');
          }, function (progress) {
            // constant progress updates
          });

        }).catch(function (err) {
          console.log(err.data.message);
          toastSrv.error(err.data.message || 'no se pudo crear planta');
        });
      } else {
        showErrors();
      }
    }

    function showErrors() {
      if ($scope.nuevaPlantaForm.idPlanta.$invalid) {
        toastSrv.error('identificador de planta obligatorio');
      } else if ($scope.nuevaPlantaForm.nombre.$invalid) {
        toastSrv.error('nombre de planta obligatorio');
      } else if ($scope.nuevaPlantaForm.descripcion.$invalid) {
        toastSrv.error('descripcion obligatoria');
      }
      else {
        toastSrv.error('formulario invalido');
      }
    }

    function goBack() {
      toastSrv.warn('pa atras');
      $state.go('app.mis-plantas.list');
    }




    //camera

    $scope.image = '';

    $scope.urlForImage = function(imageName) {
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;
      return trueOrigin;
    };
    $scope.upload = function(){
      toastSrv.success('aun tiene que hechar foto');
    };
    $scope.addImage = function() {
      // 2
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA, //   Camera.PictureSourceType.PHOTOLIBRARY
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
      };

      // 3
      $cordovaCamera.getPicture(options).then(function (imageData) {

        // 4
        onImageSuccess(imageData);

        function onImageSuccess(fileURI) {
          createFileEntry(fileURI);
        }

        function createFileEntry(fileURI) {
          window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        // 5
        function copyFile(fileEntry) {
          var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
          var newName = makeid() + name;

          window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileSystem2) {
              fileEntry.copyTo(
                fileSystem2,
                newName,
                onCopySuccess,
                fail
              );
            },
            fail);
        }

        // 6
        function onCopySuccess(entry) {
          $scope.$apply(function () {
            $scope.image = entry.nativeURL;
            toastSrv.success($scope.urlForImage(entry.nativeURL));
            $scope.upload = function () {
              var options = {
                fileKey: "planta",
                fileName: 'planta',
                chunkedMode: false,
                mimeType: "image/jpeg",
                params: {idPlanta: $scope.data.idPlanta, idUsuario: $localStorage.user._id}
              };
              return $cordovaFileTransfer.upload(APPCONFIG.ipServer+ '/upload', $scope.urlForImage(entry.nativeURL), options);
            }
          });
        }

        function fail(error) {
          console.log("fail: " + error.code);
        }

        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        }

      }, function (err) {
        console.log(err);
      });
    }

    }
}());
