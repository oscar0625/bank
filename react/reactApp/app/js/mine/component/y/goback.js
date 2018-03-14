import React from "react";
import "./css/goback.less";
export default class Goback extends React.Component{
    back(){
        window.history.back()
    }

    render(){
        return (
            <div className="y-goback">
                <ul>
                    <li>
                        <a id="y-goback" onClick={this.back.bind(this)}>
                            &#xe601;
                        </a>
                    </li>
                    <li>{this.props.title}</li>
                </ul>
            </div>
        )
    }
}