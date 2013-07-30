'use strict';
angular.module('ngResumable.drop', [])
.directive('ngResumableDrop', [function() {
    return {
        'restrict': 'EA',
        'scope': false,
        'link': function(scope, element, attrs) {
            var resumable = scope.$resumable;
            if (!resumable) {
                throw "directive called outside ngResumable scope";
            }
            resumable.assignDrop(element);
        }
    };
}]);