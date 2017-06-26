var fs = require("fs");//文件系统
//console.log(fs)
console.log(fs.readFileSync("input.txt").toString())//同步
/*fs.readFile("input.txt",function(err,data){
	//把缓冲流(数据)转化为字符串
	console.log(data.toString())
})//异步*/
console.log("test")