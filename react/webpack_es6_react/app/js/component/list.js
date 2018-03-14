import React from "react";
import Item from "./item";
import $ from "jquery";
export default class List extends React.Component{
    //初始化state
    constructor(){
        super();
        this.state={
            data:[
                {
                    content:"",
                    url:"",
                    time:""
                }
            ]
        }
    }
    componentWillMount(){
        $.ajax({
            type:'get',
            url:'http://www.iwen.wiki/sxtstu/ReactDemo/reactnews.php',
            dataType:"json",
            success:function(data){
                this.setState({
                    data:data
                })
            }.bind(this)
        })
    }
    render(){
        return(
            <div>
                <Item params={this.state.data}/>
            </div>
        )
    };
}