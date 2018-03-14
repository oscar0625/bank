import React from 'react';
import {Link} from 'react-router';
import Swiper from 'swiper';
import './css/swipe.less';
import Img1 from'./img/banner.png'
export default class Swipe extends React.Component{
    componentDidMount(){
        var swiper = new Swiper('.swiper-container', {
            /*base*/
            speed:800,//滑动速度
            autoplay: 2000,//是否自动滑动及间隔时间,
            autoHeight:true, //自动高度,wrapper和container会随着当前slide的高度而发生变化。
            effect:'slide', //slide的切换效果，默认为"slide"（位移切换），可设置为"fade"（淡入）"cube"（方块）"coverflow"（3d流）"flip"（3d翻转）。
            loop : true, //开启无缝模式
            /*分页及导航按钮*/
            pagination: '.swiper-pagination',//设置分页(小圆点)
            paginationClickable: true,//设置点击小圆点切换

        });
    }
    render(){
        return(
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><Link to={`/article`}><img src={Img1} alt=""/></Link></div>
                    <div className="swiper-slide"><Link to={`/article`}><img src={Img1} alt=""/></Link></div>
                    <div className="swiper-slide"><Link to={`/article`}><img src={Img1} alt=""/></Link></div>
                    <div className="swiper-slide"><Link to={`/article`}><img src={Img1} alt=""/></Link></div>
                    <div className="swiper-slide"><Link to={`/article`}><img src={Img1} alt=""/></Link></div>
                </div>
                <div className="swiper-pagination"></div>

            </div>
        )
    }
}

