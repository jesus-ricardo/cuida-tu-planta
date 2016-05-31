(function () {
  'use strict';

  angular
    .module('app')
    .directive('dateToString', directive);

  function directive() {
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: compileFn
    };

    function compileFn() {
      return {
        post: function (scope, element, attrs, ngModel) {
          ngModel.$formatters = [];
          ngModel.$parsers.pop();
          ngModel.$parsers.push(function (value) {
            if (ngModel.$isEmpty(value)) {
              return null;
            }
            if (/^(\d{4})-(\d{2})-(\d{2})$/.test(value)) {
              return value;
            }
          });
        }
      };
    }
  }
}());
