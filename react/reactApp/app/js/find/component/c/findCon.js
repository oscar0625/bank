import React from 'react';
import {Link} from  'react-router';
import Find_1 from "./img/find_top_1.png";
import Find_2 from "./img/find_top_2.png";
import Find_3 from "./img/find_top_3.png";
import Find_4 from "./img/find_1.png";
import Find_5 from "./img/find_2.png";
import "./css/findCon.less";

export default class FindCon extends React.Component{
    render(){
        return(
            <div className="wrap c-find">
            	<div className="pink-bg"></div>
            	<div className="c-card-top" >
            		<Link to={`/hotTitleCon`} >
            			<img src={Find_1} />
            			<p>最火话题</p>
            		</Link>
            		<Link to={`/beautifulPerson`} >
            			<img src={Find_2} />
            			<p>最美达人</p>
            		</Link>
					<Link to={`/beautifulGoods`} >
						<img src={Find_3} />
            			<p>最热商品</p>
					</Link>
				</div>

            	<div className="c-blank"></div>

            	<div className="c-card">
            		<Link to={`/productDetails`}>
            			<p>彩妆界的奢侈品——Dior</p>
            			<span>239个话题&nbsp;&nbsp; | &nbsp;&nbsp;34869人热议</span>
            			<img src={Find_4} />
            		</Link>
            	</div>

            	<div className="c-card">
            		<Link  to={`/productDetails`}>
            			<p>不管，就是喜欢YSL</p>
            			<span>189个话题 &nbsp;&nbsp;|&nbsp;&nbsp; 23460人热议</span>
            			<img src={Find_5} />
            		</Link>
            	</div>
            	
            </div>
        )
    }
}
