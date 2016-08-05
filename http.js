var http = require('http');
//读写文件的模块
var fs = require('fs');
//获取请求地址信息的模块
var url = require('url');
//处理字符串的模块
var querystring = require('querystring');
//创建服务器
http.createServer(function(request, response) {
	request.setEncoding('utf-8');
	//获取请求路径 比如index.html
	var pathname = url.parse(request.url).pathname;
	//获取请求参数 例如?callback=JSON_CALLBACK&name=yao
	var paramStr = url.parse(request.url).query;
	//将参数转化为json对象
	//例如把?callback=JSON_CALLBACK&name=yao 转化为对象{callback:'JSON_CALLBACK',name:'yao'}
	var param = querystring.parse(paramStr);
	//发送 HTTP 头部 
	//HTTP 状态值: 200 : OK
	//内容类型: text/jsonp
	response.writeHead(200, {
		//把格式转化为jsonp，并把字符串用utf-8输出，这里如果不设置它会让中文以GBK乱码输出
		'Content-Type': 'text/jsonp;charset=utf-8'
	});
	
	//定义一个对象，后面把它转化为json字符串
	var datas = {
		name: "wsscat",
		age: "0",
		sex: "cat",
		skill: ["html", "css", "js", "php"]
	};

	//实现路由
	switch(pathname) {
		case '/index':
			//在首页时候的默认相应 JSON.stringify()转字符串
			response.end(param.callback + "(" + JSON.stringify(datas) + ")");
			break;
		case '/rebot':
			//执行代理请求，请求图灵机器人接口，并返回jsonp
			responseRebotMessage(param, response);
			break;
		default:
			//读文件的方式，展示html页面
			responseIndex(response);
			break;
	}

	//发送响应数据
	//"angular.callbacks._0"才能正确执行&&JSON_CALLBACK不能正确执行
	//转化为jsonp的格式传递
}).listen(8888);

//终端打印如下信息
console.log('Hello, I am wsscat, Server running at http://127.0.0.1:8888/');

//接口代理
function responseRebotMessage(param, response) {
	var data = {
		//图灵机器人需要的API KEY
		key: 'c75ba576f50ddaa5fd2a87615d144ecf',
		//向图灵机器人发送的问题
		info: param.message
	};
	http.request({
		//域名
		hostname: 'www.tuling123.com',
		//端口号
		port: '80',
		//路由和参数  后面是需要提交的数据
		path: '/openapi/api?' + querystring.stringify(data),
		//请求方法 可以为post
		method: 'GET'
	}, function(resquest) {
		//console.log('STATUS: ' + resquest.statusCode);
		//console.log('HEADERS: ' + JSON.stringify(resquest.headers));
		resquest.setEncoding('utf8');
		resquest.on('data', function(data) {
			console.log('相应的内容为: ' + data);
			response.end(param.callback + "(" + data + ")");
		});
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	}).end();
}

//读取home.html并显示
function responseIndex(response) {
	var readPath = __dirname + '/' + url.parse('home.html').pathname;
	//同步获取文件
	//var indexPage = fs.readFileSync(readPath);
	//response.writeHead(200, {
	//	'Content-Type': 'text/html'
	//});
	//response.end(indexPage);
	//异步获取文件
	fs.readFile(readPath, function(err, data) {
		response.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.end(data);
	});
}