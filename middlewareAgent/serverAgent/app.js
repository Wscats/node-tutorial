'use strict';

const express = require('express');
const app = express();
const agent = require('./agent.js');
const fs = require('fs')

app.get('/', function(req, res) {
		res.send('Hello World');
	})
	//中间件
app.get('/log/:route', function(req, res) {
	fs.readFile('log.html', function(err, data) {
		let th1 = data.toString() ? data.toString() : "";
		//提交内容
		let th2 = JSON.stringify(req.query);
		//时间
		let th3 = (new Date()).toLocaleString();
		let html = `<tr style="border:1px solid blue">${th1}
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
		const th1 = data.toString() ? data.toString() : "";
		//提交内容
		const th2 = JSON.stringify(req.query);
		//时间
		const th3 = (new Date()).toLocaleString();
		const html = `<tr style="border:1px solid blue">${th1}
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
const server = app.listen(8081, function() {
	const host = server.address().address
	const port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})