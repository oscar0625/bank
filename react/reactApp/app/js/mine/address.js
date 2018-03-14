import React from "react";
import Activity from "../index/component/c/activity.js";
import AddressContent from "./component/y/adressContent.js"

class Address extends React.Component{
    render(){
        return(
            <div>
               <Activity title="收货地址"/>
                <AddressContent/>
            </div>
        )
    }
}
export default Address