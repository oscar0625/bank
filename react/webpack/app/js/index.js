import React from "react";
import {render} from "react-dom";
import Header from  "./component/hearder";
import Indexcontainer from "./component/indexcontainer";
import Footer from "./component/footer";
class Index extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <Indexcontainer />
                <Footer />
            </div>
        )

    }
}
render(<Index />,document.getElementById('root'));