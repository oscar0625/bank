import React from "react";
import ProductDetail from "./component/z/productDetail";
import Activity from '../index/component/c/activity';
export default class ProductDetails extends React.Component{
    render(){
        return(
            <div>
                <Activity title="产品详情"/>
                <ProductDetail/>
            </div>
        )
    }
}

