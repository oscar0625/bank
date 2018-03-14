import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import PcIndex from './component/index';
import NewsContainer from "./component/pc/newscontainer.js";
import MobileIndex from './component/mobile/index';
import IndexContent from './component/mobile/indexContent'
import OtherContent from './component/mobile/otherContent';
import MediaQuery from 'react-responsive';

class Root extends React.Component{
    render(){
        return(
            <div>
                <MediaQuery  query='(min-device-width:769px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={PcIndex}></Route>
                        <Route path="/nav/:type/:count" component={NewsContainer}></Route>
                    </Router>
                </MediaQuery>
                <MediaQuery  query='(max-device-width:768px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex}>
                            <IndexRoute component={IndexContent}/>
                            <Route path="/other/:type/:count" component={OtherContent}></Route>
                        </Route>
                    </Router>
                </MediaQuery>
            </div>
        )
    }
}
render(<Root />,document.querySelector('#root'));