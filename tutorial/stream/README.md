## Stream 介绍
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。往往用于打开大型的文本文件，创建一个读取操作的数据流。所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个data事件，发送结束会触发end事件。

## 读取流
```javascript
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// console.log(readerStream);


// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

## 写入流
创建一个可以写入的流，写入到文件 output.txt 中
```javascript
var fs = require("fs");
var data = '中国';

// 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt', {'flags': 'a'}); //追加文本
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

## 管道流
<img src="https://sfault-image.b0.upaiyun.com/eb/90/eb907d19321d2aa50a6853acbb543fbc_articlex" height = "300" />
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。

```javascript
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流 
// {'flags': 'a'}//追加文本
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```

## 链式流
链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。接下来我们就是用管道和链式来压缩和解压文件。

### 压缩
```javascript
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
// 以流的方式读取文本
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip()) //把读取出来的文本调用压缩模块进行压缩
  .pipe(fs.createWriteStream('input.zip'));//把压缩好的流进行保存
  
console.log("文件压缩完成。");
```

### 解压
```javascript
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');

fs.createReadStream('input.zip')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input1.txt'));
  
console.log("文件解压完成。")
```