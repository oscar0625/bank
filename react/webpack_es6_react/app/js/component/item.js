import React from "react";
import "../../css/newsitem.css";
export default class Item extends React.Component{
    
    render(){
        return(
            <div>
                {
                    this.getItem()
                }
            </div>
        )
    }
    getItem(){
        return (
            <div className="item-a">
                {
                    this.props.params.map(function (x) {
                        return (
                            <a href={x.url}>
                                {x.content}
                                <span>{x.time}</span>
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}
//给props 参数指定默认值
Item.defaultProps = {
     params:[
        {
            content:"",
            url:"",
            time:""
        }
    ]
};
// 限定数据类型
Item.propTypes={
    params: React.PropTypes.array
};