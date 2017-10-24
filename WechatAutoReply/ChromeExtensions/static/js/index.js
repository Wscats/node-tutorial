console.log("初始化页面")
// 过滤广告
var iframe = document.getElementsByTagName('iframe')
console.log("页面iframe:", iframe)
for (let i = 0; i < iframe.length; i++) {
  console.log(iframe[i].src)
  // 如果iframe的链接含有pos.baidu.com字符串，判断为广告
  console.log(iframe[i].src.indexOf("pos.baidu.com"))
  // 隐藏广告
  iframe[i].style.display = "none"
  //iframe[i].style.border = "10px solid blue"
  //iframe[i].innerHTML = "none"
  //if(iframe[i].src.indexOf("pos.baidu.com"))
}
// 用这个方法来ajax请求,记得要设置permissions权限
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=你好", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    console.log(xhr.responseText)
  }
}
xhr.send();

// 将所有http请求升级为https请求
var meta = document.createElement("meta");
meta.httpEquiv = "Content-Security-Policy";
meta.content = "upgrade-insecure-requests";
document.head.appendChild(meta)

// 跟隔绝区域的JS通信
window.addEventListener("message", function(event) {
  // 我们只接受来自我们自己的消息
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("内容脚本接收到：" + event.data.text);
  }
}, false);
