# 路由
在 BS 架构中，路由的概念都是一样的，可理解为根据客户端请求的 URL 映射到不同的方法实现，更多的一般都是针对 URL 中的路径，或者是参数，又或者是锚点这些信息进行映射。

## 应用
### 场景
1. 注册一个账户 --> [post] --> http://localhost:88/register
2. 注册成功的情况下跳转到登录界面进行登录 --> [post] --> http://localhost:88/login
3. 登录成功进行获取学生信息 --> [get] --> http://localhost:88/students
4. 同时可以获取订单信息 --> [get] --> http://localhost:88/orders
5. 如何访问不存在的路由则抛出错误信息。

```javascript
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
```
