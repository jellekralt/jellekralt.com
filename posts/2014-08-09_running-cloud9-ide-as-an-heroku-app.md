---
title: Running Cloud9 IDE as an Heroku App
author: Jelle Kralt
tags: cloud9,ide,heroku
---

If you're a (web) developer, chances are, you've heard about [Cloud9](https://c9.io/). If not, you should definitely check it out! It's basically an IDE running in the cloud. On the [Cloud9](https://c9.io/) website, you can sign up for an account which gives you access to the IDE with a full Ubuntu workspace in the cloud. With a free account you can have one free 'private' workspace! If you're like me, you've probably already wondered how it works and maybe even thought of a project you could use the excellent IDE for (I know i have!). In either of those cases, you are in luck! There is an [OSS version of the IDE](https://github.com/ajaxorg/cloud9) that you can check out, fork, and run on your own machine. In my case, I wanted to use the IDE as a live editing tool in a project I'm currently working on. I'm using Heroku to host my app, so logically I tried to run Cloud9 on Heroku. Fortunately, Cloud9 runs on Node.js, so that should be smooth sailing on Heroku, right? Well, it almost is, if you follow the steps below, you should have your own Cloud9 app running on Heroku in no-time!

## Step 1: Get Cloud9

Follow the instructions on [https://github.com/ajaxorg/cloud9](https://github.com/ajaxorg/cloud9) to get the Cloud9 source code. The easiest way is to clone the repo to your local machine by running: (make sure you have Node.js installed on your machine)

```bash
git clone https://github.com/ajaxorg/cloud9.git
cd cloud9
npm install
```

You'll be able to run Cloud9 on your own machine by running

```bash
bin/cloud9.sh
```

## Step 2: Add Heroku app as remote

Go to [Heroku](https://heroku.com/) and create a new app. After you've created the app, copy the app name and run the following in the cloud9 folder

```bash
heroku git:remote -a APPNAME
```

And push the repo to Heroku

```bash
git push heroku
```

## Step 3: Configure Heroku

Now this is the part that cost me some rage. If you've pushed the code to Heroku, you'll notice that you get an error if you try to access the app. If you check out the logs you'll probably see the following:

```bash
2014-08-09T16:12:48.023278+00:00 app[web.1]: IDE server initialized. Listening on localhost:22388
2014-08-09T16:13:42.501962+00:00 heroku[web.1]: Stopping process with SIGKILL
2014-08-09T16:13:42.501515+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
2014-08-09T16:13:43.798769+00:00 heroku[web.1]: Process exited with status 137
2014-08-09T16:13:43.812197+00:00 heroku[web.1]: State changed from starting to crashed
```

At first, I expected something to be wrong with the port number (which should always be set by process.env.PORT if you want it to run correctly on Heroku). After some digging though, I found out that the actual problem in the host (localhost to be precise). I'm used to work with express, which I always run by only passing a port. Cloud9 uses connect, and passes a port and the hostname 'localhost'. Heroku doesn't expect 'localhost' though, it expects 0.0.0.0\\. Fortunately, this is fixed very simply by setting 'process.env.IP' to 0.0.0.0\\. This can be done by running:

```bash
heroku config:set process.env.IP=0.0.0.0
```

You'll have to restart your app by running

```bash
heroku restart
```

## Thats it!

After restarting, everything should work smoothly. If you navigate to your Heroku app, the IDE should popup nicely!