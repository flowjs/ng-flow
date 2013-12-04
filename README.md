What is ng-flow?
============

Flow.js extensions for angular.js framework, no 3rd party JS dependencies required!

ng-flow extension is based on [Flow.js](https://github.com/flowjs/flow.js) library.

Demo: http://flowjs.github.io/ng-flow/

## How can I install it?
1) Get the library:

Download a latest build.zip from https://github.com/flowjs/ng-flow/releases
it contains development and minified production files, they are also concatenated with core flow.js library.

or use bower:
        
        bower install ng-flow#~1
                
or use git clone
        
        git clone https://github.com/flowjs/ng-flow

or use cdn, look for available packages at http://www.jsdelivr.com/#!flow, ng-flow is named as angular.flow
                
2) Add the module to your app as a dependency:

        angular.module('app', ['ngFlow'])
        
How can I use it?
============

First of all wrap places there you are going to use Flow.js
````html
<div ng-flow-init>
    ... other ng-flow directives goes here ...
</div>
````
This directive is going to add $flow variable to current scope.
Also this directive can be nested, because `$flow` variable is going to be overridden.
`$flow` is instance of Flow.


Secondly you need to assign some upload buttons:
````html
<input type="file" ng-flow-btn />
<input type="file" ng-flow-btn ng-directory />
````
First button is for normal uploads and second is for directory uploads.


Now you need to display uploaded files, this can be done with "ng-flow-transfers" directive.
This directive will assign transfers variable to the scope. This variable is a reference to Flow.files array.
````html
<tr ng-repeat="file in transfers">
    <td>{{$index+1}}</td>
    <td>{{file.name}}</td>
</tr>
````
file is instance of FlowFile.


How can I drop files?
============

Use ng-flow-drop directive:
````html
<div class="alert" ng-flow-drop ng-drag-over-class="alert-success">
    Drag And Drop your file here
</div>
````
You can optionally set class, then file is over the element, with ng-drag-over-class attribute.

How can I preview uploaded image?
============

Use ng-flow-img directive:
````html
<img ng-flow-img="$flow.files[0]" />
````
Image will be automatically updated once file is added. No need to start upload.


How can I set options for flow.js?
============

Use config:
````javascript
var app = angular.module('app', ['ngFlow'])
.config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
        target: '/upload',
        permanentErrors:[404, 500, 501],
        minFileSize: 0
    };
    // You can also set default events:
    flowFactoryProvider.on('catchAll', function (event) {
      ...
    });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
}]);
````

also can be configured on "ng-flow-init" directive:
````html
<div ng-flow-init="{target:'/uploader'}">

</div>
````


How can I catch events?
============

Events are listed on "ng-flow-init" directive:
````html
<div ng-flow-init
      ng-file-success=" ... properties '$file', '$message' can be accessed ... "
      ng-file-progress=" ... property '$file' can be accessed ... "
      ng-file-added=" ... properties '$file', '$event' can be accessed ... "
      ng-files-added=" ... properties '$files', '$event' can be accessed ... "
      ng-files-submitted=" ... properties '$files', '$event' can be accessed ... "
      ng-file-retry=" ... property '$file' can be accessed ... "
      ng-file-error=" ... properties '$file', '$message' can be accessed ... "
      ng-error=" ... properties '$file', '$message' can be accessed ... "
      ng-complete=" ... "     
      ng-upload-start=" ... "   
      ng-progress=" ... "
      > 

</div>
````

How can I assign flow to a parent scope?
============

Use ng-flow-name attribute and set it to any variable in the scope.
````html
<div ng-flow-init ng-flow-name="obj.flow">
    ... Flow is set to obj.flow  ...
    I have uploaded files: #{{obj.flow.files.length}}
</div>
````

How can I support older browsers?
============
Go to https://github.com/flowjs/fusty-flow.js
and add to your config:
````javascript
var app = angular.module('app', ['ngFlow'])
.config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.factory = fustyFlowFactory;
}]);
````

Need example?
============
Clone this repository and go to "ng-flow/samples/basic/index.html".
Single image upload "ng-flow/samples/image/index.html".


Contribution
============
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes must be tested by one or more specs.

* With the exceptions listed below, we follow the rules contained in [Google's JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml):

  * Wrap all code at 100 characters.

  * Instead of complex inheritance hierarchies, we prefer simple objects. We use prototypical
inheritance only when absolutely necessary.

