# http 模块
所有后端动态语言要想运行起来，都得先搭建服务器。Node.js 搭建服务器需要用到一个原生的模块 http。
1. 加载 http 模块
2. 调用 http.createServer() 方法创建服务，方法接受一个回调函数，回调函数中有两个参数，第一个是请求体，第二个是响应体。
3. 在回调函数中一定要使用 response.end() 方法，用于结束当前请求，不然当前请求会一直处在等待的状态。
4. 调用 listen 监听一个端口。
```javascript
//原生模块
var http = require('http');

http.createServer(function(reqeust, response){
	response.end('Hello Node');
}).listen(8080);
```

## 参数接受 -- GET
当以 GET 请求服务器的时候，服务器可以通过 request.mothod 来判断当前的请求方式并通过 request.url 来获取当前请求的参数。

```javascript
var http = require('http');
var url = require('url');
 
http.createServer(function(req, res){
    var params = url.parse(req.url, true).query;
    res.end(params);
 
}).listen(3000);
```

## 参数接受 -- POST
不同于 GET 请求，POST 请求不能通协 url 进行获取，这个时候就需要用到请求体的事件进行监听获取
```javascript
var http = require('http');
var util = require('util');
var querystring = require('querystring');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
```