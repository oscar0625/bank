import React from "react";
import {Link} from 'react-router';
import Activity from './component/c/activity';
import Insert from './component/l/insert';
import Img from '../../img/z_xiangshui.png'
import '../../css/index/recommend.less'
export default class HuoDongTuiJian extends React.Component{
    render(){
        return (
            <div>
                <Activity title="活动推荐"/>
                <div className="l-jl"></div>
                <Insert />
                <div className="l-top">
                    <Link to={`/article`}>
                        <img src={Img} alt=""/>
                    </Link>
                </div>
                <div className="l-juli"></div>
                <div className="l-top">
                    <Link to={`/article`}>
                         <img src={Img} alt=""/>
                    </Link>
                </div>
            </div>
        )
    }
}
