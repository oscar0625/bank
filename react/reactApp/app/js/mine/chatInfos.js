import React from "react";
import ChatInfo from "./component/z/chatInfo";
import Activity from '../index/component/c/activity';
export default class ChatInfos extends React.Component{
    render(){
        return(
            <div style={{background:"#fff"}}>
                <Activity title="话题消息通知"/>
                <ChatInfo/>
            </div>
        )
    }
}
