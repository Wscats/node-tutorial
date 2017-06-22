var express = require('express');
var app = express();
var agent = require('./agent.js');
var fs = require('fs')

app.get('/', function(req, res) {
	res.send('Hello World');
})

//中间件
app.get('/index', function(req, res) {
	console.log(req.query)
	fs.readFile('log.html', function(err, data) {
		console.log(JSON.stringify(res.query))
		var html = data.toString() + JSON.stringify(res.query);
		console.log(html)
		fs.writeFile('log.html', html, function(err) {
		})
	});
	//php代理
	agent.agent({
		name: "Wscats",
	}, function(data) {
		res.send(data);
	});
	res.append("Access-Control-Allow-Origin", "*")
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})