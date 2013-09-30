# Lets rename this library! [Click to vote](https://docs.google.com/forms/d/1k_xUuXWbWbFZlCJDb43vAltcrJzighrdpk8-z8KU2ys/viewform)

What is ng-resumable?
============

Resumable.js extensions for angular.js framework, no 3rd party JS dependencies required!

If you are looking for Resumable.js v1 support, checkout [v0.1.0](https://github.com/resumable2/ng-resumable/tree/v0.1.0).
Current ng-resumable works best with [Resumable.js v2](https://github.com/resumable2/resumable.js)

Demo: http://resumable2.github.io/ng-resumable/

## How can I install it?
1) Get the library:

use bower:
        
        bower install ng-resumable#~1
                
use cdn, look for available packages at http://www.jsdelivr.com/#!resumable
                
or use git clone
        
        git clone https://github.com/resumable2/ng-resumable
                
2) Add the module to your app as a dependency:

        angular.module('app', ['ngResumable'])
        
How can I use it?
============

First of all wrap places there you are going to use Resumable.js
````html
<div ng-resumable-init> 
    ... other ng-resumable directives goes here ...
</div>
````
This directive is going to add $resumable variable to current scope.
Also this directive can be nested, because $resumable variable is going to be overriden.
$resumable is instance of Resumable.


Secondly you need to assign some upload buttons:
````html
<input type="file" ng-resumable-btn />
<input type="file" ng-resumable-btn ng-directory />
````
First button is for normal uploads and second is for directory uploads.


Now you need to display uploaded files, this can be done with "ng-resumable-transfers" directive.
This directive will assign transfers variable to the scope. This variable is a reference to Resumable.files array.
````html
<tr ng-repeat="file in transfers">
    <td>{{$index+1}}</td>
    <td>{{file.name}}</td>
</tr>
````
file is instance of ResumableFile.

How can i drop files?
============

Use ng-resumable-drop directive:
````html
<div class="alert" ng-resumable-drop ng-drag-over-class="alert-success">
    Drag And Drop your file here
</div>
````
You can optionally set class, then file is over the element, with ng-drag-over-class attribute.

How can i preview uploaded image?
============

Use ng-resumable-img directive:
````html
<img ng-resumable-img="$resumable.files[0]" />
````
Image will be automatically updated once file is added. No need to start upload.


How can i set options for resumable.js? 
============

Use config:
````javascript
var app = angular.module('app', ['ngResumable'])
.config(['resumableFactoryProvider', function (resumableFactoryProvider) {
    resumableFactoryProvider.defaults = {
        target: '/upload',
        permanentErrors:[404, 500, 501],
        minFileSize: 0
    };
    // You can also set default events:
    resumableFactoryProvider.on('catchAll', function (event) {
      ...
    });
    // Can be used with different implementations of Resumable.js
    // resumableFactoryProvider.factory = maybeResumable;
}]);
````

also can be configured on "ng-resumable-init" directive:
````html
<div ng-resumable-init="{target:'/uploader'}">

</div>
````


How can i catch events?
============

Events are listed on "ng-resumable-init" directive:
````html
<div ng-resumable-init 
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


How can i support older browsers?
============
Go to https://github.com/resumable2/maybe-resumable.js
and add to your config:
````javascript
var app = angular.module('app', ['ngResumable'])
.config(['resumableFactoryProvider', function (resumableFactoryProvider) {
    resumableFactoryProvider.factory = maybeResumable;
}]);
````

Need example?
============
Clone this repository and go to "ng-resumable/samples/basic/index.html".
Single image upload "ng-resumable/samples/image/index.html".


Contribution
============
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes must be tested by one or more specs.

* With the exceptions listed below, we follow the rules contained in [Google's JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml):

  * Wrap all code at 100 characters.

  * Instead of complex inheritance hierarchies, we prefer simple objects. We use prototypical
inheritance only when absolutely necessary.

