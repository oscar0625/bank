import React from 'react';
import Activity from './component/c/activity';
import Banner from "./component/z/banner";
export default class Article extends React.Component {
    render() {
        return (
            <div>
                <Activity title="文章"/>
                <Banner banner="yXW"/>
            </div>
        )
    }
}
