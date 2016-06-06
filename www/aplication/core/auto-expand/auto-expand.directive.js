(function () {
  'use strict';

  angular.module('app')
    .directive('expandTextarea', function () {
      return {
        restrict: 'E',
        templateUrl: 'aplication/core/auto-expand/expand.html',
        scope: {
          name: '@',
          label: '@',
          placeholder: '@',
          expandModel: '='
        },
        link: function (scope, element) {
          function update() {
            element.find('textarea').css('height', 'auto');
            var height = element.find('textarea')[0].scrollHeight;
            element.find('textarea').css('height',
              element.find('textarea')[0].scrollHeight + 'px');
          }
          scope.$watch('sqaModel', function () {
            update();
          });


          scope.$watch('expandModel', function () {
            update();
          });
        }
      };
    });
}());
