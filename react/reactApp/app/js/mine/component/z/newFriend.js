import React from "react";
import "./css/newFriend.less";
export default class NewFriend extends React.Component{
    constructor(){
        super();
        this.state={
            pink:false,
            str:"关注ta"
        };
    }
    changeColor(){
        this.setState({
            pink:!this.state.pink
        });
    }
    render(){
        return(
            <div>
                <ul className="z_newFriend">
                    <li className="clearfix">
                        <div className="clearfix z_img">
                            <img src={this.props.obj.src}/>
                            <div>
                                <p>{this.props.obj.name}</p>
                                <p><span>{this.props.obj.sex}</span><span>{this.props.obj.age}</span><span>{this.props.introduce}</span></p>
                            </div>
                        </div>
                        <div className="z_fri_gz">
                            <p className={this.state.pink?"pink":"gray"} onTouchStart={this.changeColor.bind(this)}>{this.state.pink?"已关注":"关注ta"}</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

