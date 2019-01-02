# Express
Express 是一个第三方模块，对原生模块封装了一套更灵活、更简洁的应用框架，其在 Node.js 环境的地位和作用好比 jQuery 在前端的地位和作用。

# 路由
在 BS 架构中，路由的概念都是一样的，可理解为根据客户端请求的 URL 映射到不同的方法实现，更多的一般都是针对 URL 中的路径，或者是参数，又或者是锚点这些信息进行映射。

# Express 使用
- 因为 Express 是第三方模块，所以在使用前要先安装 `npm install express`
- 加载模块
```javascript
var express = require('express');
var app = express();
```

- 开启服务器，定义端口8080：
```javascript
app.listen(8080, function(){
	console.log('Server running on http://localhost:8080');
});
```

## Express -- GET
- 定义根路由，我们定义端口为 8080，当我们访问：http://localhost:8080/，会自动触发方法，会在页面上显示 Root Page。
- `response.send()` 可理解为 `response.end()`，其中一个不同点在于 `response.send()` 参数可为对象。
- 只有 GET 访问能触发
```javascript
app.get('/', function(request, response){
    response.send('Root Page');
})
```

- 定义 getUsers 路由，当我们访问：http://localhost:8080/getusers，会自动触发方法，会在页面上显示 getUsers Page。
```javascript
app.get('/getUsers', function(request, response){
    response.send('getUsers Page');
})
```

- Node.js 默认是不能访问静态资源文件（*.html、*.js、*.css、*.jpg 等），如果要访问服务端的静态资源文件则要用到方法 `sendFile`
- __dirname 为 Node.js 的系统变量，指向文件的绝对路径。
```javascript
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});
```

### Express -- GET 参数接收之 Query Strings
访问地址：`http://localhost:8080/getusers?username=dk&age=18`，可通过 `request.query` 来获取参数
```javascript
app.get('/getUsers', function(request, response){
    var params = {
        username: request.query.username,
        age: request.query.age
    }
    response.send(params);
})
```
### Express -- GET 参数接收之路径方式
访问地址：`http://localhost:8080/getusers/admin/18`，可通过 `request.params` 来获取参数
```javascript
app.get('/getUsers/:username/:age', function(request, response){
    var params = {
        username: request.params.username,
        age: request.params.age
    }
    response.send(params);
})
```

## Express -- POST
- post 参数接收，可依赖第三方模块 body-parser 进行转换会更方便、更简单，该模块用于处理 JSON, Raw, Text 和 URL 编码的数据。
- 安装 body-parser `npm install body-parser`
- 参数接受和 GET 基本一样，不同的在于 GET 是 `request.query` 而 POST 的是 `request.body`
```javascript
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/getUsers', urlencodedParser, function (request, response) {
    var params = {
        username: request.body.username,
        age: request.body.age
    }
   response.send(params);
});
```

## Express -- 跨域支持(放在最前面)
```javascript
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});
```