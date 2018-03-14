import React from "react";
import MineSubHeader from "./component/c/mineSubHeader";
import FansInfo from "./component/c/fansInfo";

export default class Focus extends React.Component{
	render(){
		return (
			<div>
				<MineSubHeader title="关注" />
				<FansInfo />
				<FansInfo />
				<FansInfo />
			</div>
		)
	}
}