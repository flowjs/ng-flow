angular.module('flow.drop', ['flow.init'])
.directive('flowDrop', function() {
  return {
    'scope': false,
    'require': '^flowInit',
    'link': function(scope, element, attrs) {
      scope.$flow.assignDrop(element);
    }
  };
});
