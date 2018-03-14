import React from 'react';
import Activity from '../index/component/c/activity'
import Find_6 from "../../img/find_top_4.png";
import FindInfo_1 from "../../img/find_3.png";
import FindInfo_2 from "../../img/find_4.png";
import FindInfo_3 from "../../img/find_5.png";
import FindInfo_4 from "../../img/find_6.png";
import FindIcon_1 from "../../img/head_1.png";
import FindIcon_2 from "../../img/head_2.png";
import FindIcon_3 from "../../img/head_3.png";
import FindIcon_4 from "../../img/head_4.png";
import Find_5 from "../../img/find_2.png";
import "../../css/find/findCon.less";
import "../../css/find/hotTitleCon.less";
import {Link} from 'react-router';

export default class hotTitleCon extends React.Component{
    render(){
        return(
            <div>
                <Activity title="最火话题"/>
            <div className="wrap c-find">
            	<div className="pink-bg"></div>
            	<a className="c-hotcard">
            		<img src={Find_6} />
            	</a>

            	<div className="c-blank">
                    <p></p>
                </div>

            	<div className="c-hotcard-bottom">
                    <div className="c-bottom-info">
                        <Link to={`/productDetails`}>
                            <img src={FindInfo_1} className="c-pic"/>
                            <p>迪奥超实用日常妆九色眼影盘推荐</p>
                            <img src={FindIcon_1} className="c-head"/>
                            <span className="c-author">Asura</span>
                            <i className="c-heart c-check"></i>
                            <span className="c-num c-red">442</span>
                        </Link>
                        <Link to={`/productDetails`}>
                            <img src={FindInfo_2} className="c-pic"/>
                            <p>MAKE UP FOR EVER 单色眼影推荐</p>
                            <img src={FindIcon_2} className="c-head"/>
                            <span className="c-author">耳语小仙</span>
                            <i className="c-heart"></i>
                            <span className="c-num">422</span>
                        </Link>
                    </div>
                    <div className="c-bottom-info">
                        <Link to={`/productDetails`}>
                            <img src={FindInfo_3} className="c-pic"/>
                            <p>春天来抢购 几款精美实用好物分享</p>
                            <img src={FindIcon_3} className="c-head"/>
                            <span className="c-author">SASA</span>
                            <i className="c-heart"></i>
                            <span className="c-num">556</span>
                        </Link>
                        <Link to={`/productDetails`}>
                            <img src={FindInfo_4} className="c-pic"/>
                            <p>圣罗兰圆管口红热卖色号推荐</p>
                            <img src={FindIcon_4} className="c-head"/>
                            <span className="c-author">LULI</span>
                            <i className="c-heart"></i>
                            <span className="c-num">247</span>
                        </Link>
                    </div>
                </div>
            </div>
            </div>

        )
    }
}
