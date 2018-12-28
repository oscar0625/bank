var oscar = {
    //判断当前浏览器
    browser: {
        //移动/pc终端浏览器版本信息 
        versions: function () {
            var userAgent = window.navigator.userAgent, //取得浏览器的userAgent字符串
                app = window.navigator.appVersion;
            return {
                //判断浏览器内核
                trident: userAgent.indexOf('Trident') > -1, //IE内核
                webKit: userAgent.indexOf('AppleWebKit') > -1, //webkit内核/苹果、谷歌内核
                gecko: userAgent.indexOf("Firefox") > -1, //火狐内核
                presto: userAgent.indexOf('Presto') > -1, //opera内核
                //判断是否移动端  (满足任一就应跳转到手机端)
                mobile: /AppleWebKit.*Mobile.*/.test(userAgent), //windows移动终端
                ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent), //ios移动终端
                android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: userAgent.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: userAgent.indexOf('iPad') > -1, //是否iPad  
                //判断是否微信qq
                weixin: userAgent.indexOf('MicroMessenger') > -1, //是否微信 
                qq: userAgent.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),

        //当前语言 比如"zh-CN"
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),

        //判断ie几
        ieNum: function () {
            var userAgent = window.navigator.userAgent, //取得浏览器的userAgent字符串
                isIE = userAgent.indexOf("Trident") > -1; //判断是否IE浏览器
            if (isIE) {
                if (userAgent.indexOf("MSIE") == -1) {
                    return "IE11";
                }
                var fIEVersion = parseFloat(userAgent.match(/MSIE (\d+\.\d+)/)[1]);
                if (fIEVersion == 7) {
                    return "IE7";
                } else if (fIEVersion == 8) {
                    return "IE8";
                } else if (fIEVersion == 9) {
                    return "IE9";
                } else if (fIEVersion == 10) {
                    return "IE10";
                } else {
                    return "0" //IE版本过低
                }
            } else {
                return false
            }
        }(),
    },

    /*location search =>obj*/
    searchToOBJ: function (str) {
        //第一版使用时候出现这样一个错误 www.baidu.com?url=http://www.zgcjm.com/DefaultIndex?type=kjcgtz
        //这是优化后的版本优化版本
        var obj = {};
        if (str) {
            var arr = str.slice(1).split('&');
            for (var i = 0, len = arr.length; i < len; i++) {
                var tail = '';
                var res = arr[i].split('=');
                for (var j = 1, lenJ = res.length; j < lenJ; j++) {
                    tail += res[j] + '=';
                }
                obj[res[0]] = decodeURIComponent(tail.slice(0, tail.length - 1))
            }
        }
        return obj;
    },

    /**将数字四舍五入保留到N位小数
     * @param num  要处理的数字  如果是string类型 会处理成number 类型
     * @param n  0-20 [保留n位小数]
     * @returns {string}
     */
    keepDecimal: function (num, n) { //keepDecimal(3.1415926,2)
        var times = Math.pow(10, n);
        return (Math.round(num * times) / times).toFixed(n)
    },

    //冒泡排序
    bubbleSort: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr
    },

    //sort排序
    sort: function (arr) {
        arr.sort(function (a, b) {
            return a - b
        });
        return arr
    },

    //数组去重
    merge: function (arr) {
        var res = [];
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = true;
                res.push(arr[i])
            }
        }
        return res
    },

    /*寻找数组中最小值/最大值*/
    findMin: function (arr) {
        return Math.min.apply(Math, arr)
    },
    findMax: function (arr) {
        return Math.max.apply(Math, arr)
    },

    /*cookie操作*/
    cookieUtil: {
        set: function (name, value, expires) {
            //设置cookie
            var cookieText = name + "=" + value;
            if (expires instanceof Date) {
                cookieText += ";expires=" + expires;
            }
            //console.log(cookieText);
            document.cookie = cookieText;
        },
        get: function (name) {
            //获取cookie
            var cookieName = name + "=";
            var cookieStart = document.cookie.indexOf(cookieName); //如果存在返回当恰的位置
            var cookieValue = null;
            if (cookieStart > -1) {
                var cookieEnd = document.cookie.indexOf(";", cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = document.cookie.length;
                }
                //取到的内容赋值给cookieValue
                cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            }
            return cookieValue;

        },
        delete: function (name) {
            //清除cookie
            this.set(name, null, new Date("January 1,2016"));
        },
        unset: function (name, value, expires) {
            //重置cookie
            if (expires instanceof Date) {
                expires = new Date("January 1,2017");
            }
            this.set(name, value, expires);
        }
    },

    //判断滚动条是往上还是往下
    scrollUpDown: function () {
        var currentTop = 0,
            lastTop = 0;
        window.onscroll = function () {
            currentTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (currentTop >= lastTop) {
                //下滚
                console.log('下滚')
            } else {
                //上滚
                console.log('上滚')
            }
            /*关键点*/
            setTimeout(function () {
                lastTop = currentTop;
            }, 0);
        }

    },

    //鼠标滚轮事件
    mouseWheel: function (downCallback, upCallback) {
        if (navigator.userAgent.indexOf("Firefox") > -1) {
            //火狐下
            document.addEventListener('DOMMouseScroll', function (e) {
                var isUp = e.detail;
                if (isUp > 0) {
                    //向下
                    downCallback();
                } else {
                    //向上
                    upCallback();
                }
            });
        } else {
            //非火狐下
            document.onmousewheel = function (e) {
                var e = e || window.event;
                var isUp = e.wheelDelta;
                if (isUp < 0) {
                    //向下
                    downCallback();
                } else {
                    //向上
                    upCallback();
                }
            };

        }
    },

    //图片预加载
    loadImage: function (url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }

        img.onload = function () { //图片下载完毕时异步调用callback函数。
            callback.call(img); //将回调函数的this替换为Image对象
            img.onload = null;
        };
    },

    /*深拷贝*/
    deepClone: function () {
        if (typeof obj != 'object') {
            return obj
        }
        var newObj = Array.isArray(obj) ? [] : {};
        for (var i in obj) {
            newObj[i] = deepClone(obj[i]);
        }
        return newObj
    },

    //普通随机数[min,max]
    random: function (min, max) { //限制 max-min值为整数
        return Math.floor(Math.random() * (max - min + 1)) + min;
        //return Math.round(Math.random()*(max-min))+min; //四舍五入  从概率上来说 不合适 因为两端的出现几率小
    },

    /**
     * 种子随机数
     * @param seed [种子]
     * @param min  [最小] 可取
     * @param max  [最大] 取不到
     */
    seedRandom: function (seed, min, max) {
        min = min || 0;
        max = max || 1;
        seed = (seed * 9301 + 49297) % 233280;
        var rnd = seed / 233280.0;
        return rnd * (max - min) + min;
        //return Math.floor(rnd*(max-min+1))+min;  //取整
    },

    /*second => hour+':'+minute+':'+second  120 => 00:02:00*/
    hms: function (num) {
        var hour = Math.floor(num / 3600);
        hour < 10 ? hour = "0" + hour : hour = "" + hour;
        var minute = Math.floor((num % 3600) / 60);
        minute < 10 ? minute = "0" + minute : minute = "" + minute;
        var second = Math.floor((num % 3600) % 60);
        second < 10 ? second = "0" + second : second = "" + second;
        return hour + ':' + minute + ':' + second;
    },

    /*打印*/
    doPrint: function () {
        // <!--startprint-->要打印的部分<!--endprint-->
        bdhtml = window.document.body.innerHTML;
        sprnstr = "<!--startprint-->";
        eprnstr = "<!--endprint-->";
        prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
        prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
        window.document.body.innerHTML = prnhtml;
        window.print();
        window.document.body.innerHTML = bdhtml;
    },

    /*禁止页面copy、右键功能*/
    preventCopy: function () {
        /*去掉右键菜单*/
        document.oncontextmenu = function (e) {
            e ? e.preventDefault() : window.event.returnValue = false;
        };
        //禁止copy
        document.oncopy = function () {
            e ? e.preventDefault() : window.event.returnValue = false;
        };
        //禁止cut
        document.oncut = function () {
            e ? e.preventDefault() : window.event.returnValue = false;
        };
    },

    //获取元素某一css属性值方法 没有返回空字符串(兼容到ie8)
    computedStyle: function (elem, prop) {
        var cs, obj = {};
        if (window.getComputedStyle) {
            cs = window.getComputedStyle(elem, null);
            if (prop) {
                return cs.getPropertyValue(prop);
            }
            for (var i = 0; i < cs.length; i++) {
                var style = cs[i];
                obj[style] = cs.getPropertyValue(style);
            }
            return obj
        } else {
            //兼容ie8操作 currentStyle
            cs = elem.currentStyle;
            if (prop) {
                return cs[prop]
            }
            return cs
        }
    }
};
var oscarCheck = {
    /*检验真是姓名 全中文包含少数名族 如：迪丽热巴·迪力木拉提*/
    checkChineseName: function (str) {
        if (/^[\u4E00-\u9FA5]+·?[\u4E00-\u9FA5]+$/.test(str)) {
            return true
        } else {
            return false
        }
    },

    /*检验身份证*/
    checkCard: {
        vcity: {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        },
        //1.检查号码是否符合规范，包括长度，类型
        isCardNo: function (obj) {
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            if (reg.test(obj) === false) {
                return false;
            }
            return true;
        },
        //2.取身份证前两位,校验省份
        checkProvince: function (obj) {
            var province = obj.substr(0, 2);
            if (this.vcity[province] == undefined) {
                return false;
            }
            return true;
        },
        //3.检查生日是否正确
        checkBirthday: function (obj) {
            var len = obj.length;
            //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
            if (len == '15') {
                var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                var arr_data = obj.match(re_fifteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date('19' + year + '/' + month + '/' + day);
                return this.verifyBirthday('19' + year, month, day, birthday);
            }
            //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
            if (len == '18') {
                var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                var arr_data = obj.match(re_eighteen);
                var year = arr_data[2];
                var month = arr_data[3];
                var day = arr_data[4];
                var birthday = new Date(year + '/' + month + '/' + day);
                return this.verifyBirthday(year, month, day, birthday);
            }
            return false;
        },
        // 3.1 校验日期
        verifyBirthday: function (year, month, day, birthday) {
            var now = new Date();
            var now_year = now.getFullYear();
            //年月日是否合理
            if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                //判断年份的范围（3岁到100岁之间)
                var time = now_year - year;
                if (time >= 0 && time <= 130) {
                    return true;
                }
                return false;
            }
            return false;
        },
        //4.校验位的检测
        checkParity: function (obj) {
            //15位转18位
            obj = this.changeFivteenToEighteen(obj);
            var len = obj.length;
            if (len == '18') {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0,
                    i, valnum;
                for (i = 0; i < 17; i++) {

                    cardTemp += obj.substr(i, 1) * arrInt[i];
                    // console.log(cardTemp + "" + i)
                }
                valnum = arrCh[cardTemp % 11];
                if (valnum == obj.substr(17, 1)) {
                    return true;
                }
                return false;
            }
            return false;
        },
        //4.1 15位转18位身份证号
        changeFivteenToEighteen: function (obj) {
            if (obj.length == '15') {
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardTemp = 0,
                    i;
                obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);
                for (i = 0; i < 17; i++) {
                    cardTemp += obj.substr(i, 1) * arrInt[i];
                }
                obj += arrCh[cardTemp % 11];
                return obj;
            }
            return obj;
        },
        init: function (obj) { //字符串
            //校验长度，类型
            if (this.isCardNo(obj) === false) {
                return false;
            }
            //检查省份
            if (this.checkProvince(obj) === false) {
                return false;
            }
            //校验生日
            if (this.checkBirthday(obj) === false) {
                return false;
            }
            //检验位的检测
            if (this.checkParity(obj) === false) {
                return false;
            }
            return true;
        }
    },

    /*检验邮箱*/
    checkEmail: function (str) {
        if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str)) {
            return true
        } else {
            return false
        }
    },

    /*检验手机*/
    checkPhone: function (str) {
        if (/^1[3-9]\d{9}$/.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    /*检验座机电话*/
    checkTelephone: function (str) {
        if (/(^0\d{2}-\d{8}$)|(^0\d{3}-\d{7}$)/.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    /*验证18位营业执照*/
    checkTradingCertificate: function (code) {
        var reg = /^([0-9ABCDEFGHJKLMNPQRTUWXY]{2})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY]{1})$/;
        if (code.length != 18 || reg.test(code) == false) {
            return false;
        }
        /*验证第18位*/
        //不用I、O、S、V、Z
        var str = '0123456789ABCDEFGHJKLMNPQRTUWXY',
            ws = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28],
            codes = [],
            i, sum = 0,
            index, c18;

        codes[0] = code.slice(0, code.length - 1);
        codes[1] = code.slice(code.length - 1, code.length);

        for (i = 0; i < 17; i++) {
            sum += str.indexOf(codes[0].charAt(i)) * ws[i];
        }

        index = 31 - (sum % 31);
        index == 31 && (index = 0);

        /*18位*/
        c18 = str.charAt(index);

        return c18 == codes[1];
    },

    /*检验正确的数字 */
    //不限制小数位数
    checkRealNum: function (str) {
        var reg = /(^[1-9]\d*(\.\d+)?$)|(^0(\.\d+)?$)/;
        if (reg.test(str)) {
            return true
        } else {
            return false
        }
    },

    //允许保留1位小数
    checkRealNumOne: function (str) {
        var reg = /(^[1-9]\d*(\.\d)?$)|(^0(\.\d)?$)/;
        if (reg.test(str)) {
            return true
        } else {
            return false
        }
    },

    //允许保留2位小数
    checkRealNumTwo: function (str) {
        var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        if (reg.test(str)) {
            return true
        } else {
            return false
        }
    }
}