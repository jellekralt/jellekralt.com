---
title: Replacing async utilities with native promises
author: Jelle Kralt
tags: async,promise,co,javascript
---

As most people by now know, doing asynchronous stuff in JavaScript by using nested callbacks is not that great. To tackle this problem a number of amazing utility modules (like [async](https://github.com/caolan/async) and [co](https://github.com/tj/co)) have been created, which can be used to bring structure to your app. 

However, this means that you're going to have to include a dependency in your app. Normally, this is not a big deal, especially in Node.js. But the other day, I ran into a situation where I'd preferably have no external dependencies. I was writing a plugin for the fantastic [BitBar](https://github.com/matryer/bitbar) app for OS X (if you haven't heard of it, I'd highly recommend that you check it out), in which I wanted to get data from multiple API resources and combine that data and write it to ```stdout ``` using ```console.log```. 

Of course, it would be very easy to just nest some callbacks, but that would get messy so very quickly. I mean, look at this example:

```javascript
var data1;
var data2;

console.log('foo');
console.log('---');

setTimeout(function() {
    // Get some data asynchronously
    data1 = ['bar', 'baz'];

    setTimeout(function() {
        //  Get some more data asynchronously 
        data2 = {
            bar: 'Some string!',
            baz: 'Another one!'
        };

        // Do something with it
        data1.forEach(function(item) {
            console.log(item + ': ' + data2[item]);
        });

    }, 2000);

}, 1000);
```

That doesn't seem pretty right?

## Solving it with a utility
This example could be improved a loat by using an asynchronous utility ([async](https://github.com/caolan/async) usually is my utility of choice), which would look something like this:

```javascript
var async = require('async');

console.log('foo');
console.log('---');

async.series([
    function getData(cb) {
        //  Get some data asynchronously 
        setTimeout(function() {
            cb(null, ['bar', 'baz']);
        });
    },
    function getMoreData(cb) {
         //  Get some more data asynchronously 
       setTimeout(function() {
            cb(null, {
                bar: 'Some string!',
                baz: 'Another one!'
            });
        });
    }
], function(err, result) {

    result[0].forEach(function(item) {
        console.log(item + ': ' + result[1][item]);
    });

});
```

Thats better, right? But now I have a dependency on async, something which is fine in most cases, but not when you want to write a simple dependency-less script for (for instance) BitBar.

## (Native) promises
Another way of solving this would be to create some promises and running them with ```Promise.all();```. As long as you do this with a promise library like Q or Bluebird, you'd still have the dependency issue though. Luckily, native promises have landed in all major browsers, except IE, and in Node.js (which we are using for the BitBar plugin) since v0.12. There are still some issues with native promises (like its [slowness](http://programmers.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird), and [memory leaks](plus/promises-spec/issues/179)), but for this particular purpose, it should be sufficient. 

```javascript
console.log('foo');
console.log('---');

var data = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(['bar', 'baz']);
    }, 1000);
});

var moreData = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve({
            bar: 'Some string!',
            baz: 'Another one!'
        });
    }, 2000);
});

Promise.all([data, moreData]).then(function(result) {
    result[0].forEach(function(item) {
        console.log(item + ': ' + result[1][item]);
    });
});
```

That's pretty cool right? It has no dependencies whatsoever, it's native JavaScript and it's nicely structured!

## Future
For the moment, this can be a cool and simple solution, but in the future there will be nicer ways to solve it, for instance with [generators](https://davidwalsh.name/async-generators) and of course [async await](https://jakearchibald.com/2014/es7-async-functions/), for the moment though, promises will do just fine.

If you feel there are better ways of doing this, or have some idea's / feedback on this topic, feel free to leave a comment!

 
------

 
**PS**: *I'm not advocating the usage this solution as the single way of structuring your async functions, (in fact, i'd highly advise against it because of the issues in Node.js and lack of support in IE) it is however merely an example of a simple and dependency-less way of doing stuff async, which can be useful in some cases.*