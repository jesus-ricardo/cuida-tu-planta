(function () {
  'use strict';

  angular.module('app')
    .directive('expandTextarea', function () {
      return {
        restrict: 'E',
        templateUrl:'aplication/core/auto-expand/expand.html',
        scope:{
          name:'@',
          label:'@',
          placeholder:'@',
          expandModel:'='
        },
        link: function (scope, element) {
          function update() {
            element.css('height', 'auto');
            var height = element[0].children[0].children[1].children[0].scrollHeight;
            element.css('height', element[0].children[0].children[1].children[0].scrollHeight + 'px');
            //console.log(element);
            console.log(element[0].children[0].children[1].children[0].scrollHeight);
            console.log(height);
          }



          scope.$watch('expandModel', function () {
            update();
          });
        }
      };
    });
}());
