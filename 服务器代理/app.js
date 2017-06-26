var express = require('express');
var http = require("http");
var fs = require("fs")

var app = express();
//中间层
app.get('/', function(req, res) {
	//nodejs专门写文件
	fs.readFile("log.html", function(err, data) {
			var content = `<tr>
			<th>${data.toString()}</th>
			<th>${req.query.name}</th>
			</tr>`;
			fs.writeFile("log.html", content, function(err) {

			})
		})
		//通信php
		//php专门存数据库
	http.request({
		hostname: 'localhost',
		port: '81',
		path: '/1702/nodedemo/test.php?name=' + req.query.name,
		method: 'GET'
	}, function(res) {
		res.setEncoding('utf8');
		var data = "";
		res.on('data', function(chunk) {
			data += chunk
		});
		res.on('end', function() {
			console.log(data);
		});
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	}).end();
	res.send('Hello World');
})
app.get("/log", function(req, res) {
	fs.readFile("log.html", function(err, data) {
		res.send("<meta charset='utf-8' /><table>" + data + "</table>");
	})
})
app.listen(6789)