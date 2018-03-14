import React from "react";
import {Link} from 'react-router'
import "./css/nav.less";

export default class Nav extends React.Component{
	render(){
		return (
			<div className="c-nav">
				<ul>
					<li><Link to={`/indexSearch`}></Link></li>
					<li>
						<div>
							<Link to={`/`} className="commend" id={this.props.type==1 ? "c-line" : ""}>美丽推荐</Link>
							<a ></a>
							<Link to={`/beautifulSay`}  className="beautiful" id={this.props.type==2 ? "c-line" : ""}>学变美</Link>
						</div>
					</li>
					<li><span></span></li>
				</ul>
			</div>
		)
	}
}