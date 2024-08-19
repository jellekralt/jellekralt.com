---
title: Dynamically load a template in an Angular directive
author: Jelle Kralt
tags: angularjs,javascript,template,directive
---

I've been having an issue with a dynamic templateUrl in an Angular directive. This might be an edge case, but for the people who are running into the same issue, I might have a solution.

## The issue
I ran into this issue when trying to create a date picker directive that changes it's functionality based on the HTML element it is bound to. Basically, I wanted to display the date picker as a popup when placed on an input field, and display it inline if placed on any other element. This meant that I only wanted to load a template for the inline version.

```html
<!-- This should not load a template -->
<input date-picker name="date" />

<!-- This should load a template -->
<div date-picker>
  <!-- Content gets generated based on the template --->
</div>
```

## templateUrl
At first I figured I could just use templateUrl. Angular provides a nice way to compose the templateUrl dynamically, by accepting a function.

```javascript
templateUrl: function(element, attributes) {
  if (element[0].tagName === 'INPUT') {
    return 'templates/input.html';
  } else {
    return 'templates/default.html';
  }
}
```

The problem is, that you **have** to return a URL, so there is no way to not load a template. You can't return ```null``` or ```undefined```, because this will throw an error.

In theory, I could have created a template for the input, with the ```replace: true``` option to make sure the elements get merged. However, the ```replace``` options has been [deprecated](https://github.com/angular/angular.js/commit/eec6394a342fb92fba5270eee11c83f1d895e9fb) and even though it is [not being removed](https://github.com/angular/angular.js/commit/eec6394a342fb92fba5270eee11c83f1d895e9fb#commitcomment-8124407) I'd rather not use something that isn't going to be fixed when a bug is found.

## Solution
*Note: This only works for AngularJS **v1.3** and up.*

The other option that came to mind was manually fetching the template and appending the compiled content to the directive element. When researching the best way to do this I found some examples which didn't impress me at all. They we're either too bulky or used $http to fetch the template. 

A solution I did like, was using the $templateRequest factory that was added in ```v3.0```. This factory provides a simple way to fetch a template, after which it is very easy to compile and append it to the directive element. Also, the $templateRequest function checks and saves to the $templateCache.

```javascript
var directive = {
    restrict: 'EA',
    link: function() {
        var isField = ($element[0].tagName === 'INPUT');

        if(!isField) {
            // Load the html through $templateRequest
            $templateRequest('datepicker.html').then(function(html){
                // Convert the html to an actual DOM node
                var template = angular.element(html);
                // Append it to the directive element
                $element.append(template);
                // And let Angular $compile it
                $compile(template)($scope);
            });
        }
    }
};
```
