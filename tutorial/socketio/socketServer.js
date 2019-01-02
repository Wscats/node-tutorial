var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

app.use(express.static(path.join(__dirname, '/')));
// app.listen(888);

var onlinePersons = {};// {001: {id: 001, nickname: ''}, 002}

//connection 事件是 socket 本身的事件
io.on('connection', function(client){
	console.log('connection');

	//把当前登录的用户保存到对象 onlinePersons，并向所有在线的用户发起上线提示
	client.on('serverLogin', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		console.log('serverLogin', onlinePersons);
		//向所有在线的用户发起上线提示
		//触发客户端的 clientTips 事件
		io.emit('clientTips', JSON.stringify(onlinePersons));
	})

	//当监听到客户端有用户在移动，就向所有在线用户发起移动信息，触发客户端 clientMove 事件
	client.on('serverMove', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		console.log('serverLogin', onlinePersons);
		io.emit('clientMove', _person);
	});
})

http.listen(88);