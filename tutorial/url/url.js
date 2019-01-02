var url = require('url');

var _parse = url.parse('http://www.dk-lan.com:8080/p/a/t/h?query=string#hash', false, false);

console.log(_parse);

/*
http://www.dk-lan.com:8080/p/a/t/h?query=string#hash

解析后对象字段如下：

href: 解析前的完整原始 URL，协议名和主机名已转为小写
例如: 'http://www.dk-lan.com:8080/p/a/t/h?query=string#hash'

protocol: 请求协议，小写
例如: 'http:'

slashes: 协议的“：”号后是否有“/”

例如: true or false

host: URL主机名，包括端口信息，小写
例如: 'dk-lan.com:8080'

auth: URL中的认证信息
例如: 'user:pass'

hostname: 主机名，小写
例如: 'dk-lan.com'

port: 主机的端口号
例如: '8080'

pathname: URL中路径
例如: '/p/a/t/h'

search: 查询对象，即：queryString，包括之前的问号“?”
例如: '?query=string'

path: pathname 和 search的合集
例如: '/p/a/t/h?query=string'

query: 查询字符串中的参数部分（问号后面部分字符串），或者使用 querystring.parse() 解析后返回的对象
例如: 'query=string' or {'query':'string'}

hash: 锚点部分（即：“#”及其后的部分）
例如: '#hash'
 */

var urlObj = { 
  	protocol: 'http:',
    slashes: true,
    hostname: 'dk-lan.com',
    port: 80,
    hash: '#hash',
    search: '?query=string',
    path: '/nodejs?query=string'
}
var result = url.format(urlObj);
console.log(result);

//输出结果：http://dk-lan.com:80?query=string#hash

/*
*传入的URL对象会做以下处理：
*
*href 属性会被忽略
*protocol无论是否有末尾的 : (冒号)，会同样的处理
*这些协议包括 http, https, ftp, gopher, file 后缀是 :// (冒号-斜杠-斜杠).
*所有其他的协议如 mailto, xmpp, aim, sftp, foo, 等 会加上后缀 : (冒号)
*auth 如果有将会出现.
*hostname 如果 host 属性没被定义，则会使用此属性.
*port 如果 host 属性没被定义，则会使用此属性.
*host 优先使用，将会替代 hostname 和port
*pathname 将会同样处理无论结尾是否有/ (斜杠)
*search 将会替代 query属性
*query (object类型; 详细请看 querystring) 如果没有 search,将会使用此属性.
*search 无论前面是否有 ? (问号)，都会同样的处理
*hash无论前面是否有# (井号, 锚点)，都会同样处理
*/

// url.resolve('/one/two/three', 'four')         // '/one/two/four'
// url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
// url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
// url.resolve()方法用于处理URL路径，也可以用于处理锚点。