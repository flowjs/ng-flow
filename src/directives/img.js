'use strict';
angular.module('ngResumable.img', [])
.directive('ngResumableImg', [function() {
  return {
    'restrict': 'EA',
    'scope': false,
    'link': function(scope, element, attrs) {
      var resumable = scope.$resumable;
      if (!resumable) {
        throw 'directive called outside ngResumable scope';
      }
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