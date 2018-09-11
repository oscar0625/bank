(function () {
    function ajax(arg) {
        var ini = {
            type: "get",
            url: "",
            async: true,
            data: {},
            success: function (txt) {

            },
            error: function (status) {

            },
            cash: false,
            beforeSend: function () {

            },
            complete: function () {

            }
        };
        var obj = merge(ini, arg);

        // 1.创建xhr对象  ie7+ firefox chrome  opera safari 都支持  
        var xhr = new XMLHttpRequest();

        // 2.监听readyState
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                obj.complete();
                if ((xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)) {
                    obj.success(xhr.responseText, xhr)
                } else {
                    obj.error(xhr.statusText, xhr)
                }
            }
            // 1. xhr.readyState  ajax请求/相应的阶段 
            // switch (xhr.readyState){    
            //     case 0:
            //         //未初始化 尚未调用 xhr.open()
            //     case 1:
            //         //启动     调用 xhr.open()但是没调用 xhr.send()
            //     case 2:
            //         //发送     已经调用 xhr.send()  但是没接受到服务器相应
            //     case 3:
            //         //接受     已经接受到部分相应数据 
            //     case 4:
            //         //完成     已经接受到全部的相应数据 可是使用了 
            // }
            // 2.  xhr.status http状态码
            // 3.  xhr.statusText http状态吗的说明 
            // 4.  xhr.responseText 返回的文本内容
            // 5.  xhr.responseXML  如果返回的是xml内容 那么这个属性将保存相应的xml Dom文档
        };



        var isPost = /^post$/i.test(obj.type);

        obj.data = data_parse(obj.data);

        if (!isPost) {
            obj.url += (obj.url.indexOf("?") == -1 ? "?" : "") + "&" + obj.data;
            obj.url += obj.cash ? "" : "&______Oscar______=" + new Date().getTime();
        }


        // 3.open不会真正的发送请求,只是启动一个请求以备发送。 xhr.open(type,url,async)
        xhr.open(obj.type, obj.url, obj.async);

        if (isPost) {
            //3.1 自定义http请求头 (此方法必须放在open()后 send()前面)
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        }

        obj.beforeSend();

        // 4.发送请求
        xhr.send(obj.data);

        

        xhr.upload.onprogress = function (e) { //上传进度调用方法实现
            if (e.lengthComputable) {
                //e.total是需要传输的总字节，e.loaded是已经传输的字节。但如果e.lengthComputable值为false，则e.total等于0。       
                // 通过(e.loaded/e.total)即可得到上传比例，可以用这个已上传比例去更新进度条啦    
            }
        };
        xhr.upload.onloadstart = function () { //上传开始执行方法
        };

        // 其他不常用方法
        // xhr.abort() 取消异步请求
    }
    function addURLParam(url,data){
        url+=url.indexOf('?')==-1?'?':'';
        for(var i in data){
            url+=encodeURI(i)+'='+encodeURI(data[i])+'&';
        }

        return url.slice(0,url.length-1)
    }
    addURLParam('oscar.php',{
        name:'ocsar',
        age:18
    })

    function merge(arg1, arg2) {
        var z;
        for (var key in arg1) {
            if (arg2[key] !== z) {
                arg1[key] = arg2[key];
            }
        }
        return arg1;
    }

    function data_parse(data) {
        var str = "";
        for (var key in data) {
            str += "&" + key + "=" + data[key];
        }
        return str
    }
    window.ajax = ajax
})();