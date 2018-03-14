import React from "react";
import "./css/fans.less";
import FansHead from "./img/fans_head.png";

export default class FansInfo extends React.Component{
	constructor(){
		super();
		this.state={
			pink: false,
			focus: false,
		}
	}
	change(){
		this.setState({
			pink: !this.state.pink,
			focus: !this.state.focus
		})
	}
	changeFocus(){
		var obj = {
			focus: "已关注",
			nofocus: "未关注"
		}
		return (
			<span onClick={this.change.bind(this)} id={this.state.pink?"pink":""}>{this.state.focus?obj.focus:obj.nofocus}</span>
		)
	}
	render(){
		return (
			<div className="c-fans">
				<img src={FansHead} />
				<p className="c-fans-user">loveliness官方</p>
				<p className="c-fans-personal">女 18-35岁 混合性肌肤</p>
				{this.changeFocus()}
			</div>
		)
	}
}