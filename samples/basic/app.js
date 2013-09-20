/*global angular */
'use strict';

/**
 * The main app module
 * @name app
 * @type {angular.Module}
 */
var app = angular.module('app', ['ngResumable'])
.config(['resumableFactoryProvider', function (resumableFactoryProvider) {
  resumableFactoryProvider.defaults = {
    target: 'upload.php',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4
  };
  resumableFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
  // Can be used with different implementations of Resumable.js
  // resumableFactoryProvider.factory = MaybeResumable;
}]);