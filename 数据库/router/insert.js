function insert(request, response, connection, params) {
	console.log('INSERT INTO `news`(`title`, `text`, `channel_id`, `channel_name`, `image`) VALUES ("'+params.title+'","'+params.text+'",'+params.channel_id+',"娱乐头条","1.jpg")')
	connection.query('INSERT INTO `news`(`title`, `text`, `channel_id`, `channel_name`, `image`) VALUES ("'+params.title+'","'+params.text+'",'+params.channel_id+',"娱乐头条","1.jpg")',
		function(error, results, fields) {
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

exports.insert = insert;