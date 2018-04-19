define(function () {
    function Pagination(obj) {
        'user strict';
        var myObj = {
            target: '#oscarPagination', //容器盒子id值
            lastPage: 20,  //最后一页的页码
            currentPage: 1, //初始页
            maxPage: 10, //当前可见最多页码个数
            activeClass: 'o_active',//激活时的类名
            disabledClass: 'o_disabled',//到头的类名
            callback: function (index) {
                console.log(index)
            },
            paginationOnLoad: function (index) {
                console.log('分页加载完成')
            }
        }, i;
        for (i in obj) {
            myObj[i] = obj[i];
        }
        this.target = typeof myObj.target ==='string'?document.querySelector(myObj.target):myObj.target;
        this.lastPage = myObj.lastPage;
        if((typeof this.lastPage) !== 'number'){console.error('参数lastPage错误');return};
        this.currentPage = myObj.currentPage;
        this.maxPage = myObj.maxPage;
        this.activeClass = myObj.activeClass;
        this.disabledClass = myObj.disabledClass;
        this.paginationOnLoad = myObj.paginationOnLoad;
        this.callback = myObj.callback;
        this.mTop = myObj.mTop;

        this._init();
    }
    Pagination.prototype._init = function () {
        /*如果就一页不显示分页*/
        if (this.lastPage == 1) {
            this.target.style = 'display:none'
        } else {
            this.target.style = 'display:table'
        }
        this.target.className = 'oscarPagination ' + this.target.className; //加样式class名
        this.addEvent();
        this.createList();
        this.paginationOnLoad(this.currentPage);
    };
    Pagination.prototype._render = function () {
        this.createList();
        this.callback(this.currentPage);
        var z;
        if (this.mTop === z)return;
        document.body.scrollTop = this.mTop;
        document.documentElement.scrollTop = this.mTop;
    };
    Pagination.prototype.addEvent = function () {
        var self = this;
        this.target.onclick = function (e) {
            var e = e || window.event;
            var mb = e.target || e.srcElement;
            /*li事件*/
            if (mb.nodeName === 'LI' && self.currentPage != mb.innerText) {
                self.currentPage = +mb.innerText;
                self._render();
            }
            /*其他事件*/
            else if (mb.className == 'prev' && self.currentPage != 1) {
                --self.currentPage;
                self._render();
            }
            else if (mb.className == 'next' && self.currentPage != self.lastPage) {
                ++self.currentPage;
                self._render();
            }
            else if (mb.className == 'prevest' && self.currentPage != 1) {
                self.currentPage = 1;
                self._render();
            }
            else if (mb.className == 'nextest' && self.currentPage != self.lastPage) {
                self.currentPage = self.lastPage;
                self._render();
            }
            else {
                return
            }
        };
    };
    Pagination.prototype.createList = function () {
        var count = this.lastPage;
        var currentPage = this.currentPage;
        var maxPage = this.maxPage;
        var arr = [];
        var strprev = currentPage == 1 ? '<span class="prevest ' + this.disabledClass + '">首页</span><span class="prev ' + this.disabledClass + '">&lt;&nbsp;上一页</span><ul class="clearfix">' : '<span class="prevest">首页</span><span class="prev">&lt;&nbsp;上一页</span><ul class="clearfix">';
        var strnext = currentPage == count ? '</ul> <span class="next ' + this.disabledClass + '">下一页&nbsp;&gt;</span><span class="nextest ' + this.disabledClass + '">末页</span>' : '</ul> <span class="next">下一页&nbsp;&gt;</span><span class="nextest">末页</span>';
        var str = '';
        for (var i = 1; i <= count; i++) {
            arr.push(i)
        }
        /*判断总数页码是多少 少的不用省略*/
        if (arr.length <= maxPage) {
            for (var j = 0, len = arr.length; j < len; j++) {
                arr[j] == currentPage ? str += "<li class='" + this.activeClass + "'>" + arr[j] + "</li>" : str += "<li>" + arr[j] + "</li>";
            }
        } else {
            var middle = Math.ceil(maxPage / 2);
            /*判断是钱几页还是后几页还是中间几页*/
            if (currentPage >= 1 && currentPage <= middle) {
                var arr1 = arr.splice(0, maxPage - 2);
                for (var k = 0, len1 = arr1.length; k < len1; k++) {
                    arr1[k] == currentPage ? str += "<li class='" + this.activeClass + "'>" + arr1[k] + "</li>" : str += "<li>" + arr1[k] + "</li>";
                }
                str += '<span>…</span><li>' + arr[arr.length - 1] + '</li>';
            } else if (currentPage <= count && currentPage >= count - middle + 1) {
                str += '<li>1</li><span>…</span>';
                var arr2 = arr.splice(arr.length - maxPage + 2, maxPage - 2);
                for (var l = 0, len2 = arr2.length; l < len2; l++) {
                    arr2[l] == currentPage ? str += "<li class='" + this.activeClass + "'>" + arr2[l] + "</li>" : str += "<li>" + arr2[l] + "</li>";
                }
            } else {
                str += '<li>1</li><span>…</span>';
                var arr3 = arr.splice(currentPage - 1 - Math.floor((maxPage - 4) / 2), maxPage - 4);
                for (var m = 0, len3 = arr3.length; m < len3; m++) {
                    arr3[m] == currentPage ? str += "<li class='" + this.activeClass + "'>" + arr3[m] + "</li>" : str += "<li>" + arr3[m] + "</li>";
                }
                str += '<span>…</span><li>' + arr[arr.length - 1] + '</li>';
            }
        }
        /*写入*/
        this.target.innerHTML = strprev + str + strnext;
    };
    return Pagination;
})
