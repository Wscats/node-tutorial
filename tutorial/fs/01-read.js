var fs = require('fs');

// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
fs.readFile('demoFile.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   // console.log(data.toString());
   console.log("异步读取: " + data.toString());
});

// 同步读取
// var data = fs.readFileSync('demoFile.txt');
// console.log("同步读取: " + data.toString());

// console.log("程序执行完毕。");