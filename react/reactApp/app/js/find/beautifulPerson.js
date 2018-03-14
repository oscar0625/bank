import React from 'react';
import Activity from '../index/component/c/activity'
import Find_7 from "../../img/find_top_5.png";
import "../../css/find/findCon.less";
import "../../css/find/hotTitleCon.less";
import CInfo from "./component/c/cInfo.js";

export default class BeautifulPerson extends React.Component{
    render() {
        return (
            <div>
                <Activity title="最美达人"/>
	            <div className="wrap c-find">
	            	<div className="pink-bg"></div>
	            	<a className="c-hotcard">
	            		<img src={Find_7} />
	            	</a>
	            	<div className="c-person-box">
	            		<CInfo />
	            		<CInfo />
	            	</div>
	            </div>
            </div>
        )
    }
}