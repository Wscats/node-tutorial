//创建一个服务器
var http = require("http");
var app = http.createServer(function(req, res) {

});
var ioFn = require("socket.io");
//实例化服务器，让它支持websocket
var io = ioFn(app);
var socketArr = [];
//跟前端进行连接
io.on("connection", function(socket) {
	console.log(socket.id);
	//查看socket.io的所有客户端
	socket.on("addUser", function(name) {
		socketArr.push({
			id: socket.id,
			name: name,
		});
		var userList = {
			socketArr: socketArr
		};
		//console.log(userList)
		io.emit("userList", JSON.stringify(userList))
	});
	//前端跟后端联系的一个重要对象 发送消息的名字 发送消息的内容
	socket.on("chat", function(fromUser, message, toUser) {
		console.log(fromUser, message, toUser)
		io.sockets.sockets[toUser].emit("privateMessage", message)
		//console.log(io.sockets.sockets)
	});
})
app.listen(6789)