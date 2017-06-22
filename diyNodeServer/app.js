/* Final Server */
var http = require('http'),
	fs = require('fs'),
	urlutil = require('url'),
	path = require('path'),
	mime = require('./mime');

http.createServer(function(request, response) {
	//get path from request's url
	var urlpath = urlutil.parse(request.url).pathname;
	//map the path to server path
	var absPath = __dirname + "/webroot" + urlpath;
	console.log(absPath)
	//test whether the file is exists first
	//path.exists已经剔除现在改用fs.exists
	//判断文件是否存在
	fs.exists(absPath, function(exists) {
		if(exists) {
			//二进制方式读取文件
			fs.readFile(absPath, 'binary', function(err, data) {
				//our work is here
				if(err) throw err;
				//获取合适的 MIME 类型并写入 response 头信息
				var ext = path.extname(urlpath);
				//把.html处理成html
				ext = ext ? ext.slice(1) : 'unknown';
				var contentType = mime.types[ext] || "text/plain";
				response.writeHead(200, {
					'Content-Type': contentType
				});
				//console.log(data);
				//使用二进制模式写
				response.write(data, 'binary');
				response.end();
			});
		} else {
			//show 404
			response.end('404 File not found.');
		}
	});
}).listen(8889);
console.log('Server start in port 8889');