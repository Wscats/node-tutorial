# Token
在计算机身份认证中是令牌（临时）的意思，在词法分析中是标记的意思。一般我们所说的的 token 大多是指用于身份验证的 token

## Token的特点
- 随机性
- 不可预测性
- 时效性
- 无状态、可扩展
- 跨域

## 基于Token的身份验证场景
1. 客户端使用用户名和密码请求登录
2. 服务端收到请求，验证登录是否成功
3. 验证成功后，服务端会返回一个 Token 给客户端，反之，返回身份验证失败的信息
4. 客户端收到 Token 后把 Token 用一种方式(cookie/localstorage/sessionstorage/其他)存储起来
5. 客户端每次发起请求时都选哦将 Token 发给服务端
6. 服务端收到请求后，验证Token的合法性，合法就返回客户端所需数据，反之，返回验证失败的信息

## Token 身份验证实现 —— jsonwebtoken
先安装第三方模块 jsonwebtoken `npm install jsonwebtoken`
```javascript
const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Auth, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
          res.sendStatus(200);/*让options请求快速返回*/
    } else{
          next();
    }
});


app.get('/createtoken', (request, response) => {
    //要生成 token 的主题信息
    let user = {
        username: 'admin',
    }
    //这是加密的 key（密钥）
    let secret = 'dktoken';
    //生成 Token
    let token = jwt.sign(user, secret, {
        'expiresIn': 60*60*24 // 设置过期时间, 24 小时
    })      
    response.send({status: true, token});
})

app.post('/verifytoken', (request, response) => {
    //这是加密的 key（密钥），和生成 token 时的必须一样
    let secret = 'dktoken';
    let token = request.headers['auth'];
    if(!token){
        response.send({status: false, message: 'token不能为空'});
    }
    jwt.verify(token, secret, (error, result) => {
        if(error){
            response.send({status: false});
        } else {
            response.send({status: true, data: result});
        }
    })
})

app.listen(88)
```

### 前端 ajax 请求时在请求头中包含 Token
#### ajax 请求之 jQuery 篇
```javascript
$.ajax({
    url: 'verifytoken',
    type: 'post',
    headers: {"auth": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTIzNTQwNjY5LCJleHAiOjE1MjM2MjcwNjl9.ddkS5XEiMzvNQsk9UlMPhyxPSq5S_oh3Nq19eIm9AJU'},
    success: function(res){
        console.log(res)
    }
})
```

#### ajax 请求之 XMLHttpRequest 篇
```javascript
var xhr = new XMLHttpRequest();
xhr.open("POST","verifytoken");
xhr.setRequestHeader('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTIzNTQwNjY5LCJleHAiOjE1MjM2MjcwNjl9.ddkS5XEiMzvNQsk9UlMPhyxPSq5S_oh3Nq19eIm9AJU');
xhr.send();
```

#### ajax 请求之 axios 篇
```javascript
import axios from 'axios'
axios({
    url: url,
    params: _params || {},
    headers: {auth: window.sessionStorage.getItem('dktoken')}
}).then(res => {
    if(!res.data.status && res.data.error == "unauthorized"){
        router.push('login');
        return false;
    }
    resolve(res)
}).catch(error => {
    reject(error)
})
```

#### ajax 请求之 superagent 篇
```javascript
import http from 'superagent'
http.post(getUrl(path))
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    .set('auth',  window.localStorage.getItem('access_token'))
    .end((err, res) => {});
```