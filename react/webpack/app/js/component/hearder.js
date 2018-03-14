
import React from "react";
import myData from "../../data/nav.json";
import "../../css/header.css";


export default class Header extends React.Component{
    //构造函数：随着类的创建自动执行的一个函数就是构造函数
    //一般构造函数是用来初始化数据的
    constructor(){
        super();//强行调用父类属性和方法   调用Component属性和方法
        this.state={
            myData:myData
        }
    }
    render(){
        return(
            <div>{
                this.getNav()
            }</div>
        )
    }
    getNav(){
        return(
            <div className="nav-container">
                <ul>
                    {
                        this.state.myData.map(function (x) {
                            return(
                                <li>
                                    <a href={x.url}>{x.name}</a>
                                </li>
                            )

                        })
                    }
                </ul>
                <p>更多产品</p>
            </div>
        )
    }
}