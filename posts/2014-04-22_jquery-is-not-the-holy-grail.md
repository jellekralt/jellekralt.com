---
title: jQuery is not the holy grail
author: Jelle Kralt
tags: jquery,javascript
---

A while back I was browsing through the source of a number of jQuery plugins and i realised that too many developers lean too much on jQuery. This really is a bad thing that will come and bite you in the ass on the long run. At the moment of writing jQuery is the undisputed king of the JavaScript libraries. This position has brought an enormous (and ever growing) community of people using and writing for jQuery. Loads of developers thankfully use this community and the stuff it produces to find solutions to their problems. But like lot of things in life, people sometimes overdo things, with all the associated negative consequences.

## $ !== 'Holy Grail';

Because developers use jQuery to write JavaScript in a fast way, lots of them see the library as the holy grail of front end web development. They got addicted to jQuery. They stopped thinking about the true purpose jQuery. More and more, I see developers replacing JavaScript with jQuery. I've even seen job offers that require knowledge of jQuery, and don't even mention JavaScript.

### jQuery is a tool, not the basis

jQuery is not more than a handy collection of JavaScript tools. These tools are commonly used scripts that provide functionality for stuff that is not included in vanilla JavaScript and functions that provide cross browser and cross version without a hassle. This means that jQuery is an extra 'layer' on JavaScript that makes scripting easier for developers. However, in the minds of a lot of developers, jQuery is synonymous to JavaScript, an thats exactly the thought that is the root of the problem. jQuery is purely meant to provide **support** for JavaScript development, it's not supposed to be the **main objective**. Think about the use of a calculator in real life. A calculator is very useful to solve a difficult calculation, you can however use it to solve 1 + 1\\. Thats not really efficient though, picking up the calculator and typing in the sum costs more time and energy then doing it the way we all learned in primary school. The human brain is more than capable in solving many sums. JavaScript is in that way also more than capable to solve many problems without the help of a library. The habituation of using jQuery for everything is causing developers to want to solve simple JavaScript stuff like 'loops' with jQuery. A quick search on Google for the question "[how to loop with jQuery](https://www.google.nl/search?q=how+to+loop+with+jquery+site%3Astackoverflow.com)" on the popular developers Q&A site [Stack Overflow](http://stackoverflow.com/) results in a massive result of over a million results. This is really staggering and indicates how many developers are looking to solve problems with jQuery while they should have been doing it with JavaScript.

### So why is this important?

Just like using a calculator to solve 1 + 1 isn't efficient, using jQuery for simple and basic JavaScript tasks isn't very efficient either. Even though it's possible to loop an array with jQuery, why would you do this if it's also possible with vanilla JavaScript. Using jQuery in that way is really unnecessary for every bit of jQuery you write, more and more JavaScript will get executed by jQuery. Another exaple is setting attributes on an element with the .attr() function, which can be very useful in some situations. You could however, replace it with the vanilla .setAttribute() function, without running any jQuery at all.

## Keep thinking about the necessity of jQuery

In the end, it's all about the discipline of the developer. The only way to prevent the risk of writing too much jQuery is regularly evaluating your own scripts. Think hard about the code you write and keep asking yourself if you are writing the code you should be writing and if there isn't a better way. Easier said then done, especially while doing stressful projects with a deadline that keeps coming closer at an alarming rate, afterwards it always turns out to be worthwhile though.