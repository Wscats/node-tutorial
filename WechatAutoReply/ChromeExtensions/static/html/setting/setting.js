chrome.browserAction.onClicked.addListener(function(tab) {
  console.log(1)
  console.log(2)
  chrome.tabs.executeScript(null, {code: "console.log('123')"})
});
console.log("进入setting页面")
// setting页面打开后需要执行的代码
chrome.tabs.executeScript(null, {
  code: `
    
  `,
  //file: "./settingOption.js"
}, () => {
  console.log("回调函数")
});
