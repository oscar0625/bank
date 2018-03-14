import React from "react";
import Collector from "./component/z/collector";
import Activity from '../index/component/c/activity'
export default class Collectors extends React.Component{
    render(){
        return(
            <div>
                <Activity title="收藏"/>
                <Collector/>
            </div>
        )
    }
}