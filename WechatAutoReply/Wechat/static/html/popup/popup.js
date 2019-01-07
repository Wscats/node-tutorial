// popup.js
document.querySelector('#btn').addEventListener('click', (e) => {
    console.log(e)
    var bg = chrome.extension.getBackgroundPage();
    bg.test(); // 访问bg的函数
    sendMessageToContentScript({
        cmd: 'test',
        value: 'hello'
    }, function (response) {
        console.log('来自content的回复：' + response);
    });
})

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}