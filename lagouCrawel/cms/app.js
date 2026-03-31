'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql");
let connection;

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
// Set static files directory
app.use(express.static('public'));
// parse application/json 
// Handle GET request for root path
app.get('/', function(req, res) {
	res.send('Hello World');
});

// Middleware: fetch paginated job listings
app.get('/index', function(req, res) {
		createConnection()
		connection.connect();
		const pageCount = (req.query.page - 1) * 10;
		connection.query('SELECT * FROM jobs LIMIT ' + pageCount + ',10', function(error, results, fields) {
			if(error) throw error;
			//results => array type
			console.log('The solution is: ', results);			const obj = {
				jobs: results
			}
			res.send(JSON.stringify(obj));
			connection.end();
		});
		console.log(req.query)
		res.append("Access-Control-Allow-Origin", "*")
	})

// Handle POST request for /home
app.post('/home', function(req, res) {
	console.log(req.body)
	res.append("Access-Control-Allow-Origin", "*")
	res.send('Home page');
})

// Handle all methods for /test
app.all('/test', function(req, res) {
	console.log(req.cookies)
	res.send('Test page');
})

const server = app.listen(8081, function() {
	const host = server.address().address
	const port = server.address().port
	console.log("App listening at http://%s:%s", host, port)
})