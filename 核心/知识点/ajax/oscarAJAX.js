(function (name, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else {
        window[name] = factory();
    }
})('oscarAJAX', function () {
    //除了支持普通的ajax 还支持传数组、formData(processData:false,contentType:false)
    function oscarAJAX(params) {
        var obj = {
            type: "get",
            url: "",
            dataType: '', //设置dataType: 'json' 则返回json格式数据
            data: {}, //数据--支持传object / string
            async: true,
            cache: false, //是否缓存
            success: function (res, xhr) {

            },
            error: function (statusText, xhr) {

            },
            beforeSend: function () {

            },
            complete: function () {

            },
            uploadProgress: function (e) {
                //上传进度  
            },
            downloadProgress: function (e) {
                //下载进度
            },
            processData: true, //默认true,通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串
            
            contentType: "application/x-www-form-urlencoded;charset=UTF-8", //发送信息至服务器时内容编码类型 支持contentType:"application/json"
        };
        for (var i in params) {
            obj[i] = params[i];
        }

        //如果obj.data是对象
        if (Object.prototype.toString.call(obj.data) === '[object Object]') {
            //是否允许处理obj.data
            if (obj.processData) {
                if(/application\/x-www-form-urlencoded/i.test(obj.contentType)){
                    obj.data = data_parse(obj.data);
                }
                if(/application\/json/.test(obj.contentType)){
                    obj.data= JSON.stringify(obj.data);
                }
            }
        }

        // 1.创建xhr对象  ie7+ firefox chrome  opera safari 都支持  
        var xhr = new XMLHttpRequest();

        // 2.监听readyState 
        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 0: //未初始化 尚未调用 xhr.open()
                    break;
                case 1: //启动     调用 xhr.open()但是没调用 xhr.send()
                    obj.beforeSend();
                    break;
                case 2: //发送     已经调用 xhr.send()  但是没接受到服务器相应
                    break;
                case 3: //接受     已经接受到部分相应数据 
                    break;
                case 4: //完成     已经接受到全部的相应数据 可是使用了 
                    obj.complete();
                    if ((xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)) {
                        var res = obj.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                        obj.success(res, xhr)
                    } else {
                        obj.error(xhr.statusText, xhr)
                    }
                    break;
            }
            // 1. xhr.readyState  ajax请求/相应的阶段 
            // 2.  xhr.status http状态码
            // 3.  xhr.statusText http状态吗的说明 
            // 4.  xhr.responseText 返回的文本内容
            // 5.  xhr.responseXML  如果返回的是xml内容 那么这个属性将保存相应的xml Dom文档
        };

        // 上传进度事件 get不触发
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) { //进度信息是否可用
                //e.total是需要传输的总字节，e.loaded是已经传输的字节。但如果e.lengthComputable值为false，则e.total等于0。       
                // var complete = (e.loaded / e.total * 100 | 0);
                obj.uploadProgress(e);
            }
        };
        // 接受进度事件
        xhr.onprogress = function (e) {
            if (e.lengthComputable) { //进度信息是否可用
                //e.total是需要传输的总字节，e.loaded是已经传输的字节。但如果e.lengthComputable值为false，则e.total等于0。       
                // var complete = (e.loaded / e.total * 100 | 0);
                obj.downloadProgress(e);
            }
        };

        if (/^post$/i.test(obj.type)) { //post

            // 3.open不会真正的发送请求,只是启动一个请求以备发送。 xhr.open(type,url,async)
            xhr.open(obj.type, obj.url, obj.async);

            if (obj.contentType) { //如果contentType不为false则添加请求头
                // 3.1 自定义http请求头 (此方法必须放在open()后 send()前面)
                xhr.setRequestHeader('content-type', obj.contentType);
            }

            if (obj.dataType === 'json') { //如果值设置则指定返回的必须是json
                xhr.setRequestHeader('accept', 'application/json, text/javascript, */*; q=0.01');
            }

            // 4.发送请求
            xhr.send(obj.data);

        } else { //get

            var params = (obj.url.indexOf('?') == -1 ? '?' : '&') + obj.data + (obj.cache ? "" : "&_Oscar_=" + new Date().getTime());

            // 3.open不会真正的发送请求,只是启动一个请求以备发送。 xhr.open(type,url,async)
            xhr.open(obj.type, obj.url + params, obj.async);

            if (obj.dataType === 'json') { //如果值设置则指定返回的必须是json
                xhr.setRequestHeader('accept', 'application/json, text/javascript, */*; q=0.01');
            }

            // 4.发送请求
            xhr.send();
        }

    }

    function data_parse(data) {
        var url = '';
        for (var i in data) {
            if (Array.isArray(data[i])) {
                for (var j = 0, len = data[i].length; j < len; j++) {
                    url += encodeURI(i) + '=' + encodeURI(data[i][j]) + '&';
                }
            } else {
                url += encodeURI(i) + '=' + encodeURI(data[i]) + '&';
            }

        }
        return url.slice(0, url.length - 1);
    }

    return oscarAJAX;
});