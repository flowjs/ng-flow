describe('init', function() {
  var $compile;
  var $rootScope;
  var element;
  var elementScope;

  beforeEach(module('flow'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    element = $compile('<div flow-init></div>')($rootScope);
    $rootScope.$digest();
    elementScope = element.scope();
  }));

  it('should assign $flow to element scope', function() {
    expect(elementScope.$flow).toBeDefined();
    expect($rootScope.$flow).toBeUndefined();
  });

  describe('flow-name', function () {
    beforeEach(function () {
      $rootScope.obj = {flow:''};
      element = $compile('<div flow-init flow-name="obj.flow"></div>')($rootScope);
      $rootScope.$digest();
      elementScope = element.scope();
    });

    it('should assign $flow reference to element scope', function () {
      expect(elementScope.$flow).toBeDefined();
      expect($rootScope.$flow).toBeUndefined();
    });

    it('should assign $flow to given scope', function() {
      expect(elementScope.obj.flow).toBeDefined();
      expect(elementScope.obj.flow instanceof Flow).toBeTruthy();
      expect($rootScope.obj.flow).toBeDefined();
      expect($rootScope.obj.flow instanceof Flow).toBeTruthy();
      expect($rootScope.obj.flow).toBe(elementScope.obj.flow);
    });

    it('should destroy $flow', function() {
      expect($rootScope.obj.flow).toBeDefined();
      expect($rootScope.obj.flow instanceof Flow).toBeTruthy();
      elementScope.$destroy();
      expect($rootScope.obj.flow).toBeUndefined();
    });
  });
});