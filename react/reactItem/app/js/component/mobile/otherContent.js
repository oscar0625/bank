import React from 'react';
import Unit from  './unit';
export default class OtherContent extends React.Component{
    constructor(prop){
        super(prop);
        // console.log('other')
    }
    shouldComponentUpdate(){
        return (this.props.router.location.action === 'PUSH')
    }
    render(){
        // console.log(this.props);
        return(
            <div >
                <Unit  type={this.props.params.type} count={this.props.params.count}/>
            </div>
        )
    }
}
