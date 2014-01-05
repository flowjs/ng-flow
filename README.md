What is ng-flow?
============

Flow.js extensions for angular.js framework, no 3rd party JS dependencies required!

ng-flow extension is based on [Flow.js](https://github.com/flowjs/flow.js) library.

Demo: http://flowjs.github.io/ng-flow/


### Upgrade ngFlow from v1 to v2
Read [CHANGELOG.md](blob/master/CHANGELOG.md)


How can I install it?
============
1) Get the library:

Download a latest build.zip from https://github.com/flowjs/ng-flow/releases
it contains development and minified production files, they are also concatenated with core flow.js library.

or use bower:
        
        bower install ng-flow#~2
                
or use git clone
        
        git clone https://github.com/flowjs/ng-flow

or use cdn, look for available packages at http://www.jsdelivr.com/#!flow, ng-flow is named as angular.flow
                
2) Add the module to your app as a dependency:

        angular.module('app', ['flow'])
        
How can I use it?
============

First of all wrap places there you are going to use Flow.js
````html
<div flow-init>
    ... other flow directives goes here ...
</div>
````

This directive is going to add $flow variable to current scope.
Also directive can be nested, because `$flow` variable is going to be overridden.
`$flow` is instance of Flow.


Secondly you need to assign some upload buttons:
````html
<input type="file" flow-btn />
<input type="file" flow-btn flow-directory />
````

First button is for normal uploads and second is for directory uploads.


Now you need to display uploaded files, this can be done with "flow-transfers" directive.
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

Use `flow-drop` directive:
````html
<div class="alert" flow-drop>
    Drag And Drop your file here
</div>
````

### Prevent dropping files on a document
Use `flow-prevent-drop` directive on `body` element:
````html
<body flow-prevent-drop>

</body>
````

### How to add some styles while dropping a file?
Use `flow-drag-enter` directive:
````html
<div flow-drag-enter="style={border:'4px solid green'}"  flow-drag-leave="style={}"
     ng-style="style">
</div>
````

Note: `flow-drag-leave` attribute can't be used alone, it is a part of `flow-drag-enter` directive.

How can I preview uploaded image?
============

Use flow-img directive:
````html
<img flow-img="$flow.files[0]" />
````

Image will be automatically updated once file is added. No need to start upload.


How can I set options for flow.js?
============

Use config:
````javascript
var app = angular.module('app', ['flow'])
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

also can be configured on "flow-init" directive:
````html
<div flow-init="{target:'/uploader'}">

</div>
````


How can I catch events?
============

Events are listed inside `flow-init` directive:
````html
<div flow-init
      flow-file-success=" ... properties '$file', '$message' can be accessed ... "
      flow-file-progress=" ... property '$file' can be accessed ... "
      flow-file-added=" ... properties '$file', '$event' can be accessed ... "
      flow-files-added=" ... properties '$files', '$event' can be accessed ... "
      flow-files-submitted=" ... properties '$files', '$event' can be accessed ... "
      flow-file-retry=" ... property '$file' can be accessed ... "
      flow-file-error=" ... properties '$file', '$message' can be accessed ... "
      flow-error=" ... properties '$file', '$message' can be accessed ... "
      flow-complete=" ... "
      flow-upload-start=" ... "
      flow-progress=" ... "
      >
      <div flow-file-progress=" ... events can be also assigned inside flow-init ... "></div>

</div>
````

### How can I catch an event in a controller?
If controller is on the same scope as `flow-init` directive or in a child scope,
then we can catch events with `$on`. Events are prefixed with `flow::`.
````javascript
$scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
  event.preventDefault();//prevent file from uploading
});
````
second argument is always a `flow` instance and then follows event specific arguments.

How can I assign flow to a parent scope?
============

Use `flow-name` attribute and set it to any variable in the scope.
````html
<div flow-init flow-name="obj.flow">
    ... Flow is set to obj.flow  ...
    I have uploaded files: #{{obj.flow.files.length}}
</div>
````

How can I support older browsers?
============
Go to https://github.com/flowjs/fusty-flow.js
and add to your config:
````javascript
var app = angular.module('app', ['flow'])
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

