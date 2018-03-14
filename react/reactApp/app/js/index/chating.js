import React from 'react';
import Activity from './component/c/activity';
import '../../css/index/chating.less';
import icon1 from './component/l/img/chatingicon1.png';
import icon2 from './component/l/img/chatingicon2.png';
import jiantou from './component/l/img/jianjiao.png';
import biaoqing from '../../img/biaoqing.png';
import ClearBottom from './component/l/clearBottom';
export default class Chat extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
            chatArr:[]
        }
    }
    componentWillMount(){
        setTimeout(function () {
            var arr=this.state.chatArr;
            arr.push({className:'l-chating-sectionA clearfix',src:icon1,content:'在吗？'})
            this.setState({
                chatArr:arr
            })
        }.bind(this),2000)
    }
    change(e){
        this.setState({
            text:e.target.value
        })
    }
    send(e){
        if(this.state.text){
            /*往数组里加对象*/
            var arrself=this.state.chatArr;
            arrself.push({className:'l-chating-sectionB clearfix',src:icon2,content:this.state.text});
            /*讲输入框变为空*/
            e.target.previousElementSibling.value='';
            this.setState({
                chatArr:arrself,
                text:''
            });
            setTimeout(function () {
                arrself.push({className:'l-chating-sectionA clearfix',src:icon1,content:'在吗？'});
                this.setState({
                    chatArr:arrself,
                });
            }.bind(this),2000)
        }

    }
    render(){
        return(
            <div className="l-chating">
                <Activity title={this.props.params.title}/>
                <div className="wrap">
                    <div className="l-chating-box">
                        {
                            this.state.chatArr.map(function (x,i) {
                                return(
                                    <div className={x.className} key={i}>
                                        <img src={x.src} />
                                        <pre><img src={jiantou} alt=""/>{x.content}</pre>
                                    </div>
                                )
                            })

                        }
                        {/*<div className="l-chating-sectionA clearfix">*/}
                            {/*<img src={icon1} alt=""/>*/}
                            {/*<pre >*/}
                                {/*<img src={jiantou} alt=""/>*/}
                                {/*这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话*/}
                            {/*</pre>*/}
                        {/*</div>*/}
                        {/*<div className="l-chating-sectionB clearfix">*/}
                            {/*<img src={icon2} alt=""/>*/}
                            {/*<pre >*/}
                                {/*<img src={jiantou} alt=""/>*/}
                                {/*这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话这是一段废话*/}
                            {/*</pre>*/}
                        {/*</div>*/}
                    </div>
                    <div className="l-chating-input clearfix">
                        <img src={biaoqing} alt=""/>
                        <textarea name="input" id="" onChange={this.change.bind(this)}></textarea>
                        <button onTouchStart={this.send.bind(this)}>发送</button>
                    </div>
                    <ClearBottom />
                </div>

            </div>
        )
    }
}
