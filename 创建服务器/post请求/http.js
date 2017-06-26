//引入http内置模块
var http = require("http");
//引入queryString，用于格式化url上面的参数
var querystring = require('querystring');
//console.log(http)
//用createServer创建服务器
//request请求 处理请求头 请求体
//response相应 处理响应头 相应体
http.createServer(function(request, response) {
  var post = "";
  request.on("data", function(chunk) {
    post += chunk;
  })
  request.on("end", function() {
    console.log(querystring.parse(post));
    response.end("b");
  })
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.end("a");
}).listen(12345)
//端口号有范围限制0~65535
