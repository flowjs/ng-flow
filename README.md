What is ng-resumable
============

Resumable.js extensions for angular.js framework, no 3rd party JS dependencies required!


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
    <td>{{file.fileName}}</td>
</tr>
````
file is instance of ResumableFile.


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
    // Can be used with different implementations of Resumable.js
    // resumableFactoryProvider.factory = MaybeResumable;
}]);
````

also can be configured on "ng-resumable-init" directive:
````html
<div ng-resumable-init options="{target:'/uploader'}"> 

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
      ng-files-added=" ... property '$files' can be accessed ... "
      ng-file-retry=" ... property '$file' can be accessed ... "
      ng-file-error=" ... properties '$file', '$message' can be accessed ... "
      ng-error=" ... properties '$file', '$message' can be accessed ... "
      ng-complete=" ... "     
      ng-upload-start=" ... "   
      ng-progress=" ... " 
      ng-pause=" ... " 
      ng-cancel=" ... " 
      > 

</div>
````


How can i support older browsers?
============
Go to https://github.com/AidasK/maybe-resumable.js
and add to your config:
````javascript
var app = angular.module('app', ['ngResumable'])
.config(['resumableFactoryProvider', function (resumableFactoryProvider) {
    resumableFactoryProvider.factory = MaybeResumable;
}]);
````
