import React from "react";
import "./css/chatInfo.less";
import FriendOne from './img/friend01.png';
import FriendTwo from './img/friend02.png';
import FriendThree from './img/friend03.png';
export default class ChatInfo extends React.Component{
    render(){
        return(
            <div>
                <ul className="z_chatInfoAll">
                    <li className="clearfix">
                        <img src={FriendOne}/>
                        <p>YSL大牌彩妆使用小ddd技巧</p>
                    </li>
                    <li className="clearfix">
                        <img src={FriendTwo}/>
                        <p>那些年我们追过的女神</p>
                    </li>
                </ul>
            </div>
        )
    }
}
