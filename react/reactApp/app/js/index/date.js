import React from "react";
import Activity from './component/c/activity';
import '../../css/index/date.less';
import Qdimg from '../../img/qiandao.png';
import ClearBottom from './component/l/clearBottom'
export default class Article extends React.Component{
    constructor(){
        super();
        var riLi={
            /*获取月的天数*/
            getDay:function(year,mouth){
                var arr=[];
                var reg=/[13578]|12|10/;
                var mouth=mouth+'';
                if(reg.test(mouth)){
                    for(var i=1;i<=31;i++){
                        arr.push(i)
                    }
                }else if(mouth==2){
                    if(year%4==0&&year%100!=0||year%400==0){
                        for(var j=1;j<=29;j++){
                            arr.push(j)
                        }
                    }else{
                        for(var k=1;k<=28;k++){
                            arr.push(k)
                        }
                    }
                }else {
                    for(var l=1;l<=30;l++){
                        arr.push(l)
                    }
                }
                return arr
            },
            getPrevDay:function (year,mouth) {
                /*获取当前月 月首的星期数*/
                var xqStart=new Date(year+'/'+mouth+'/1').getDay();
                var arred=[];
                var prevArr=[];
                /*判断当前月的上个月是第几月*/
                if(mouth==1){
                    prevArr=this.getDay(year-1,12)

                }else {
                    prevArr=this.getDay(year,mouth-1)
                }
                for (var i=0;i<xqStart;i++){
                    /*往数组前面推上个月最后一天的数字 推几次由星期判断*/
                    arred.unshift(prevArr.pop())
                }
                return arred
            },
            getNextDay:function (year,mouth,arr) {
                var  xqEnd=new Date(year+'/'+mouth+'/'+arr.length+'').getDay();
                /*判断当前月的下个月是第几月*/
                var arring=[];
                var nextArr=[];
                if(mouth==12){
                    nextArr=this.getDay(year+1,1)

                }else {
                    nextArr=this.getDay(year,mouth+1)
                }
                var num=6-xqEnd;
                for (var i=0;i<num;i++){
                    /*往数组后面推下个月第一天的数字 推几次由星期判断*/
                    arring.push(nextArr.shift())
                }
                return arring
            },
            init:function () {
                /*当前日期*/
                var date=new Date();
                var year=date.getFullYear();
                var mouth=date.getMonth()+1;
                var ri=date.getDate();
                /*获取当前月天数 数组*/
                var arr=this.getDay(year,mouth);
                /*获取当前月的上个月的末尾几天 数组*/
                var arred=this.getPrevDay(year,mouth);
                /*获取当前月的下个月的开头几天 数组*/
                var arring=this.getNextDay(year,mouth,arr);
                return {
                    gq:arred,   //上一个月
                    xz:arr,     //当前月
                    jl:arring,   //下一个月
                    day:ri-1        //当前日所在数组的index
                }
            }
        };
        var obj=riLi.init();
        console.log(obj);
        this.state={
            date:riLi.init(),
            zt:true
        }
    }
    qianDao(){
        this.setState({
            zt:false
        })
    }
    render(){
        return (
            <div style={{background:'#ffffff'}}>
                <Activity title="每日一签" zt="true"/>
                 <div className="date-box">
                     <div>
                     <ul className="clearfix">
                         <li>Sun</li>
                         <li>Man</li>
                         <li>Tue</li>
                         <li>Wed</li>
                         <li>Thur</li>
                         <li>Fir</li>
                         <li>Sat</li>
                     </ul>
                     <ul className="clearfix">
                         {
                             this.state.date.gq.map(function (x,i) {
                                 return(
                                     <li className="guoqu" key={i}>{x}</li>
                                 )
                             })
                         }
                         {
                             this.state.date.xz.map(function (x,i) {
                                 if(i==this.state.date.day){
                                     return(
                                         <li  className={this.state.zt?'br':'bg'} key={i} >{x}</li>
                                     )
                                 } else if(i==16||i==21){
                                     return(
                                         <li  className="bg" key={i}>{x}</li>
                                     )
                                 } else{
                                     return(
                                         <li key={i}>{x}</li>
                                     )
                                 }
                             }.bind(this))
                         }
                         {
                             this.state.date.jl.map(function (x,i) {
                                 return(
                                     <li className="guoqu" key={i}>{x}</li>
                                 )
                             })
                         }
                     </ul>
                     </div>
                     <img src={Qdimg} alt="" onTouchStart={this.qianDao.bind(this)}/>
                 </div>
                <div className="wrap">
                    <div className="l-date-jf">
                        <div><span>成长值</span><span>2</span></div>
                        <div><span>积分</span><span>25</span></div>
                    </div>
                    <div className="l-date-rh">
                        <h1>积分兑豪礼</h1>
                        <p>登录签到可获得成长值，累计成长值可兑换积分，</p>
                        <p>积分可用于优惠专区购买限时产品，也可参加秒杀活动，</p>
                        <p>不定期还可参与抽奖活动哦 !</p>
                    </div>
                </div>
                <ClearBottom />


            </div>

        )
    }
}
