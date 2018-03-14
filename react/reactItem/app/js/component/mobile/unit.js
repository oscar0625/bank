import React from 'react';
import '../../../css/unit.less'
import $ from 'jquery'
export default class Unit extends React.Component{
    constructor(prop){
        super(prop);
        // console.log('Unit')
        this.state={
            data:[]
        }
    }
    componentWillMount(){
        /*第一次进来或者刷新时要执行*/
        $.ajax({
            type:'get',
            url:'http://www.iwen.wiki/sxtstu/news/juhenews.php',
            data:{type:this.props.type,count:this.props.count},
            beforeSend:()=>{
                $('.unit-target').append('<div class="unit-target-son" style="height:5rem;width: 100%"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div></div>')

            },
            success: (data)=>{
                // console.log('ajax')
                this.setState({
                    data:data
                })
            },
            complete:()=>{
                $('.unit-target-son').remove();
            }
        });
    }
    componentWillReceiveProps(){
        /*top切换到yule 在重新render之前应该重新发送请求数据*/
        // console.log('重置参数')
        $.ajax({
            type:'get',
            url:'http://www.iwen.wiki/sxtstu/news/juhenews.php',
            data:{type:this.props.type,count:this.props.count},
            beforeSend:()=>{
                console.log( $('.other-content'))
                $('.other-content').append('<div class="other-content-son"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div></div>')
            },
            success: (data)=>{
                // console.log('ajax')
                this.setState({
                    data:data
                })
            },
            complete:()=>{
                $('.other-content-son').remove();
            }
        });
    }
    render(){
        return(
            <div className="other-content">
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
Unit.propTypes={
    type:React.PropTypes.string,
};
Unit.defaultProps={
    type:'top',
    count:5
};