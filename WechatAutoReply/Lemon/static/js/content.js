chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
  if (request.cmd == 'test') {
    console.log($("img"))
    console.log(request.value)
    console.log("监听所有input输入框")
    // 获取所有输入框节点
    let inputs = document.querySelectorAll("input");
    // 遍历所有input节点
    [].forEach.call(inputs, (input) => {
      input.addEventListener("input", (e) => {
        // 打印输入的值
        console.log(e.target.value)
        console.log(e.data)
        // 这里是 content.js 跟 background.js 通信
        chrome.runtime.sendMessage({
          greeting: e.target.value
        }, function (response) {
          console.log('收到来自后台的回复：' + response);
        });
      })
    });

  }
  sendResponse('我收到了你的消息！');
});