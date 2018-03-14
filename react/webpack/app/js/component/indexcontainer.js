import React from "react";
import Search from "./search";
import Twocode from "./twocode";
export default class Indexcontainer extends React.Component{
    render(){
        return(
            <div>
                <Search />
                <Twocode />
            </div>
        )
    }
}