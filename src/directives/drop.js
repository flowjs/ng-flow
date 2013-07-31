'use strict';
angular.module('ngResumable.drop', [])
.directive('ngResumableDrop', ['$timeout', function($timeout) {
    return {
        'restrict': 'EA',
        'scope': false,
        'link': function(scope, element, attrs) {
            var resumable = scope.$resumable;
            if (!resumable) {
                throw "directive called outside ngResumable scope";
            }
            resumable.assignDrop(element);
            var dragOverClass = attrs.ngDragOverClass;
            if (dragOverClass) {
                var promise;
                element.bind('dragover', function (event) {
                    element.addClass(dragOverClass);
                    $timeout.cancel(promise);
                    promise = $timeout(function () {
                        element.removeClass(dragOverClass);
                    }, 100, false);
                    event.preventDefault();
                });
            }
        }
    };
}]);