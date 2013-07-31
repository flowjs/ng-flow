'use strict';
angular.module('ngResumable.init', ['ngResumable.provider'])
.directive('ngResumableInit', ['resumableFactory', '$parse', function(resumableFactory, $parse) {
    return {
        restrict: 'EA',
        scope: true,
        compile: function () {
            return {
                pre: function (scope, element, attrs) {
                    // create the resumable object
                    var options = angular.extend({}, scope.$eval(attrs.ngResumableInit));
                    var resumable = resumableFactory.create(options);

                    var events = {
                        fileSuccess: ['$file', '$message'],
                        fileProgress: ['$file'],
                        fileAdded: ['$file', '$event'],
                        filesAdded: ['$files'],
                        fileRetry: ['$file'],
                        fileError: ['$file', '$message'],
                        uploadStart: [],
                        complete: [],
                        progress: [],
                        error: ['$message', '$file'],
                        pause: [],
                        cancel: []
                    };

                    function capitaliseFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }

                    angular.forEach(events, function (eventArgs, eventName) {
                        var attr = 'ng' + capitaliseFirstLetter(eventName);
                        if (!attrs.hasOwnProperty(attr)) {
                            return ;
                        }
                        var fn = $parse(attrs[attr]);
                        resumable.on(eventName, function() {
                            var args = {};
                            angular.forEach(eventArgs, function(value, key) {
                                args[value] = arguments[key];
                            });
                            fn(scope, args);
                        });
                    });

                    resumable.on('catchAll', function (event) {
                        // can't drop $$phase usage, because progress is called on cancel and retry
                        if ({
                            'fileSuccess':1, 'filesAdded':1, 'progress':1
                        }[event] && !scope.$$phase) {
                            scope.$apply();
                        }
                    });

                    scope.$resumable = resumable;
                }
            }
        }
    };
}]);