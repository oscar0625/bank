(function (name, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else {
        window[name] = factory();
    }
})('oscarAJAX', function () {
    function oscarAJAX(params) {

        //合并参数和默认值
        var obj = merge(params)

        //如果obj.data是对象
        if (Object.prototype.toString.call(obj.data) === '[object Object]') {
            //根据contentType类型处理数据
            if (/application\/x-www-form-urlencoded/i.test(obj.contentType)) {
                obj.data = data_parse(obj.data);
            }
            if (/application\/json/.test(obj.contentType)) {
                obj.data = JSON.stringify(obj.data);
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
                        obj.success(xhr.response, xhr)
                    } else {
                        obj.error(xhr.statusText, xhr)
                    }
                    break;
            }
            // 1. xhr.readyState  ajax请求/相应的阶段 
            // 2.  xhr.status http状态码
            // 3.  xhr.statusText http状态吗的说明 
            // 4.  xhr.response 返回响应的正文。返回的类型可以是 ArrayBuffer 、 Blob 、 Document 、 JavaScript Object 或 DOMString 。 这取决于 responseType 属性。
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

        // 请求超时的回调
        xhr.ontimeout = function (res) {
            console.log(res);
        };

        //设置返回数据的类型
        xhr.responseType = obj.dataType;

        if (/^get$/i.test(obj.type)) { //get

            var params = (obj.url.indexOf('?') == -1 ? '?' : '&') + obj.data + (obj.cache ? "" : "&_Oscar_=" + new Date().getTime());

            // 3.open不会真正的发送请求,只是启动一个请求以备发送。 xhr.open(type,url,async)
            xhr.open(obj.type, obj.url + params, obj.async);

            // 定义超时时间
            xhr.timeout = obj.timeout;

            //添加额外的自定义http请求头
            setHeaders(xhr, obj.headers)

            // 4.发送请求
            xhr.send();

        } else { //post
            // 3.open不会真正的发送请求,只是启动一个请求以备发送。 xhr.open(type,url,async)
            xhr.open(obj.type, obj.url, obj.async);

            // 定义超时时间
            xhr.timeout = obj.timeout;

            if (obj.contentType) { //如果contentType不为false则添加请求头
                // 3.1 设置http请求头 (此方法必须放在open()后 send()前面)
                xhr.setRequestHeader('content-type', obj.contentType);
            }

            //添加额外的自定义http请求头
            setHeaders(xhr, obj.headers)

            // 4.发送请求
            xhr.send(obj.data);

        }

    }

    function merge(params) {
        var obj = {
            type: "get",
            url: "",
            dataType: '', //设置返回数据的类型  text json blob(二进制数据的Blob 对象 ) arraybuffer(二进制数据的 JavaScript ArrayBuffer)
            data: {}, //数据--支持传object / string
            async: true,
            cache: false,
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

            timeout: 0,

            headers: { //额外自定义请求头

            },
            contentType: "application/x-www-form-urlencoded;charset=UTF-8", //发送信息至服务器时内容编码类型 还支持 "application/json"
            //当传formData时候设置 contentType:false; formData会自动加上正确的contentType:multipart/form-data 
        };
        for (var i in params) {
            obj[i] = params[i];
        }
        return obj
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

    function setHeaders(xhr, headers) {
        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    return oscarAJAX;
});
//支持传普通的ajax 还支持传数组、传formData  (用法设置 contentType:false)
//支持传 contentType:"application/json" 的数据
//支持设置返回数据的类型 dataType,支持 text json blob(二进制数据的Blob 对象 ) arraybuffer(二进制数据的 JavaScript ArrayBuffer)
//支持额外添加自定义的请求头headers对象形式
//支持上传进度事件uploadProgress 下载进度事件downloadProgress