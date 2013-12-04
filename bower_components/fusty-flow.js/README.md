## What is Fusty-Flow.js ?

A JavaScript library which extends Flow.js and allows to use not resumable uploads for older browsers, such as IE7, IE8 and IE9.

This library is written in the same style as Flow.js and follows same api. This means that with
minimal effort we can have both: awesome [Flow.js](https://github.com/flowjs/flow.js) features and support for older browsers.


## How can I install it?
use bower:

        bower install fusty-flow.js#~1
use cdn, look for available packages at http://www.jsdelivr.com/#!flow
        
or use git clone

        git clone https://github.com/flowjs/fusty-flow.js

## How can I use it?

Same as Flow.js, except of calling Flow constructor we call fustyFlowFactory function.
This function automatically checks if Flow.js is supported.

    var uploader = fustyFlowFactory({
      target:'/api/photo/redeem-upload-token', 
      query:{upload_token:'my_token'}
    });
    
`uploader` is going to be instance of `Flow` if it is supported, otherwise instance of `FustyFlow` will be returned.

## FustyFlow

This library has same methods and properties as `Flow` except it handles not resumable uploads.
Additional options:
 * matchJSON - removes html from returned response on fileSuccess event. Default false.

## FustyFlowFile

File is instance of `FustyFlowFile`. It has same methods and properties as `FlowFile`.

Differences in properties:
 * size - undefined
 * uniqueIdentifier - is generated in uuid format
 * progress - equals to 0 or 1
 * chunks - undefined
 * file - undefined

Differences in methods:
 * getType - returns undefined
 * timeRemaining - returns undefined
 * sizeUploaded - returns undefined

## Build

To create your own build, clone this repository and run `grunt build`.

Command will concat and minify flow.js, fusty-flow.js and fusty-flow-factory.js files. Look for fusty-flow.js and fusty-flow.min.js in build directory.

Minified library size is about 18kb, which is much less then other alternative libraries with IE7+ support. 
