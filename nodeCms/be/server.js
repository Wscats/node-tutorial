//引入http内置模块
var http = require("http");
var url = require("url")
	//引入queryString，用于格式化url上面的参数
var querystring = require('querystring');
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'laoxie',
	password: '12345678',
	database: 'asm'
});
connection.connect();
//console.log(http)
//用createServer创建服务器
//request请求 处理请求头 请求体
//response相应 处理响应头 相应体
http.createServer(function(request, response) {
		console.log(url.parse(request.url).pathname)
		var post = "";
		request.on("data", function(chunk) {
			post += chunk;
		})
		request.on("end", function() {
			console.log(querystring.parse(post));
			var params = querystring.parse(post);

			switch(url.parse(request.url).pathname) {
				case "/seek":
					seek(request, response);
					break;
				case "/test":
					console.log(require("./router/test.js"))
					require("./router/test.js").test(request, response);
			}
		})
		response.setHeader("Access-Control-Allow-Origin", "*");
	}).listen(12345)
	//端口号有范围限制0~65535
console.log("开启服务器")

function seek(request, response) {
	connection.query('SELECT title FROM news', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		console.log('The solution is: ', results);
		var obj = {
			news: results
		}
		response.end(JSON.stringify(obj));
	});
}