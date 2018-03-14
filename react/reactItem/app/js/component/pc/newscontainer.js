import React from "react";
import {Row,Col,BackTop} from "antd";
import NewsTextImgBlock from "./news_textimg_block.js";
import NewsTextBlock from "./news_text_block.js";

export default class NewsContainer extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <NewsTextBlock type={this.props.params.type} count={this.props.params.count} />
            <NewsTextImgBlock type={this.props.params.type} count={this.props.params.count}/>
            <BackTop>
               <div className="ant-back-top-inner">UP</div>
            </BackTop>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
