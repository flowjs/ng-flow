var express     = require('express')
  , app         = express()
  , bodyParser  = require('body-parser')
  , server      = require('http').Server(app)
  , multer  	= require('multer')
  , storage 	= multer.diskStorage({
	    destination: function (req, file, cb) {
	        cb(null, 'temp/')
	    },
	    filename: function (req, file, cb) {
	        cb(null, req.body.flowIdentifier);
	    }
    })
  , multerUpload = multer({ storage: storage })
  , uploadFile   = multerUpload.single('file');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

 app.post('/upload', uploadFile, function(req, res) {
    res.status(200).send();
 });

server.listen(process.env.PORT || 3000, function(){
  console.log('running sample');
});