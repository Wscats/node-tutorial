console.log("初始化页面")
//chrome.tabs.executeScript(null, {code:"document.body.style.backgroundColor=blue"});
//console.log($("iframe"))
//var iframe = $("iframe")
// 过滤广告
var iframe = document.getElementsByTagName('iframe')
console.log(iframe)
for (let i = 0; i < iframe.length; i++) {
  console.log(iframe[i].src)
  // 如果iframe的链接含有pos.baidu.com字符串，判断为广告
  console.log(iframe[i].src.indexOf("pos.baidu.com"))
  // 隐藏广告
  iframe[i].style.display = "none"
  //iframe[i].style.border = "10px solid blue"
  //iframe[i].innerHTML = "none"
  //iframe[i].insertBefore
  //if(iframe[i].src.indexOf("pos.baidu.com"))
}
// var messages = $(".js_message_plain");
// setInterval(function() {
//   for (let i = 0; i < messages.length; i++) {
//     console.log(messages[i].innerHTML)
//   }
// }, 1000)
