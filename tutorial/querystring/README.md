# querystring 查询(参数)模块
GET 请求时参数都来自 URL，而 URL 都是字符串格式，为了方便操作，可以把字符串格式的参数通过 querystring 转换格式

##字符串转对象
```javascript
var str = 'firstname=dk&url=http%3A%2F%2Fdk-lan.com&lastname=tom&passowrd=123456';
var param = querystring.parse(param);
//结果
//{firstname:"dk", url:"http://dk-lan.com", lastname: 'tom', passowrd: 123456};
```

## 对象转字符串
```javascript
var querystring = require('querystring');

var obj = {firstname:"dk", url:"http://dk-lan.com", lastname: 'tom', passowrd: 123456};
//将对象转换成字符串
var param = querystring.stringify(obj);
//结果
//firstname=dk&url=http%3A%2F%2Fdk-lan.com&lastname=tom&passowrd=123456
```