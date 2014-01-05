angular.module('flow.dragEvents', ['flow.init'])
/**
 * @name flowPreventDrop
 * Prevent loading files then dropped on element
 */
  .directive('flowPreventDrop', function() {
    return {
      'scope': false,
      'link': function(scope, element, attrs) {
        element.bind('drop', function (event) {
          event.preventDefault();
        });
      }
    };
  })
/**
 * @name flowDragEnter
 * executes `flowDragEnter` and `flowDragLeave` events
 */
  .directive('flowDragEnter', ['$timeout', function($timeout) {
    return {
      'scope': false,
      'link': function(scope, element, attrs) {
        var promise;
        element.bind('dragover', function (event) {
          if (!isFileDrag(event)) {
            return ;
          }
          if (!promise) {
            scope.$apply(attrs.flowDragEnter);
          } else {
            $timeout.cancel(promise);
          }
          promise = $timeout(function () {
            scope.$eval(attrs.flowDragLeave);
            promise = null;
          }, 100);
          event.preventDefault();
        });
        function isFileDrag(dragEvent) {
          var fileDrag = false;
          var dataTransfer = dragEvent.dataTransfer || dragEvent.originalEvent.dataTransfer;
          angular.forEach(dataTransfer && dataTransfer.types, function(val) {
            if (val === 'Files') {
              fileDrag = true;
            }
          });
          return fileDrag;
        }
      }
    };
  }]);