'use strict';
angular.module('ngResumable.init', ['ngResumable.provider'])
.controller('NgResumableCtrl', ['$scope', '$attrs', '$parse', 'resumableFactory',
function ($scope, $attrs, $parse, resumableFactory) {
  // create the resumable object
  var options = angular.extend({}, $scope.$eval($attrs.ngResumableInit));
  var resumable = resumableFactory.create(options);

  var events = {
    fileSuccess: ['$file', '$message'],
    fileProgress: ['$file'],
    fileAdded: ['$file', '$event'],
    filesAdded: ['$files', '$event'],
    filesSubmitted: ['$files', '$event'],
    fileRetry: ['$file'],
    fileError: ['$file', '$message'],
    uploadStart: [],
    complete: [],
    progress: [],
    error: ['$message', '$file']
  };

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  angular.forEach(events, function (eventArgs, eventName) {
    var attr = 'ng' + capitaliseFirstLetter(eventName);
    if (!$attrs.hasOwnProperty(attr)) {
      return ;
    }
    var fn = $parse($attrs[attr]);
    resumable.on(eventName, function() {
      var funcArgs = arguments;
      var args = {};
      angular.forEach(eventArgs, function(value, key) {
        args[value] = funcArgs[key];
      });
      return fn($scope, args);
    });
  });

  resumable.on('catchAll', function (event) {
    if ({
      'progress':1, 'filesSubmitted':1, 'fileSuccess': 1, 'fileError': 1
    }[event]) {
      $scope.$apply();
    }
  });
  $scope.$resumable = resumable;
}])
.directive('ngResumableInit', [function() {
  return {
    scope: true,
    controller: 'NgResumableCtrl'
  };
}]);