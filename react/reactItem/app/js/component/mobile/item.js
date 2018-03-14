import React from 'react';
import '../../../css/item.less'
import $ from 'jquery'
export default class Item extends React.Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentWillMount(){
        // fetch('http://www.iwen.wiki/sxtstu/news/juhenews.php?type='+this.props.type+'&count='+this.props.count,{
        //     method:'get'
        // })
        //     .then(response=>response.json())
        //     .then((data)=>{
        //         this.setState({
        //             data:data
        //         })
        //     });
        $.ajax({
            type:'get',
            url:'http://www.iwen.wiki/sxtstu/news/juhenews.php',
            data:{type:this.props.type,count:this.props.count},
            success: (data)=>{
                console.log('ajax')
                this.setState({
                    data:data
                })
            }
        });
    }
    componentWillUpdate(){
        /*top切换到yule 在重新render之前应该重新发送请求数据*/
        console.log('重新渲染')


    }
    render(){
        return(
            <div>
                {
                    this.state.data.map((x)=>{
                        return (
                            <a key={x.uniquekey} className="content-item" href={x.url}>
                                <div>
                                <img src={x.thumbnail_pic_s} alt="" />
                                </div>
                                <div>
                                    <p>{x.title}</p>
                                    <p>{x.author_name}</p>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}
Item.propTypes={
    type:React.PropTypes.string,
};
Item.defaultProps={
    type:'top',
    count:5
};