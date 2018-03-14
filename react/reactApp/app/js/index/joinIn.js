import React from 'react';
import Join from "./component/z/join";
import SendJoin from "./component/z/sendJoin";
import Bottom from './component/l/bottom';
import ClearBottom from './component/l/clearBottom';
export default class JoinIn extends React.Component {
    render() {
        return (
            <div>
                <SendJoin />
                <Join join="yXW"/>
                <Bottom active="1"/>
                <ClearBottom />
            </div>
        )
    }
}
