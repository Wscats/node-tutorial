var http = require("http");
var querystring = require("querystring")
var data = {
	key: 'c75ba576f50ddaa5fd2a87615d144ecf',
	info: '林志玲'
};
http.request({
	hostname: 'www.tuling123.com',
	port: '80',
	path: '/openapi/api?' + querystring.stringify(data),
	method: 'GET'
}, function(resquest) {
	resquest.setEncoding('utf8');
	var str = '';
	resquest.on('data', function(data) {
		console.log('相应的内容为: ' + data);
		str += data;
	});
	//监听数据成功后才去拼jsonp的数据
	resquest.on('end', function() {})
}).on('error', function(e) {
	console.log('problem with request: ' + e.message);
}).end();