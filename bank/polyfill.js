(function () {
    //Array.isArray() ie9+
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    //Array.map() ie9+ 有返回值 所有的返回值集合成一个新的数组
    if (!Array.prototype.map) {
        Array.prototype.map = function (callback, thisArg) {

            var T, A, k;

            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }

            // 1. 将O赋值为调用map方法的数组.
            var O = Object(this);

            // 2.将len赋值为数组O的长度.
            var len = O.length >>> 0;

            // 3.如果callback不是函数,则抛出TypeError异常.
            if (Object.prototype.toString.call(callback) != "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }

            // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
            if (thisArg) {
                T = thisArg;
            }

            // 5. 创建新数组A,长度为原数组O长度len
            A = new Array(len);

            // 6. 将k赋值为0
            k = 0;

            // 7. 当 k < len 时,执行循环.
            while (k < len) {

                var kValue, mappedValue;

                //遍历O,k为原数组索引
                if (k in O) {

                    //kValue为索引k对应的值.
                    kValue = O[k];

                    // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
                    mappedValue = callback.call(T, kValue, k, O);

                    // 返回值添加到新数组A中.
                    A[k] = mappedValue;
                }
                // k自增1
                k++;
            }

            // 8. 返回新数组A
            return A;
        };
    }

    //Array.forEach() ie9+ 无返回值
    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            var O = Object(this);

            var len = O.length >>> 0;


            if (typeof callback !== "function") {
                throw new TypeError(callback + ' is not a function');
            }


            if (arguments.length > 1) {
                T = thisArg;
            }

            k = 0;

            while (k < len) {

                var kValue;

                if (k in O) {


                    kValue = O[k];


                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

    //Array.filter() ie9+ 过滤 返回一个通过测试的元素的数组，没有通过返回空数组    
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /* , thisArg*/ ) {
            "use strict";

            if (this === void 0 || this === null)
                throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
                throw new TypeError();

            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];

                    if (fun.call(thisArg, val, i, t))
                        res.push(val);
                }
            }

            return res;
        };
    }

    //Array.every() ie9+  测试数组的所有元素是否都通过了指定函数的测试 只要有一个不满足就跳出循环 返回false  如果全对 返回true
    if (!Array.prototype.every) {
        Array.prototype.every = function (fun /*, thisArg */ ) {
            'use strict';

            if (this === void 0 || this === null)
                throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== 'function')
                throw new TypeError();

            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t && !fun.call(thisArg, t[i], i, t))
                    return false;
            }

            return true;
        };
    }

    //Array.some()  ie9+ 测试数组中的某些元素是否通过了指定函数的测试 只要有一个满足就跳出循环 返回true 如果全错返回false 
    if (!Array.prototype.some) {
        Array.prototype.some = function (fun /*, thisArg*/ ) {
            'use strict';

            if (this == null) {
                throw new TypeError('Array.prototype.some called on null or undefined');
            }

            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;

            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(thisArg, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

})()