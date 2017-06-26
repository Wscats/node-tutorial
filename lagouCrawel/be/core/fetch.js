var fs = require("fs");
var cheerio = require("cheerio");
var fn = require("./fn.js");
var mysql = require("./mysql.js");
var log = require("./log.js");
var config = require("./config.js").config;
exports.fetchList = (function(config) {
	//初始化起点页
	var page = 1;
	//初始化起点列表项
	var item = 1;
	//初始化是否打印信息
	var isLog = false;
	//保存抓取网页的文件夹名
	var file = "webqianduan";
	//是否保存数据库
	var isSave = false;
	//遍历结束页数
	var pageEnd = 30;
	//配置值
	page = (config.page ? config.page : page);
	item = (config.item ? config.item : item);
	isLog = (config.isLog ? config.isLog : isLog);
	file = (config.file ? config.file : file);
	isSave = (config.isSave ? config.isSave : isSave);
	pageEnd = (config.pageEnd ? config.pageEnd : pageEnd);
	//抓取列表
	return fetchList;

	function fetchList(config) {
		fn.fetch("https://www.lagou.com/zhaopin/" + file + "/" + page + "/?filterOption=" + page, function(data) {
			fs.writeFile("./html/" + file + "/" + file + "-" + page + ".html", data, function(err) {});
			var $ = cheerio.load(data);
			item = 1;
			fetchListDetail($(".item_con_list").children(), $);
			if(page < pageEnd) {
				page++;
				//递归结果
				fetchList();
			} else {
				//关闭数据库连接
				mysql.connection.end();
				return;
			}
		})
	}

	//抓取列表上的每个详细信息
	function fetchListDetail(arr, $) {
		//二级页面查找
		fn.fetch($(arr[item - 1]).find(".position_link").attr("href"), function(data) {
			var $$ = cheerio.load(data);
			//打印信息
			log.isLogListDetail(arr, $, $$, item, isLog);
			//数据库操作
			if(isSave) {
				mysql.connection.query(`INSERT INTO jobs(position_id, company, salary, position_name, company_id, hrid, position_link, job_introduce, company_img, industry, description) VALUES (
					${$(arr[item - 1]).attr("data-positionid")},
					"${$(arr[item - 1]).attr("data-company")}",
					"${$(arr[item - 1]).attr("data-salary")}",
					"${$(arr[item - 1]).attr("data-positionname")}",
					${$(arr[item - 1]).attr("data-companyid")},
					${$(arr[item - 1]).attr("data-hrid")},
					"${$(arr[item - 1]).find(".position_link").attr("href")}",
					"${$(arr[item - 1]).find(".li_b_r").text()}",
					"${$(arr[item - 1]).find("img").attr("src")}",
					"${$(arr[item - 1]).find(".industry").text().replace(/^\s+|\s+$/g, "")}",
					"${$$(".job_bt").find("div").text()}"
				)`, function(error, results, fields) {
					//if(error) throw error;
				});
			};
			if(item < arr.length) {
				item++;
				//递归结果
				fetchListDetail(arr, $);
			} else {
				return
			}
		});
	}
})(config)