// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let $ = require('jquery');
let http = require('http');
let url = require('url');
let querystring = require('querystring');
let os = require('os');
let port = 12345;
$('#port').change(() => {
    port = parseInt($('#port').val());
    console.log(port);
})

$('#send').click(() => {
    let textarea = $('#textarea').val();
    console.log(os.userInfo().username);
    console.log(textarea);
    console.log(os.networkInterfaces().en0[1].address);
    http.get(`http://localhost:${port}/?message=${encodeURIComponent(textarea)}`, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk
        });
        res.on('end', () => {
            console.log(rawData);
        })
    })
});
let messageList = [];
http.createServer((req, res) => {
    console.log(req.url);
    let {
        message
    } = querystring.parse(url.parse(req.url).query);
    messageList.push(message);
    let html = messageList.map((item,index) => {
        return `<li style="
            width:${index%2==0?'100%':'10%'};
            float:${index%2==0?'left':'right'}
        ">${item}</li>`
    }).join('');
    res.end('已接收');
    $('#messageList').html(html);
}).listen(12345)