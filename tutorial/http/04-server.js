'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const util = require('util');
const querystring = require('querystring');

const mimetype = {
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'xml': 'application/xml',
  'json': 'application/json',
  'js': 'application/javascript',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'png': 'image/png',
  'svg': 'image/svg+xml'
}
const page_404 = function(req, res, path){
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>404 Not Found</title>\n');
    res.write('<h1>Not Found</h1>');
    res.write(
    '<p>The requested URL ' +
     path + 
    ' was not found on this server.</p>'
    );
    res.end();
}
const page_500 = function(req, res, error){
    res.writeHead(500, {
      'Content-Type': 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>Internal Server Error</title>\n');
    res.write('<h1>Internal Server Error</h1>');
    res.write('<pre>' + util.inspect(error) + '</pre>');
    //方法返回 object 的字符串表示，主要用于调试。 附加的 options 可用于改变格式化字符串的某些方面。
}
http.createServer(function (req, res) {
    const pathname = url.parse(req.url).pathname;
    const realPath = __dirname +  pathname;

    if(req.method === "POST" && !mimetype[realPath.split('.').pop()]){
      console.log(req.method);
      // 定义了一个post变量，用于暂存请求体的信息
      let post = '';     
   
      // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
      req.on('data', function(chunk){    
          post += chunk;
      });
   
      // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
      req.on('end', function(){    
          post = querystring.parse(post);
          res.end(util.inspect(post));
      });
      return ;      
    }
    fs.exists(realPath, function(exists){
	    if(!exists){
	        return page_404(req, res, pathname);
	    } else {
	        const file = fs.createReadStream(realPath);
          res.writeHead(200, {
             'Content-Type': mimetype[realPath.split('.').pop()] || 'text/plain'
          });
	        file.on('data', res.write.bind(res));
	        file.on('close', res.end.bind(res));      
	        file.on('error', function(err){
	        	return page_500(req, res, err);
	        });
	    }    
    })
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');