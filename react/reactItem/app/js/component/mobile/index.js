import React from 'react';
import '../../../css/reset.css';
import '../../../css/index.less';
import Header from './header';
export default class MobileIndex extends React.Component{
    constructor(){
        super();
        var mobileReset={
            reset: function () {
                //1.获取屏幕像素比的倒数
                var num = 1/window.devicePixelRatio;
                //2.动态创建适口标签
                var meta=document.createElement('meta');
                meta.setAttribute('name','viewport');
                meta.setAttribute('content','width=device-width, user-scalable=no, initial-scale='+num+', maximum-scale='+num+', minimum-scale='+num+'');
                document.head.appendChild(meta);
                ////3.设置html字体,为整个页面的10/1
                document.documentElement.style.fontSize=window.innerWidth/10+'px';
            }
        };
        mobileReset.reset();
    }
    render(){
        return(
            <div className="unit-target">
                <Header />
                {this.props.children}
            </div>
        )
    }
}