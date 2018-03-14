import React from "react";
import RedHeart from "./img/redHeart.png";
import GrayHeart from "./img/grayHeart.png";
import Dress from "./img/dress.png";
import DressOne from "./img/dress01.png";
import LongOne from "./img/long01.png";
import LongTwo from "./img/long02.png";
import LongThree from "./img/long03.png";
import LongFour from "./img/long04.png";
import LongFive from "./img/long05.png";
import WhiteGirl from "./img/whiteGirl.png";
import Fire from "./img/fire.png";
import "./css/product.less";
import $ from "jquery";
export default class ProductDetail extends React.Component {
    constructor() {
        super();
        this.state = {zy: true, ze: false, zs: false}}

    touchAnsOne() {
        this.setState({
            zy: true,
            ze: false,
            zs: false
        })
    }

    touchAnsTwo() {
        this.setState({
            zy: false,
            ze: true,
            zs: false
        })
    }

    touchAnsThree() {
        this.setState({
            zy: false,
            ze: false,
            zs: true
        })
    }

    render() {
        return (
            <div className="wrap">
                {/*top商品*/}
                <div className="z_product_top clearfix">
                    <div><img src={Dress}/></div>
                    <div>
                        <h3>雅诗兰黛面膜 红石榴鲜活亮采晚霜</h3>
                        <p className="z_pro_p1">参考价:<span>780￥/50ml</span></p>
                        <p className="z_pro_p2">产品说明书:</p>
                        <p className="z_pro_p3">功效：深彻润透肌肤......</p>
                        <p className="z_pro_p4">适用肤质:中性/混合性肌肤</p>
                        <p className="z_pro_p5">针对:细纹、皱纹 松弛 干燥、缺水 黯哑、无光 无油</p>
                        <p className="z_pro_p6">主要科技/成分:"智慧新生态"科技,皱纹填充技术</p>
                    </div>
                </div>
                {/*推荐产品*/}
                <div className="z_pro_tro">
                    <h4>推荐产品</h4>
                    <ul>
                        <li><a className="clearfix">
                            <div className="z_pro_left">
                                <img src={DressOne} alt=""/>
                            </div>
                            <div className="z_pro_right">
                                <p>天天网</p>
                                <p>价格:<span> ￥359.00</span></p>
                                <p>市场价:<span> ￥540.00</span></p>
                            </div>
                        </a>
                            <p className="z_pro_pj"><span>2930</span>人评价</p>
                        </li>
                        <li><a className="clearfix">
                            <div className="z_pro_left">
                                <img src={DressOne} alt=""/>
                            </div>
                            <div className="z_pro_right">
                                <p>天猫</p>
                                <p>价格:<span> ￥359.00</span></p>
                                <p>市场价:<span> ￥540.00</span></p>
                            </div>
                        </a>
                            <p className="z_pro_pj"><span>2930</span>人评价</p></li>
                        <li><a className="clearfix">
                            <div className="z_pro_left">
                                <img src={DressOne} alt=""/>
                            </div>
                            <div className="z_pro_right">
                                <p>天天网</p>
                                <p>价格:<span> ￥359.00</span></p>
                                <p>市场价:<span> ￥540.00</span></p>
                            </div>
                        </a>
                            <p className="z_pro_pj"><span>2930</span>人评价</p></li>
                    </ul>
                </div>
                {/*口碑*/}
                <div className="z_good">
                    <div className="z_good_top">
                        <span onTouchStart={this.touchAnsOne.bind(this)}
                              className={this.state.zy ? "orange" : ""}>口碑点评</span>
                        <span onTouchStart={this.touchAnsTwo.bind(this)}
                              className={this.state.ze ? "orange" : ""}>相关话题</span>
                        <span onTouchStart={this.touchAnsThree.bind(this)} className={this.state.zs ? "orange" : ""}>相似产品</span>
                    </div>
                    <div className="z_good_content">
                        <ul>
                            <li className={this.state.zy ? "cx" : "yc"}>
                                <div className="z_cont-top clearfix">
                                    <div><p>4.0</p>
                                        <p className="clearfix">
                                            <img src={ RedHeart}/>
                                            <img src={ RedHeart}/>
                                            <img src={ RedHeart }/>
                                            <img src={ RedHeart }/>
                                            <img src={ GrayHeart}/>
                                        </p>
                                    </div>
                                    <div>
                                        <p><span>五星</span><img src={LongOne}/><span>80%</span></p>
                                        <p><span>四星</span><img src={LongTwo}/><span>80%</span></p>
                                        <p><span>三星</span><img src={LongThree}/><span>40%</span></p>
                                        <p><span>二星</span><img src={LongFour}/><span>14%</span></p>
                                        <p><span>一星</span><img src={LongFive}/><span>7%</span></p>
                                    </div>
                                </div>
                                <div className="z_cont-bottom">
                                    <p><img src={Fire}/>徐娇*1</p>
                                    <div className="z_bottom clearfix">
                                        <img src={WhiteGirl}/>
                                        <p>众所周知，眼部肌肤往往是脆弱，容易衰老，容易暴露您的年龄的。雅诗兰黛（Estee Lauder）
                                            青春抗皱滋润眼霜5ml，采用了三项针对眼部不同问题的最新技术 。令您的脆弱...</p>
                                    </div>
                                </div>
                            </li>
                            <li className={this.state.ze ? "cx" : "yc"}>
                                <div className="z_cont-top clearfix">
                                    <div><p>4.0</p>
                                        <p className="clearfix"><img src={RedHeart}/><img src={RedHeart}/><img
                                            src={RedHeart}/><img src={RedHeart}/><img src={RedHeart}/>
                                        </p>
                                    </div>
                                    <div>
                                        <p><span>五星</span><img src={LongOne}/><span>80%</span></p>
                                        <p><span>四星</span><img src={LongTwo}/><span>80%</span></p>
                                        <p><span>三星</span><img src={LongThree}/><span>40%</span></p>
                                        <p><span>二星</span><img src={LongFour}/><span>14%</span></p>
                                        <p><span>一星</span><img src={LongFive}/><span>7%</span></p>
                                    </div>
                                </div>
                                <div className="z_cont-bottom">
                                    <p><img src={Fire}/>徐娇*2</p>
                                    <div className="z_bottom clearfix">
                                        <img src={WhiteGirl}/>
                                        <p>众所周知，眼部肌肤往往是脆弱，容易衰老，容易暴露您的年龄的。雅诗兰黛（Estee Lauder）
                                            青春抗皱滋润眼霜5ml，采用了三项针对眼部不同问题的最新技术 。令您的脆弱...</p>
                                    </div>
                                </div>
                            </li>
                            <li className={this.state.zs ? "cx" : "yc"}>
                                <div className="z_cont-top clearfix">
                                    <div><p>4.0</p>
                                        <p className="clearfix"><img src={RedHeart}/><img src={RedHeart}/><img
                                            src={RedHeart}/><img src={RedHeart}/><img src={RedHeart}/>
                                        </p>
                                    </div>
                                    <div>
                                        <p><span>五星</span><img src={LongOne}/><span>80%</span></p>
                                        <p><span>四星</span><img src={LongTwo}/><span>80%</span></p>
                                        <p><span>三星</span><img src={LongThree}/><span>40%</span></p>
                                        <p><span>二星</span><img src={LongFour}/><span>14%</span></p>
                                        <p><span>一星</span><img src={LongFive}/><span>7%</span></p>
                                    </div>
                                </div>
                                <div className="z_cont-bottom">
                                    <p><img src={Fire}/>徐娇*3</p>
                                    <div className="z_bottom clearfix">
                                        <img src={WhiteGirl}/>
                                        <p>众所周知，眼部肌肤往往是脆弱，容易衰老，容易暴露您的年龄的。雅诗兰黛（Estee Lauder）
                                            青春抗皱滋润眼霜5ml，采用了三项针对眼部不同问题的最新技术 。令您的脆弱...</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}

