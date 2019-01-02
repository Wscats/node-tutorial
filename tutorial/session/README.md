# Session
Session 是一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 Session 保存在服务器上的进程中。

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。

如果说 Cookie 机制是通过检查客户身上的“通行证”来确定客户身份的话，那么 Session 机制就是通过检查服务器上的“客户明细表”来确认客户身份。

Session 相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

Session 不能跨域

## Session 与 Cookie 的区别
- Cookie 数据存放在客户的浏览器上，Session 数据放在服务器上的进程中。
- Cookie 不是很安全，别人可以分析存放在本地的 Cookie 并进行 Cookie 欺骗 考虑到安全应当使用 Session。
- Session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
- 单个 Cookie 保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个 Cookie。

## Session 应用
```javascript
const express = require('express')
const path = require('path')
const app = express();

const bodyParser = require('body-parser');

const cp = require('cookie-parser');
const session = require('express-session');

app.use(cp());
app.use(session({
    secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 5000 },  //设置maxAge是5000ms，即5s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,    
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.get('/setsession', (request, response) => {
    request.session.user = {username: 'admin'};
    response.send('set session success');
})

app.get('/getsession', (request, response) => {
    response.send(request.session.user);
})

app.get('/delsession', (request, response) => {
    delete reqeust.session.user;
    response.send(request.session.user);
})

app.listen(88)
```