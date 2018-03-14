import React from "react";
import OtherLogin from "./component/y/otherlogin.js";
import LoginLogo from  "./component/y/img/login_logo.png";
import $ from "jquery";
import "./component/y/css/login.less";
import {Link} from "react-router";

class Login extends React.Component{
    constructor(){
     super();
        this.state={
            zt:false
        }
    }
    change(e){
        var self=$(e.target);
        self.parent().prev().addClass("y-on");
        $(".y-login-btn").html("登录");
        self.val("");
    }
    remove(e){
        var self=$(e.target);
        self.parent().prev().removeClass("y-on");
    }
    login(){

        var userval=$(".y-user input").val();
        var pwdval=$(".y-pwd input").val();

        if(/^(13|15|18|17|14)[0-9]{9}$/.test(userval)&&/^\S{6,16}$/.test(pwdval)){

            localStorage.setItem('userName',userval);
            localStorage.setItem('password',pwdval);
            this.setState({
                zt:true
            })
        }else{
            $(".y-login-btn").html("登录失败");
            return false;
        }

    }
    render(){
        return(
            <div>
                <div className="y-login-logo">
                    <img src={LoginLogo} alt=""/>
                </div>
                <div className="y-login-form">
                    <form action=""
                          onFocus ={this.change}
                          onBlur={this.remove}>
                        <div className="y-login-user clearfix">
                           <div className="y-user-icon">&#xe636;</div>
                            <div className="y-user">
                                <input type="text" placeholder="登录" onBlur={this.login.bind(this)}/>
                            </div>
                        </div>
                        <div className="y-login-pwd clearfix">
                            <div className="y-pwd-icon">&#xe652;</div>
                            <div className="y-pwd">
                                <input type="password" placeholder="密码" onBlur={this.login.bind(this)}/>
                            </div>
                        </div>
                    </form>
                </div>
                {
                    this.state.zt
                        ?
                        <Link to={`/setting`} className="y-login-btn" >登录</Link>
                        :
                        <a className="y-login-btn" >登录</a>


                }
                <div className="y-login-forget">
                    <a>忘记密码？</a>
                    <span>|</span>
                    <Link to={`/register`} >立即注册 &gt;</Link>
                </div>
               <OtherLogin/>
            </div>
        )
    }
}
export default Login
