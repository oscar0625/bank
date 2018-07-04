(function (name,factory) {var hasDefine=typeof define === 'function', hasExports=typeof moudle !=='undefined' && moudle.exports;if(hasDefine){define(factory)}else if(hasExports){moudle.exports=factory();}else {window[name]=factory();}
})('PreventClick',function () {
    "use strict";
    /**
     * 防止连续点击
     * @constructor
     */
    function PreventClick() {
        this._preventParam=true;
    };
    PreventClick.prototype.isPrevent=function (callback) {
      if(this._preventParam){
          this.changeParam();
          callback();
      }else {
          console.log('点击过快');
      }
    };
    PreventClick.prototype.changeParam=function () {
        this._preventParam=!this._preventParam;
    };
    return PreventClick;
});
