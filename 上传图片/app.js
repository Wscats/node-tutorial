//引入express框架
var express = require("express");
var app = express();
app.listen(3200);

var multer = require('multer');
/*var upload = multer({
	//如果用这种方法上传，要手动添加文明名后缀
	dest: 'uploads/'
})*/
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹手动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});
 
//单图上传
//app.post('/upload-single', upload.single('logo'), function(req, res, next) {
app.post('/upload-single', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0'
	});
});
