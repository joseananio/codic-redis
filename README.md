# Codic Redis
### A redis database driver for Codic task schedular. Use codic-redis as the driver for scheduling jobs with Codic.
New to Codic? Codic allows you to create javascript jobs for any database you are using. No need to install a separate database for managing jobs.
[Read more here](https://github.com/joseananio/codic.git "Codic Homepage")

## Installation
Install codic and codic-redis

```
npm install codic codic-redis
```
or
```
yarn add codic codic-redis
```

## Usage

In your code, do the following:
```javascript
import Codic from "codic";
import RedisDriver from "codic-redis";

//instatiate driver and codic
var driver = new RedisDriver();
var codic = new Codic(driver);

// define your tasks
const simpleLogTask = (activity) => {
    console.log("Simply saying "+activity.attrs.data.message);
}
// use an IIFE, for async database activities
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

---
## Configuring redis Connection
codic-redis uses ioredes under the hood. You would configure this the same way you configure [ioredis](https://github.com/luin/ioredis). ioredis is a robust, performance-focused and full-featured Redis client for Node.js.

On instantiation, pass your configuration object to the CodicRedis like below:
```javascript

var driver = new RedisDriver({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: 'auth',
  db: 0
});

```
Only the config object method is currently supported.
Once this is running, you have access to the underlying ioredis via 
```
driver.db
```
All of ioredis actions can be performed on this object. You can follow the ioredis documentation [here](https://github.com/luin/ioredis).

## Configuring redis server
Redis requires a server to be running on your host computer. It is recommended that you use redis version >4.0.0.

Linux users can download it from their package manager though that might be out of date.


Make sure your redis server is running on the same port as you specify in the [redis configuration](#Configuring-redis-Connection) above.
