!function (angular) {'use strict';
  var module = angular.module('ngFlow.init', ['ngFlow.provider'])
    .controller('NgFlowCtrl', ['$scope', '$attrs', '$parse', 'flowFactory',
    function ($scope, $attrs, $parse, flowFactory) {
      // create the flow object
      var options = angular.extend({}, $scope.$eval($attrs.ngFlowInit));
      var flow = flowFactory.create(options);

      flow.on('catchAll', function (event) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        $scope.$broadcast.apply($scope, ['flow::' + event, flow].concat(args));
        if ({
          'progress':1, 'filesSubmitted':1, 'fileSuccess': 1, 'fileError': 1
        }[event]) {
          $scope.$apply();
        }
      });

      $scope.$flow = flow;
      if ($attrs.hasOwnProperty('ngFlowName')) {
        $parse($attrs.ngFlowName).assign($scope, flow);
        $scope.$on('$destroy', function () {
          $parse($attrs.ngFlowName).assign($scope);
        });
      }
    }])
    .directive('ngFlowInit', [function() {
      return {
        scope: true,
        controller: 'NgFlowCtrl'
      };
    }]);

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

  angular.forEach(events, function (eventArgs, eventName) {
    var name = 'ng' + capitaliseFirstLetter(eventName);
    module.directive(name, [function() {
      return {
        require: '^ngFlowInit',
        controller: ['$scope', '$attrs', function ($scope, $attrs) {
          $scope.$on('flow::' + eventName, function () {
            var funcArgs = Array.prototype.slice.call(arguments);
            funcArgs.shift();// remove angular event
            // remove flow object and ignore event if it is from parent directive
            if ($scope.$flow !== funcArgs.shift()) {
              return ;
            }
            var args = {};
            angular.forEach(eventArgs, function(value, key) {
              args[value] = funcArgs[key];
            });
            return $scope.$eval($attrs[name], args);
          });
        }]
      };
    }]);
  });

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}(angular);