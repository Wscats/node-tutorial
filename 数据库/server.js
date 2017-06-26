//引入http内置模块
var http = require("http");
var url = require("url")
	//引入queryString，用于格式化url上面的参数
var querystring = require('querystring');
var mysql = require("mysql");
var connection;
function createConnection() {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'laoxie',
		password: '12345678',
		database: 'asm'
	});
}
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
				case "/search":
					createConnection()
					connection.connect();
					require("./router/search.js").search(request, response, connection);
					break;
				case "/test":
					createConnection()
					console.log(require("./router/test.js"))
					require("./router/test.js").test(request, response);
					break;
				case "/insert":
					createConnection()
					require("./router/insert.js").insert(request, response, connection, params);
					break;
				case "/html":
					var html = `
						<p>Hello World</p>
						<p style="color:red">Hello</p>
					`
					response.end();
					break;
			}
		})
		response.setHeader("Access-Control-Allow-Origin", "*");
	}).listen(12345)
	//端口号有范围限制0~65535
console.log("开启服务器")

exports = module.exports = {}