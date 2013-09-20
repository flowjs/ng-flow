/**
 * @description
 * var app = angular.module('App', ['ngResumable.provider'], function(resumableFactoryProvider){
 *    resumableFactoryProvider.defaults = {target: '/'};
 * });
 * @name resumableFactoryProvider
 */
angular.module('ngResumable.provider', [])
.provider('resumableFactory', function() {
  'use strict';
  /**
   * Define the default properties for resumable.js
   * @name resumableFactoryProvider.defaults
   * @type {Object}
   */
  this.defaults = {};

  /**
   * Resumable, MaybeResumable or NotResumable
   * @name resumableFactoryProvider.factory
   * @type {function}
   * @return {Resumable}
   */
  this.factory = function (options) {
    return new Resumable(options);
  };

  /**
   * Define the default events
   * @name resumableFactoryProvider.events
   * @type {Array}
   * @private
   */
  this.events = [];

  /**
   * Add default events
   * @name resumableFactoryProvider.on
   * @function
   * @param {string} event
   * @param {Function} callback
   */
  this.on = function (event, callback) {
    this.events.push([event, callback]);
  };

  this.$get = function() {
    var fn = this.factory;
    var defaults = this.defaults;
    var events = this.events;
    return {
      'create': function(opts) {
        // combine default options with global options and options
        var resumable = fn(angular.extend({}, defaults, opts));
        angular.forEach(events, function (event) {
          resumable.on(event[0], event[1]);
        });
        return resumable;
      }
    };
  };
});