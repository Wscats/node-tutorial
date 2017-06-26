//引入http内置模块
var http = require("http");
//引入url模块
var url = require("url");
var fs = require("fs")
	//引入queryString，用于格式化url上面的参数
var querystring = require('querystring');
//console.log(http)
//用createServer创建服务器
//request请求 处理请求头 请求体
//response相应 处理响应头 相应体
http.createServer(function(request, response) {
		//从请求头获取url
		console.log(request.url);
		//把我们参数部分截取出来
		var paramStr = url.parse(request.url).query;
		var param = querystring.parse(paramStr);
		/*利用querystring方法把 name=asdasd&skill=ps&kkk=sssss => {
			name:"asdasd",
			skill:"ps",
			kkk:"sss"
		}*/
		console.log(param["name"])
		console.log(param["skill"])
			//解决跨域
		response.setHeader("Access-Control-Allow-Origin", "*");
		fs.writeFile("test.html", param.html, function(err) {
				fs.readFile("test.html", function(err, data) {
					console.log(data.toString())
					response.end(data.toString());
				})
			})
			//var html = "<p>"+param.name+"</p><p style='color:red'>"+param.skill+"</p>"
	}).listen(12345)
	//端口号有范围限制0~65535