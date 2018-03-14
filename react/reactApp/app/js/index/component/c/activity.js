/*
*   <Activity title="每日一签" />
*
 *
* */

import React from "react";
import "./css/nav.less";
export default class Activity extends React.Component{
	back(){
		window.history.back()
	}

	render(){
		return (
			<div className="c-nav">
				<ul>
					<li><a id="c-back" onClick={this.back.bind(this)}></a></li>
					<li>{this.props.title}</li>
					<li><a id="c-share" className='c-hide'></a></li>
				</ul>
			</div>
		)
	}
}