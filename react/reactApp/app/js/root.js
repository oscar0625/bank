import React from 'react';
import {render} from 'react-dom';
import {Router,Route,Link,hashHistory} from 'react-router';
import '../css/reset.css';
import '../css/root.less';
/*index*/
import IndexIndex from './index/index';
import IndexSearch from './index/search';
import SearchDetail from './index/searchDetail';
import IndexDate from './index/date';
import IndexVideo from './index/video';
import BeautifulSay from './index/beautifulSay';
import FeatureArticle from './index/featureArticle';
import Recommend from './index/recommend';
import Article from './index/article';
import AllCommon from './index/allCommon';
import Blogger from './index/blogger';
import SendOut from './index/sendOut';
import JoinIn from './index/joinIn';
import ThinkSend from './index/thinkSend';
import IndexChat from './index/chating';
/*index*/
/*find*/
import FindIndex from './find/index';
import HotTitleCon from './find/hotTitleCon';
import BeautifulPerson from './find/beautifulPerson';
import BeautifulGoods from './find/beautifulGoods';
/*find*/
/*type*/
import TypeIndex from './type/index';
import TypeGoods from './type/goods';
import ProductDetails from './type/productDetails';
/*type*/
/*mine*/
import MineIndex from './mine/index';
import Fans from "./mine/fans";
import Focus from "./mine/focus";
import Message from "./mine/message";
import Collectors from './mine/collectors';
import MineChatInfos from './mine/chatInfos';
import NewFriendInfos from './mine/newFriendsInfos';
import Setting from './mine/setting';
import PhoneBind from './mine/phonebind';
import Address from './mine/address';
import Help from './mine/help';
import Login from './mine/login';
import Register from './mine/register';
import PersonStyle from './mine/personStyle';
import Loveliness from './mine/loveliness';
/*mine*/

class Root  extends React.Component{
    constructor(props){
        super(props);
        var mobileReset={
            reset: function () {
                //1.获取屏幕像素比的倒数
                var num = 1/window.devicePixelRatio;
                //2.动态创建适口标签
                var meta=document.createElement('meta');
                meta.setAttribute('name','viewport');
                meta.setAttribute('content','width=device-width, user-scalable=no, initial-scale='+num+', maximum-scale='+num+', minimum-scale='+num+'');
                document.head.appendChild(meta);
                ////3.设置html字体,为整个页面的10/1
                document.documentElement.style.fontSize=window.innerWidth/10+'px';
            }
        };
        mobileReset.reset();
    }
    render(){
        return(
            <div>
                <Router history={hashHistory}>
                    {/*index*/}
                    <Route path="/" component={IndexIndex}></Route>
                    <Route path="/indexSearch" component={IndexSearch}></Route>
                    <Route path="/searchDetail" component={SearchDetail}></Route>
                    <Route path="/indexVideo" component={IndexVideo}></Route>
                    <Route path="/beautifulSay" component={BeautifulSay}></Route>
                    <Route path="/article" component={Article}></Route>
                    <Route path="/featureArticle" component={FeatureArticle}></Route>
                    <Route path="/recommend" component={Recommend}></Route>
                    <Route path="/allCommon" component={AllCommon}></Route>
                    <Route path="/date" component={IndexDate}></Route>
                    <Route path="/blogger" component={Blogger}></Route>
                    <Route path="/sendOut" component={SendOut}></Route>
                    <Route path="/joinIn" component={JoinIn}></Route>
                    <Route path="/thinkSend" component={ThinkSend}></Route>
                    <Route path="/indexChat/:title" component={IndexChat}></Route>
                    {/*index*/}
                    {/*find*/}
                    <Route path="/findIndex" component={FindIndex}></Route>
                    <Route path="/hotTitleCon" component={HotTitleCon}></Route>
                    <Route path="/beautifulPerson" component={BeautifulPerson}></Route>
                    <Route path="/beautifulGoods" component={BeautifulGoods}></Route>

                    {/*find*/}
                    {/*mine*/}
                    <Route path="/collectors" component={Collectors}></Route>
                    <Route path="/mineIndex" component={MineIndex}></Route>
                    <Route path="/fans" component={Fans}></Route>
                    <Route path="/focus" component={Focus}></Route>
                    <Route path="/message" component={Message}></Route>
                    <Route path="/mineChatInfos" component={MineChatInfos}></Route>
                    <Route path="/newFriendInfos" component={NewFriendInfos}></Route>
                    <Route path="/setting" component={Setting}></Route>
                    <Route path="/phonebind" component={PhoneBind}></Route>
                    <Route path="/address" component={Address}></Route>
                    <Route path="/help" component={Help}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/personStyle" component={PersonStyle}></Route>
                    <Route path="/loveliness" component={Loveliness}></Route>
                    {/*mine*/}
                    {/*type*/}
                    <Route path="/typeIndex" component={TypeIndex}></Route>
                    <Route path="/typeGoods" component={TypeGoods}></Route>
                    <Route path="/productDetails" component={ProductDetails}></Route>
                    {/*type*/}
                </Router>
            </div>
        )
    }
}
render(<Root />,document.querySelector('#root'));
