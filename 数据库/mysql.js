var mysql = require("mysql");
//配置数据库的连接
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'laoxie',
	password: '12345678',
	database: 'asm'
});
//进行数据库连接
connection.connect();
//执行sql语句
connection.query('SELECT title FROM news', function(error, results, fields) {
	if(error) throw error;
	console.log('The solution is: ', results);
});
//关闭数据库连接
connection.end();