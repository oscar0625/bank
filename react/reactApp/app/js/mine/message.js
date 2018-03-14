import React from "react";
import MineSubHeader from "./component/c/mineSubHeader";
import "../../css/mine/message.less";
import FansHead from "./component/c/img/fans_head.png";
import MsgPic from "./component/c/img/msg.png";
import FriendPic from "./component/c/img/friend.png";
import {Link} from 'react-router';

export default class Message extends React.Component{
	constructor(){
		super();
		this.state = {
			active: false
		}
	}

	changeState(){
		this.setState({
			active: !this.state.active
		})
	}

	render(){
		return (
			<div className="c-message">
				<MineSubHeader title="消息" />
				<ul className="c-sub-nav">
					<li><a onClick={this.changeState.bind(this)} className={this.state.active?"":"active"}>通知</a></li>
					<li><a onClick={this.changeState.bind(this)} className={this.state.active?"active":""}>聊天</a></li>
				</ul>
				<a className="c-msg-info">
					<img src={FansHead} />
					<p className="c-msg-title">通知</p>
					<p className="c-msg-content">首次登录成功，奖励领到手软！</p>
					<span className="c-msg-date">2016年11月20日</span>
				</a>
				<Link to={`/mineChatInfos`} className="c-msg-info">
					<img src={MsgPic} />
					<p className="c-msg-title">话题消息通知</p>
					<p className="c-msg-content"></p>
					<span className="c-msg-date">2016年11月20日</span>
				</Link>
				<Link to={`/newFriendInfos`} className="c-msg-info">
					<img src={FriendPic} />
					<p className="c-msg-title">新好友通知</p>
					<p className="c-msg-content"></p>
					<span className="c-msg-date">2016年11月20日</span>
				</Link>
			</div>
		)
	}
}