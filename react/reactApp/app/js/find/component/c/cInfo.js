import React from 'react';
import PersonHead_1 from "./img/p_head1.png";
import PersonCon_1 from "./img/person_1.png";
import PersonCon_2 from "./img/person_2.png";
import {Link} from 'react-router';

export default class CInfo extends React.Component{
	constructor() {
        super();
        this.state = {
            stateFocus: false
        }
    }
	changeFocus() {
        this.setState({
            stateFocus: !this.state.stateFocus,
        })
    }
	render(){
		return (
			<div className="c-person">
				<Link to={`/blogger`} ><img src={PersonHead_1} /></Link>
				<span className="c-person-author">悦小舞</span>
				<span className="c-focus" id={this.state.stateFocus?'change':''} onTouchStart={this.changeFocus.bind(this)}>关注ta</span>
				<div className="c-person-pic">
					<Link to={`/article`}><img src={PersonCon_1} /></Link>
					<Link to={`/article`}><img src={PersonCon_2} /></Link>
				</div>
			</div>
		)
	}
}

	