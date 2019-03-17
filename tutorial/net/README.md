# 网络模型

![162a974b6311ac74](https://user-images.githubusercontent.com/17243165/54249933-dc8cff80-457c-11e9-9e36-615957d636dc.png)

![2478097-09c968bde419d413](https://user-images.githubusercontent.com/17243165/54253099-75754800-4588-11e9-9a34-d9975b97a729.png)

# net、dgram、http、https

Node内置的模块，对应的网络通信方式

|模块|服务|
|-|-|
|net|TCP|
|dgram|UDP|
|http|HTTP|
|https|HTTPS|



# http/https

`http`是应用层协议，建立在`TCP/IP`之上，`https`则建立在`TLS、SSL`加密层协议之上，现代web基本都是`http/https`应用。`TCP`在建立连接要发送报文，`http`也是，`http`报文分为请求报文和响应报文，报文格式如下：

<img src="./assets/1.jpeg">

对应的代码如下，注意换行和空格
```js
HTTP/1.0 200 OK    //起始行

Content-type:text/plain    //头部
Content-length:19            //头部  

Hi I'm a message!    //主体
```

Node中`http`模块提供创建基于http协议的网络通信应用的接口，**继承于net模块**，采用事件驱动机制，能与多个客户端保持连接，并不为每个连接开启新的进程或线程，低内存、高并发，性能优良。

# net模块的API


## 创建TCP、UDP客户端和服务端

在Node中，net模块提供创建基于TCP协议的网络通信的API，

首先引入内置`net`模块
```js
var net = require("net")
```
|方法|作用|
|-|-|
|`net.createServer([options][, connectionListener])`|创建一个 TCP 服务器。 参数 connectionListener 自动给 'connection' 事件创建监听器。|
|`net.connect(options[, connectionListener])`|返回一个新的 'net.Socket'，并连接到指定的地址和端口。 当 socket 建立的时候，将会触发 'connect' 事件。|
|`net.createConnection(options[, connectionListener])`|创建一个到端口 port 和 主机 host的 TCP 连接。 host 默认为 'localhost'。|
|`net.connect(port[, host][, connectListener])`|创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。 参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。|
|`net.createConnection(port[, host][, connectListener])`|创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。 参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。|
|`net.connect(path[, connectListener])`|创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件上。返回 'net.Socket'。|
|`net.createConnection(path[, connectListener])`|创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。|
|`net.isIP(input)`|检测输入的是否为 IP 地址。 IPV4 返回 4， IPV6 返回 6，其他情况返回 0。|
|`net.isIPv4(input)`|如果输入的地址为 IPV4， 返回 true，否则返回 false。|
|`net.isIPv6(input)`|如果输入的地址为 IPV6， 返回 true，否则返回 false。|

- `net.Socket`类提供了 TCP 或 UNIX Socket 的抽象，
- `net.createServer`用于创建服务端，
- `net.Socket`和`net.connect`用于创建客户端

## net.Server

`net.Server`通常用于创建一个`TCP`或本地服务器。

|方法|作用|
|-|-|
|`server.listen(port[, host][, backlog][, callback])`|监听指定端口 port 和 主机 host ac连接。 默认情况下 host 接受任何 IPv4 地址(INADDR_ANY)的直接连接。端口 port 为 0 时，则会分配一个随机端口。|
|`server.listen(path[, callback])`|通过指定 path 的连接，启动一个本地 socket 服务器。|
|`server.listen(handle[, callback])`|通过指定句柄连接。|
|`server.listen(options[, callback])`|options 的属性：端口 port, 主机 host, 和 backlog, 以及可选参数 callback 函数, 他们在一起调用server.listen(port, [host], [backlog], [callback])。还有，参数 path 可以用来指定 UNIX socket。|
|`server.close([callback])`|服务器停止接收新的连接，保持现有连接。这是异步函数，当所有连接结束的时候服务器会关闭，并会触发 'close' 事件。|
|`server.address()`|操作系统返回绑定的地址，协议族名和服务器端口。|
|`server.unref()`|如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。|
|`server.ref()`|与 unref 相反，如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。|
|`server.getConnections(callback)`|异步获取服务器当前活跃连接的数量。当 socket 发送给子进程后才有效；回调函数有 2 个参数 err 和 count。|

```js
let server = net.createServer((socket) => {});
server.listen(3000, () => {});
```



## net.Socket事件

`net.Socket`对象是 TCP 或 UNIX Socket 的抽象。net.Socket 实例实现了一个双工流接口。 他们可以在用户创建客户端(使用 connect())时使用, 或者由 Node 创建它们，并通过 connection 服务器事件传递给用户。

- listening 当服务器调用 server.listen 绑定后会触发。
- connection 当新连接创建后会被触发。socket 是 net.Socket实例。
- close 服务器关闭时会触发。注意，如果存在连接，这个事件不会被触发直到所有的连接关闭。

|方法|作用|
|-|-|
|`lookup`|在解析域名后，但在连接前，触发这个事件。对 UNIX sokcet 不适用。|
|`connect`|成功建立 socket 连接时触发。|
|`data`|当接收到数据时触发。|
|`end`|当 socket 另一端发送 FIN 包时，触发该事件。|
|`timeout`|当 socket 空闲超时时触发，仅是表明 socket 已经空闲。用户必须手动关闭连接。|
|`drain`|当写缓存为空得时候触发。可用来控制上传。|
|`error`|错误发生时触发。|
|`close`|当 socket 完全关闭时触发。参数 had_error 是布尔值，它表示是否因为传输错误导致 socket 关闭。|

```js
let server = net.createServer((socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {});
    socket.on('end', () => {});
    socket.on('error', (err) => {});
    socket.on('close', () => {});
});
server.on('close', (socket) => {});
server.on('error', (e) => {});
```

# 参考文档

- [Node学习记录：网络编程](https://segmentfault.com/a/1190000009469920)
