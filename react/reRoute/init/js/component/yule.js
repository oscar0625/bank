import React from 'react';
import News from './news';
export default class YuLe extends React.Component{
    render(){
        return(
            <div>
                <News type={this.props.params.type} count={this.props.params.count}/>
            </div>
        )
    }
}