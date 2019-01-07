//http://stu.1000phone.net/student.php/Public/login
//362524199301274017
let stu = {
	commit: ["666"]
}
let host = "http://stu.1000phone.net";
let href = location.href.indexOf("?") ? location.href.split("?")[0] : location.href;
let Request = new Object();
Request = GetRequest();
switch (href) {
	case `${host}/student.php/Public/login`:
		let u = Request["u"];
		let p = Request["p"];
		console.log(u, p);
		document.querySelector("[name='Account']").value = u;
		document.querySelector("[name='PassWord']").value = p;
		setTimeout(() => {
			document.querySelector("[type='submit']").click();
		}, 500);
		break;
	case `${host}/student.php/index/index`:
		location.href = `${host}/student.php/Index/evaluate?autocommit=1`;
	case `${host}/student.php/Index/index`:
		location.href = `${host}/student.php/Index/evaluate?autocommit=1`;
	case `${host}/student.php/Index/evaluate`:
		let autocommit = Request["autocommit"];
		if (autocommit) {
			setTimeout(() => {
				document.querySelector("[class='btn btn-xs btn-success']").click();
			})
		}
		break;
	case `${host}/student.php/Index/start_evaluate`:
		function score() {
			let i = 0;
			let inputs = document.querySelectorAll("input");
			for (; i < inputs.length;) {
				document.querySelectorAll("input")[i].click();
				i += 4;
			}
			let xhr = new XMLHttpRequest();
			xhr.open("GET", "https://wscats.github.io/angular-tutorial/control/core.json", true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					console.log(JSON.parse(xhr.responseText));
					stu.commit = stu.commit.concat(JSON.parse(xhr.responseText).commit);
					document.querySelectorAll("textarea")[0].value = stu.commit[Math.floor(Math.random() * stu.commit.length)];
					document.querySelectorAll("textarea")[1].value = stu.commit[Math.floor(Math.random() * stu.commit.length)];
					document.getElementById("addstudent").click();
				}
			}
			xhr.send();
		}
		score();
		break;
	case `${host}/student.php/index/start_evaluate`:
		function score() {
			let i = 0;
			let inputs = document.querySelectorAll("input");
			for (; i < inputs.length;) {
				document.querySelectorAll("input")[i].click();
				i += 4;
			}
			let xhr = new XMLHttpRequest();
			xhr.open("GET", "https://wscats.github.io/angular-tutorial/control/core.json", true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					console.log(JSON.parse(xhr.responseText));
					stu.commit = stu.commit.concat(JSON.parse(xhr.responseText).commit);
					document.querySelectorAll("textarea")[0].value = stu.commit[Math.floor(Math.random() * stu.commit.length)];
					document.querySelectorAll("textarea")[1].value = stu.commit[Math.floor(Math.random() * stu.commit.length)];
					document.getElementById("addstudent").click();
				}
			}
			xhr.send();
		}
		score();
		break;
}

function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串  
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/*let xhr = new XMLHttpRequest();
xhr.open("GET", "https://wscats.github.io/angular-tutorial/control/core.json", true);
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4) {
		console.log(JSON.parse(xhr.responseText));
		stu.commit = stu.commit.concat(JSON.parse(xhr.responseText).commit);
		console
		console.log(stu.commit);
	}
}
xhr.send();*/