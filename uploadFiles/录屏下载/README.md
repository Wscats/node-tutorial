# BAQ

`createObjectURL`错误`Failed to execute 'createObjectURL' on 'URL'`
```js
window.URL.createObjectURL(data)

var binaryData = [];
binaryData.push(data);
window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
```

# navigator

- `navigator.mediaDevices.getDisplayMedia`屏幕源
- `navigator.mediaDevices.getUserMedia`摄像头源

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <style>
        video {
            width: 1000px;
            height: 500px
        }
    </style>
    <video autoplay id="video">Video stream not available.</video>
    <script>
        let video = document.getElementById('video');
        navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            })
            .then(stream => {
                // we have a stream, attach it to a feedback video element
                console.log(stream);
                
                video.srcObject = stream;
            }, error => {
                console.log("Unable to acquire screen capture", error);
            });
    </script>
</body>

</html>
```

# MediaRecorder

用`MediaRecorder`录制视频或者音频的步骤
- `navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {}`获取音视频的`stream`
- `var mediaRecorder = new MediaRecorder(stream)`实例化`mediaRecorder`，`mediaRecorder`会不断接受`navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {}`所提供的`stream`，并且它自身有多个方法
- `mediaRecorder.start()`点击事件触发开始录制
- `mediaRecorder.onstop = function(e) {}`往`mediaRecorder`监听停止事件`var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });chunks = [];`这里的`chunks`会从无到有，随着音视频流被监听，不断增加，注意`onstop`会触发两次，一开始未录制和暂停都会触发
- `mediaRecorder.ondataavailable = function(e) {chunks.push(e.data);}`不断监听`stream`，并往`chunks`数组添加音视频流的数据
- `mediaRecorder.stop()`点击事件触发暂停录制
- `var audioURL = URL.createObjectURL(blob);audio.src = audioURL;console.log("recorder stopped");`用`blob`生成一个`url`挂载到`audio`或者`video`标签上面去播放

```js
var constraints = { audio: true };
var chunks = [];

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {

var mediaRecorder = new MediaRecorder(stream);

record.onclick = function() {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
}

stop.onclick = function() {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
}

mediaRecorder.onstop = function(e) {
    audio.setAttribute('controls', '');
    audio.controls = true;
    var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    chunks = [];
    var audioURL = URL.createObjectURL(blob);
    audio.src = audioURL;
    console.log("recorder stopped");
}

mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
}
})
.catch(function(err) {
    console.log('The following error occurred: ' + err);
})
```

# webkitRTCPeerConnection

```js
localPeerConnection = new RTCPeerConnection(null);
localPeerConnection.onicecandidate = function(event) {
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate)); //answer方接收ICE
    }
};

remotePeerConnection = new RTCPeerConnection(null);
remotePeerConnection.onicecandidate = function(event) {
    if (event.candidate) {
        localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate)); //offer方接收ICE
    }
};

remotePeerConnection.onaddstream = function gotRemoteStream(event) {
    recordedVideo.srcObject = event.stream;
};

localPeerConnection.addStream(recordStream);
localPeerConnection.createOffer(function (description) { //description是offer方的  SD  ==>  传输的内容
    localPeerConnection.setLocalDescription(description);
    remotePeerConnection.setRemoteDescription(description); //answer方接收offer的SD
    remotePeerConnection.createAnswer(function (description) {
        remotePeerConnection.setLocalDescription(description); //answer方设置本身自己的SD
        localPeerConnection.setRemoteDescription(description); //offer接收answer方的SD
    }, function (error) {
        console.log(error)
    }); //answer方发送自己的SD
}, function (error) {
    console.log(error)
});
```

# Blob

`Blob`是`Binary Large Object`的缩写，代表二进制类型的大对象

```js
new Blob(blobParts, [options]);
```

## 用法

- blobParts：数组类型，数组中的每一项连接起来构成Blob对象的数据，数组中的每项元素可以是ArrayBuffer, ArrayBufferView, Blob, DOMString 。

- options：可选项，字典格式类型，可以指定如下两个属性：
    - type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型。
    - endings，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，表示行结束符会被更改为适合宿主操作系统文件系统的换行符； "transparent"，表示会保持blob中保存的结束符不变。

```js
var data1 = "a";
var data2 = "b";
var data3 = "<div style='color:red;'>This is a blob</div>";
var data4 = {
    "name": "abc"
};

var blob1 = new Blob([data1]);
var blob2 = new Blob([data1, data2]);
var blob3 = new Blob([data3]);
var blob4 = new Blob([JSON.stringify(data4)]);
var blob5 = new Blob([data4]);
var blob6 = new Blob([data3, data4]);

console.log(blob1); //输出：Blob {size: 1, type: ""}
console.log(blob2); //输出：Blob {size: 2, type: ""}
console.log(blob3); //输出：Blob {size: 44, type: ""}
console.log(blob4); //输出：Blob {size: 14, type: ""}
console.log(blob5); //输出：Blob {size: 15, type: ""}
console.log(blob6); //输出：Blob {size: 59, type: ""}
```

## slice方法

`Blob`对象有一个`slice`方法，返回一个新的`Blob`对象，包含了源`Blob`对象中指定范围内的数据。
```js
slice([start], [end], [contentType])
```

- start： 可选，代表`Blob`里的下标，表示第一个会被会被拷贝进新的`Blob`的字节的起始位置。如果传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。
- end： 可选，代表的是`Blob`的一个下标，这个下标-1的对应的字节将会是被拷贝进新的`Blob`的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。
- contentType： 可选，给新的`Blob`赋予一个新的文档类型。这将会把它的`type`属性设为被传入的值。它的默认值是一个空的字符串。

```js
var data = "abcdef";
var blob1 = new Blob([data]);
var blob2 = blob1.slice(0, 3);

console.log(blob1); //输出：Blob {size: 6, type: ""}
console.log(blob2); //输出：Blob {size: 3, type: ""}
let href = URL.createObjectURL(blob2); //浏览器可以直接打开href连接看输出
console.log(href); //abc
```

## URL.createObjectURL()

`URL.createObjectURL()`静态方法会创建一个`DOMString`，其中包含一个表示参数中给出的对象的URL。这个`URL`的生命周期和创建它的窗口中的`document`绑定。这个新的`URL`对象表示指定的`File`对象或`Blob`对象。
```js
objectURL = URL.createObjectURL(blob);
```

# URL.revokeObjectURL()

`URL.revokeObjectURL()`静态方法用来释放一个之前通过调用`URL.createObjectURL()`创建的已经存在的`URL`对象。当你结束使用某个`URL`对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了。
```js
window.URL.revokeObjectURL(objectURL);
```

## 分割上传

目前，`Blob`对象大多是运用在，处理大文件分割上传（利用`Blob`中`slice`方法），处理图片`canvas`跨域(避免增加`crossOrigin = "Anonymous"`,生成当前域名的`url`，然后`URL.revokeObjectURL()`释放，`createjs`有用到)，以及隐藏视频源路径等等。
```js
function upload(blobOrFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/server', true);
    xhr.onload = function (e) {
        // ...
    };
    xhr.send(blobOrFile);
}

document.querySelector('input[type="file"]').addEventListener('change', function (e) {
var blob = this.files[0];
const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
const SIZE = blob.size;
var start = 0;
var end = BYTES_PER_CHUNK;
while (start < SIZE) {
    upload(blob.slice(start, end));
    start = end;
    end = start + BYTES_PER_CHUNK;
}
}, false);
```

# 下载

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'blob';
xhr.send()

xhr.onload = function (e) {
    if (this.status == 200) {
        var blob = this.response;

        var img = document.createElement('img');
        var URL = window.URL || window.webkitURL; //兼容处理
        var objectUrl = URL.createObjectURL(blob);
        img.onload = function (e) {
            window.URL.revokeObjectURL(img.src); // 释放 url.
        };

        img.src = objectUrl;
        document.body.appendChild(img);
        // ...
    }
};

xhr.send();
```

|代码|作用|类型|
|-|-|-|
|`navigator.mediaDevices.getUserMedia(constraints).then(function(stream){};`|根据音视频源头生成`stream`|MediaStream|
|`mediaRecorder = new MediaRecorder(window.stream, options)`|根据音视频源头把`stream`交给`mediaRecorder`处理|MediaRecorder|
|`mediaRecorder.ondataavailable = function (event) {recordedBlobs.push(event.data);}`|根据`stream`获取每一片段的`BlobEvent`并存入`recordedBlobs`数组|BlobEvent|
|`let buffer = new Blob(recordedBlobs, {type: "video/webm"});`|得到`Blob`格式的音视频流|Blob|
|`test.src = window.URL.createObjectURL(buffer);`|可用`window.URL.createObjectURL`方法处理Blob并配合`video`或者`audio`标签播放|src|
|`recordStream = test.captureStream();`|把`Blob`转化为`MediaStream`|MediaStream|
|`new RTCPeerConnection(null).addStream(recordStream);`|将`recordStream`交给`RTCPeerConnection`处理|MediaStream|
```js
mediaRecorder = new MediaRecorder(window.stream, options); // 设置音频录入源、格式
mediaRecorder.ondataavailable = function (event) {
    // 这个会不断接受BlobEvent
    console.log(event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}; // 存放获取的数据
let buffer = new Blob(recordedBlobs, {
    type: "video/webm"
});
console.log(buffer);
test.src = window.URL.createObjectURL(buffer);
recordStream = test.captureStream();
```

# 参考文档

- RTCPeerConnection
    - [MDN API文档](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos#Get_the_video)
    - [MDN例子](https://mdn-samples.mozilla.org/s/webrtc-capturestill/)
    - [有没有人用MediaRecorder在pc上录制视频并上传到服务器](https://segmentfault.com/q/1010000011489899)
    - [MDN RTCPeerConnection文档](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection)

- MediaRecorder
    - [MDN MediaRecorder文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)