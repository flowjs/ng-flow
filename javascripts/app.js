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
      target: '/',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    resumableFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Resumable.js
    // resumableFactoryProvider.factory = maybeResumable;
  }]);