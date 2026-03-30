'use strict';

const fs = require("fs");
const data = '';

// 创建可读流
const readerStream = fs.createReadStream('input.txt');
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