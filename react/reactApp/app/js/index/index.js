import React from 'react';
import {Link} from 'react-router';
import Nav from './component/c/nav';
import Swiper from './component/l/swiper';
import Bottom from './component/l/bottom';
import ClearBottom from './component/l/clearBottom';
import Info from './component/z/info';
import '../../css/index/index.less';
import Heart from '../../img/xin.png'
export default class Index extends React.Component{
    render(){
        return(
            <div className="container">
                <Nav type="1"/>
                <div className="jl"></div>
                <div className="banner">
                    <div className="b1"></div>
                    <div className="b2"></div>
                    <div className="b3"><Swiper /></div>
                </div>
                <div className="nav">
                    <div className="wrap">
                        <ul className="clearfix">
                            <li>
                                <Link to={`/featureArticle`} style={{display:'block'}}>
                                    精选文章
                                </Link>
                            </li>
                            <li>
                                <Link to={`/recommend`} style={{display:'block'}}>
                                    活动推荐
                                </Link>
                            </li>
                            <li>
                                <Link to={`/date`} style={{display:'block'}}>
                                    每日一签
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="action-father">
                    <div className="action clearfix">
                        <img src={Heart} alt=""/>
                        <p>活动专题</p>
                        <img src={Heart} alt=""/>
                    </div>
                </div>
                <Info  info="yXW"/>
                <Bottom active="1"/>
                <ClearBottom />
            </div>
        )
    }
}
