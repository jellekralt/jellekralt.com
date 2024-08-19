---
title: npm link with built code
author: Jelle Kralt
tags: npm,webpack,nodejs
---

Ever used `npm link` to work on local versions of a npm dependency, without having to publish it? If so, have you ever run into a problem with using `npm link` on a package that has 'built' code, for instance with webpack or rollup? I certainly have. Let say you have the following setup:

* Your package's Typescript source lives in `/src`
* You use the Typescript compiler to build your source to `/dist`
* You publish only the `/dist` folder

When you normally want to enable this package to be linkable, you run `npm link` for the package:

```bash
# some-npm-package
npm link
```

And then link to the package inside your project:

```bash
# some-project
npm link some-npm-package
```

However, this won't work if you build your source to a `/dist` folder. This is because from the project you are now linking to the root folder of the npm package. The solution to this is actually very simple. When running `npm link` in the package, instead of doing this from the root of the package, just go into the `/dist` folder, and run `npm link` from that folder:

```bash
$ pwd
/path/to/some-npm-package

$ cd dist
$ npm link
/path/to/nodejs/lib/node_modules/some-npm-package -> /path/to/some-npm-package/dist

$ cd /path/to/some-project
$ npm link some-npm-package
/path/to/some-project/node_modules/some-npm-package -> /path/to/nodejs/lib/node_modules/some-npm-package -> /path/to/some-npm-package/dist
```

This creates a symlink, not from the package root, but from the `dist` folder.

So, as said, a very simple solution. But as I've seen a lot of people struggle with this, this post might save someone some time 🙂.