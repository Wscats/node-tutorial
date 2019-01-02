# 爬虫
又被称为网页蜘蛛，网络机器人，主要是在服务端去请求外部的 url 拿到对方的资源，然后进行分析并抓取有效数据。

这里用 request 实现一个简单的图片抓取的小爬虫

```javascript
const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');

request('http://www.lanrentuku.com/', (error, response, body) => {
    let $ = cheerio.load(body);
    $('img', '.in-ne').each((i, e) => {
        let src = $(e).attr('src');
        let name = src.substr(src.lastIndexOf('/') + 1);
        request(src).pipe(fs.createWriteStream(name))
    })
})
```