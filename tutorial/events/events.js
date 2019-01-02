// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// $('div').on('dk', function(){});


// 绑定事件及事件的处理程序
eventEmitter.on('connection', function(){
	setTimeout(function(){
		console.log('连接成功。');
	}, 1000);
	
	// 触发 data_received 事件 
	eventEmitter.emit('data_received');
});

//trigger => emit
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
	console.log('数据接收成功。');
});

//用 eventEmitter 对象的 emit 方法来调用事件
eventEmitter.emit('connection');
console.log("程序执行完毕。");