// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('这是background脚本onMessage', message);
//     sendResponse("收到消息");
//   });

chrome.action.onClicked.addListener(function () {
    console.log('点击了流沙插件图标');
});


// 从扩展法消息个网页
// (async () => {
//     //获取当前的tab页面
//   const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//   const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
//   console.log(response);
// })();


// 接受消息都一样
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello")
//         //处理完消息后、通知发送方
//         sendResponse({farewell: "goodbye"});
//     }
// );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
      if(request.type=='down') {
        download(request.data);
        sendResponse({"farewell":"下载："+request.data+" 完成"});
      }
    }
);



function download(url) {
    var options={
        url:url
    }


    chrome.downloads.download(options);
}