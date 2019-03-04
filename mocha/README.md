# TDD与BDD的区别

TDD属于测试驱动开发，BDD属于行为驱动开发。个人理解其实就是TDD先写测试模块，再写主功能代码，然后能让测试模块通过测试，而BDD是先写主功能模块，再写测试模块

# 目录结构

```
.
├── index.js
├── node_modules
├── package.json
└── test
    └── test.js
```

# mocha

安装mocha
```js
npm install mocha -g // 需要在全局下安装Mocha
npm install mocha chai --save-dev
```

index.js
```js
const getNum = (value) => {
  return value * 2
}

module.exports = getNum
```
新建一个`test`文件夹放入`test.js`，以后可以在这里写其他单元测试的文件，`describe()`用于给测试用例分组，`it`代表一个测试用例
```js
const chai = require('chai')
const expect = chai.expect
const getNum = require('../index')

describe('Test', function() {
  it('should return 20 when the value is 10', function() {
      expect(getNum(10)).to.equal(20)
  })
})
```
项目目录下运行`test.js`
```js
mocha
```

# istanbul

完成代码测试之后我们再去看看代码测试的覆盖率。测试代码覆盖率我们选择使用istanbul，全局安装

```js
npm install -g istanbul
```
使用istanbul启动Mocha
```js
istanbul cover _mocha
```

- 行覆盖率（line coverage）：是否每一行都执行了？
- 函数覆盖率（function coverage）：是否每个函数都调用了？
- 分支覆盖率（branch coverage）：是否每个if代码块都执行了？
- 语句覆盖率（statement coverage）：是否每个语句都执行了？

修改`index.js`再看代码覆盖率
```js
const getNum = (value) => {
  if(value === 0) {
    return 1
  }else {
    return value * 2
  }
}

module.exports = getNum
```

修改`test.js`添加测试用例
```js
describe('Test', function() {
  it('should return 20 when the value is 10', function() {
      expect(getNum(10)).to.equal(20)
  })
  it('should return 1 when the value is 0', function() {
    expect(getNum(0)).to.equal(1)
  })
})
```
代码覆盖率又回到了100%

# 参考文档

- [前端单元测试](https://segmentfault.com/a/1190000013470485)