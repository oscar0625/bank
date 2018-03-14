import React from 'react';
import Remark from "./component/z/remark";
import "./component/z/css/remark.less";
import Activity from './component/c/activity'
export default class AllCommon extends React.Component {
    render() {
        return (
            <div>
                <Activity title="全部评论" />
                <div className="z_markF">
                    <Remark bj="yXW"/>
                    <Remark bj="xX"/>
                    <Remark bj="rE"/>
                    <Remark bj="jJ"/>
                </div>
            </div>
        )
    }
}
