import React from 'react';
import YSearch from "./component/y/ySelect";
import Activity from './component/c/activity';
import "../../css/index/search.less"

export default class Search extends React.Component{
    render(){
        return(
            <div>
                <Activity title="搜索"/>
                <YSearch/>
                <div className="wrap">
                    <p className="IndexSearch-title">大家爱搜</p>
                    <div className="clearfix">
                    <a className="IndexSearch-hot" >身体乳</a>
                    <a className="IndexSearch-hot" >口红</a>
                    <a className="IndexSearch-hot" >控油</a>
                    <a className="IndexSearch-hot" >粉饼</a>
                    <a className="IndexSearch-hot" >精华</a>
                    </div>
                </div>
            </div>
        )
    }
}
