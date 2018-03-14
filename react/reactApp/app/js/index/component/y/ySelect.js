import React from "react";
import {Link} from 'react-router';
import "./css/ySelect.less"
export default class YSearch extends React.Component{
	render(){
		return(
				<div className="ySelect-head">
					<div className="ySelect-search clearfix">
					<input type="text" placeholder="请输入要搜索的内容"/>
					< Link  to={`/searchDetail`}>搜索</Link>
					</div>
				</div>
			)
	}
}