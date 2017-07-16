const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')
const querystring = require('querystring')
const http = require('http')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	})

	ipcMain.on("answer", function(event, data) {
		console.log(data)
		var data = {
			//图灵机器人需要的API KEY
			key: 'c75ba576f50ddaa5fd2a87615d144ecf',
			//向图灵机器人发送的问题
			info: data
		};
		http.request({
			//域名
			hostname: 'www.tuling123.com',
			//端口号
			port: '80',
			//路由和参数  后面是需要提交的数据
			path: '/openapi/api?' + querystring.stringify(data),
			//请求方法 可以为post
			method: 'GET'
		}, function(resquest) {
			resquest.setEncoding('utf8');
			//这里用str来不间断监听数据
			var str = '';
			resquest.on('data', function(data) {
				console.log('相应的内容为: ' + data);
				str += data;
			});
			//监听数据成功后才去拼jsonp的数据
			resquest.on('end', function() {
				var answer = JSON.parse(str).text;
				console.log(answer)
				mainWindow.webContents.executeJavaScript(`
					console.log("${answer}")
					$(".edit_area").html("${answer}");
					$(".edit_area").trigger($.Event("keydown", { keyCode: 13,ctrlKey: true}));
					$(".btn_send").click();
				`)
			})
		}).on('error', function(e) {
			console.log('problem with request: ' + e.message);
		}).end();
	});

	mainWindow.loadURL("https://wx2.qq.com");
	mainWindow.webContents.executeJavaScript(`
		//对比前后回复列表的数据来监听是否有新消息进入
		var answerNum = 2;
		setInterval(function(){
			//console.log(newAnswerNum)
			var newAnswerNum = document.querySelectorAll(".content").length
			if(answerNum == document.querySelectorAll(".content").length){
				//没有变化
			}else{
				console.log("有新回复")
				//取最后一条
				if(document.querySelectorAll(".content")[newAnswerNum-2]){
					//console.log(document.querySelectorAll(".content")[newAnswerNum-2].querySelector(".left"))
					//并且是别人回复的信息,也就是消息体为白色居左
					if(document.querySelectorAll(".content")[newAnswerNum-2].querySelector(".left")){
						//获取最后回复的消息文本
						var content = document.querySelectorAll(".content")[newAnswerNum-2].getElementsByTagName("pre")[0].innerHTML;
						console.log(content);
						require("electron").ipcRenderer.send("answer",content);
					}
				}
			}
			answerNum = newAnswerNum
		},500)
	`);

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if(process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if(mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.