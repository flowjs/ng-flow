'use strict';
/**
 * var app = angular.module('App', ['ngResumable.provider'], function(resumableProvider){
 *    resumableProvider.defaults = {target: '/'};
 * });
 */
angular.module('ngResumable.provider', []).provider('resumableFactory', function() {
    var $ = this;
    // define the default properties for resumable.js
    $.defaults = [];

    $.factory = null;// Resumable, MaybeResumable or NotResumable

    $.$get = function() {
        var fn = $.factory || Resumable;
        return {
            'create': function(opts) {
                // combine default options with global options and options
                return  new fn(angular.extend({}, $.defaults, opts));
            }
        };
    };
});