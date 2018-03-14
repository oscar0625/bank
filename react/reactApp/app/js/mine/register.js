import React from "react";
import OtherLogin from "./component/y/otherlogin.js";
import Goback from "./component/y/goback.js"
import "./component/y/css/register.less";
import $ from "jquery"
import {Link} from "react-router";
class Register extends React.Component{
    constructor(){
        super();
        this.state={
            zt:false
        }
    }

    change(e){
        var self=$(e.target);
        self.parent().prev().addClass("y-on");
        $(".y-register-btn").html("注册");
        self.val("");
    }
    remove(e){
        var self=$(e.target);
        self.parent().prev().removeClass("y-on");
    }



    getCode(){
        var str = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        var suiji="";
        for(var i=0;i<4;i++){
            var num = Math.floor(Math.random()*str.length);
            suiji= suiji+str[num];
        }
        $(".y-code-box").html(suiji)
    }

    chick(){

        var userval=$(".y-user input").val();
        var pwdval=$(".y-pwd input").val();
        var repwdval=$(".y-repwd input").val();
        var yzm=$(".y-code-text input").val();

        if(/^(13|15|18|17|14)[0-9]{9}$/.test(userval)&&/^\S{6,16}$/.test(pwdval)&&yzm== $(".y-code-box").html()&&repwdval==pwdval){

            this.setState({
                zt:true
            })

        }else{
            $(".y-register-btn").html("注册失败");
            return false;
        }

    }
    render(){
        return(
            <div>
                <Goback/>
                <div className="y-register-form">
                    <form action=""
                          onFocus ={this.change}
                          onBlur={this.remove}>

                        <div className="y-register-user clearfix">
                            <div className="y-register-icon">&#xe636;</div>
                            <div className="y-user">
                                <input type="text" placeholder="注册" onBlur={this.chick.bind(this)}/>
                            </div>
                        </div>

                        <div className="y-register-pwd clearfix">
                            <div className="y-pwd-icon">&#xe652;</div>
                            <div className="y-pwd">
                                <input type="text" placeholder="密码" onBlur={this.chick.bind(this)}/>
                            </div>
                        </div>

                        <div className="y-register-repwd clearfix">
                            <div className="y-repwd-icon">&#xe652;</div>
                            <div className="y-repwd">
                                <input type="text" placeholder="重新输入密码" onBlur={this.chick.bind(this)}/>
                            </div>
                        </div>
                    </form>
                    <div className="y-code">
                        <div className="y-code-text">
                            <input type="text" placeholder="请输入验证吗" onBlur={this.chick.bind(this)}/>
                            <span className="y-code-box"
                                  onClick={this.getCode}>4751</span>
                        </div>
                    </div>

                </div>
                {
                    this.state.zt
                    ?
                        <Link to={`/login`} className="y-register-btn" >注册</Link>
                    :
                        <a className="y-register-btn" >注册</a>

                }

            </div>
        )
    }

}
export default Register