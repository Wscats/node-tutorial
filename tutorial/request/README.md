#Request
一个第三方的模块，可用于发起 http 或 https 请求，可理解成服务端的 ajax 请求。可用于代简单的服务器代理，用法和 ajax 类似。

在使用前需要先安装 `npm install request --save`

## GET 请求
```javascript
request.get('https://cnodejs.org/api/v1/topics?page=1&limit=10', (error, response, body) => {
    console.log(body)
})
//or
request('https://cnodejs.org/api/v1/topics?page=1&limit=10', (error, response, body) => {
    console.log(body)
})
```
### 多参数设置
```javascript
exports.get = function(url, options) {
    options = options || {};
    var httpOptions = {
        url: url,
        method: 'get',
        timeout: options.timeout || 10000,
        headers: options.headers || default_post_headers,
        proxy: options.proxy || '',
        agentOptions: agentOptions,
        params: options.params || {}
    }
    if(options.userAgent){
        httpOptions.headers = {
            'User-Agent': userAgents[options.userAgent],
        }
    }

    try{
        request.get(httpOptions, function(err, res, body) {
            if (err) {
                options.callback({status: false, error: err})
            } else {
                options.callback({status: res.statusCode == 200, error: res, data: body})
            }
        }).on('error', logger.error);
    } catch(err){
        console.log('http error');
    }
}
```

## POST 请求
request支持application/x-www-form-urlencoded和multipart/form-data实现表单上传。

### application/x-www-form-urlencoded (URL-Encoded Forms)
```javascript
request.post('http://service.com/upload', {form:{key:'value'}})
// or
request.post('http://service.com/upload').form({key:'value'})
// or
request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
```

### multipart/form-data (Multipart Form Uploads)
```javascript
var formData = {
  // Pass a simple key-value pair
  my_field: 'my_value',
  // Pass data via Buffers
  my_buffer: new Buffer([1, 2, 3]),
  // Pass data via Streams
  my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
  // Pass multiple values /w an Array
  attachments: [
    fs.createReadStream(__dirname + '/attachment1.jpg'),
    fs.createReadStream(__dirname + '/attachment2.jpg')
  ],
  // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
  // Use case: for some types of streams, you'll need to provide "file"-related information manually.
  // See the `form-data` README for more information about options: https://github.com/form-data/form-data
  custom_file: {
    value:  fs.createReadStream('/dev/urandom'),
    options: {
      filename: 'topsecret.jpg',
      contentType: 'image/jpeg'
    }
  }
};
request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
```


### 常用多参数设置
```javascript
exports.form_post = function(url, postdata, options) {
    // console.log(`${moment().format()} HttpFormPost: ${url}`)
    return new Promise((resolve, reject) => {
        options = options || {};
        var httpOptions = {
            url: url,
            form: postdata,
            method: 'post',
            timeout: options.timeout || 3000,
            headers: options.headers || default_post_headers,
            proxy: options.proxy || '',
            agentOptions: agentOptions
        };
        request(httpOptions, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                if (res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(res.statusCode);
                }
            }
        }).on('error', logger.error);
    });
};
```

## 流
```javascript
request('http://img.zcool.cn/community/018d4e554967920000019ae9df1533.jpg@900w_1l_2o_100sh.jpg').pipe(fs.createWriteStream('test.png'))
request('https://cnodejs.org/api/v1/topics?page=1&limit=10').pipe(fs.createWriteStream('cnodejs.json'))
```