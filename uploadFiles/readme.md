# 安装multer模块
# 单图上传
```javascript
npm install multer
```

# 引用模块
它是依赖于express的一个模块
```javascript
//引用express并配置
var express = require("express");
var app = express();
app.listen(3000);
```
```javascript
var multer = require('multer');
/*var upload = multer({
	//如果用这种方法上传，要手动添加文明名后缀
        //如果用下面配置的代码，则可以省略这一句
	dest: 'uploads/'
})*/
```

# 配置
设置保存文件的地方，并根据上传的文件名对应文件添加后缀
可以通过`filename`属性定制文件保存的格式

|属性值|用途|
|-|-|
|`destination`|设置资源的保存路径。注意，如果没有这个配置项，默认会保存在`/tmp/uploads`下。此外，路径需要自己创建|
|`filename`|设置资源保存在本地的文件名|

```javascript
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
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
```

# 接受文件
`upload.single('xxx')`，xxx与表单中的name属性的值对应
这里虽然用到post请求，但实际上不需要`bodyParser`模块处理
```javascript
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
	console.log(req.file)
	console.log('文件类型：%s', req.file.mimetype);
	console.log('原始文件名：%s', req.file.originalname);
	console.log((req.file.originalname).split("."))
	console.log('文件大小：%s', req.file.size);
	console.log('文件保存路径：%s', req.file.path);
	res.send({
		ret_code: '0'
	});
});
```

# 多图上传
多图上传只要更改一下地方，前端往file输入框加多一个`multiple="multiple"`属性值，此时就可以在选图的时候多选了，当然也可以并列多个file输入框(不推荐多个上传图片输入框)，这样体验会不好
```html
<input type="file" name="logo" multiple="multiple" />
```
后端也需要相应的改变
```javascript
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
//upload.single('logo')变为upload.array('logo', 2)，数字代表可以接受多少张图片
app.post('/upload-single', upload.array('logo', 2), function(req, res, next) {
```
如果不想有图片数量上传限制，我们可以用`upload.any()`方法
```javascript
app.post('/upload-single', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0'
	});
});
```

# 前端部分
## formData表单提交
```html
<form action="http://localhost:3000/upload-single" method="post" enctype="multipart/form-data">
	<h2>单图上传</h2>
	<input type="file" name="logo">
	<input type="submit" value="提交">
</form>
```

## formData表单+ajax提交
```javascript
<form id="uploadForm">
	<p>指定文件名： <input type="text" name="filename" value="" /></p>
	<p>上传文件： <input type="file" name="logo" /></ p>
	<input type="button" value="上传" onclick="doUpload()" />
</form>
```
`FormData`对象，是可以使用一系列的键值对来模拟一个完整的表单，然后使用`XMLHttpRequest`发送这个"表单"

**注意点**

- processData设置为false。因为data值是FormData对象，不需要对数据做处理。
- `<form>`标签添加`enctype="multipart/form-data"`属性。
- cache设置为false，上传文件不需要缓存。
- contentType设置为false。因为是由`<form>`表单构造的FormData对象，且已经声明了属性`enctype="multipart/form-data"`，所以这里设置为false

上传后，服务器端代码需要使用从查询参数名为logo获取文件输入流对象，因为`<input>`中声明的是`name="logo"`

```javascript
function doUpload() {
	$.ajax({
		url: 'http://localhost:3000/upload-single',
		type: 'POST',
		cache: false, //不必须
		data: new FormData($('#uploadForm')[0]),
		processData: false,//必须
		contentType: false,//必须
		success: function(data) {
			console.log(data)
		}
	})
}
```

# 参考文档
[Github MyDemo](https://github.com/Wscats/node-tutorial/tree/master/uploadFiles)
[Github Multer](https://github.com/expressjs/multer)
[MDN FormData对象的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)