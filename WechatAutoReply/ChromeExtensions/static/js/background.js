chrome.contextMenus.create({
  "title": "启动", "type": "normal", //菜单项类型 "checkbox", "radio","separator"
  "onclick": function (info, tab) {
    chrome.tabs.executeScript(tab.id, {
      code: `
        
    `}, () => {
        console.log("点击启动");
        chrome.tabs.sendMessage(tab.id, {
          action: "start"
        }, function (response) {
          console.log(response.farewell);
        });
      });
  }
});
chrome.contextMenus.create({
  "title": "暂停", "type": "normal", //菜单项类型 "checkbox", "radio","separator"
  "onclick": function (info, tab) {
    chrome.tabs.executeScript(tab.id, {
      code: `
        // 在隔离环境下清楚定时器
        clearInterval(timer)
      `,
      //file: "background/wechatStop.js"

    }, () => {
      console.log("点击暂停");
      chrome.tabs.sendMessage(tab.id, {
        action: "stop"
      }, function (response) {
        console.log(response.farewell);
      });
    })
  }, //单击时的处理函数
});
// 后台隔绝的JS跟index.js通信
chrome.contextMenus.create({
  "title": "通信", "type": "normal", //菜单项类型 "checkbox", "radio","separator"
  "onclick": function (info, tab) {
    chrome.tabs.executeScript(tab.id, {
      code: `
        // 在隔离环境下清楚定时器
        window.postMessage({ type: "FROM_PAGE", text: "来自网页的问候！" }, "*");
      `})
  }, //单击时的处理函数
});
chrome.contextMenus.create({
  title: '使用Baidu搜索 "%s"', // %s表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
  onclick: function (params) {
    // 注意不能使用location.href，因为location是属于background的window对象
    chrome.tabs.create({
      url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)
    });
  }
});
chrome.contextMenus.create({
  title: '使用Baidu搜索 "%s"', // %s表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
  //parentId: 1,
  onclick: function (params) {
    // 注意不能使用location.href，因为location是属于background的window对象
    chrome.tabs.create({
      url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)
    });
  }
});
chrome.contextMenus.create({
  title: '消息窗口', // %s表示选中的文字
  onclick: function (params) {
    // 注意不能使用location.href，因为location是属于background的window对象
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'img/icon.png',
      title: '这是标题',
      message: '您刚才点击了自定义右键菜单！'
    });
  }
});
