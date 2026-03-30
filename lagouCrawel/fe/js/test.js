'use strict';

function UrlSearch() {
	var name, value;
	let str = location.href; //取得整个地址栏
	let num = str.indexOf("?")
	str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
	console.log(str)
	const arr = str.split("&"); //各个参数放到数组里
	for(let i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if(num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			this[name] = value;
		}
	}
}
const Request = new UrlSearch(); //实例化
console.log(Request.id)