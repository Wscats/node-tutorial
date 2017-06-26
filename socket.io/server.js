var app = require('http').createServer(handler)
var io = require('socket.io')(app);
app.listen(80);
io.on('connection', function(socket) {
			console.log(socket.id)
				//画笔
			socket.on('draw', function(data) {
				console.log(data);
				//socket.emit('paint', data);
				//向所有客户端广播
				io.emit('paint', data);
			});