# 基于Node.js的HTTPS MITM(中间人)代理的原理和实现

> 中间人攻击（Man-in-the-MiddleAttack，简称“MITM攻击”）是一种“间接”的入侵攻击，这种攻击模式是通过各种技术手段将受入侵者控制的一台计算机虚拟放置在网络连接中的两台通信计算机之间，这台计算机就称为'中间人'，——解释来自于[百度百科](https://baike.baidu.com/item/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB/1739730)

```
请求连接目标URL->
连接目标服务器->
客户端->
代理服务器(中间人)->
目标服务器->
返回数据(缓冲)->
返回数据
```

# 参考文档

- [基于Node.js的HTTPS MITM(中间人)代理的原理和实现](https://github.com/wuchangming/https-mitm-proxy-handbook)