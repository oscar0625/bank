import React from 'react';
import "./component/y/css/blogger.less";
import {Link} from 'react-router';

import Icon from "./component/y/img/searchicon.png";
import Todayon from "./component/y/img/todayOn.png";
import Activity from './component/c/activity';
import $ from "jquery";
export default class Blogger extends React.Component{
    constructor(){
        super();
        this.state={
            liked:false
        }
    }

    chick(){
        this.setState({liked: !this.state.liked});
    }

    render(){
        var text = this.state.liked ? '已关注' : '关注';
        return (
            <div>
                <div className="blogger-head">
                    <Activity />
                </div>
                <div className="bloggerAuthor">
                    <div className="bloggerAuthor-icon">
                        <img src={Icon} alt=""/>
                    </div>
                    <p className="Author-name">Another</p>
                    <p className="Author-likes"><span>217</span>粉丝</p>
                    <div className="ychat">
                        <Link to={`/indexChat/${'小小'}`} >和ta聊天</Link>
                        <a onClick={this.chick.bind(this)} id={this.state.liked?"on":""}>{text}</a>
                    </div>
                </div>
                <div className="blogger-con wrap">
                    <a className="today-on-box">
                        <div className="today-on">
                            <img src={Todayon} alt=""/>
                            <p>今日推荐<i>|</i><span>底妆全靠它 春日幻彩</span></p>
                        </div>
                    </a>

                    <a className="today-on-box">
                        <div className="today-on">
                            <img src={Todayon} alt=""/>
                            <p>今日推荐<i>|</i><span>底妆全靠它 春日幻彩</span></p>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}