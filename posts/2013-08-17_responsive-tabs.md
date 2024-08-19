---
title: Responsive tabs - jQuery Plugin
author: Jelle Kralt
tags: jquery,javascript,tags,responsive
---

Tabs widgets can be a very useful web element for grouping data on a web page. They are used on many websites and because of this there are a lot of javascript plugins that provide tab widgets (for instance, [jQuery UI Tabs](http://jqueryui.com/tabs/)). Nowadays though, lots of new websites are designed responsively, and that causes a problem when you want to use tabs. Tabs don't look particularly good on a mobile view, the tabs items don't have enough room horizontally. Accordion widgets do look good on a mobile view though, the size of the accordion increases vertically. The best solution to the responsive problem are tabs that convert to an accordion. There are some solutions like this available on the internet but for some reason none of them were right for the projects i needed them on. I needed a plugin that was a bit more advanced and offered (auto) collapsed panels and more. After searching for a while i decided to create my own jQuery plugin that provides the solution i needed.

### Meet responsiveTabs();

I have created a jQuery plugin that provides the following features:

*   Tabs transform to accordion based on breakpoint
*   Uses javascript / jQuery for the technical tab switching (class based)
*   Uses CSS Media Queries for the desktop/tablet/mobile view
*   Callback events for the tab events
*   Tabs can be opened with URL hashes
*   Tabs can auto rotate
*   Tabs can be collapsed (optional)
*   Tabs can start collapsed based on the view (optional)
*   Cross browser compatibility (IE7+, Chrome, Firefox, Safari and Opera)

### Where can i find it?

You can check out a demo at:

*   [http://jellekralt.github.io/Responsive-Tabs/demo.html](http://jellekralt.github.io/Responsive-Tabs/demo.html)

Or check out the plugin page where you can also find the API description:

*   [http://jellekralt.github.io/Responsive-Tabs](http://jellekralt.github.io/Responsive-Tabs/)

You can fork the plugin at the Github page:

*   [https://github.com/jellekralt/Responsive-Tabs](https://github.com/jellekralt/Responsive-Tabs)

Feel free to submit pull request if you have added cool features!

### How can I implement it?

The configuration and implementation is fairly simple. Add the following HTML to your page: 
<script src="https://gist.github.com/jellekralt/319d4b5408f2ffdb9235.js" type="text/javascript"></script>

The links in the ```<ul>``` list are used to link to the panels. For instance, a link with the href ```'#tab-1'``` opens the panel with the ID 'tab-1'. Add the following javascript to your js file:

<script src="https://gist.github.com/jellekralt/6177810.js" type="text/javascript""></script>

### ToDo

I am planning to add some more options / functions to the plugin. I've added a list of options I want to add in the coming months but the list is subject to change. If you feel that you've got a great idea for an option, let me know. You are ofcourse very welcome to make some changes and submit a pull request if you like.

* Transitions
* Ajax panels
* Tabs that can be disabled
* Keyboard interaction
* Switch event (for instance, mouseover)