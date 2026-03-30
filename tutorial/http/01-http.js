'use strict';

//原生模块
const http = require('http');
const url = require('url');
const querystring = require('querystring');

http.createServer(function(reqeust, response){
	//第二个参数（可省）传入一个布尔值，默认为false，为true时，返回的url对象中，query的属性为一个对象
	const urlObj = url.parse(reqeust.url, false);
	const query = urlObj.query;
	// const qsObj = querystring.parse(query);
	console.log(query);
	response.end('Hello Node');
}).listen(8080);