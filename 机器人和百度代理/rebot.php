<?php
$apiKey = "c75ba576f50ddaa5fd2a87615d144ecf";
$apiURL = "http://www.tuling123.com/openapi/api?key=KEY&info=INFO";
 
// 设置报文头, 构建请求报文
header("Content-type: text/html; charset=utf-8");
$reqInfo = "讲个笑话";
//请求参数
$reqInfo = $_GET["q"]?$_GET["q"]:'你好';
//请求的函数名
$callback = $_GET["callback"]?$_GET["callback"]:'JSONCALLBACK';
$url = str_replace("INFO", $reqInfo, str_replace("KEY", $apiKey, $apiURL));
$res = file_get_contents($url);
//JSONP模拟的请求
//http://localhost/node/rebot.php?q=%E4%BD%A0%E5%A5%BD&callback=JSONCALLBACK
echo $callback."(".$res.")";
?>