// 浮悬
document.addEventListener('mouseover', function(e) {
    if(e.target.tagName=='IMG') {
        getByte(e.target.src).then(byte  => {
            showInfo(e.target, byte);
        })
    }
});


// 拖拽
document.addEventListener('dragend', async function(e){
    if(e.target.tagName=='IMG'){
        //TODO 下载
        console.log("去下载："+e.target.src);
        // chrome.runtime.sendMessage({type:'down', data:e.target.src});
        const response = await chrome.runtime.sendMessage({type:'down',data:e.target.src});
        console.log(response.farewell);
    }
})


function getByte(src) {
    console.log(src);
    return fetch(src).then(function(res) {
        return res.blob();
    }).then(function(data) {
        return (data.size/1024).toFixed(2)+'KB';
    })
}

function showInfo(el, byte) {
    var html=`真实尺寸:${el.naturalWidth}*${el.naturalHeight}\n显示尺寸:${el.width}*${el.height}\n存储大小:${byte}`;
    el.title = html;
}

// 长连接和消息传递API @see:https://developer.chrome.com/docs/extensions/mv3/messaging/
// 接受消息都一样
// 网页接受消息
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        //处理完消息后、通知发送方
        sendResponse({farewell: "goodbye"});
    }
);


// 从网页法消息给扩展
// (async () => {
//     console.log("发送消息2");
//     const response = await chrome.runtime.sendMessage({greeting: "hello"});
//     console.log(response);
//     console.log("接受消息完成");
//   })();