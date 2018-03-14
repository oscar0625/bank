import React from "react";
import {render} from "react-dom";
import {Router,Route,browserHistory} from 'react-router';
import Index from "./component/index";
import YuLe from "./component/yule";
import KeJi from "./component/keji";
class Root extends React.Component{
    render(){
        return(
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={Index}></Route>
                    <Route path="/yule/:type/:count" component={YuLe}></Route>
                    <Route path="/keji/:type/:count" component={KeJi}></Route>
                </Router>
            </div>
        )
    }
}
render(<Root />,document.querySelector('div'));