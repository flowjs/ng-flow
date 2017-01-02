(function (Flow, FustyFlow, window) {
  'use strict';

  var fustyFlowFactory = function (opts) {
    var flow = new Flow(opts);
    if (flow.support) {
      return flow;
    }
    return new FustyFlow(opts);
  }

  window.fustyFlowFactory = fustyFlowFactory;

})(window.Flow, window.FustyFlow, window);
