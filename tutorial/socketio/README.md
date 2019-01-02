# 认识 soket.io
如果对 socket 没有了解的先[复习下](https://github.com/dk-lan/nodejs/tree/master/module/websocket)。
soket.io 可以理解为对 WebSocket 的一种封装。好比前端的 jQuery 对原生 javascript 的封装。
soket.io 依靠事件驱动的模式，灵活的使用了自定义事件和调用事件来完成更多的场景，不必依赖过多的原生事件。

# 服务端 API
- 安装第三方模块 `npm install express socket.io`
- 开户 Socket 服务器，端口为 88
```javascript
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(88);
```
- 用 on 来进行事件监听和定义事件
- connection：监听客户端连接,回调函数会传递本次连接的socket
- emit：触发用客户端的事件
```javascript
io.on('connection', function(client){
	//把当前登录的用户保存到对象 onlinePersons，并向所有在线的用户发起上线提示
    //serverLogin 为自定义事件，供客户端调用
	client.on('serverLogin', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		//向所有在线的用户发起上线提示
		//触发客户端的 clientTips 事件
        //clientTips 为客户端的自定义事件
		io.emit('clientTips', JSON.stringify(onlinePersons));
	})

	//当监听到客户端有用户在移动，就向所有在线用户发起移动信息，触发客户端 clientMove 事件
    //serverMove 为自定义事件，供客户端调用
	client.on('serverMove', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		console.log('serverLogin', onlinePersons);
        //clientTips 为客户端的自定义事件
		io.emit('clientMove', _person);
	});
})
```

# 客户端 API
- 因为 socket.io 是对 websocket 的二次封装，所以需要先引入 socket.io 的 js 库。
- 创建和服务器的连接 `var socket = io.connect('ws://localhost:88');`
- 连接成功后通过 emit 调用服务端的事件 `socket.emit('serverLogin', JSON.stringify(person));`
- 在客户端也同样用 on 来定义事件供服务端调用 `socket.on('clientTips', function(){})`

# 项目应用
该案例是模仿在线游戏
运行步骤
- npm install express socket.io
- node socketServer

案例思路
- 服务端开启服务 
- 在服务端监听客户端的连接 `io.on('connection', function(client){})`
- 在服务端定义上线的事件 `client.on('serverLogin', function(_person){})`，然后将上线的用户属性保存起来
- 客户端连接服务端 `socket = io.connect('ws://localhost:88');`
- 连接成功后将上线的属性发给服务端 `socket.emit('serverLogin', JSON.stringify(person));`
- 服务端接收到客户端上线的用户属性，保存在对象 onlinePersons 上并将此用户广播给所有在线的客户端 `io.emit('clientTips', JSON.stringify(onlinePersons));`
- 客户端接收到来自服务端的新用户，则自动根据属性创建人物 `socket.on('clientTips', function(){})`
- 角色在游戏中移动也是反复将坐标发送给服务器，服务器将新的坐标广播给所有在线的客户端，然后客户端便根据新的坐标移动人物。