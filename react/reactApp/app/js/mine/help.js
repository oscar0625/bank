/**
 * Created by Administrator on 2017/3/25.
 */
import React from "react";
import Activity from "../index/component/c/activity.js";
import "./component/y/css/help.less"

class Help extends React.Component{
    render(){
        return(
            <div>
                <Activity title="帮助"/>
                <div className="y-help-con">
                    <ul>
                        <li><a className="y-help-list">功能介绍</a></li>
                        <li><a className="y-help-list">常见问题</a></li>
                        <li><a className="y-help-list">成长值记录与详情</a></li>
                        <li><a className="y-help-list">loveliness认证说明</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Help