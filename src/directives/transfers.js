'use strict';
angular.module('ngResumable.transfers', []).directive('ngResumableTransfers', [function() {
  return {
    'restrict': 'EA',
    'scope': true,
    'link': function(scope) {
      var resumable = scope.$resumable;
      if (!resumable) {
        throw 'directive called outside ngResumable scope';
      }
      scope.transfers = resumable.files;
    }
  };
}]);