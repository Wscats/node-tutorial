// node.js 中基于express 实现简单http代理服务
const express = require('express');
const morgan = require('morgan');
const ip = require('ip');
const url = require('url');
const http = require('http');
const net = require('net');
const request = require('request');
const app = express();
const config = {
    port: 6789
};
const {
    port
} = config;

app.use(morgan('dev'));

// 代理HTTP 正常流量
app.use((req, res) => {
    const {
        method,
        headers
    } = req;

    // req => request => res
    req.pipe(
        request({
            method,
            headers,
            uri: req.url,
            // 表示解压缩数据
            gzip: true
        }, (error, response, body) => {
            // body is the decompressed response body
            // 此处可对返回数据进行处理等
            // console.log(body);
        }).on('response', response => {
            // unmodified http.IncomingMessage object
            res.writeHead(response.statusCode, response.headers);
            response.pipe(res);
        })
    );
});

const server = http.createServer(app);

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
            console.log('socket', e)
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
    console.log(`address: ${ip.address()}:${port}`);
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