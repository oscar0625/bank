(function (name, factory) {
    var hasDefine = typeof define === 'function',
        hasExports = typeof moudle !== 'undefined' && moudle.exports;
    if (hasDefine) {
        define(factory)
    } else if (hasExports) {
        moudle.exports = factory();
    } else {
        window[name] = factory();
    }
})('Universe', function () {
    "use strict";

    function isDom(obj) {
        return (typeof HTMLElement === 'object') ?
            (obj instanceof HTMLElement) :
            (obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName ===
                'string');
    };

    function isColor(color) {
        var re1 = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
            re2 = /^rgb\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i,
            re3 = /^rgba\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,(1|1.0|0.[0-9])\)$/i;
        return re2.test(color) || re1.test(color) || re3.test(color);
    }

    function hexToRgb(hex) {

        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

        hex = hex.replace(shorthandRegex, function (m, r, g, b) {

            return r + r + g + g + b + b;

        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {

            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)

        } : null;

    };

    function preloadImg(url, callback) {
        var img = new Image();

        img.src = url;

        if (img.complete) {
            callback(img);
        } else {
            img.onload = function () {
                callback(img);
                img.onload = null;
            };
        }
    }

    function throttle(fn, delay, time) {
        var timer,
            previous;
        return function () {
            var current = new Date(),
                context = this,
                args = arguments;
            //如果时间间隔大于等于指定的时间 或 第一次则必须执行
            if ((!previous) || current - previous >= time) {
                fn.apply(context, args);
                previous = current;
            } else {
                //否则 延时执行
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        }
    }

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }

        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * @class
     * @description 星空背景
     * @param {object} option 所有参数的集合
     * @param {object} option.ele dom对象 必填
     * @param {number} option.starNumber 星星数量
     * @param {number} option.starColor 星星基础色调 hex格式
     * @param {array} option.starSize 星星的尺寸范围 默认[1,10]
     * @param {array} option.starSpeed 星星的旋转速度的范围 默认[1,50]
     * @param {string} option.background  背景支持颜色和图片路径 默认黑色
     * @example
     *  var uni = new Universe({
                ele: document.getElementById('starrySky'),
                starSize: [1, 10],
                starSpeed: [1, 50],
                background: '#000'
            }),
            animation = function () {
                uni.draw();
                window.requestAnimationFrame(animation);
            };
        animation();
     * 
     */
    function Universe(option) {
        var option = Object.assign({
            starNumber: 1000,
            starColor: '#fff',
            starSize: [1, 10],
            starSpeed: [1, 50],
            background: '#000'
        }, option);
        if (!isDom(option.ele)) {
            throw new Error('ele参数应为一个dom元素');
        }
        this.canvas = document.createElement('canvas');
        option.ele.appendChild(this.canvas);

        this.ele = option.ele;
        this.width = this.canvas.width = this.ele.clientWidth;
        this.height = this.canvas.height = this.ele.clientHeight;
        this.ps = this.canvas.getContext('2d');

        //星空背景
        this.background = option.background;
        //星星基础色调
        this.starColor = hexToRgb(option.starColor);
        //星星数量
        this.starNumber = option.starNumber;
        //星星的尺寸范围
        this.starSize = option.starSize;
        //星星的旋转速度的范围
        this.starSpeed = option.starSpeed;
        //单个星星的canvas模板
        this.starCVS = this._createStarCVS();
        //根据数量创建星星
        this.stars = this._createStars();

        //监听窗口变化
        window.addEventListener('resize', throttle(function () {
            this.resize()
        }.bind(this), 500, 1000));
    }

    Universe.prototype._createStarCVS = function () {
        var cvs = document.createElement('canvas'),
            ps = cvs.getContext('2d'),
            long = 100,
            radius = long / 2;
        cvs.width = long;
        cvs.height = long;

        var radialGradient = ps.createRadialGradient(radius, radius, 0, radius, radius, radius);
        radialGradient.addColorStop(0, '#ffffff');
        radialGradient.addColorStop(0.25, 'rgba(' + this.starColor.r + ',' + this.starColor.g + ',' + this.starColor.b + ',0.8)');
        radialGradient.addColorStop(0.5, 'rgba(' + this.starColor.r + ',' + this.starColor.g + ',' + this.starColor.b + ',0.5)');
        radialGradient.addColorStop(0.75, 'rgba(' + this.starColor.r + ',' + this.starColor.g + ',' + this.starColor.b + ',0.2)');
        radialGradient.addColorStop(1, 'transparent');
        ps.fillStyle = radialGradient;

        ps.beginPath();
        ps.arc(radius, radius, radius, 0, Math.PI * 2);
        ps.fill();

        return cvs
    }

    Universe.prototype._createStars = function () {
        var arr = [];
        for (var i = 0; i < this.starNumber; i++) {
            var star = new Star({
                ps: this.ps,
                width: this.width,
                height: this.height,
                starCVS: this.starCVS,
                starSize: this.starSize,
                starSpeed: this.starSpeed
            });
            star.draw()
            arr.push(star);
        }
        return arr;
    }

    Universe.prototype.resize = function () {
        this.width = this.canvas.width = this.ele.clientWidth;
        this.height = this.canvas.height = this.ele.clientHeight;
        //重新根据数量创建星星
        this.stars = this._createStars();
    }

    Universe.prototype.draw = function () {
        //尾巴效果核心代码
        this.ps.globalCompositeOperation = 'source-over';
        this.ps.globalAlpha = 0.5;
        //背景是颜色
        if (isColor(this.background)) {
            this.ps.fillStyle = this.background;
            this.ps.fillRect(0, 0, this.width, this.height);
        } else {
            //背景是图片
            preloadImg(this.background, function (img) {
                this.ps.drawImage(img, 0, 0, this.width, this.height);
            }.bind(this));
        }
        //尾巴效果核心代码
        this.ps.globalCompositeOperation = 'lighter';
        for (var i = 1, l = this.stars.length; i < l; i++) {
            this.stars[i].draw();
        };
    }

    function Star(option) {
        this.ps = option.ps;
        this.universeX = option.width / 2; //所在星空的圆心
        this.universeY = option.height / 2; //所在星空的圆心
        //当前星星所处星空的轨道半径
        this.universeRadius = random(Math.max(option.width, option.height) / 2 * Math.sqrt(2));
        //单个星星的canvas模板
        this.starCVS = option.starCVS;
        //星星大小
        this.radius = random(option.starSize[0], option.starSize[1]);
        //星星初始位置的角度
        this.initAngle = random(360) * Math.PI / 180;
        //星星每次移动的角度
        this.speedAngle = random(option.starSpeed[0], option.starSpeed[1]) / 100 * Math.PI / 180;
        //星星的透明度
        this.alpha = random(1, 10) / 10;
    }

    Star.prototype.draw = function () {
        var x = Math.sin(this.initAngle) * this.universeRadius + this.universeX,
            y = Math.cos(this.initAngle) * this.universeRadius + this.universeY,
            twinkle = random(3);

        if (twinkle === 0 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 1 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        this.ps.globalAlpha = this.alpha;
        this.ps.drawImage(this.starCVS, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);

        //旋转
        this.initAngle += this.speedAngle;
    }
    return Universe;
});