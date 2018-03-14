import React from 'react';
import Activity from '../index/component/c/activity'
import Find_8 from "../../img/find_top_6.png";
import FindInfo_1 from "../../img/find_3.png";
import FindInfo_2 from "../../img/find_4.png";
import FindIcon_1 from "../../img/head_1.png";
import FindIcon_2 from "../../img/head_2.png";
import Shopper_1 from "../../img/shopper_1.png";
import Shopper_2 from "../../img/shopper_2.png";
import "../../css/find/findCon.less";
import "../../css/find/hotTitleCon.less";
import {Link} from 'react-router';


export default class beautifulGoods extends React.Component{
    render(){
        return(
            <div className="c-beautifulGoods-box">
                <Activity title="最热商品"/>
	            <div className="wrap c-find">
	            	<div className="pink-bg"></div>
	            	<a className="c-hotcard">
	            		<img src={Find_8} />
	            	</a>

	            	<div className="c-hotcard-bottom" id="c-top">
	                    <div className="c-bottom-info">
	                        <Link to={`/productDetails`}>
	                            <img src={FindInfo_1} className="c-pic"/>
	                            <p>迪奥超实用日常妆九色眼影盘推荐</p>
	                            <img src={FindIcon_1} className="c-head"/>
	                            <span className="c-author">Asura</span>
	                            <i className="c-heart c-check"></i>
	                            <span className="c-num">442</span>
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
	                </div>
	                <div className="c-shopper-subtitle"></div>
	                <div className="c-shooper-bottom">
	                	<div>
	                		<img src={Shopper_1} />
	                		<p>香奈儿五号香水</p>
	                		<span>天猫</span>
	                		<span>&yen;598</span>
	                	</div>
	                	<div>
	                		<img src={Shopper_2} />
	                		<p>香奈儿五号香水</p>
	                		<span>天猫</span>
	                		<span>&yen;598</span>
	                	</div>
	                </div>
            	</div>
            </div>
        )
    }
}
