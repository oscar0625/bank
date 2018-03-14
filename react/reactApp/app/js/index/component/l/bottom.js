import React from 'react';
import {Link} from 'react-router'
import './css/bottom.less';
export default class Bottom extends React.Component{
    render(){
        return(
            <div className="l-bottom wrap">
                <ul className="clearfix">
                    <li className="li1" id={this.props.active=='1'?'d1':''}>
                        <Link to={`/`}>
                            <span></span><p>首页</p>
                        </Link>
                     </li>
                    <li className="li2" id={this.props.active=='2'?'d2':''}>
                        <Link to={`/findIndex`}>
                            <span></span><p>发现</p>
                        </Link>
                    </li>
                    <li className="li3" id={this.props.active=='3'?'d3':''}>
                        <Link to={`/typeIndex`}>
                            <span></span><p>分类</p>
                        </Link>
                    </li>
                    <li className="li4" id={this.props.active=='4'?'d4':''}>
                        <Link to={`/mineIndex`}>
                            <span></span><p>我的</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

