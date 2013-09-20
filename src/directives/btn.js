'use strict';
angular.module('ngResumable.btn', ['ngResumable.init'])
.directive('ngResumableBtn', [function() {
  return {
    'restrict': 'EA',
    'scope': false,
    'require': '^ngResumableInit',
    'link': function(scope, element, attrs) {
      var isDirectory = attrs.hasOwnProperty('ngDirectory');
      scope.$resumable.assignBrowse(element, isDirectory);
    }
  };
}]);