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
		database: 'lagou'
	});
};

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
	extended: false
}));
//设置静态文件 app.js根目录下寻找public文件夹作为静态文件夹
app.use(express.static('public'));
// parse application/json 
//是要get请求并且匹配到路由`/`，我就执行回调，并用`res.send`方法去相应结果
app.get('/', function(req, res) {
	res.send('Hello World');
});

//中间件
app.get('/index', function(req, res) {
		createConnection()
		connection.connect();
		console.log(req.query)
		var pageCount = (req.query.page - 1) * 10;
		//SELECT * FROM jobs WHERE position_id = 3067990 LIMIT 100,10
		//SELECT * FROM jobs LIMIT 0,10
		console.log('SELECT * FROM jobs LIMIT ' + pageCount + ',10')
		connection.query('SELECT * FROM jobs LIMIT ' + pageCount + ',10', function(error, results, fields) {
			if(error) throw error;
			//results =>array类型
			console.log('The solution is: ', results);
			var obj = {
				jobs: results
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