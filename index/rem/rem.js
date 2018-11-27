/*
* 实际上像素分为两种：设备像素和设备独立像素
* 1.设备像素dp(device pixels) = 物理像素（physical pixel）
* 2.设备独立像素dips(device-independent pixels) = css像素 = 逻辑像素
* 3.设备像素比(device pixel ratio )=dp/dips
*
* 在普通屏幕下，1个css像素 对应 1个物理像素(1:1)。 在retina 屏幕下，1个css像素对应 4个物理像(1:4)。
* */
var mobileReset={
    reset: function () {
        //1.获取屏幕像素比的倒数
        var num = 1/window.devicePixelRatio;
        //2.动态创建适口标签
        var meta=document.createElement('meta');
        meta.setAttribute('name','viewport');
        meta.setAttribute('content','width=device-width, user-scalable=no, initial-scale='+num+', maximum-scale='+num+', minimum-scale='+num+'');
        document.head.appendChild(meta);
        ////3.设置html字体,为整个页面的10/1
        document.documentElement.style.fontSize=window.innerWidth/10+'px';
    }
};
mobileReset.reset();
//元素宽/高值 = psd上的元素宽/高   /  psd总宽度 * 10 rem
