//引入http内置模块
var http = require("http");
//引入url模块
var url = require("url");
//引入queryString，用于格式化url上面的参数
var querystring = require('querystring');
//console.log(http)
//用createServer创建服务器
//request请求 处理请求头 请求体
//response相应 处理响应头 相应体
http.createServer(function(request,response){
	//从请求头获取url
	console.log(request.url);
	//把我们参数部分截取出来
	var paramStr  = url.parse(request.url).query;
	var param = querystring.parse(paramStr);
	console.log(param)
	
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
}).listen(12345)
//端口号有范围限制0~65535
