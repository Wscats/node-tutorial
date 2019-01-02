# 文件上传
- body-parser 并不技术文件上传，所以这里要用到另一个第三方模块 multer
- 安装 multer `npm install multer`
- 使用前先定义上传的路径

## 单文件上传
```javascript
//引入express模块  
var express = require('express');  
//引入multer模块  
var multer = require ('multer');
var path = require('path')  ;
//设置上传的目录，  
var upload = multer({ dest:  path.join(__dirname,'temp')});  
var app = express(); 

app.use(express.static(path.join(__dirname, '/')));

app.post('/singleUpload', upload.single('avatar'), function (req, res, next) {  
    console.log(req.file);  
    console.log(req.body);  
    res.end("上传成功");  
});  

app.listen(88)  
```
```html
<form action="http://localhost:88/singleUpload" method="post" enctype="multipart/form-data">
    <input type="text" name="username" id="">
    <input type="text" name="pwd" id="">
    <input type="file" name="avatar" id="">
    <input type="submit" value="submit">
</form>
```

## 多文件上传  
```javascript
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名  
app.post('/mulUpload', upload.array('photos', 12), function (req, res, next) {  
  console.log(req.files);  
  console.log(req.body);  
  res.end(req.file + "<br/><br/>" + req.body);  
}) 
```

### 原生js
```html
    <form>
        <input type="text" name="username" id="username">
        <input type="text" name="pwd" id="pwd">
        <input type="file" name="photos" id="photos" multiple>
        <input type="button" value="submit" id="btn_submit">
    </form>
    <script>
        window.onload = function(){
            document.getElementById('btn_submit').onclick = function(){
                var myForm = new FormData();    // 创建一个空的FormData对象
                myForm.append("username", document.querySelector('#username').value);       // append()方法添加字段
                myForm.append("pwd", document.querySelector('#pwd').value);   // 数字123456立即被转换成字符串“123456”
                
                let files = document.querySelector('[type=file]').files;
                for(var i = 0; i < files.length; i++){
                    myForm.append("photos", files[i]);                
                }                

                var xhr = new XMLHttpRequest();
                xhr.open("POST","mulUpload");
                xhr.send(myForm);
            }
        }
    </script>    
```

### jquery
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
</head>
<body>
    <form>
        <input type="text" name="username" id="username">
        <input type="text" name="pwd" id="pwd">
        <input type="file" name="photos" id="photos" multiple>
        <input type="button" value="submit" id="btn_submit">
    </form>

    <script>
        $(function(){
            $('#btn_submit').click(function(){
                var myForm = new FormData();    // 创建一个空的FormData对象
                myForm.append("username", document.querySelector('#username').value);       // append()方法添加字段
                myForm.append("pwd", document.querySelector('#pwd').value);   // 数字123456立即被转换成字符串“123456”
                let files = document.querySelector('[type=file]').files;
                for(var i = 0; i < files.length; i++){
                    myForm.append("photos", files[i]);                
                }
                $.ajax({
                    url: 'mulUpload',
                    type: 'post',
                    data: myForm,
                    contentType: false,
                    processData: false,
                    success: function(res){
                        console.log(res)
                    }
                })
            })
        })
    </script>
</body>
</html>
```

## 全局本地存储
```javascript
//引入express模块  
var express = require('express');  
//引入multer模块  
var multer = require ('multer');
var path = require('path')  ;
var fs = require('fs');
//设置上传的目录，  
// var upload = multer({ dest:  path.join(__dirname,'temp')});  

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var _path = path.join(__dirname, "../uploadFile");
        if(!fs.existsSync(_path)){
            fs.mkdirSync(_path);
        }
        cb(null, _path);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.originalname);  
    }
});

// // 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

var app = express(); 

app.use(express.static(path.join(__dirname, '/')));

app.post('/singleUpload', upload.single('photos'), function (req, res, next) {  
    console.log(req.file);  
    console.log(req.body);  
    res.end("上传成功");  
});  

app.post('/mulUpload', upload.array('photos', 12), function (req, res, next) {  
    console.log(req.files);  
    console.log(req.body);  
    res.end("上传成功");  
})

app.listen(88)
```