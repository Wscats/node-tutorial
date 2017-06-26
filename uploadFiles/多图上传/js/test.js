function doUpload() {
	$.ajax({
		url: 'http://localhost:3000/upload-single',
		type: 'POST',
		cache: false, //不必须
		data: new FormData($('#uploadForm')[0]),
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data)
		}
	})
}