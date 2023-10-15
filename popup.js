// document.getElementById('content').innerText = 'Hello world!';

// let sendBg = document.getElementById("backgroud");
// sendBg.onclick = async function () {
//   const [tab] = await chrome.tabs.query({active:true,currentWindow:true})
//   console.log('p->b,tab',tab)
//   const respone =await chrome.runtime.sendMessage(tab.id)
//   console.log('popup-respone',respone);
// };


// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

//     sendResponse({"farewell":"下载："+request.data+" 完成"});
//     console.log("popup:"+request)
// });

// 消息通知
// function desktop_notification(){
// 	chrome.notifications.create("id", {	
// 		type : 'basic',
// 		title : ' ',  // 这里我故意使显示这个为空，显得没那么拥挤
// 		message : 'Auto Recode Start · · ·',
// 		iconUrl : 'static/nc_16x16.png'
// 	});
// }

// // 调用桌面通知
// desktop_notification();

// // 通知定时2秒进行清理
// setTimeout(function(e){
// 	// 这里的id只要和创建的时候设置id值一样就行了，就可以清理对应id的通知了
// 	chrome.notifications.clear("id");
// }, 2000);

//---------------------------------- 编码管理 ------------------------------------
document.getElementById('bt_urlencode').addEventListener('click', handle);
document.getElementById('bt_urldecode').addEventListener('click', handle);
document.getElementById('bt_base64encode').addEventListener('click', handle);
document.getElementById('bt_base64decode').addEventListener('click', handle);
document.getElementById('bt_md5').addEventListener('click', handle);
document.getElementById('bt_jsonescope').addEventListener('click', handle);

function handle() {
  input = document.getElementById('tx_input').value;
  ouput = document.getElementById('tx_output');

  id    = this.id;
  bt    = id.replace('bt', '');
  switch(bt) {
    case '_urlencode':
      ouput.value = encodeURIComponent(input);
      break;
    case '_urldecode':
      ouput.value = decodeURIComponent(input);
      break;
    case '_base64encode':
      ouput.value = window.btoa(input);
      break;
    case '_base64decode':
      ouput.value = window.atob(input);
      break;
    case '_md5':
      ouput.value = MD5(input);
      break;
    case '_jsonescope':
      let reg = /\\/g;
      ouput.value = input.replace(reg,'');
      break;
  }
}

//---------------------------------- 时间管理 ------------------------------------
var now     = new Date();
var now_ts  = Math.round(now.getTime()/1000);
var now_dt  = formatDatetime(now);

document.getElementById('current_ts').innerText = now_ts;
document.getElementById('current_ts').addEventListener('click', function(res) {
  content = document.getElementById('current_ts').innerText;
  if (navigator.clipboard) {
      navigator.clipboard.writeText(content);
  }
  let tips = document.getElementById('tips');
  tips.style.display = "inline-block";
  setTimeout(function() {
    tips.style.display = "none";
  }, 1000); // 5秒后隐藏提示信息

});

Array.from(document.getElementsByClassName("ts")).forEach(
  function(element, index, array) {
      element.value = now_ts;
  }
);

Array.from(document.getElementsByClassName("dt")).forEach(
  function(element, index, array) {
      element.value = now_dt;
  }
);

document.getElementById('convertToTimestap').addEventListener('click', function(){
    ts    = document.getElementById('timestampInput').value;
    unit  = document.getElementById('unitSelect').value;
    ts    = Number(ts);
    if (unit == "seconds") {
      ts *= 1000;
    }

    document.getElementById('datetimeOutput').value = toDatetime(ts);
});

document.getElementById('convertToDatetime').addEventListener('click', function(){
  dt    = document.getElementById('datetimeInput').value;
  unit  = document.getElementById('unitSelect2').value;
  
  ts = (new Date(dt)).getTime();
  if(unit == "seconds") {
    ts = Math.round(ts/1000);
  }

  document.getElementById('timestampOutput').value = ts;
});

function toDatetime(ts) {
  dt = new Date(ts);
  return formatDatetime(dt);
}

function formatDatetime(dt) {
  return dt.toLocaleDateString().replaceAll('/', '-') +" "+ dt.toLocaleTimeString();
}