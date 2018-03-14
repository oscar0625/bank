import React from "react";
import NewFriend from "./component/z/newFriend";
import FriendOne from './component/z/img/friend01.png';
import FriendTwo from './component/z/img/friend02.png';
import FriendThree from './component/z/img/friend03.png';
import Activity from '../index/component/c/activity';
export default class NewFriendInfos extends React.Component{
    constructor(){
        super();
        this.state={
            data:[
                {src:FriendOne,name:"蜜萌",sex:"女"},
                {src:FriendTwo,name:"丫丫",sex:"女",age:"18岁-35岁",introduce:"混合性皮肤"},
                {src:FriendThree,name:"朵朵",sex:"女",age:"18岁-35岁"},
            ]
        }
    }
    render(){
        return(
            <div >
                <Activity title="新好友通知"/>
                {this.state.data.map(function (item,i) {
                    return(
                        <div key={i}>
                            <NewFriend obj={item}/>
                        </div>

                    )

                })}
            </div>
        )
    }
}
