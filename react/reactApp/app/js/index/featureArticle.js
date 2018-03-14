import React from "react";
import Activity from './component/c/activity';
import Info from './component/z/info';
import Insert from './component/l/insert';
import '../../css/index/featureArticle.less'
export default class FeatureArticle extends React.Component{
    render(){
        return (
            <div>
                <Activity title="精选文章"/>
                <div className="l-jl"></div>
                <Insert />
                <Info  info="yXW"/>
                <div className="l-juli"></div>
                <Info  info="yXW"/>
            </div>
        )
    }
}
