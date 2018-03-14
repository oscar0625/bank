import React from 'react';
import FindHeader from "./component/c/findHeader.js";
import FindCon from "./component/c/findCon";
import ClearBottom from "../index/component/l/ClearBottom.js";
import Bottom from "../index/component/l/bottom.js";

export default class Index extends React.Component{
    render(){
        return(
            <div>
            	<FindHeader icons="call" title="发现" />
            	<FindCon />
            	<Bottom active="2" />
                <ClearBottom />

            </div>
        )
    }
}
