import React from "react";
import {Row,Col} from "antd";
import NewsTextBlock from "./news_text_block.js";
import Carusels from "./carusels.js";
import NewsTextImgBlock from "./news_textimg_block.js";

export default class IndexContainer extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Row>
              <Col span={11}>
                <NewsTextBlock type="top" count={7} />
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Carusels width="500px" />
              </Col>
              <Col span={1}></Col>
            </Row>
            <NewsTextImgBlock title="新闻头条" type="top" count={4}/>
            <NewsTextImgBlock title="社会新闻" type="shehui" count={4}/>
            <NewsTextImgBlock title="娱乐新闻" type="yule" count={4}/>
            <NewsTextImgBlock title="国际新闻" type="guoji" count={4}/>
            <NewsTextImgBlock title="国内新闻" type="guonei" count={4}/>
            <NewsTextImgBlock title="科技新闻" type="keji" count={4}/>
            <NewsTextImgBlock title="时尚新闻" type="shishang" count={4}/>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
