const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    // 跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 必须要设置
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    let name = req.url.split('=')[1];
    req.pipe(fs.createWriteStream(`./${name}`));
    res.end('success');
}).listen(8877);