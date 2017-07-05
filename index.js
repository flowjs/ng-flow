/* backwards compatable with deprecated index.js*/
try {
  console.warn(new Error("use const ngFlow = require('@flowjs/ng-flow');"));
} catch (e) {
  // do nothing
}
module.exports = require('./src/ng-flow');
