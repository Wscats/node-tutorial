# url 模块
请求的 url 都是字符串类型，url 所包含的信息也比较多，比如有：协议、主机名、端口、路径、参数、锚点等，如果对字符串解析这些信息的话，会相对麻烦，因此，Node.js 的原生模块 url 模块便可轻松解决这一问题

## 字符串转对象
- 格式：url.parse(urlstring, boolean)
- 参数
    - urlstring：字符串格式的 url
    - boolean：在 url 中有参数，默认参数为字符串，如果此参数为 true，则会自动将参数转转对象
- 常用属性
    - href： 解析前的完整原始 URL，协议名和主机名已转为小写
    - protocol： 请求协议，小写
    - host： url 主机名，包括端口信息，小写
    - hostname: 主机名，小写
    - port: 主机的端口号
    - pathname: URL中路径，下面例子的 /one
    - search: 查询对象，即：queryString，包括之前的问号“?”
    - path: pathname 和 search的合集
    - query: 查询字符串中的参数部分（问号后面部分字符串），或者使用 querystring.parse() 解析后返回的对象
    - hash: 锚点部分（即：“#”及其后的部分）

```javascript
var url = require('url');

//第二个参数为 true => {a: 'index', t: 'article', m: 'default'}
var urlObj = url.parse('http://www.dk-lan.com/one?a=index&t=article&m=default#dk', true);
//urlObj.query 为一个对象
console.log(urlObj);

//第二个参数为 false
urlObj = url.parse('http://www.dk-lan.com/one?a=index&t=article&m=default#dk', false);
//urlObj.query 为一个字符串 => ?a=index&t=article&m=default
console.log(urlObj);
```

## 对象转字符串
- 格式：url.format(urlObj)
- 参数 urlObj 在格式化的时候会做如下处理
    - href: 会被忽略，不做处理
    - protocol：无论末尾是否有冒号都会处理，协议包括 http, https, ftp, gopher, file 后缀是 :// (冒号-斜杠-斜杠)
    - hostname：如果 host 属性没被定义，则会使用此属性
    - port：如果 host 属性没被定义，则会使用此属性
    - host：优先使用，将会替代 hostname 和port
    - pathname：将会同样处理无论结尾是否有/ (斜杠)
    - search：将会替代 query属性，无论前面是否有 ? (问号)，都会同样的处理
    - query：(object类型; 详细请看 querystring) 如果没有 search,将会使用此属性.
    - hash：无论前面是否有# (井号, 锚点)，都会同样处理

```javascript
var url = require('url');

var urlObj = { 
    firstname: 'dk',
    url: 'http://dk-lan.com',
    lastname: 'tom',
    passowrd: '123456' 
}
var urlString = url.format(urlObj);
console.log(urlString);
```

## url.resolve
当有多个 url 需要拼接处理的时候，可以用到 url.resolve
```javascript
var url = require('url');
url.resolve('http://dk-lan.com/', '/one')// 'http://dk-lan.com/one'
```