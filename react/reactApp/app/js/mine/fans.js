import React from "react";
import MineSubHeader from "./component/c/mineSubHeader";
import FansInfo from "./component/c/fansInfo";

export default class Fans extends React.Component{
	render(){
		return (
			<div>
				<MineSubHeader title="粉丝" />
				<FansInfo />
				<FansInfo />
				<FansInfo />
			</div>
		)
	}
}