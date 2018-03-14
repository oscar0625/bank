
import React from 'react';
import {Link} from 'react-router'
export default class Index extends React.Component {
    render(){
        return(
            <div>
                <Link to={`/yule/${'yule'}/${10}`}>
                    <button>去娱乐的页面</button>
                </Link>
                <Link to={`/keji/${'keji'}/${10}`}>
                    <button>去科技的页面</button>
                </Link>
            </div>
        )
    }


};
