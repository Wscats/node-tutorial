const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    // 跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 必须要设置
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    req.pipe(fs.createWriteStream('./pic.png'));
    res.end('success');
}).listen(8877);