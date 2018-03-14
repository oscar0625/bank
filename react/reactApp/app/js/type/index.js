import React from 'react';
import TypeHead from "./component/y/typeHead.js"
import Bottom from "../index/component/l/bottom.js"
import ClearBottom from "../index/component/l/clearBottom.js"
import TypeContent from "./component/y/typeContent"

export default class Index extends React.Component{
    render(){
        return(
            <div >
                <TypeHead title="分类"/>
                <TypeContent/>
                <Bottom active="3"/>
                <ClearBottom/>

            </div>
        )
    }
}