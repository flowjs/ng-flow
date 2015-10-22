'use strict';

var app = angular.module('ng-flow-sample', ['flow']);

app.config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
    	target: 'http://localhost:3000/upload',
    	permanentErrors: [404, 500, 501],
    	chunkRetryInterval: 5000,
    	simultaneousUploads: 4,
        testChunks: false,
        generateUniqueIdentifier: function(file) {
            var getFileExt = function(fileName) {
                var fileExt = fileName.split(".");

                if ( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 )) {
                    return "";
                }

                return fileExt.pop();
            };

            return Date.now() + '.'+ getFileExt(file.name);
        }
  	};
}]);
