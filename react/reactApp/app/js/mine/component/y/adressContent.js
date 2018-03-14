import React from "react";
import "./css/addressContent.less"
class AddressContent extends React.Component{
    constructor(){
        super();
        this.state={
            active:false
        }
    }
    active(){
        this.setState({active:!this.state.active})
    }
    render(){
        var show=this.state.active?"none":"block";
        return(
            <div>
                <div className="y-address">
                    <p>阿花妹妹<span>18265262526</span></p>
                    <p>邮政编码:<span>123456</span></p>
                    <p>中国北京市北京市昌平区金燕龙大厦123室</p>
                    <div className="y-address-click" onTouchEnd={this.active.bind(this)}>
                        <div className="y-address-active" style={{display:show}}></div>
                    </div>

                </div>
            </div>
        )
    }
}
export default AddressContent