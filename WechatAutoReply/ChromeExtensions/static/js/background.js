chrome.contextMenus.create({
  "title": "启动", "type": "normal", //菜单项类型 "checkbox", "radio","separator"
  "onclick": function(info, tab) {
    chrome.tabs.executeScript(tab.id, {code: `
        console.log("开启微信监听")
        // 默认初始条数为空
        var num = 0;
        // 定时器每秒监听是否有新的会话出现
        var timer = setInterval(function() {
          console.log("运行中")
          // 获取微信的所有信息内容
          var messages = $(".js_message_plain");
          // 判断有没有新的更新条数出现，就是判断是否出现新消息
          if (num != messages.length) {
            // 判断发送的内容是否为空
            if (messages[messages.length - 1].innerHTML) {
              $.ajax({
                type: "GET",
                url:"http://localhost/php/test.php?message=" + messages[messages.length - 1].innerHTML,
                //url: "http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=" + messages[messages.length - 1].innerHTML,
                success(data) {
                  console.log("回复：", data);
                }
              })
            }
            console.log("发送：", messages[messages.length - 1].innerHTML);
            // 出现新消息则让数量相等
            num = messages.length;
          }
        }, 1000)
        // 动态插入JS脚本
        // var script = document.createElement("script");
        // script.src = "abc.js";
        // document.body.appendChild(script)
    `});
  }
});
chrome.contextMenus.create({
  "title": "暂停", "type": "normal", //菜单项类型 "checkbox", "radio","separator"
  "onclick": function(info, tab) {
    chrome.tabs.executeScript(tab.id, {
      code: `
        // 在隔离环境下清楚定时器
        clearInterval(timer)
      `,
      //file: "background/wechatStop.js"
    })
  }, //单击时的处理函数
});
// 后台隔绝的JS跟index.js通信
chrome.contextMenus.create({
  "title": "通信", "type": "normal", //菜单项类型 "checkbox", "radio","separator"
  "onclick": function(info, tab) {
    chrome.tabs.executeScript(tab.id, {code: `
        // 在隔离环境下清楚定时器
        window.postMessage({ type: "FROM_PAGE", text: "来自网页的问候！" }, "*");
      `})
  }, //单击时的处理函数
});
chrome.contextMenus.create({
  title: '使用Baidu搜索 "%s"', // %s表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
  onclick: function(params) {
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
  onclick: function(params) {
    // 注意不能使用location.href，因为location是属于background的window对象
    chrome.tabs.create({
      url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)
    });
  }
});
chrome.contextMenus.create({
  title: '消息窗口', // %s表示选中的文字
  onclick: function(params) {
    // 注意不能使用location.href，因为location是属于background的window对象
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'img/icon.png',
      title: '这是标题',
      message: '您刚才点击了自定义右键菜单！'
    });
  }
});
