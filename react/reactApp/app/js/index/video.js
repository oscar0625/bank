import React from 'react';
import Activity from './component/c/activity'
import Banner from "./component/z/banner";
export default class Video extends React.Component {
    render() {
        return (
            <div>
                <Activity title="视频" />
                <Banner banner="yXW"/>
            </div>
        )
    }
}
