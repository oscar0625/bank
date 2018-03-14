import React from "react";
import "./css/sendJoin.less";
import {Link} from 'react-router';
import Left from "./img/left.png";
import Jia  from "./img/jia.png";

export default class SendJoin extends React.Component{
    constructor(){
        super();
        this.state={
            zt:true,
            zs:false
        }
    }
    render(){
        return(
                <div className="z_sendJoin">
                    <a onTouchStart={this.touchSend.bind(this)} className={this.state.zt?"cx":""}>我发起的</a>
                    <a onTouchStart={this.touchJoin.bind(this)} className={this.state.zt?"":"cx"}>我参与的</a>
                    <img className="img1" src={Left} onClick={this.goBack.bind(this)}/>
                    <Link to={`/thinkSend`}>

                    <span className={this.props.num?"":"active"}>
                        <img className="img2" src={Jia} />
                    </span>
                    </Link>

                </div>
        )
    }
    goBack(){
        window.history.go(-1)
    }
    touchSend(){
        this.setState({
            zt:true
        })
    }
    touchJoin(){
        this.setState({
            zt:false
        })
    }
}


