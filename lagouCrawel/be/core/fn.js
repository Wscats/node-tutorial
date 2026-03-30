'use strict';

const https = require("https");
exports.fetch = function(url, callback) {
	https.get(url, function(res) {
		const data = "";
		res.on('data', function(chunk) {
			data += chunk
		})
		res.on('end', function() {
			callback(data)
		})
	})
}