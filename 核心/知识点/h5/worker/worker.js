self.addEventListener('message', function (e) {
    var num = event.data;
    num++;
    self.postMessage(num)
});
// 1.Worker 加载脚本
//  self.importScripts('script1.js', 'script2.js');
// 2.self.close() 用于在 Worker 内部关闭自身。