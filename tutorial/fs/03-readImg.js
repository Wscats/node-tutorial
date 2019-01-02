var http = require('http');
var fs = require('fs');
var content =  fs.readFileSync('001.jpg', "binary");

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'image/jpeg'});
	response.write(content, "binary");
	response.end();
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');