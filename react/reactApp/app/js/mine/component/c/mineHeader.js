import React from "react";
import "./css/nav.less";
import {Link} from "react-router";
export default class Nav extends React.Component{
	render(){
		return (
			<div className="c-nav">
				<ul>
					<li></li>
					<li>{this.props.title}</li>
					<li><Link to={`/setting`} className={this.props.icons=="set" ? "set" : "none"}></Link></li>
				</ul>
			</div>
		) 
	}
}