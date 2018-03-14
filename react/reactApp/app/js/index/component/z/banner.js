import React from 'react';
import {Link} from 'react-router';
import GrilOne from "./img/z_girl01.png";
import  XS from "./img/z_xiangshui.png";
import RemarkList from "./remarkList";
import "./css/banner.less";
export default class Banner extends React.Component {
    constructor() {
        super();
        this.state = {
            guanZhu: false,
            touchXin:false
        }
    }
    render() {
        return (
            <div className="z_banner">
                <div className="z_top"></div>
                <div className="z_header">
                    {this.getInfo()}
                    <div className="z_bannerF">
                        <div className="clearfix z_p">
                            <p className="z_p1"><span>9天前</span><span>3120</span></p>
                            <p className="z_p2"><a><span>30</span></a><span onTouchStart={this.xin.bind(this)} className={this.state.touchXin?"new":"old"}>500</span></p>
                        </div>
                        <RemarkList bj="yXW"/>
                        <RemarkList bj="xX"/>
                        <RemarkList bj="rE"/>
                    </div>
                    <div className="pinglun">
                        <Link to={`/allCommon`}>
                            查看全部评论
                        </Link>
                    </div>
                    <div className="send">
                        <input type="text" />
                    </div>
                </div>
            </div>
        )
    }
    touchGZ() {
        this.setState({
            guanZhu: !this.state.guanZhu
        })
    }
    xin(){
        this.setState({
            touchXin: !this.state.touchXin
        })
    }
    getInfo() {
        var obj = {
            "yXW": {icon: GrilOne, img: XS, name: "Another", gz: "关注ta", fs: "217粉丝", ygz: "已关注"}
        };
        return (
            //obj[this.props.banner].ygz
            <div>
                <ul className="z_bannerInfo">
                    <li>
                        <Link to={`/blogger`} className="banner_a1"><img src={obj[this.props.banner].icon} alt=""/></Link>
                        <div className="clearfix ">
                            <div className="banner_span1">
                                <p>{obj[this.props.banner].name}</p>
                                <p>{obj[this.props.banner].fs}</p>
                            </div>
                            <p className="banner_span2 " id={this.state.guanZhu?'change':''} onTouchStart={this.touchGZ.bind(this)}>
                                <span >
                                    {this.state.guanZhu?obj[this.props.banner].ygz:obj[this.props.banner].gz}</span>
                                {/*{console.log(this.state.guanZhu)}*/}
                            </p>
                        </div>
                        <a className="banner_a2"><img src={obj[this.props.banner].img} alt=""/>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

}
