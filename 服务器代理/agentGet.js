var http = require("http");
//console.log(http)
//http.get("http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=%E8%AE%B2%E4%B8%AA%E7%AC%91%E8%AF%9D", function(res) {
http.get("http://localhost:81/1702/nodedemo/%E7%88%AC%E8%99%AB/index.html", function(res) {
var data = "";
	res.on('data', function(chunk) {
		data += chunk
	})
	res.on('end', function() {
		console.log(data)
	})
})