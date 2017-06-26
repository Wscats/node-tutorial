function search(request, response, connection) {
	connection.query('SELECT * FROM news', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		console.log('The solution is: ', results);
		var obj = {
			news: results
		}
		response.end(JSON.stringify(obj));
		connection.end();
	});
}

exports.search = search;

