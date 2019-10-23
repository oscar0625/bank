/*
 * 本次设计主拖动，次滑动
 * 一定会发生拖动事件   滑动要看鼠标速度是否够快
 * 并不能单独做为滑动事件使用
 * 注意：ele最好不要占用全屏
 * 
 * */
function DragAndSlide(obj) {
    this.ele = obj.ele || document; //目标元素
    this.limit = obj.limit || 0.1; //触发滑动的临界速度
    this.maxSpeed = obj.maxSpeed || 100; //运行的极限速度
    this.dragRight = obj.dragRight; //右拖动回调函数
    this.dragLeft = obj.dragLeft; //左拖动回调函数
    this.slideRight = obj.slideRight; //左滑动回调函数
    this.slideLeft = obj.slideLeft; //右滑动回调函数
    this._down();
    this._move();
    this._up();
    this._leave();
    this._state = [];

}
DragAndSlide.prototype = {
    _down: function () {
        var self = this;
        //触摸
        this.ele.addEventListener('touchstart', function (e) {
            var time = new Date();
            self._state.push({
                x: e.changedTouches[0].clientX,
                time: time
            });
        });
        //鼠标
        this.ele.addEventListener('mousedown', function (e) {
            var time = new Date();
            self._state.push({
                x: e.clientX,
                time: time
            });
        });
    },
    _move: function () {
        var self = this;
        //触摸
        this.ele.addEventListener('touchmove', function (e) {
            if (self._state.length === 0) return;
            //本次的时间
            var time = new Date();
            //本次之前的上一次的状态对象
            var prevObj = self._state[self._state.length - 1];
            if (e.changedTouches[0].clientX > prevObj.x) {
                //执行向右拖动事件
                self._dragRight();
            } else if (e.changedTouches[0].clientX < prevObj.x) {
                //执行向右拖动事件
                self._dragLeft();
            }
            self._state.push({
                x: e.changedTouches[0].clientX,
                time: time
            });
        });
        //鼠标
        this.ele.addEventListener('mousemove', function (e) {
            if (self._state.length === 0) return;
            //本次的时间
            var time = new Date();
            //本次之前的上一次的状态对象
            var prevObj = self._state[self._state.length - 1];
            if (e.clientX > prevObj.x) {
                //执行向右拖动事件
                self._dragRight();
            } else if (e.clientX < prevObj.x) {
                //执行向右拖动事件
                self._dragLeft();
            }
            self._state.push({
                x: e.clientX,
                time: time
            });
        })
    },
    _up: function () {
        var self = this;
        //触摸
        this.ele.addEventListener('touchend', function (e) {
            //抬起时判断是否执行滑动事件
            var time = new Date();
            self._isSlide({
                time: time
            });
            self._state = [];
        });
        //鼠标
        this.ele.addEventListener('mouseup', function (e) {
            //抬起时判断是否执行滑动事件
            var time = new Date();
            self._isSlide({
                time: time
            });
            self._state = [];
        })
    },
    _leave: function () {
        var self = this;
        //触摸
        this.ele.addEventListener('touchcancel', function (e) {
            //离开时判断是否执行滑动事件
            var time = new Date();
            self._isSlide({
                time: time
            });
            self._state = [];
        });
        //鼠标
        this.ele.addEventListener('mouseleave', function (e) {
            //离开时判断是否执行滑动事件
            var time = new Date();
            self._isSlide({
                time: time
            });
            self._state = [];
        });
    },
    //判断是否执行滑动事件
    _isSlide: function (obj) {
        if (this._state.length < 2) return;
        var secondLast = this._state[this._state.length - 2];
        var last = this._state[this._state.length - 1];
        var time = obj.time - last.time;
        //停留时间短 执行滑动事件
        if (time < 200) {
            var speed = (last.x - secondLast.x) / (last.time - secondLast.time);
            //速度够快 执行滑动事件
            if (Math.abs(speed) > this.limit) {
                if (speed > 0) {
                    this._slideRight(speed);
                } else {
                    this._slideLeft(speed);
                }
            }
        }

    },
    //向右滑动事件
    _slideRight: function (speed) {
        if (typeof this.slideRight == 'function') {
            var params = Math.abs(speed) > this.maxSpeed ? this.maxSpeed : Math.abs(speed); //因为肯能涉及到 Infinity 的情况
            this.slideRight(params);
        }
    },
    //向左滑动事件
    _slideLeft: function (speed) {
        if (typeof this.slideLeft == 'function') {
            var params = Math.abs(speed) > this.maxSpeed ? this.maxSpeed : Math.abs(speed); //因为肯能涉及到 Infinity 的情况
            this.slideLeft(params);
        }
    },
    //向右拖动事件
    _dragRight: function () {
        if (typeof this.dragRight == 'function') this.dragRight();
    },

    //向左拖动事件
    _dragLeft: function () {
        if (typeof this.dragLeft == 'function') this.dragLeft();
    }

};