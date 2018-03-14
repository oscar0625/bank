import React from 'react';
import MineHeader from "./component/c/mineHeader.js";
import Bottom from "../index/component/l/bottom.js";
import {Link} from "react-router";
import "../../css/mine/mineCon.less";
import MineIcon from "../../img/p_head1.png";

export default class Index extends React.Component{
    render(){
        return(
            <div>
                <MineHeader title="我的" icons="set" />

                <div className="c-mine">
                    <div className="c-pink-bg">
                        <div className="c-white-bg"></div>
                        <img src={MineIcon} />
                        <p className="c-user">Another</p>
                        <p className="c-info">Beautiful Lucky</p>
                        <div className="c-focus">
                            <Link to={`/focus`} >关注</Link>
                            <Link to={`/fans`} >粉丝</Link>
                        </div>
                    </div>
                    <div className="c-msg">
                        <Link to={`/message`}><i className="icon-msg"></i><span>消息</span></Link>
                        <Link to={`/collectors`} ><i className="icon-collect"></i><span>收藏</span></Link>
                        <Link to={`/date`} ><i className="icon-here"></i><span>签到</span></Link>
                    </div>
                </div>
                <Bottom active="4" />
            </div>
        )
    }
}
