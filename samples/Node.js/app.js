process.env.TMPDIR = 'tmp'; // to avoid the EXDEV rename error, see http://stackoverflow.com/q/21071303/76173

var express = require('express');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var app = express();
var flowroutes = require('./routes/flow-routes.js');

// Host most stuff in the public folder
app.use(express.static(__dirname + '/public'));
app.use('/dist', express.static(__dirname + '/../../dist'));
app.use('/bower_components', express.static(__dirname + '/../../bower_components'));

// Default Route
app.use('/',flowroutes);

app.listen(3000);