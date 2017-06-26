var fs = require("fs");
//压缩模块
var zlib = require('zlib');
/*var readerStream = fs.createReadStream("video/input.avi");
var writerStream = fs.createWriteStream("download/output.avi");*/

var readerStream = fs.createReadStream("video/笔试.docx");
var writerStream = fs.createWriteStream("download/2.docx.gz");

//通过管道复制大文件
readerStream.pipe(zlib.createGzip()).pipe(writerStream)
