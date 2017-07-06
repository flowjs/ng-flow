/* backwards compatable with deprecated index.js*/
try {
  console.warn(new Error("use const ngFlow = require('@flowjs/ng-flow');"));
} catch (e) {
  // do nothing
}

if (typeof window === 'object') {
  window.Flow = require('@flowjs/flow.js');
}
module.exports = require('./src/ng-flow');
