import React from "react";
import {Link} from 'react-router'
import "./css/nav.less";

export default class Nav extends React.Component{
	render(){
		return (
			<div className="c-nav">
				<ul>
					<li><Link to={`/indexSearch`}></Link></li>
					<li>{this.props.title}</li>
					<li><Link to={`/sendOut`} className={this.props.icons=="call" ? "call" : "none"}></Link></li>
				</ul>
				<div className="blank"></div>
			</div>
		)
	}
}