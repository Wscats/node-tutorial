'use strict';

const querystring = require('querystring');


//http://xxx.com?name=&passwod
//
const obj={firstname:"dk",url:"http://dk-lan.com", lastname: 'tom', passowrd: 123456};

//将对象转换成字符串
const param= querystring.stringify(obj);
//没有指定分隔符和分配符,并且自动编码汉字
console.log(param);

//将字符串转换成对象
const newobj=querystring.parse(param);
console.log(newobj);