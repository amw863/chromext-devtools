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

// 定时任务
console.log("设置定时任务");
chrome.alarms.create('demo-default-alarm', {
  delayInMinutes: 1,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener((info) => {
  console.log(info);
  sendNotification();
});
console.log("设置定时任务完成");


// 通知消息
// chrome.notifications.onClicked.addListener((notificationId) => {
//   // 当用户点击通知时触发
//   console.log('用户点击了通知');
// });

// chrome.action.onClicked.addListener(() => {
//   // 当用户点击扩展图标时触发
//   console.log('用户点击了扩展图标');
//   sendNotification();
// });
// sendNotification();

function sendNotification() {
  const options = {
    type: 'basic',
    iconUrl: './icon.png',
    title: '新消息提醒',
    message: '您有一条新消息'
  };

  // 此处有坑啊,id 不为空时只推送一次，id为空推送
  // https://stackoverflow.com/questions/27315302/chrome-extension-notification-shows-only-once
  // 修改service-work需要重新加载扩展
  // 通知需要浏览器开启通知
  chrome.notifications.create('', options, (notificationId) => {
    console.log('通知已发送');
  });
}