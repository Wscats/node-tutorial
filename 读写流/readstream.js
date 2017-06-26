var fs = require("fs");
//创建一个可读流
var readerStream = fs.createReadStream("input.txt");

var content = ""
//监听并接受内容
readerStream.on('data',function(chunk){
	content += chunk;
})
//监听结束并打印
readerStream.on('end',function(){
	console.log(content)
})
