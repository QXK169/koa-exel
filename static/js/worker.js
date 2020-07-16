postMessage('我是worker线程');

addEventListener('message',(event) => {
  console.log('获取主线程发送的数据:',event.data);
})
