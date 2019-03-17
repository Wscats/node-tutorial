
//测试命令行输入
let net = require('net');
let server = net.createServer();
function parser(socket,callback){
    // socket.on("data",function(){

    // })//接收

    function parserHeader(head){
        let obj = {};
        let headers = head.split(/\r\n/);
        let line = headers.shift();
        let [method,path,version] = line.split(' ');
        let heads = {};
        headers.forEach(line => {
            let [key,value] = line.split(': ');
            heads[key] = value;
        });
        obj['method'] = method;
        obj['path'] = path;
        obj['version'] = version;
        obj['headers'] = headers;
        return obj;
        
    }
    function fn(){
        let result = socket.read().toString();//如果read 不传参数会默认全读
        let [head,content] = result.split(/\r\n\r\n/);
        let obj = parserHeader(head);
        console.log(obj);
        //readble方法会触发多次，触发一次后就移除掉
        socket.removeListener('readable',fn)
        
    }
    socket.on("readable",fn)//默认把缓存区填满
}
server.on('connection',function(socket){
    parser(socket,function(req,res){
        server.emit('request',req,res);//将socket派发给request
    })
})
server.on('request',function(req,res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);//请求头对象，要取里面的参数，可以通过key来取（小写）
    let arr = [];
    req.on('data',function(data){//只要是post需要通过监听事件获取数据,默认触发一次64k
        arr.push(data)
    })
    req.on("end",function(){
        let str = Buffer.concat(arr);
        console.log(str.toString());
        res.end('hello');
    })
})
server.listen(3000)
