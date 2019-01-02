const http = require('http')
const url = require('url')
const qs = require('querystring');
const util = require('util');

http.createServer((request, response) => {
    let urlObj = url.parse(request.url, true);
    let pathname = urlObj.pathname;
    let method = request.method.toUpperCase();
    let params = urlObj.query;
    if(method == 'POST'){
        let postData = '';
        request.on('data', (_data) => {
            postData += '_data';
        })
        request.on('end', () => {
            postData = qs.parse(postData);
            let result = {};
            switch(pathname){
                case '/login':
                    //连接数据库，实现登陆逻辑
                    result = {status: true};
                    break;
                case '/register':
                    //连接数据库，实现注册逻辑
                    result = {status: true};
                    break;
                default :
                    result = {status: false, message: '没有对应的请求'};
                    break;                  
            }
            response.end(util.inspect(result))
        })
    } else {
        let result = {};
        switch(pathname){
            case '/students':
                //连接数据库，获取学生信息
                result = {status: true, data: [], params};
                break;
            case '/orders':
                //连接数据库，获取订单信息
                result = {status: true, data: [], params};
                break;
            default :
                result = {status: false, message: '没有对应的请求', params};
                break;
        }
        response.end(util.inspect(result))
    }
}).listen(88)