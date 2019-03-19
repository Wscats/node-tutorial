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