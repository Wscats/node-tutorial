let net = require('net');
let fs = require('fs');
let http = require('http');
let server = net.createServer({
    // 如果 pauseOnConnect 被设置为 true, 那么与连接相关的套接字都会暂停，也不会从套接字句柄读取数据。 这样就允许连接在进程之间传递，避免数据被最初的进程读取。 如果想从一个暂停的套接字开始读数据
    // pauseOnConnect: true,
    allowHalfOpen: true
}, (socket) => {
    socket.setEncoding('utf8');
    let {
        port,
        address
    } = socket.address();
    console.log(socket.address());
    let stream = fs.createWriteStream('message.txt');
    socket.on('data', (data) => {
        console.log(data);
    });
    socket.on('end', () => {
        console.log('client disconnected');
    });
    //接收到客户端发送的错误就会调用   
    socket.on('error', (err) => {
        console.log("error");
    });
    socket.on('close', () => {
        console.log("close socket");
    });
    socket.end(`
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`)
    socket.pipe(stream);

    // let realReq = http.request((realRes) => {
    //     // 设置客户端响应状态码
    //     res.writeHead(realRes.statusCode);
    //     // 通过pipe的方式把真正的服务器响应内容转发给客户端
    //     realRes.pipe(res);
    // });
    // socket.pipe(realReq);
    socket.on('finish', () => {
        console.log('Done');
    });
});

server.listen(3000, () => {
    console.log('opened server on', server.address({}));
});
server.on('connection', (socket) => {
    console.log('connection');
});
server.on('listening', function () {
    console.log('app is listening at ', server.address());
})
//server.unref();//停止node对server的监听事件
//服务器关闭事件
server.on('close', (socket) => {
    console.log('close server');
});
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    }
});