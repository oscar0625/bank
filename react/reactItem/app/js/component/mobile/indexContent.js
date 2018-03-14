import React from 'react';
import Swipe from './swipe';
import Item from  './item';
export  default class Content extends React.Component{
    render(){
        return(
            <div>
                <Swipe />
                <Item  type="top" count={5}/>
                <Item  type="yule" count={5}/>
                <Item  type="guonei" count={5}/>
                <Item  type="guoji" count={5}/>
                <Item  type="tiyu" count={5}/>
                <Item  type="shehui" count={5}/>
                <Item  type="shishang" count={5}/>
                <Item  type="keji" count={5}/>
            </div>
        )
    }
}