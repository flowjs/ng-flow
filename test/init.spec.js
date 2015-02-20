describe('init', function() {
  var $compile;
  var $rootScope;
  var element;
  var elementScope;
  var flowFactory;

  beforeEach(module('flow'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _flowFactory_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    flowFactory = _flowFactory_;
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

  describe('flow-object', function () {
    it('should create a new flow object', function () {
      spyOn(flowFactory, 'create').andCallThrough();
      $compile('<div flow-init></div>')($rootScope);
      $rootScope.$digest();
      expect(flowFactory.create).toHaveBeenCalled();
    });
    it('should init with the existing flow object', function () {
      $rootScope.existingFlow = flowFactory.create();
      spyOn(flowFactory, 'create').andCallThrough();
      element = $compile('<div flow-init flow-object="existingFlow"></div>')($rootScope);
      elementScope = element.scope();
      $rootScope.$digest();
      expect(flowFactory.create).not.toHaveBeenCalled();
      expect($rootScope.existingFlow).toBe(elementScope.$flow);
    });
    it('should not create multiple event handlers for an existing flow object', function () {
      $rootScope.existingFlow = flowFactory.create();
      $compile('<div flow-init flow-object="existingFlow"></div>')($rootScope);
      element = $compile('<div flow-init flow-object="existingFlow"></div>')($rootScope);
      elementScope = element.scope();
      $rootScope.$digest();

      expect($rootScope.existingFlow).toBe(elementScope.$flow);

      expect($rootScope.existingFlow.events.catchall).toBeDefined();
      expect($rootScope.existingFlow.events.catchall.length).toBe(1);
    });
  });
});