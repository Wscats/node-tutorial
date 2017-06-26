var fs = require("fs");
var readerStream = fs.createReadStream("input.txt");
var writerStream = fs.createWriteStream("output.txt");
//通过管道复制大文件
readerStream.pipe(writerStream)
