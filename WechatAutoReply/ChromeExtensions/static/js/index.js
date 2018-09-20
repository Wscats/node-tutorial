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
xhr.open("GET", "https://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=梁静茹", true);
xhr.onreadystatechange = function () {
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
window.addEventListener("message", function (event) {
  // 我们只接受来自我们自己的消息
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("内容脚本接收到：" + event.data.text);
  }
}, false);

chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request.action);
    switch (request.action) {
      case "start":
        start();
        break;
      case "stop":
        stop();
        break;
    }
    console.log("前端/后端/Popup收到");
    sendResponse({
      farewell: "goodbye"
    });
  }
);
var timer;
var edit;

function start() {
  console.log("开启微信监听")
  // 默认初始条数为空
  var num = 0;
  // 定时器每秒监听是否有新的会话出现
  timer = setInterval(function () {
    console.log("运行中")
    // 获取微信的所有信息内容
    var messages = $(".js_message_plain");
    // 判断有没有新的更新条数出现，就是判断是否出现新消息
    if (num != messages.length) {
      // 判断发送的内容是否为空
      if (messages[messages.length - 1].innerHTML) {
        $.ajax({
          type: "GET",
          //url:"http://localhost/php/test.php?message=" + messages[messages.length - 1].innerHTML,
          url: "http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info=" + messages[messages.length - 1].innerHTML,
          success(data) {
            console.log("回复：", data);
            edit = $('.edit_area');
            edit.html(data.text);
            // setTimeout(() => {
            //   //$(".edit_area").trigger($.Event("keydown", { keyCode: [91, 13] }));
            //   $(".edit_area").trigger($.Event("keydown", { keyCode: 13, ctrlKey: true }));
            //   $('.btn_send').click();
            //   console.log("点击发送消息")
            // }, 1000)

            // $(".edit_area").trigger($.Event("keydown", {
            //   keyCode: 13,
            //   ctrlKey: true
            // }));
            // $(".edit_area").trigger($.Event("keydown", {
            //   keyCode: 13,
            //   ctrlKey: true
            // }));
            console.log($().jquery);
            edit.trigger("click").focus();
            var e = $.Event("keydown");
            e.keyCode = 99;
            edit.trigger(e);
            edit.trigger($.Event("keydown", {
              keyCode: 33,
              ctrlKey: true
            }));
            $('.btn_send').click();
            console.log("点击发送消息",edit)
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
  // window.postMessage("message", "http://example.org");
}