(function (win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = win.flexible || (win.flexible = {});

    if (metaEl) {
        //第一种情况 已有的meta.viewport   将根据initial-scale的值来设置缩放比例
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    }
    else if (flexibleEl) {
        //第二种情况  个人认为这种情况无意义
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    if (!dpr && !scale) {
        // 第三种情况 根据devicePixelRatio值设定缩放程度
        var appVersion=win.navigator.appVersion;
        var isAndroid =!!appVersion.match(/android/gi);
        var isIPhone  =!!appVersion.match(/iphone/gi);
        var isIPhone9_3 = isIPhone && !!appVersion.match(/OS 9_3/);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone&&!isIPhone9_3) {
            // iOS下(除去os9.3,也不包括ipad) 对于2和3的屏，用2倍/3倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);

    if (!metaEl) {
        //第二种或第三种情况 自己创建meta.viewport加入
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    /*设置html字体,为整个页面的10/1 即1rem*/
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        // if (width / dpr > 540) {  // 淘宝做法：限制在ipad 540的屏幕下，这样100%就跟10rem不一样了
        //     width = 540 * dpr;
        // }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    //rem转px
    flexible.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    };
    //px转rem
    flexible.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window);
/*
* flexible.px2rem() //px转rem
* flexible.rem2px() //rem转px
*
* */
/*
* 实际上像素分为两种：设备像素和设备独立像素
* 1.设备像素dp(device pixels) = 物理像素（physical pixel）
* 2.设备独立像素dips(device-independent pixels) = css像素 = 逻辑像素
* 3.设备像素比(device pixel ratio )=dp/dips
*
* 在普通屏幕下，1个css像素 对应 1个物理像素(1:1)。 在retina 屏幕下，1个css像素对应 4个物理像(1:4)。
* */

//元素宽/高值 = psd上的元素宽/高   /  psd总宽度 * 10 rem
