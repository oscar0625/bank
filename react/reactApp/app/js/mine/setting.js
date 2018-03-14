import React from "react";
import Activity from "../index/component/c/activity.js";
import "./component/y/css/setting.less"
import {Link} from "react-router";

class Setting extends React.Component{
    constructor(){
        super();
        this.state={
            active:false
        }
    }
    change(){
        this.setState({active:!this.state.active})
    }
    out(){
        localStorage.removeItem('userName');
        localStorage.removeItem('password');
    }
    render(){
        return(
            <div>
                <Activity title="设置"/>
                <div className="y-setting-container wrap">
                    <div className="y-setting-con">
                    <ul >
                        <li className="y-setting-private">
                            <Link to={`/personStyle`} className="y-setting-list">
                                 个人资料
                            </Link>
                        </li>
                        <li className="y-setting-bind">
                            <Link to={`/phonebind`} className="y-setting-list">
                                绑定
                            </Link>
                        </li>
                        <li className="y-setting-adress">
                            <Link  to={`/address`} className="y-setting-list">
                                收货地址
                            </Link>
                        </li>
                        <li className="y-setting-clear">
                            <a className="y-setting-list">
                                清除缓存
                            </a>
                        </li>
                        <li className="y-setting-sm">
                            <a className="y-setting-list">
                                小屏模式（省高达70%流量）
                            </a>
                            <div className={this.state.active?"y-power-active":"y-power"}
                                 onTouchStart={this.change.bind(this)}
                                >
                                <div className={this.state.active?"y-power-on-active":"y-power-on"}
                                  ></div>
                            </div>
                        </li>
                        <li className="y-setting-put">
                            <a className="y-setting-list">
                                消息推送
                            </a>
                        </li>
                        <li className="y-setting-about">
                            <Link to={`/loveliness`} className="y-setting-list">
                                关于loveliness
                            </Link>
                        </li>
                        <li className="y-setting-help">
                            <Link to={`/help`} className="y-setting-list">
                                帮助
                            </Link>
                        </li>
                        <li className="y-setting-adv">
                            <Link to={`/indexChat/${'loveliness小助理'}`} className="y-setting-list">
                                意见反馈
                            </Link>
                        </li>
                    </ul>
                        <Link to={`/login`} className="y-setting-out"
                           onTouchEnd={this.out.bind(this)}
                        >退出登录</Link>
                    </div>

                </div>

            </div>
        )
    }
}
export default Setting