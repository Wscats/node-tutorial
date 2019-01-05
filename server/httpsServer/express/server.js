const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.join(__dirname, '../github.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../github.crt'), 'utf8')
const credentials = {
    key: privateKey,
    cert: certificate,
}
// 创建express实例
const app = express()
// 处理请求
app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})
// 创建https服务器实例
const httpsServer = https.createServer(credentials, app)
// 设置https的访问端口号
const SSLPORT = 8889
// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
})