angular.module('flow.dragEvents', ['flow.init'])
/**
 * @name flowPreventDrop
 * Prevent loading files then dropped on element
 */
  .directive('flowPreventDrop', function() {
    return {
      'scope': false,
      'link': function(scope, element, attrs) {
        var drop = function(event) {
          event.preventDefault();
        }

        element.bind('drop dragover', drop);

        scope.$on('$destroy', function() {
          element.unbind('drop dragover', drop);
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
        var enter = false;

        var dragOver = function(event) {
            if (!isFileDrag(event)) {
                return ;
            }
            if (!enter) {
                scope.$apply(attrs.flowDragEnter);
                enter = true;
            }
            $timeout.cancel(promise);
            event.preventDefault();
        }

        element.bind('dragover', dragOver);

        var dragLeave = function(event) {
            promise = $timeout(function () {
                scope.$eval(attrs.flowDragLeave);
                promise = null;
                enter = false;
            }, 100);
        }

        element.bind('dragleave drop', dragLeave);

        scope.$on('$destroy', function() {
            element.unbind('dragover', dragOver);
            element.unbind('dragleave drop', dragLeave);
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
