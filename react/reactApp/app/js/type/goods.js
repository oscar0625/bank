import React from 'react';
import Activity from "../index/component/c/activity.js"
import "./component/y/css/typeGoods.less"
import  goods1 from "./component/y/img/type-goods.png"
import  goods2 from "./component/y/img/typegoods2.png"
import {Link} from 'react-router';

export default class TypeGoods extends React.Component {
render(){
    return (
        <div>
            <Activity title="腮红"/>
            <div className="type-goods-head"></div>
            <div className="y-goods-container">
                <div className="y-goods-box clearfix">
                    <div className="y-goods-box-left">
                        <Link to={`/productDetails`} className="y-type-btn">
                        <img src={goods1} alt=""/>
                            <h5 className="y-goods-title">娇兰 限量款焕彩流星天使腮红</h5>
                            <p className="y-goods-price clearfix">
                                <span>参考价：&yen;<i>420</i></span>
                                <span>423</span>
                            </p>
                        </Link>
                    </div>
                    <div className="y-goods-box-right">
                        <Link to={`/productDetails`} className="y-type-btn">
                            <img src={goods2} alt=""/>
                            <h5 className="y-goods-title">NARS 双色心机魅力腮红</h5>
                            <p className="y-goods-price clearfix">
                                <span>参考价：&yen;<i>220</i></span>
                                <span>245</span>
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="y-goods-box clearfix">
                    <div className="y-goods-box-left">
                        <Link to={`/productDetails`} className="y-type-btn">
                            <img src={goods1} alt=""/>
                            <h5 className="y-goods-title">娇兰 限量款焕彩流星天使腮红</h5>
                            <p className="y-goods-price clearfix">
                                <span>参考价：&yen;<i>420</i></span>
                                <span>423</span>
                            </p>
                        </Link>
                    </div>
                    <div className="y-goods-box-right">
                        <Link to={`/productDetails`} className="y-type-btn">
                            <img src={goods2} alt=""/>
                            <h5 className="y-goods-title">NARS 双色心机魅力腮红</h5>
                            <p className="y-goods-price clearfix">
                                <span>参考价：&yen;<i>220</i></span>
                                <span>245</span>
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="y-goods-box clearfix">
                    <div className="y-goods-box-left">
                        <Link to={`/productDetails`} className="y-type-btn">
                            <img src={goods1} alt=""/>
                            <h5 className="y-goods-title">娇兰 限量款焕彩流星天使腮红</h5>
                            <p className="y-goods-price clearfix">
                                <span>参考价：&yen;<i>420</i></span>
                                <span>423</span>
                            </p>
                        </Link>
                    </div>
                    <div className="y-goods-box-right">
                        <Link to={`/productDetails`} className="y-type-btn">
                            <img src={goods2} alt=""/>
                            <h5 className="y-goods-title">NARS 双色心机魅力腮红</h5>
                            <p className="y-goods-price clearfix">
                                <span>参考价：&yen;<i>220</i></span>
                                <span>245</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
}