import React from 'react';
import {Link} from  'react-router';
import "./css/send.less";
import Girl from "./img/z_xiangshui.png";

export default class Send extends React.Component{
    constructor() {
        super();
        this.state = {
            guanZhu: false,
            touchXin:false
        }
    }
    xin(){this.setState({touchXin: !this.state.touchXin})}
    render(){
        return(
            <div>
                <div className="z_sendHeader"></div>
                <div className="wrap">
                    <div className="z_sendbox clearfix">
                        <Link to={`/joinIn`}><img src={Girl} alt=""/></Link>
                        <div className="beautDay">
                            <p>美丽的一天</p>
                            <p><span>9天前</span><span>3120</span>
                            <span>30</span><span onTouchStart={this.xin.bind(this)} className={this.state.touchXin?"new":"old"}>500</span></p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}
