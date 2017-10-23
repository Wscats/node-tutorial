chrome.browserAction.onClicked.addListener(function() {
  console.log(1)
  console.log(2)
});
// setting页面打开后需要执行的代码
chrome.tabs.executeScript(null, {code: `
  // 默认初始条数为空
  var num = 0;
  // 定时器每秒监听是否有新的会话出现
  setInterval(function() {
    // 获取微信的所有信息内容
    var messages = $(".js_message_plain");
    // 判断有没有新的更新条数出现，就是判断是否出现新消息
    if (num != messages.length) {
      // 判断发送的内容是否为空
      if (messages[messages.length - 1].innerHTML) {
        $.ajax({
          type: "GET",
          url: "https://localhost/php/test.php?message=" + messages[messages.length - 1].innerHTML,
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
`});
