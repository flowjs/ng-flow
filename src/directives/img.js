'use strict';
angular.module('ngResumable.img', ['ngResumable.init'])
.directive('ngResumableImg', [function() {
  return {
    'scope': false,
    'require': '^ngResumableInit',
    'link': function(scope, element, attrs) {
      var file = attrs.ngResumableImg;
      scope.$watch(file, function (file) {
        if (!file) {
          return ;
        }
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file.file);
        fileReader.onload = function (event) {
          scope.$apply(function () {
            attrs.$set('src', event.target.result);
          });
        };
      });
    }
  };
}]);