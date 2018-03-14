import React from 'react';
import "./css/typeIndex.less"
import {Link} from  'react-router';
export default class TypeContent extends React.Component{

    render(){
        return(
            <div>
                <div className="y-type-container">
                    <p className="y-title"><i>&#xe619;</i>美丽彩妆<i>&#xe619;</i></p>
                    <div className="y-type-box">
                        <ul>
                            <li>
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-fendi">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-saihong">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-yancai">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-meibi">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                        </ul>
                    </div>
                    <p className="y-title"><i>&#xe619;</i>面部护理<i>&#xe619;</i></p>
                    <div className="y-type-box">
                        <ul className="type-face">
                            <li id="y-xie">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-jiemian">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-T">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-mianbu">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-jinbu">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-yanbu">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                        </ul>
                    </div>
                    <p className="y-title"><i>&#xe619;</i>香水<i>&#xe619;</i></p>
                    <div className="y-type-box ">
                        <ul id="type-xiangshui">
                            <li id="y-lady">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-man">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-sport">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                            <li id="y-ball">
                                <Link to={`/typeGoods`}></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}