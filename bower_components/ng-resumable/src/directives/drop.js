'use strict';
angular.module('ngResumable.drop', ['ngResumable.init'])
.directive('ngResumableDrop', ['$timeout', function($timeout) {
  return {
    'scope': false,
    'require': '^ngResumableInit',
    'link': function(scope, element, attrs) {
      scope.$resumable.assignDrop(element);
      var dragOverClass = attrs.ngDragOverClass;
      if (dragOverClass) {
        var promise;
        element.bind('dragover', function (event) {
          if (!isFileDrag(event)) {
            return ;
          }
          element.addClass(dragOverClass);
          $timeout.cancel(promise);
          promise = $timeout(function () {
            element.removeClass(dragOverClass);
          }, 100, false);
          event.preventDefault();
        });
      }
      function isFileDrag(dragEvent) {
        var fileDrag = false;
        angular.forEach(dragEvent.dataTransfer.types, function(val) {
          if (val === 'Files') {
            fileDrag = true;
          }
        });
        return fileDrag;
      }
    }
  };
}]);