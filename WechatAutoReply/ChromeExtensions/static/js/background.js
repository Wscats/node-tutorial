chrome.browserAction.onClicked.addListener(function(){  
    console.log(1)
});
//chrome.browserAction.setIcon({path:"icon.png"});  
console.log(1)
chrome.tabs.executeScript(null, {code:"document.body.style.backgroundColor=blue"});  