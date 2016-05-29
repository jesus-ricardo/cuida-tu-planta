/*
 app.factory('socket', function(socketFactory){
 //Create socket and connect to http://192.168.1.38:8888
 var myIoSocket = io.connect('http://192.168.1.38:8888');

 mySocket = socketFactory({
 ioSocket: myIoSocket
 });

 return mySocket;
 });
 */
/*
(function () {
  'use strict';

  angular.module('app')
    .factory('socket', factory);

  function factory($rootScope) {
    

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
    
      }
    }
  }
}());
*/
