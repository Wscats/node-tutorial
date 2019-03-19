# MITM

> 中间人攻击（Man-in-the-MiddleAttack，简称“MITM攻击”）是一种“间接”的入侵攻击，这种攻击模式是通过各种技术手段将受入侵者控制的一台计算机虚拟放置在网络连接中的两台通信计算机之间，这台计算机就称为'中间人'，——解释来自于[百度百科](https://baike.baidu.com/item/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB/17397300)


我们常用的[Fiddler](https://www.telerik.com/fiddler)和[Charles](https://www.charlesproxy.com/)，就是基于该原理实现的。

我们可以基于`MITM`做以下内容

- 请求劫持
- 伪造请求
- 过滤数据
- 调试接口

# 思路分析

<img src="./assets/MITM.png" />

所以我们终极目标就是伪造一个代理服务器，用于建立一个可以同时与客户端和服务端进行通信的网络服务(欺骗客户端和服务端存放的中间人)

这个中间人充当的就是一个卧底的角色，所有请求和响应都经过他手，而服务器和客户端都不能感知到他的威胁

# HTTP代理实现

`HTTP`是明文传输的，所以在这里实现中间人代理就会非常简单
```js
const http = require('http');
const url = require('url');
let httpMitmProxy = new http.Server();
// 启动端口
let port = 6789;
httpMitmProxy.listen(port, () => {
    console.log(`HTTP中间人代理启动成功，端口：${port}`);
});
// 代理接收客户端的转发请求
httpMitmProxy.on('request', (req, res) => {
    // 解析客户端请求
    var urlObject = url.parse(req.url);
    let options = {
        protocol: 'http:',
        hostname: req.headers.host.split(':')[0],
        method: req.method,
        port: req.headers.host.split(':')[1] || 80,
        path: urlObject.path,
        headers: req.headers
    };
    console.log(`请求方式：${options.method}，请求地址：${options.protocol}//${options.hostname}:${options.port}${options.path}`);
    // 根据客户端请求，向真正的目标服务器发起请求。
    let realReq = http.request(options, (realRes) => {
        // 设置客户端响应的http头部
        Object.keys(realRes.headers).forEach(function (key) {
            res.setHeader(key, realRes.headers[key]);
        });
        // 设置客户端响应状态码
        res.writeHead(realRes.statusCode);
        // 通过pipe的方式把真正的服务器响应内容转发给客户端
        realRes.pipe(res);
    });
    // 通过pipe的方式把客户端请求内容转发给目标服务器
    req.pipe(realReq);
    realReq.on('error', (e) => {
        console.error(e);
    })
})
```

# HTTPS代理实现

## HTTP VS HTTPS
回想上一节的http代理，我们是基于应用层的http协议实现的代理功能。由于http是明文传输，代理可以解析出客户端的真实的请求报文，并且拿着该请求报文"代表"客户端向真正的服务器发起请求。那么https是否仍然可以通过这样的方式进行代理？

先简单说下`SSL/TLS，SSL/TLS`协议是为了解决这三大风险而设计的

- 所有信息都是加密传播，第三方无法窃听。
- 具有校验机制，一旦被篡改，通信双方会立刻发现。
- 配备身份证书，防止身份被冒充。

## HTTP Tunnel(隧道)

基于`SSL/TLS`设计的第一点，可知代理是无法像解析单纯的http协议那样解析https的报文，从而也无法像代理http那样代理https。在实际网络中，每个网络请求都会经过各种个样的网络节点，代理也是其中很常见的一种。

https请求如何通过这些http代理节点连接到目标服务器？为了解决这类问题，`http tunnel(隧道)`技术就派上了用场。

||HTTP||HTTPS||
|-|-|-|-|-|
||||http|应用层|
|应用层|HTTP||TCL/SSL|安全层|
||TCP|--传输层-->|TCP|传输层|
||IP|--网络层-->|IP|网络层
||网络接口|--数据链路层-->|网络接口|数据链路层|
|||||物理层|

`HTTPS`的分层是在传输层之上建立了安全层，所有的`HTTP`请求都在安全层上传输。既然无法通过像代理一般`HTTP`请求的方式在应用层代理`HTTPS`请求，那么我们就退而求其次为在传输层为客户端和服务器建立起`TCP`连接。这种方式就像为客户端和服务器之间打通了一条`TCP`连接的隧道，作为`HTTP`代理对隧道里传输的内容一概不予理会，只负责传输。

## HTTP Tunnel的建立步骤

- 第一步：客户端像http代理发起CONNECT请求。
```js
CONNECT abc.com:443 HTTP/1.1
```
- 第二步：http代理接收到CONNECT请求后与abc.com的433端口建立tcp连接。

- 第三步：与abc.com的433端口建立tcp连接成功，通知客户端。
```js
HTTP/1.1 200 Connection Established
```

```js
const http = require('http');
const url = require('url');
const net = require('net');

let httpTunnel = new http.Server();
// 启动端口
let port = 6789;

httpTunnel.listen(port, () => {
    console.log(`HTTP中间人代理启动成功，端口：${port}`);
});

httpTunnel.on('error', (e) => {
    if (e.code == 'EADDRINUSE') {
        console.error('HTTP中间人代理启动失败！！');
        console.error(`端口：${port}，已被占用。`);
    } else {
        console.error(e);
    }
});

// https的请求通过http隧道方式转发
httpTunnel.on('connect', (req, cltSocket, head) => {
  // connect to an origin server
  var srvUrl = url.parse(`http://${req.url}`);

  console.log(`CONNECT ${srvUrl.hostname}:${srvUrl.port}`);
  
  var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: MITM-proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
  srvSocket.on('error', (e) => {
      console.error(e);
  });
});
```

# 设置代理

## MAC

## 第一步

在**系统偏好设置**中打开**网络**

<img src="./assets/mac-proxy1.png">

点击已经连接的网络中的**高级**选项
<img src="./assets/mac-proxy2.png">

选择**代理**，只勾选`网页代理(HTTP)`，设置右边的**网页代理服务器**和**安全网页代理设置**，可以把它设置为`127.0.0.1:6789`
<img src="./assets/mac-proxy3.png">

# 基于MITM原理实现的第三方模块

- [anyproxy](https://github.com/alibaba/anyproxy)
- [node-mitmproxy](https://github.com/wuchangming/node-mitmproxy)

# 参考文档

- [基于Node.js的HTTPS MITM(中间人)代理的原理和实现](https://github.com/wuchangming/https-mitm-proxy-handbook)