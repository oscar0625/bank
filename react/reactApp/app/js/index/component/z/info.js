import React from "react";
import {Link} from 'react-router';
import Gril from "./img/z_girl.png";
import  XS from "./img/z_xiangshui.png";
import "./css/info.less";
export default class Info extends React.Component{
    constructor(){
        super();
        this.state={
            id:false
        }

    }
    render(){
    return(
        <div className="wrap">
            {this.getInfo()}
        </div>
    )
    }
    changeClass(){
        this.state.id
        ?
        this.setState({
            id:false
        }) :
        this.setState({
            id:true
        })

    }
    getInfo(){
        var obj={
            "yXW":
                {icon:Gril,img:XS,name:"悦小舞",gz:"关注ta"}

        };
        return (
            <ul className="z_info">
                <li>
                    {/*{console.log(obj[this.props.info].icon)}*/}
                    <Link to={`/blogger`} className="info_a1"><img src={obj[this.props.info].icon} alt=""/></Link>
                    <div className="clearfix ">
                        <span className="info_span1">{obj[this.props.info].name}</span>
                        <span className="info_span2" id={this.state.id?'change':''} onTouchStart={this.changeClass.bind(this)}>{obj[this.props.info].gz}</span>
                    </div>
                    <div className="info_a2">
                        <Link to={`/article`}  ><img src={obj[this.props.info].img}  alt=""/></Link>
                    </div>
                </li>
            </ul>
        )
    }
}

