import React from "react";
import Send from "./component/z/send";
import SendJoin from "./component/z/sendJoin" ;
import Bottom from './component/l/bottom';
import ClearBottom from './component/l/clearBottom';
export default class SendOut extends React.Component{
    render(){
        return(
            <div >
                <SendJoin num="1"/>
                <Send/>
                <Bottom active="1"/>
                <ClearBottom />
            </div>
        )
    }
}

