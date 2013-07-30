/*global angular */
'use strict';

/**
 * The main app module
 * @type {angular.Module}
 */
var app = angular.module('app', ['ngResumable'])
.config(['resumableFactoryProvider', function (resumableFactoryProvider) {
    resumableFactoryProvider.defaults = {
        target: '/upload',
        permanentErrors:[404, 500, 501],
        minFileSize: 0
    };
    // Can be used with different implementations of Resumable.js
    // resumableFactoryProvider.factory = MaybeResumable;
}]);

app.controller('MainCtrl', function ($scope) {

});
