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