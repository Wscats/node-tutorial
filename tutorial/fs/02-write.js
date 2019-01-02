var fs = require('fs');

// console.log("准备写入文件");
//参数1：文件路径
//参数2：写入的文本
//参数3：回调
//writeFiel 是覆盖写入文本
// fs.writeFile('input.txt', '抵制一切不利于中国和世界和平的动机',  function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("数据写入成功！");
//    console.log("--------我是分割线-------------")
//    console.log("读取写入的数据！");
//    fs.readFile('input.txt', function (err, data) {
//       if (err) {
//          return console.error(err);
//       }
//       console.log("异步读取文件数据: " + data.toString());
//    });
// });

// 追加文本
fs.appendFile('input.txt', '，+++++....1', function (err) {

});