# NodeJS

首先[下载](https://nodejs.org/en/)NodeJS，安装

1. Chrome其实本质上就是V8引擎，用来解析JS的客户端（浏览器）前端部分
2. Node其实就死系统上运行V8引擎，用来解析JS的服务端（系统）后端部分


客户端 浏览器
```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
	</body>
	<!--以前一定要在浏览器中引入test。js，然后在浏览器打开执行-->
	<script src="test.js"></script>
</html>
```

服务端 系统环境
```javascript
node xxx.js
```
可以省略`.js`后缀
```javascript
node test.js
//相当于
node test
```
如果test都是指定同一个端口，只能成功运行一个test.js


> nodejs是一个系统框架，专门实现把JS跑在浏览器以外的地方，nodejs其实就是用JS的语法

ctrl + c 退出命令


## 模块系统
理解为就是类似前端的`require.js`

|require.js|node.js|
|-|-|
|define|exports|
|require|require|

前端里面
```javascript
<script src="method.js"></script>
<script src="test.js"></script>
```
methods.js模块
export导出模块 类似以前require.js的define方法，导出对象，数字，字符串，数组
```javascript
exports.func = function() {
	return {
		name: "abc"
	}
}
exports.name = "laoxie"
```
require导入模块 跟require的require方法类似，导出是一个对象

export指向module.export，module.export指向一个空对象，export方法就是依赖于module.export
```javascript
export = module.export = {}//module.export的指向是不能被改变的
export = module.export = {name:"wscats"}
```
```javascript
var b = require("./method.js");
console.log(b)//object
```

```
module.exports = {
	name: "wscats",
	add: function(a, b) {
		return a + b;
	},
	sub: function(a, b) {
		return a - b;
	}
}//这种写法了先创建对象(指针就改变了)，然后赋属性值
module.exports.name = "wscats",//module.exports原本就是一个对象，往自己对象上添加属性值
exports.name = "wscats"
```

## 区分模块
```javascript
//jq相当于第三模块
<script src="jquery.js"></script>
//相当于自定义模块
<script src="method.js"></script>
<script src="test.js"></script>
```

1. **自定义模块** 自己封装的方法
2. **第三方模块** 别人写好的模块(就是从NPM下载的模块) 比如gulp
3. **内置模块** nodejs自带的模块(不用下载，就是存在nodejs内部的模块)

## NPM
NPM就是模块应用市场,就是其他开发者开发好的模块把它上传到NPM管理中心，提供给我们安装使用
```javascript
npm install XXX(模块名)
npm uninstall XXX(卸载)
```
如果不知道模块如何用，在这里查找
[npm模块管理中心](https://www.npmjs.com/)

## 内置模块
[查找nodejs模块的文档](http://nodejs.cn/api)

内置模块:http,os,path,url
```javascript
require("./http.js")//自定义模块
require("http")//内置模块
```

|状态码||
|-|-|
|100||
|2xx|请求成功|
|3xx|重定向|
|4xx|客户端错误|
|5xx|服务端错误|


## 创建服务器
### http
1. 引入require("http")内置http模块
2. 用http模块的createServer方法创建服务器，createServer接受一个匿名的回调函数，这个匿名的回调函数，接受两个参数(request,response)
3. 链式调用listen方法，把服务器放在对应端口号上监听

```javascript
//引入http内置模块
var http = require("http");
//console.log(http)
//用createServer创建服务器
//request请求
//response相应
http.createServer(function(request,response){
	//相应结果显示浏览器上
	response.end("Hello World");
}).listen(12345)
//端口号有范围限制0~65535
```

注意点：是否跨域，每次修改完代码，记得重新用node执行后端.js文件
请求的地方是指向xxx.js执行后的域名和端口号，nodejs跑一个http.js(代替了php+apache)

|php|nodejs|
|-|-|
|`header("Access-Control-Allow-Origin:*");`|`response.setHeader("Access-Control-Allow-Origin","*")`|
|`echo xxx;`|`response.end("xxx")`|
|Apache解析|Node(V8)解析|
|PHP|JS|
|$_GET["xxx"]|var paramStr  = url.parse(request.url).query;var param = querystring.parse(paramStr);//记得引入url和querystring模块|
|打开(wamp)apche服务器，直接请求.php，放在你们的wamp,www文件里面|放在任何地方，但是要用node执行，然后访问对应端口|
|$_POST["xxx"]|`var post = "";request.on("data", function(chunk) {post += chunk;})request.on("end", function() {console.log(querystring.parse(post));response.end("b");})`|

### url
**url**模块提供了一些实用函数，用于URL处理与解析
```javascript
var url = require("url");
```
```
console.log(request.url);//http://localhost:12345/index.html/?name=laoxie&skill=js
//把我们参数部分截取出来
var paramStr  = url.parse(request.url).query;//name=laoxie&skill=js
```

### querystring
**querystring**模块提供了一些实用工具，用于解析与格式化URL查询字符串
```javascript
var querystring = require('querystring');
```
```javascript
var param = querystring.parse(paramStr);//{name:"laoxie",skill:"js"}
param.name / param["name"]
```

## 获取GET请求

是通过url和querystring模块去实现的

## 获取post请求
利用`request.on()`方法监听post请求头的数据，然后监听请求结束，再去把整个请求头部分作为字符串处理
```javascript
var post = "";
request.on("data", function(chunk) {
	post += chunk;
})
request.on("end", function() {
	console.log(post)//name=laoxie&skill=PS&age=18
})
```
配合querystring模块把字符串处理成我们需要的对象
```
querystring.parse(post)
```

## 获取jsonp请求
jQ的方法
```javascript
$.ajax({
	url: "http://localhost:12345",
	type: "get",
	dataType: "jsonp",
	jsonpCallback: "JSON_CALLBACK",
	success: function(data) {
		console.log(data)
	}
})
```
类似get请求把参数放在url上，也是通过querystring和url模块去获取jsonp的参数
```javascript
var paramStr = url.parse(request.url).query;
var param = querystring.parse(paramStr);
var obj = {
		news:[{
			title:"adasdasd",
			content:"asdasdasdasd"
		},{
			title:"ask大神可点击",
			content:"几点啦数据方是否"
		},{
			title:"方块开发开发曼妮芬",
			content:"去请求二翁"
		}]
	}
	
//解决跨域
response.setHeader("Access-Control-Allow-Origin","*");
//相应结果显示浏览器上
response.end(param["callback"]+"("+JSON.stringify(obj)+")");
```


## mysql
[mysql模块文档](https://www.npmjs.com/package/mysql)
### 安装
```javascript
npm install mysql
```

### 引入
```javascript
var mysql = require("mysql");
```
### 配置连接的对比
```javascript
//php
$con = mysql_connect("localhost","laoxie","12345678");
mysql_select_db("asm", $con);

//nodejs
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'laoxie',
	password: '12345678',
	database: 'asm'
});
```

### 连接数据库
```javascript
//php
mysql_select_db("asm", $con);

//nodejs
connection.connect();
```

### 执行sql语句
```javascript
//php
$result = mysql_query("SELECT * FROM news");

//nodejs
connection.query('SELECT title FROM news', function(error, results, fields) {
	if(error) throw error;
	console.log('The solution is: ', results);
});
```

### 关闭数据库
```javascript
mysql_close($con);

connection.end();
```


## 路由
url上的某个决定去向的参数

比如如果url是`http://localhost:12345/aaaaaa.jpg?name=asdasd&skill=ps`

router路由就是`/aaaaaa.jpg`

hash哈希值就是`?name=asdasd&skill=ps`
```javascript
var url = require("url")
url.parse(request.url).pathname
```

### 前端路由
```javascript
https://item.taobao.com/item.htm?spm=a217h.8239130.618660.15.sWoK9Y&id=537784299404

前端路由 /item.htm
哈希值 ?spm=a217h.8239130.618660.15.sWoK9Y&id=537784299404

前端路由就是决定我们进去那一类型页面
哈希值决定该类型页面呈现的具体内容
```

### 后端路由
```javascript
http://localhost:12345/test?name=laoxie&skill=ps

后端路由/test
哈希值 ?name=laoxie&skill=ps

后端路由就是决定我们后端做那一类型逻辑
哈希值决定用那些值处理该逻辑
```

## bootstrap
响应式框架
[bootstrap下载](http://www.bootcss.com/)

### 栅格系统
12格
比如 1:1的就是 6+6=12
比如3:1的就是9+3=12

### 可视化布局
[可视化布局](http://www.layoutit.cn/v3/index.html)

### 使用
引入bootstrap.css然后，从官网中拷贝html部分过来页面上
```html
<link rel="stylesheet" href="css/bootstrap.css" />
```

### W3C

[W3C](https://www.w3cschool.cn/nodejs/)


## express框架
框架跟库的区别

框架>库

1.框架： 打仗的阵容，出兵的方式（战术，战略）
2.库： 火枪，马，盾牌

1. 可以设置中间件来响应 HTTP 请求。
2. 定义了路由表用于执行不同的 HTTP 请求动作。
3. 可以通过向模板传递参数来动态渲染 HTML页面(跟前后端分离的思想所违背)

### 中间件

[expressjs中文文档](https://expressjs.com/zh-cn/)

[npm express](https://www.npmjs.com/package/express)

[w3c express](https://www.w3cschool.cn/nodejs/nodejs-express-framework.html)

是要get请求并且匹配到路由`/`，我就执行回调，并用`res.send`方法去相应结果
```
app.get('/', function(req, res) {
	res.send('Hello World');
})
```

### 静态文件

```javascript
app.use(express.static('public'));
```

### 模板引擎

```javascript
app.set('views', './views');
//view engine：要使用的模板引擎。例如：
app.set('view engine', 'jade')
```


### body-parser
express没有帮我们处理post请求的数据，我们需要借助于body-parser去处理post的数据
[body-parser](https://www.npmjs.com/package/body-parser)
```
//npm install body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())
```

### multer
实现文件上传
[multer npm](https://www.npmjs.com/package/multer)

[multer 中文](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)

[multer](https://github.com/Wscats/node-tutorial/tree/master/uploadFiles)

### zeptojs
[zeptojs](http://www.css88.com/doc/zeptojs_api/)


### 淘宝镜像

[淘宝镜像](http://npm.taobao.org/)
安装成功之后，就可以在命令行多一个cnpm命令，以后就可以用cnpm来代替npm命令
```javascript
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

|||
|-|-|
|body-parser|node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据|
|cookie-parser|这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象|
|multer|node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据|

### FS文件系统

内置的fs模块,文件的读取、写入、更名、删除、遍历
```javascript
var fs = require("fs")
```
有sync的就是同步，没有就是异步
```javascript
fs.readFileSync()//同步
fs.readFile()//异步
```
写入文件
```javascript
fs.writeFile()
fs.writeFileSync()
```

## PHP+NodeJS+前端

借助自己的服务器，访问别人的服务器获得数据到自己服务器，再向自己服务器获取数据，从而解决跨域，因为服务器之间没有跨域，

PHP服务器代理
```php
<?php
	$text = file_get_contents("http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=%E8%AE%B2%E4%B8%AA%E7%AC%91%E8%AF%9D");
	echo $text;
?>
```

NodeJS服务器代理

利用http模块的`http.request`方法实现服务器代理
```
var http = require("http");
//node代理
//http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=%E8%AE%B2%E4%B8%AA%E7%AC%91%E8%AF%9D
//console.log(http)
console.log("start1");
http.request({
	hostname: 'www.tuling123.com',
	port: '80',
	path: '/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=%E8%AE%B2%E4%B8%AA%E7%AC%91%E8%AF%9D',
	method: 'GET'
}, function(res) {
	//res.setEncoding('utf8');
	console.log("start2");
	var data = "";
	res.on('data', function(chunk){
		data += chunk
	});
	res.on('end', function(){
		console.log("success")
		console.log(data);
	});
}).on('error', function(e) {
	console.log('problem with request: ' + e.message);
}).end();
```

```javascript
http.get("http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=%E8%AE%B2%E4%B8%AA%E7%AC%91%E8%AF%9D", function(res) {
	var data = "";
	res.on('data', function(chunk) {
		data += chunk
	})
	res.on('end', function() {
		console.log(data)
	})
})
```
上下两端代码是一样的，http.get本质就是调用http.request的get方法
```javascript
var http = require("http");
//node代理
//http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=%E8%AE%B2%E4%B8%AA%E7%AC%91%E8%AF%9D
http.request({
	hostname: 'localhost',
	port: '81',
	path: '/1702/nodedemo/test.php?name=laoxie',
	method: 'GET'
}, function(res) {
	res.setEncoding('utf8');
	var data = "";
	res.on('data', function(chunk){
		data += chunk
	});
	res.on('end', function(){
		//console.log("success")
		console.log(data);
	});
}).on('error', function(e) {
	console.log('problem with request: ' + e.message);
}).end();
```

## 爬虫

cheerio模块，后端的jQ

## websocket

ajax短连接

websocket长连接