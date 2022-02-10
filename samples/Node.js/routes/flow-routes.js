// Authenticated routes
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
//tmp folder has to be on the same partition as tmpdir for fs.rename to work
var os = require('os');
console.log(os.tmpdir());
var flow = require('../models/flow-node.js')(os.tmpdir() + '/uploads');
var fs = require('fs');

//Directory to keep assembled files
var uploadFlowDir = os.tmpdir() + '/uploaded';

// FLOW: Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = false;

// Handle uploads through Flow.js
router.post('/upload', multipartMiddleware, function(req, res) {
  flow.post(req, function(status, filename, original_filename, identifier) {
    console.log('POST', status, original_filename, identifier);
    console.log(status);
    if (status == 'done') {
      // Assemble Chunks
      var stream = fs.createWriteStream(uploadFlowDir + '/' + filename);
      flow.write(identifier, stream,{
          onDone: console.log('File reassembled')
        });
      // Clean chunks after the file is assembled 
      // TO DO: put in callbacks because it deletes files before assembling
      //flow.clean(identifier);
    }
 
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }
    res.status(status).send();
  });
});

router.options('/upload', function(req, res){ 
  console.log('OPTIONS');
  if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.status(200).send();
});

// Handle status checks on chunks through Flow.js
router.get('/upload', function(req, res) {
  flow.get(req, function(status, filename, original_filename, identifier) {
    console.log('GET', status);
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header("Access-Control-Allow-Origin", "*");
    }

    if (status == 'found') {
      status = 200;
    } else {
      status = 204;
    }

    res.status(status).send();
  });
});

router.get('/download/:identifier', function(req, res) {
  flow.write(req.params.identifier, res);
});


module.exports = router;