angular.module('ngResumable.btn', ['ngResumable.init'])
.directive('ngResumableBtn', [function() {
  return {
    'restrict': 'EA',
    'scope': false,
    'require': '^ngResumableInit',
    'link': function(scope, element, attrs) {
      var isDirectory = attrs.hasOwnProperty('ngDirectory');
      var isSingleFile = attrs.hasOwnProperty('ngSingleFile');
      scope.$resumable.assignBrowse(element, isDirectory, isSingleFile);
    }
  };
}]);