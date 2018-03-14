import React from "react";
import Left from "./img/left.png";
import {Link} from 'react-router';

import Jia01  from "./img/jia.png";
import "./css/think.less";
export default class Think extends React.Component{
    constructor(){
        super();
        this.state={
            zt:true,
            zs:false
        }
    }
    render(){
        return(
            <div style={{background:'#ffffff'}}>
                <div className="z_think clearfix">
                    <img className="img1" src={Left} onTouchStart={this.goBack.bind(this)}/>
                    <Link to={`/sendOut`}><span className="active">发送</span></Link>
                </div>
                <div className="think_cont">
                    <textarea placeholder="这一刻的想法......"></textarea>

                </div>
            </div>

        )
    }
    goBack(){
        window.history.go(-1)
    }

}



