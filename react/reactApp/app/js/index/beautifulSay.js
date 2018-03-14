import React from 'react';
import {Link} from 'react-router';
import "../../css/index/beautifulSay.less";
import Nav from './component/c/nav';
import Bottom from './component/l/bottom';
import ClearBottom from './component/l/clearBottom';
import $ from "jquery";
import Pic_1 from "../../img/pic_1.png";
import Pic_2 from "../../img/pic_2.png";
import Pic_3 from "../../img/pic_3.png";
import Pic_4 from "../../img/pic_4.png";
import Pic_5 from "../../img/pic_5.png";
import Pic_6 from "../../img/pic_6.png";


export default class BeautifulSay extends React.Component{
    changeTab($event){
        var self = $($event.target);
        self.addClass('red').siblings().removeClass('red');
        if(self.index()==0){
            $(".pre").addClass('show').siblings().removeClass('show');
        }else if(self.index()==1){
            $(".next").addClass('show').siblings().removeClass('show');
        }
    }
    render(){
        return(
            <div>
                <Nav type="2"/>
            <div className="c-header wrap">
                <div className="pink-bg"></div>
                <ul>
                    <li onClick={this.changeTab.bind(this)} className="red">美丽视频</li>
                    <li onClick={this.changeTab.bind(this)}>女神日记</li>
                </ul>
                <div className="c-txtbox pre show">
                    <Link to={`/indexVideo`} className="c-txtimg">
                        <img src={Pic_1} />
                        <p>今日推荐 | <span className="c-title">底妆全靠它 春日幻彩</span></p>
                    </Link>
                    <Link to={`/indexVideo`} className="c-txtimg">
                        <img src={Pic_2} />
                        <p>今日推荐 | <span className="c-title">女生必备—67KINSD</span></p>
                    </Link>
                    <Link to={`/indexVideo`} className="c-txtimg">
                        <img src={Pic_3} />
                        <p>今日推荐 | <span className="c-title">底妆全靠它 春日幻彩</span></p>
                    </Link>
                </div>
                <div className="c-txtbox next">
                    <Link to={`/article`} className="c-txtimg">
                        <img src={Pic_4} />
                        <p>今日推荐 底妆全靠它 春日幻彩</p>
                    </Link>
                    <Link to={`/article`} className="c-txtimg">
                        <img src={Pic_5} />
                        <p>今日推荐 底妆全靠它 春日幻彩</p>
                    </Link>
                    <Link to={`/article`} className="c-txtimg">
                        <img src={Pic_6} />
                        <p>今日推荐 底妆全靠它 春日幻彩</p>
                    </Link>
                </div>
            </div>
                <Bottom active="1"/>
                <ClearBottom />
            </div>
        )
    }
}