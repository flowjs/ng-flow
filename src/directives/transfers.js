angular.module('ngResumable.transfers', ['ngResumable.init'])
.directive('ngResumableTransfers', [function() {
  'use strict';
  return {
    'scope': true,
    'require': '^ngResumableInit',
    'link': function(scope) {
      scope.transfers = scope.$resumable.files;
    }
  };
}]);