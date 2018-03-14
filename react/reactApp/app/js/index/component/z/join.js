import React from "react";
import GrilOne from "./img/z_girl01.png";
import  XS from "./img/z_xiangshui.png";
import {Link} from 'react-router';
import RemarkList from "./remarkList";
import "./css/join.less";
export default class Info extends React.Component {
    constructor() {
        super();
        this.state = {
            guanZhu: false,
            touchXin:false
        }
    }
    render(){
        return (
            <div className="z_join">
                <div className="head"></div>
                    {this.getInfo()}
                    <div className="z_joinF">
                        <div className="clearfix z_p">
                            <p className="z_p1"><span>9天前</span><span>3120</span></p>
                            <p className="z_p2"><a><span>30</span></a><span onTouchStart={this.xin.bind(this)} className={this.state.touchXin?"new":"old"}>500</span></p>
                        </div>
                        <RemarkList bj="yXW"/>
                        <RemarkList bj="xX"/>
                        <RemarkList bj="rE"/>
                    </div>
                </div>

        )
    }
    touchGZ() {this.setState({guanZhu: !this.state.guanZhu})}
    xin(){this.setState({touchXin: !this.state.touchXin})}
    getInfo() {
        var obj = {
            "yXW": {icon: GrilOne, img: XS, name: "Another", gz: "2月1日5:21", fs: "217粉丝",}
        };
        var styleObj = {color: "red", fontSize: "18px"};
        return (
            <div>
                <ul className="z_joinInfo">
                    <li>
                        <Link to={`/blogger`} className="join_a1"><img src={obj[this.props.join].icon} alt=""/></Link>
                        <div className="clearfix ">
                            <div className="join_span1">
                                <p>{obj[this.props.join].name}</p>
                                <span >{obj[this.props.join].gz}</span>
                                <p>{obj[this.props.join].fs}</p>
                            </div>
                        </div>
                        <a className="join_a2"><img src={obj[this.props.join].img} alt=""/></a>
                        <p className="beautify">美丽的一天</p>
                    </li>
                </ul>
            </div>
        )
    }
}
