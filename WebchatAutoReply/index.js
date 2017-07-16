const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')
const querystring = require('querystring')
const http = require('http')

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	})

	ipcMain.on("answer", function(event, data) {
		console.log(data)
		var data = {
			key: 'c75ba576f50ddaa5fd2a87615d144ecf',
			info: data
		};
		http.request({
			hostname: 'www.tuling123.com',
			port: '80',
			path: '/openapi/api?' + querystring.stringify(data),
			method: 'GET'
		}, function(resquest) {
			resquest.setEncoding('utf8');
			var str = '';
			resquest.on('data', function(data) {
				str += data;
			});
			resquest.on('end', function() {
				var answer = JSON.parse(str).text;
				mainWindow.webContents.executeJavaScript(`
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
		var answerNum = 2;
		setInterval(function(){
			var newAnswerNum = document.querySelectorAll(".content").length
			if(answerNum == document.querySelectorAll(".content").length){
			}else{
				if(document.querySelectorAll(".content")[newAnswerNum-2]){
					console.log("有新回复")
					if(document.querySelectorAll(".content")[newAnswerNum-2].querySelector(".left")){
						var content = document.querySelectorAll(".content")[newAnswerNum-2].getElementsByTagName("pre")[0].innerHTML;
						console.log(content);
						require("electron").ipcRenderer.send("answer",content);
					}
				}
			}
			answerNum = newAnswerNum
		},500)
	`);
	//mainWindow.webContents.openDevTools()
	mainWindow.on('closed', function() {
		mainWindow = null
	})
}
app.on('ready', createWindow)
app.on('window-all-closed', function() {
	if(process.platform !== 'darwin') {
		app.quit()
	}
})
app.on('activate', function() {
	if(mainWindow === null) {
		createWindow()
	}
})