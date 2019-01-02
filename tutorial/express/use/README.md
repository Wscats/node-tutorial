# 过滤器
在进入某个路由前先经过一个过滤逻辑，这个称之为过滤器

## 简单使用
```javascript
const express = require('express')
const app = express();

let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
    
}

app.get('/:name/:pwd', filter, (req, res) => {
    res.send('ok')
}).listen(88)
```

### 运行规则
- 访问 `http://localhost:88/admin/admin`
- 首先会进入过滤器方法 filter
- next()，不带任何参数，表示会直接进入目标路由，执行路由逻辑
- next('')，带参数，表示不会进入目标路由，并抛出错误。

## 全局使用--use
表示进入所有目标路由前都会先进入过滤器方法

### 简单使用
```javascript
const express = require('express')
const app = express();

let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
    
}

app.use(filter);

app.get('/:name/:pwd', (req, res) => {
    res.send('ok')
}).listen(88)
```

### 访问所有静态资源文件
```javascript
app.use(express.static(path.join(__dirname, '/')));
```

### 所有 post 使用 body-parser
```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
```
