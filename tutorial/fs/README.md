# 文件模块 fs
出于安全因互，javascript 是不能操作本地文件，所以文件的处理都会放到服务端去处理。Node.js 作为一门后端动态语言，同样具备了操作文件的功能，这一操作需要用到 Node.js 的原生模块：fs。

## 读取文本 -- 异步读取
```javascript
var fs = require('fs');
// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
fs.readFile('demoFile.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});
```

## 读取文本 -- 同步读取
```javascript
var fs = require('fs');
var data = fs.readFileSync('demoFile.txt');
console.log("同步读取: " + data.toString());
```

## 写入文本 -- 覆盖写入
```javascript
var fs = require('fs');
//每次写入文本都会覆盖之前的文本内容
fs.writeFile('input.txt', '抵制一切不利于中国和世界和平的动机！',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```

## 写入文本 -- 追加写入
```javascript
var fs = require('fs');
fs.appendFile('input.txt', '愿世界和平！', function (err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```

## 图片读取
图片读取不同于文本，因为文本读出来可以直接用 console.log() 打印，但图片则需要在浏览器中显示，所以需要先搭建 web 服务，然后把以字节方式读取的图片在浏览器中渲染。

1. 图片读取是以字节的方式
2. 图片在浏览器的渲染因为没有 img 标签，所以需要设置响应头为 image

```javascript
var http = require('http');
var fs = require('fs');
var content =  fs.readFileSync('001.jpg', "binary");

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'image/jpeg'});
	response.write(content, "binary");
	response.end();
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
```