# Async
Node.js 是一个异步机制的服务端语言，在大量异步的场景下需要按顺序执行，那正常做法就是回调嵌套回调，回调嵌套太多的问题被称之回调地狱。

Node.js 为解决这一问题推出了异步控制流 ———— Async

## Async/Await
Async/Await 就 ES7 的方案，结合 ES6 的 Promise 对象，使用前请确定 Node.js 的版本是 7.6 以上。

Async/await的主要益处是可以避免回调地狱（callback hell），且以最接近同步代码的方式编写异步代码。

### 基本规则
- async 表示这是一个async函数，await只能用在这个函数里面。
- await 表示在这里等待promise返回结果了，再继续执行。
- await 后面跟着的应该是一个promise对象

### 对比使用
场景：3秒后返回一个值

#### 原始时代
```javascript
let sleep = (time, cb) => {
    setTimeout(() => {
        cb('ok');
    }, 3000);
}

let start = () => {
    sleep(3000, (result) => {
        console.log(result)
    })
}

start()
```

#### Promise 时代
```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve('ok') ;
        }, time);
    })
}

let start = () => {
    sleep(3000).then((result) => {
        console.log(result)
    })
}

start()
```

#### Async/Await 时代
```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve('ok') ;
        }, time);
    })
}

let start = async () => {
    let result = await sleep(3000);
    console.log(result)
}

start();
```

### 捕捉错误
```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error') ;
        }, time);
    })
}

let start = async () => {
    try{
        let result = await sleep(3000);
        console.log(result)
    } catch(err) {
        console.log('error')
    }
}

start();
```

### 在循环中使用
```javascript
let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok') ;
        }, time);
    })
}

let start = async () => {
    for (var i = 1; i <= 3; i++) {
        console.log(`当前是第${i}次等待..`);
        await sleep(1000);
    }
}

start();
```

### 爬虫中使用
```javascript
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

let spider = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            resolve(body);
        })
    })
}

let start = async () => {
    let dom = await spider('http://www.lanrentuku.com/');
    let $ = cheerio.load(dom);
    $('img', '.in-ne').each((i, e) => {
        let src = $(e).attr('src');
        let name = src.substr(src.lastIndexOf('/') + 1);
        request(src).pipe(fs.createWriteStream(name))
    })
}

start();
```