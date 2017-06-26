console.log("a");
var b = require("./method.js");//自定义模块
var c = require("./function.js");//自定义模块

//var gulp = require("gulp")//第三方模块

//第三方模块
//内置模块
console.log(c);

//import c from "./method.js";//ES6
console.log(b);
/*var b ={
	func:func
}*/
//console.log(b.name)
//console.log(b.func()); //name :abc
//var a = 1;
//setInterval(function(){
//	console.log(++a)
//},1000)