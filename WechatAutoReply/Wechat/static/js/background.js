// background.js
function test() {
    console.log("后台")
}

function fetch() {
    $.ajax({
        type: "post",
        url: "http://stu.1000phone.net/student.php/Public/login",
        data: {
            Account: '440801199411252652',
            PassWord: '252652'
        },
        success(data) {
            console.log(data)
        }
    })
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});