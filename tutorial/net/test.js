let net = require('net');
let server = net.createServer();
// 新版用server.getConnections(callback)代替
// let file = require('fs').createWriteStream('./message.txt');
server.on('connection', (socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        console.log(data);
        server.emit('request', socket);
    });
    socket.on('end', () => {
        console.log('client disconnected');
    });
    // 可以执行写入流
    // socket.pipe(file, {
    //     end: false
    // });
    socket.on("close", () => {
        console.log("close socket");
    });
    
})
server.on('request', function (socket) {
    socket.write('');
    socket.end(`
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`)
    console.log('request');
})

// Grab an arbitrary unused port.
server.listen(3000, () => {
    console.log('opened server on', server.address({}));
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