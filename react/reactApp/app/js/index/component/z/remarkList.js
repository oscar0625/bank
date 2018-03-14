import React from 'react';
import Gril from "./img/z_girl.png";
import GrilOne from "./img/z_girl01.png";
import "./css/banner.css";
export default class RemarkList extends React.Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                {this.getRemark()}
            </div>

        )

    }

    getRemark() {
        var obj = {
            "yXW": {icon: Gril, name: "悦小舞", content: "大爱楼主推荐,赞赞赞", time: "20分钟前"},
            "xX": {icon: GrilOne, name: "小小", content: "喜欢这个产品", time: "22分钟前"},
            "rE": {icon: Gril, name: "悦小舞", content: "大爱楼主推荐,赞赞赞", time: "20分钟前"},
            "jJ": {icon: GrilOne, name: "小小", content: "喜欢这个产品", time: "22分钟前"}
        };
        return (
            <div className="z_bannerMark">
                <ul>
                    <li className="clearfix">
                        <a href="#"><img src={obj[this.props.bj].icon} alt=""/></a>
                        <div className="detail">
                            <div className="clearfix">
                                <div className="mark_p">
                                    <p>{obj[this.props.bj].name}</p>
                                    <p>{obj[this.props.bj].content}</p>
                                </div>
                                <p className="time">{obj[this.props.bj].time}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        )
    }


}
