import React from "react";
import {Row,Col} from "antd";
import "../../css/init.css";
import "../../css/g.css";
import 'antd/dist/antd.css';
import Header from "./pc/header.js";
import IndexContainer from "./pc/indexcontainer.js";
import Footer from "./pc/footer.js";
import BackTop from "./pc/backtop.js";


export default class Index extends React.Component{
  render(){
    return(
        <div>
          <Header />
          <IndexContainer />
          <Footer />
          <BackTop />
        </div>
    )
  }
}
