import React from 'react';
import News from  './news';
export default class KeJi extends React.Component{
    render(){
        return(
            <div>{
                console.log(typeof this.props.params.count)
            }
                <News  type={this.props.params.type} count={this.props.params.count}/>
            </div>
        )
    }
}