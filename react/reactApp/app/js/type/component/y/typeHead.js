import React from "react";
import {Link} from 'react-router'
import "./css/typeHead.less";

export default class TypeHead extends React.Component{
    render(){
        return (
            <div className="y-type-head">
                <ul>
                    <li><Link to={`/indexSearch`}></Link></li>
                    <li>{this.props.title}</li>
                </ul>
            </div>
        )
    }
}