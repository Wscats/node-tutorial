function isLogListDetail(arr, $, $$, item, isLog) {
	if(isLog) {
		//职位列表项信息
		console.log($(arr[item - 1]).attr("data-positionid"), $(arr[item - 1]).attr("data-company"), $(arr[item - 1]).attr("data-salary"), $(arr[item - 1]).attr("data-positionname"), $(arr[item - 1]).attr("data-companyid"), $(arr[item - 1]).attr("data-hrid"));
		//职位详情链接
		console.log($(arr[item - 1]).find(".position_link").attr("href"));
		//职位诱惑
		console.log($(arr[item - 1]).find(".li_b_r").text());
		//公司图片
		console.log($(arr[item - 1]).find("img").attr("src"));
		//公司类型 正则截取空格
		console.log($(arr[item - 1]).find(".industry").text().replace(/^\s+|\s+$/g, ""));
		//职位描述
		console.log($$(".job_bt").find("div").text());
		//隔行
		console.log("");
	}
}

exports.isLogListDetail = isLogListDetail;