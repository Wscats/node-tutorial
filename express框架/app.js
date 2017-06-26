var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var mysql = require("mysql");
var connection;

function createConnection() {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'laoxie',
		password: '12345678',
		database: 'asm'
	});
}


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
		extended: false
	}))
//设置静态文件 app.js根目录下寻找public文件夹作为静态文件夹
app.use(express.static('public'));
	// parse application/json 
	//是要get请求并且匹配到路由`/`，我就执行回调，并用`res.send`方法去相应结果
app.get('/', function(req, res) {
	res.send('Hello World');
})
//views：模板文件所在目录。例如：
app.set('views', './views');
//view engine：要使用的模板引擎。例如： css<-sass   html<-jade
app.set('view engine', 'jade')
app.get("/jade",function(req,res){
	//提供数据给jade模板
	res.render("home",{
		name:"laoxie"
	})
})
//中间件
app.get('/index', function(req, res) {
		createConnection()
		connection.connect();
		connection.query('SELECT * FROM news', function(error, results, fields) {
			if(error) throw error;
			//results =>array类型
			console.log('The solution is: ', results);
			var obj = {
				news: results
			}
			res.send(JSON.stringify(obj));
			connection.end();
		});
		console.log(req.query)
		res.append("Access-Control-Allow-Origin", "*")
	})
	//要post请求，并且路由是/home才能进入此逻辑
app.post('/home', function(req, res) {
	console.log(req.body)
	res.append("Access-Control-Allow-Origin", "*")
	res.send('进入到home页面');
})

//只要路由是/test就进入到此逻辑
app.all('/test', function(req, res) {
	console.log(req.cookies)
	res.send('进入到test页面');
})

var server = app.listen(8081, function() {
	//测试
	//测试
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})