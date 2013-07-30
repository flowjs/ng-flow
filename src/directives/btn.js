'use strict';
angular.module('ngResumable.btn', [])
.directive('ngResumableBtn', [function() {
    return {
        'restrict': 'EA',
        'scope': false,
        'link': function(scope, element, attrs) {
            var isDirectory = attrs.hasOwnProperty('ngDirectory');
            var resumable = scope.$resumable;
            if (!resumable) {
                throw "directive called outside ngResumable scope";
            }
            resumable.assignBrowse(element, isDirectory);
        }
    };
}]);