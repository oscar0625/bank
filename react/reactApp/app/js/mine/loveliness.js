import React from "react";
import "./component/z/css/loveliness.less";
import Logo from  "./component/z/img/logo.png";
import Activity from '../index/component/c/activity'
export default class LoveLiness extends React.Component{
    render(){
        return(
                <div>
                    <Activity  title="loveliness"/>
                    <div className="z_loveliness">
                            <p>关于loveliness</p>
                            <div>
                                <img src={Logo} />
                                <p>当前版本:V1.0.0版</p>
                            </div>
                        <ul>
                            <li>分享给朋友</li>
                            <li>免责声明</li>
                        </ul>
                    </div>
                </div>
        )
    }
}