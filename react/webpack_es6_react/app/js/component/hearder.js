import React from "react";
import Logo from "../../image/bd_logo1.png";
import "../../css/header.css";
export default class Header extends React.Component{
    render(){
        return(
            <div className="nav-header">
                {this.getLogo()}
                {this.getNav()}
                {this.getLogin()}
            </div>
        )
    }
    getLogo(){
        return(
            <div className="logo">
                <a href="http://www.baidu.com">
                    <img src={Logo} alt=""/>
                </a>
            </div>
        )
    }
    getNav(){
        var navList=[
            {
                name:"体育",
                url:"http://news.baidu.com/"
            },
            {
                name:"娱乐",
                url:"http://map.baidu.com/"
            },
            {
                name:"军事",
                url:"http://map.baidu.com/"
            },
            {
                name:"八卦",
                url:"http://map.baidu.com/"
            },
            {
                name:"女孩",
                url:"http://map.baidu.com/"
            },
            {
                name:"男孩",
                url:"http://map.baidu.com/"
            }
        ];
        return(
            <div className="nav">
                    {
                        navList.map(function (x) {
                            return (
                                <a href={x.url}>
                                    {x.name}
                                </a>
                            )
                        })
                    }
            </div>
        )
    }
    getLogin(){
        return(
            <div className="login">
                <a href='http://www.iwen.wiki'>login</a>
            </div>
        )
    }
}