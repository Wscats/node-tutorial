// node.js 中基于express 实现简单http代理服务
const url = require('url');
const http = require('http');
const net = require('net');
const config = {
    port: 6789
};
const {
    port
} = config;

const server = http.createServer();

// HTTP 隧道 代理HTTPS 流量 但由于加密 不能处理
server.on('connect', (req, socket) => {
    console.log('connect', req.url);
    const parsedUrl = url.parse('http://' + req.url);
    const {
        port,
        hostname
    } = parsedUrl;
    const clientSocket = net.connect(port, hostname, () => {
        socket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        // 异常必须监听，不然会出现错误
        socket.on('error', (e) => {
            console.log('socket', e);
            socket.end();
        })
        clientSocket.pipe(socket);
    }).on('error', e => {
        console.log('net', e);
        socket.end();
    });
    socket.pipe(clientSocket);

});

// 开启server 监听指定端口
server.listen(port, () => {
    // 打印当前ip 地址和port
    console.log(`address: ${server.address()}:${server.port}`);
});
server.on('error', (e) => {
    if (e.code == 'EADDRINUSE') {
        console.error('HTTP中间人代理启动失败！！');
        console.error(`端口：${port}，已被占用。`);
    } else if (e.code == 'ECONNRESET') {
        console.error(e);
    } else {
        console.error(e);
    }
});