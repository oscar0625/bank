var num=0;
setInterval(function () {
    num++;
    postMessage(num)
},500)