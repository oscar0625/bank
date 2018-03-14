import React from "react";
import Activity from "../index/component/c/activity.js";
import OtherLogin from  "./component/y/otherlogin.js";
import "./component/y/css/phonebind.less";
import $ from "jquery"


class PhoneBind extends React.Component{

    change(e){
        var self=$(e.target);
       self.prev().addClass("on");
    }
    remove(e){
        var self=$(e.target);
        self.prev().removeClass("on");
    }
    send(){
        var text="获取验证码"
        var time=60;
        setInterval(function () {
          if(time==1){
              time=1;
              $(".y-yzm-get").html(text)
          }else {
              time-=1
          }
            $(".y-yzm-get").html(time+"s")
        },1000);

    }
    render(){
        return(
            <div>
                <Activity/>
                <h4 className="y-phonebind-title">绑定手机号，获得更周全的服务</h4>
                <form action="" className="y-phonebind-form"
                      onFocus ={this.change.bind(this)}
                      onBlur={this.remove.bind(this)}>
                    <div className="y-phonebind-text">
                    <div  className="y-phone clearfix">
                        <span>手机号</span>
                        <input type="text"/>
                    </div>
                    <div className="y-yzm clearfix">
                        <span >验证码</span>
                        <input type="text"/>
                        <div className="y-yzm-get"><a onTouchStart={this.send.bind(this)} href="javascript:;">获取验证码</a></div>
                    </div>
                </div>
                </form>
                <a className="y-phonebind-btn">提交</a>
                    <p className="y-tree">绑定第三方</p>
                <OtherLogin/>
            </div>
        )
    }
}

export default PhoneBind