/*
链式流
链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
接下来我们就是用管道和链式来压缩和解压文件。
 */
//压缩
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
// 以流的方式读取文本
// fs.createReadStream('input.txt')
//   .pipe(zlib.createGzip()) //把读取出来的文本调用压缩模块进行压缩
//   .pipe(fs.createWriteStream('input.txt.zip'));//把压缩好的流进行保存
  
// console.log("文件压缩完成。");

// //解压
// var fs = require("fs");
// var zlib = require('zlib');

// // 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.zip')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input1.txt'));
  
console.log("文件解压完成。")