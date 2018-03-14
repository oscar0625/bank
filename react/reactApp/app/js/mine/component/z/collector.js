import React from "react";
import "./css/collector.less";
import ChatOne from "./img/chat01.png";
import ChatTwo from "./img/chat02.png";
import ChatThree from "./img/chat03.png";
import GirlTwo from "./img/z_girl.png";
import GirlOne from "./img/z_girl01.png";
import Star from "./img/start.png";
import VideoOne from "./img/video01.png";
import VideoTwo from "./img/video02.png";
import FindTwo from "./img/find_1.png";
import FindOne from "./img/type-goods.png";
import {Link} from 'react-router';

export default class Collector extends React.Component{
    constructor(){
        super();
        this.state={chatOne:true, chatTwo:false, chatThree:false}};
    changeColor(e){
        if(e.target.id=="z_cspan1"){this.setState({chatOne:true, chatTwo:false, chatThree:false})
        }else if(e.target.id=="z_cspan2"){this.setState({chatOne:false, chatTwo:true, chatThree:false})
        }if(e.target.id=="z_cspan3"){this.setState({chatOne:false, chatTwo:false, chatThree:true})}
    };
    render(){
        return(
            <div style={{background:"#ffffff"}}>
                <div className="wrap">
                    {/*三个标题切换效果*/}
                    <div className="z_collect_top">
                        <span onTouchStart={this.changeColor.bind(this)} id="z_cspan1" className={this.state.chatOne?"change":""}>话题</span>
                        <span onTouchStart={this.changeColor.bind(this)} id="z_cspan2" className={this.state.chatTwo?"change":""}>产品</span>
                        <span onTouchStart={this.changeColor.bind(this)} id="z_cspan3" className={this.state.chatThree?"change":""}>视频</span>
                    </div>
                    {/*三个具体内容*/}
                    <div className="z_collect_content">
                        {/*话题部分*/}
                        <div className={this.state.chatOne?"cx":"yc"}>
                            {/*No.1*/}
                            <div className="huaTi">
                                <div className="huaTiImg">
                                    <Link to={`/article`}>
                                    <img src={ChatOne}/>
                                    </Link>
                                </div>
                                <div className="clearfix z_coll_icon">
                                    <p><img src={GirlOne}/><span>Luck</span></p>
                                    <p><img src={Star}/><span>11251</span></p>
                                </div>
                            </div>
                            {/*No.2*/}
                            <div className="huaTi">
                                <div>
                                    <Link to={`/article`}>
                                    <img src={ChatTwo}/>
                                    </Link>
                                </div>
                                <div className="clearfix z_coll_icon">
                                    <p><img src={GirlTwo}/><span>LILI</span></p>
                                    <p><img src={Star}/><span>11251</span></p>
                                </div>
                            </div>
                            {/*No.3*/}
                            <div className="huaTi">
                                <div>
                                    <Link to={`/article`}>
                                    <img src={ChatThree}/>
                                    </Link>
                                </div>
                                <div className="clearfix z_coll_icon">
                                    <p><img src={GirlOne}/><span>HHA</span></p>
                                    <p><img src={Star}/><span>11251</span></p>
                                </div>
                            </div>
                        </div>
                        {/*产品部分*/}
                        <div className={this.state.chatTwo?"cx":"yc"}>
                            <ul className="z_coll_pro clearfixy">
                                <li className="odd">
                                    {/*No.1*/}
                                    <Link to={`/productDetails`}><img src={FindOne}/></Link>
                                    <div className="z_coll_paga">
                                        <p>PAUL&JOE 双色腮红</p>
                                        <div className="clearfix z_collText">
                                            <p>参考价<span>￥23022</span></p>
                                            <p>221</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="even">
                                    {/*No.2*/}
                                    <Link to={`/productDetails`}><img src={FindTwo}/></Link>
                                    <div className="z_coll_paga">
                                        <p>PAUL&JOE 双色腮红</p>
                                        <div className="clearfix z_collText">
                                            <p>参考价<span>￥23022</span></p>
                                            <p>221</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="odd">
                                    {/*No.3*/}
                                    <Link to={`/productDetails`}><img src={FindOne}/></Link>
                                    <div className="z_coll_paga">
                                        <p>PAUL&JOE 双色腮红</p>
                                        <div className="clearfix z_collText">
                                            <p>参考价<span>￥23022</span></p>
                                            <p>221</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="even">
                                    {/*No.4*/}
                                    <Link to={`/productDetails`}><img src={FindTwo}/></Link>
                                    <div className="z_coll_paga">
                                        <p>PAUL&JOE 双色腮红</p>
                                        <div className="clearfix z_collText">
                                            <p>参考价<span>￥23022</span></p>
                                            <p>221</p>
                                        </div>
                                    </div>
                                </li>
                                <p className="video_bottom">到底啦~</p>
                            </ul>
                        </div>
                        {/*视频部分*/}
                        <div className={this.state.chatThree?"cx":"yc"}>
                            {/*No.1*/}
                                <div className="huaTi shipin">
                                    <div className="clearfix z_coll_icon">
                                        <p><img src={GirlOne}/><span>Luck</span></p>
                                        <p><span>2016年11月20日</span></p>
                                    </div>
                                    <div><Link to={`/indexVideo`}><img src={VideoOne}/></Link></div>
                                </div>
                                {/*No.2*/}
                                <div className="huaTi shipin">
                                    <div className="clearfix z_coll_icon">
                                        <p><img src={GirlTwo}/><span>Luck</span></p>
                                        <p><span>2016年11月20日</span></p>
                                    </div>
                                    <div><Link to={`/indexVideo`}><img src={VideoTwo}/></Link></div>
                                </div>
                                {/*No.3*/}
                                <p className="video_bottom">到底啦~</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
