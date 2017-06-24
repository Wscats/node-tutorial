var mysql = require("mysql");
//配置数据库的连接
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'laoxie',
	password: '12345678',
	database: 'lagou'
});
//进行数据库连接
connection.connect();
exports.connection = connection;