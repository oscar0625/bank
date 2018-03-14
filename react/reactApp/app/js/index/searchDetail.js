import React from 'react';
import YSearch from "./component/y/ySelect.js";
import Activity from './component/c/activity';
import "./component/y/css/searchDetail.less";
import Icon from "./component/y/img/searchicon.png";
import $ from "jquery";
export default class SearchDetail extends React.Component{
    render(){
        return(
            <div>
                <Activity title="搜索"/>
                <YSearch/>
                <div className="SearchDetail-content">
                    <ul className="yOn">
                        <li>话题</li>
                        <li className="SearchDetail-content-li">产品</li>
                        <li>用户</li>
                    </ul>
                    <div className="SearchDetail-content-box">
                        <div className="SearchDetail-content-box-talk">
                            <a className="talk-con-btn">
                            <div className="talk-con clearfix">
                                <div className="talk-icon">
                                    <img src={Icon} alt=""/>
                                </div>
                                <div className="talk-text">
                                    <h4>护肤技巧</h4>
                                    <p>大量护肤小技巧等你来</p>
                                </div>
                            </div>
                            </a>
                            <a className="talk-con-btn">
                                <div className="talk-con clearfix">
                                    <div className="talk-icon">
                                        <img src={Icon} alt=""/>
                                    </div>
                                    <div className="talk-text">
                                        <h4>护肤技巧</h4>
                                        <p>大量护肤小技巧等你来</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}