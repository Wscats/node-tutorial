# events 模块
事件模块在 Node.js 中有很多好处，但用法却可以很简单
- Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
- Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
- Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
- Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
- 用法
    - 实例化一个事件实例 new events.EventEmitter();
    - 在实例对象上定义事件 on(eventname, function(){})
    - 通地 emit 方法触发事件 emit(eventname)

```javascript
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 绑定事件及事件的处理程序
eventEmitter.on('connection', function(){
    console.log('连接成功。');
	// 触发 data_received 事件 
	eventEmitter.emit('data_received');
});

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
	console.log('数据接收成功。');
});

//用 eventEmitter 对象的 emit 方法来调用事件
eventEmitter.emit('connection');
console.log("程序执行完毕。");
```