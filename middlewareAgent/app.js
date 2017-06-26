var express = require('express');
var app = express();
var agent = require('./agent.js');
var fs = require('fs')

app.get('/', function(req, res) {
		res.send('Hello World');
	})
	//中间件
app.get('/log/:route', function(req, res) {
	fs.readFile('log.html', function(err, data) {
		var th1 = data.toString() ? data.toString() : "";
		//提交内容
		var th2 = JSON.stringify(req.query);
		//时间
		var th3 = (new Date()).toLocaleString();
		var html = `<tr style="border:1px solid blue">${th1}
						<th style="border:1px solid blue">${th2}</th>
						<th style="border:1px solid blue">${th3}</th>
						<th style="border:1px solid blue">GET</th>
						<th style="border:1px solid blue">${req.params.route}</th>
					</tr>`;
		fs.writeFile('log.html', html, function(err) {})
	});
	//php代理
	agent.agent({
		name: req.params.route,
	}, function(data) {
		res.send(data);
	});
	res.append("Access-Control-Allow-Origin", "*")
})
app.post('/log/:route', function(req, res) {
	fs.readFile('log.html', function(err, data) {
		var th1 = data.toString() ? data.toString() : "";
		//提交内容
		var th2 = JSON.stringify(req.query);
		//时间
		var th3 = (new Date()).toLocaleString();
		var html = `<tr style="border:1px solid blue">${th1}
						<th style="border:1px solid blue">${th2}</th>
						<th style="border:1px solid blue">${th3}</th>
						<th style="border:1px solid blue">POST</th>
						<th style="border:1px solid blue">${req.params.route}</th>
					</tr>`;
		fs.writeFile('log.html', html, function(err) {})
	});
	//php代理
	agent.agent({
		name: req.params.route,
	}, function(data) {
		res.send(data);
	});
	res.append("Access-Control-Allow-Origin", "*")
})
app.get('/log', function(req, res) {
	fs.readFile('log.html', function(err, data) {
		res.send(`<meta charset='utf-8'><table>${data}<table>`)
	});
})
var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})