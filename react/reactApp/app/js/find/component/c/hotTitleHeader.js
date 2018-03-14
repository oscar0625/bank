import React from "react";
import "./css/nav.less";


export default class HotTitleHeader extends React.Component{
	back(){
		window.history.back()
	}
	render(){
		return (
			<div className="c-nav">
				<ul>
					<li><a id="c-back" onClick={this.back.bind(this)}></a></li>
					<li>{this.props.title}</li>
					<li><a id={this.props.share=="share" ? "c-share" : "none"} ></a></li>
				</ul>
			</div>
		)
	}
}