//来自百度的API历史上的今天
//http://apistore.baidu.com/apiworks/servicedetail/1728.html
var http = require('http');
//处理字符串的模块
var querystring = require('querystring');
var data = {
	//月份
	yue: '1',
	//日期
	ri: '1',
	//数据类型，1：国内国际大事件，2：民间事件包含部分国家大事件
	type: '1',
	//请求页数，默认page=1
	page: '1',
	//返回记录条数，默认rows=20,最大50
	rows: '20',
	//返回数据格式，XML或JSON，默认为JSON
	dtype: 'JOSN',
	//当返回结果格式为JSON时，是否对其进行格式化
	format: 'false'
};
http.request({
	//域名
	hostname: 'apis.baidu.com',
	//端口号
	port: '80',
	//路由和参数  后面是需要提交的数据
	path: '/avatardata/historytoday/lookup?' + querystring.stringify(data),
	//请求方法 可以为post
	method: 'GET',
	//这里放期望发送出去的请求头
	//注意百度是把API KEY放在请求头里面
	headers: {
		'apiKey': '0aea38d1a7c4443f2f00adc86c4c3e72'
	}
}, function(resquest) {
	resquest.setEncoding('utf8');
	resquest.on('data', function(data) {
		console.log('相应的内容为: ' + data);
	});
}).on('error', function(e) {
	console.log('problem with request: ' + e.message);
}).end();