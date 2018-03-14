import React from "react";
import "./component/z/css/personStyle.less";
import Girl from "./component/z/img/z_girl.png";
import Activity from '../index/component/c/activity'
export default class PersonStyle extends React.Component{
    render(){
        return(
            <div>
                <Activity  title="个人资料"/>
                <div className="z_personStyle">
                    <h3>完善个人资料可以获得10个成长值哦~</h3>
                    <div className="z_personStyle_container">
                        <ul>
                            <li>
                                <p>头像</p>
                                <p><img src={Girl} alt=""/></p>
                            </li>
                            <li>
                                <p>昵称</p>
                                <p>Another</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>性别</p>
                                <p>女</p>
                            </li>
                            <li>
                                <p>生日</p>
                                <p>生日惊喜 年年有</p>
                            </li>
                            <li>
                                <p>肤质</p>
                                <p>贴心内容推荐多</p>
                            </li>
                            <li>
                                <p>兴趣</p>
                                <p>选择你的兴趣</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>loveliness暗号</p>
                                <p>5552loveliness</p>
                            </li>
                            <li>
                                <p>注册时间</p>
                                <p>2017-2-20</p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

