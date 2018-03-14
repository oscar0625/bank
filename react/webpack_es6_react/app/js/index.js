import React from "react";
import {render} from "react-dom";
import Header from "./component/hearder";
import List from "./component/list";
import "../css/index.css";
class Index extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <List />
            </div>
        )
    }
}
render(<Index />,document.querySelector('#root'));