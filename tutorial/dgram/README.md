# UDP协议

UDP虽然传递数据不可靠，无连接，但是有传递速度快的特点，在传送音频、影视、图片时，少点数据无伤大雅，可以考虑用UDP。

# dgram模块

Node中`UDP`对应的模块是`dgram`，通过下面的方式引用`UDP`模块并创建`UDP`应用实例：
```js
var dgram = require('dgram');
var udp = dgram.createSocket('udp4');
```

## 客户端

```js
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.on('close', () => {
    console.log('socket已关闭');
});

client.on('error', (err) => {
    console.log(err);
});
client.on('message', (msg, rinfo) => {
    if (msg == 'exit') client.close();
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
});
client.send(`hello`, 8060, 'localhost');
```

## 服务端

```js
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('close', () => {
    console.log('socket已关闭');
});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('socket正在监听中...');
});

server.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
    server.send('exit', rinfo.port, rinfo.address)
});

server.bind('8060');
```