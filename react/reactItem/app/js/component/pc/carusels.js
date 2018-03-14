import React from "react";
import { Carousel } from 'antd';

export default class Carusels extends React.Component{
  render(){
    const setting = {
      dots:true,
			infinite:true,
			speed:500,
			slidesToShow:1,
			autoplay:true
    }
    return(
      <div style={{width:this.props.width}}>
        <Carousel {...setting}>
         <div>
            <img style={{width:"100%"}} src="http:\/\/iwen.wiki\/zhichenshop\/l4.jpg" />
         </div>
         <div>
            <img style={{width:"100%"}} src="http:\/\/iwen.wiki\/zhichenshop\/l3.jpg" />
         </div>
         <div>
            <img style={{width:"100%"}} src="http:\/\/iwen.wiki\/zhichenshop\/l2.jpg" />
         </div>
         <div>
            <img style={{width:"100%"}} src="http:\/\/iwen.wiki\/zhichenshop\/l1.jpg" />
         </div>
        </Carousel>
      </div>
    )
  }
}
