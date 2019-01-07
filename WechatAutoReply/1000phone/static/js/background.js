console.log("bk");
chrome.contextMenus.create({
	title: "测试右键菜单",
	onclick: function() {
		chrome.notifications.create(null, {
			type: 'basic',
			iconUrl: 'img/icon.png',
			title: '这是标题',
			message: '您刚才点击了自定义右键菜单！'
		});
	}
});
chrome.webRequest.onBeforeRequest.addListener(details => {
	// cancel 表示取消本次请求
	if(!showImage && details.type == 'image') return {
		cancel: true
	};
	// 简单的音视频检测
	// 大部分网站视频的type并不是media，且视频做了防下载处理，所以这里仅仅是为了演示效果，无实际意义
	if(details.type == 'media') {
		chrome.notifications.create(null, {
			type: 'basic',
			iconUrl: 'img/icon.png',
			title: '检测到音视频',
			message: '音视频地址：' + details.url,
		});
	}
}, {
	urls: ["<all_urls>"]
}, ["blocking"]);
/*chrome.contextMenus.create({
	title: '使用度娘搜索：%s', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		// 注意不能使用location.href，因为location是属于background的window对象
		chrome.tabs.create({
			url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)
		});
	}
});*/