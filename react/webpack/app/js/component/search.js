import React from "react";
import Logo from "../../image/bd_logo1.png";
import "../../css/search.css"
export default class Search extends React.Component{
    render(){
        return(
            <div className="search-container">
                {this.getLogo()}
                {this.getInput()}
            </div>
        )
    }
    getLogo(){
        return(
            <img className="logo" src={Logo} alt="logo"/>
        )
    }
    getInput(){
        return(
            <input className="search" type="text" />
        )
    }
}