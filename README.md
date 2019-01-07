# Codic Redis
### A redis database driver for Codic task scheduler. Use codic-redis as the driver for scheduling jobs with Codic.
New to Codic? Codic allows you to create javascript jobs for any database you are using. No need to install a separate database for managing automated jobs.
[Read more here](https://github.com/joseananio/codic.git "Codic Homepage").

<br/>

---

## Content
1. [About Codic](#about-codic)
2. [Installation](#installation)
3. [Release Info](#release-info)
4. [Usage](#usage)
5. [Configuring redis Connection](#configuring-redis-connection)
6. [Configuring redis Server](#configuring-redis-server)
7. [Documentation](#documentation)

## About codic
[Codic](https://github.com/joseananio/codic.git) uses Activities and Tasks to let you automate processes in your app.

A task is what you want to do at a particular time. It can be a simple function or a file exporting a function.

Activity specifies the time and how often one or more tasks are run. It can run one or more tasks, it can be updated at runtime.

You can store the tasks and activities using any database through its drivers interface. [codic-redis](#codic-redis) is a driver implementation for redis database.

<br/>

## Installation
Install codic and codic-redis.

```
npm install --save codic codic-redis
```
or
```
yarn add codic codic-redis
```

## Release Info
[codic-redis](#codic-redis) is now version 2, with typescript support just like [codic](#https://github.com/joseananio/codic.git). Note: your app does not have to be in typescript to use the library.



## Usage

In your code, do the following:
```javascript
import Codic from "codic";
import RedisDriver from "codic-redis";

//instatiate redis driver and codic
var driver = new RedisDriver();
var codic = new Codic(driver);

// define your tasks
const simpleLogTask = (activity) => {
    console.log("Simply saying "+activity.attrs.data.message);
}
// use an IIFE, to create database activities
(async function(){

    try {
        // register task on Codic
        await codic.assign("log something",{},simpleLogTask);

        //create the activities that run the tasks
        await codic
            .run("log something")
            .every(3) //3 seconds
            .use({ message: "Hello" }) //pass data to task
            .save();

        //start codic
        await codic.start();
    } catch (error) {
    console.log(error);
  }
})();
```
Thats it. You are live!!

Remember to start your redis server for this to work.

<br/>

## Configuring redis Connection
codic-redis uses [ioredis](https://github.com/luin/ioredis) under the hood. You would configure it the same way you configure [ioredis](https://github.com/luin/ioredis). ioredis is a robust, performance-focused and full-featured Redis client for Node.js.

On instantiation, pass your configuration object to the RedisDriver like below:
```javascript

var driver = new RedisDriver({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: 'auth',
  db: 0
});

```
Once this is running, you have access to the underlying ```ioredis``` object via 
```
driver.db
```
All of ioredis actions can be performed on the ```driver.db``` object. You can follow the ioredis documentation [here](https://github.com/luin/ioredis).

<br/>

## Configuring redis server
Redis requires a server to be running on your host computer. It is recommended that you use redis ```version >4.0.0```.

Linux users can download it from their package manager though that might be out of date.

Make sure your redis server is running on the same port as you specify in the [redis configuration](#Configuring-redis-Connection) above.

<br/>

## Documentation
[Click here](https://github.com/joseananio/codic.git "Codic Homepage") for Codic documentation.
