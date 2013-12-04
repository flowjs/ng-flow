describe('init', function() {
  var $compile;
  var $rootScope;
  var element;
  var elementScope;

  beforeEach(module('ngFlow'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    element = $compile('<div ng-flow-init></div>')($rootScope);
    $rootScope.$digest();
    elementScope = element.scope();
  }));

  it('should assign $flow to element scope', function() {
    expect(elementScope.$flow).toBeDefined();
    expect($rootScope.$flow).toBeUndefined();
  });

  it('should assign $flow to given name', function() {
    element = $compile('<div ng-flow-init="{}" ng-flow-name="flow"></div>')($rootScope);
    $rootScope.$digest();
    elementScope = element.scope();
    expect(elementScope.flow).toBeDefined();
    expect($rootScope.flow).toBeUndefined();
  });

  it('should assign $flow to given scope', function() {
    $rootScope.obj = {flow:''};
    element = $compile('<div ng-flow-init="{}" ng-flow-name="obj.flow"></div>')($rootScope);
    $rootScope.$digest();
    elementScope = element.scope();
    expect(elementScope.obj.flow).toBeDefined();
    expect(elementScope.obj.flow instanceof Flow).toBeTruthy();
    expect($rootScope.obj.flow).toBeDefined();
    expect($rootScope.obj.flow instanceof Flow).toBeTruthy();
    expect($rootScope.obj.flow).toBe(elementScope.obj.flow);
  });

  it('should destroy $flow', function() {
    $rootScope.obj = {flow:''};
    $rootScope.show = true;
    element = $compile('<div ng-flow-init="{}" ng-if="show" ng-flow-name="obj.flow"></div>')($rootScope);
    $rootScope.$digest();
    elementScope = element.scope();
    expect($rootScope.obj.flow).toBeDefined();
    expect($rootScope.obj.flow instanceof Flow).toBeTruthy();
    $rootScope.show = false;
    $rootScope.$digest();
    expect($rootScope.obj.flow).toBeUndefined();
  });
});