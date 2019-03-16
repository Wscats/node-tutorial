// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
// let vue = require('vue');
let http = require('http');
let url = require('url');
let Vue = require('./assets/js/vue.js')
console.log(Vue)
http.createServer(function (req, res) {
    res.end("123");
}).listen(3000);

new Vue({
    el:"#demo",
    template:`
        <div>
            hello world
        </div>
    `
})