import React from "react";
import { Card } from 'antd';

export default class NewsTextImgBlock extends React.Component{
  constructor(){
    super();
    this.state={
      data:[]
    }
  }
  componentWillMount(){
    var myFetchOptions = {
      method:"GET"
    }
    fetch("http://www.iwen.wiki/sxtstu/news/juhenews.php?type="+this.props.type+"&count="+this.props.count,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({
        data:json
      })
    })
  }

  render(){
    return(
        <div className="ntib-container">
        <h2>{this.props.title}</h2>
          {
            this.state.data.map(function(item){
              return(
                <Card key={item.uniquekey} className="ntib-card">
                  <a href={item.url} target="_blank">
                    <div >
                      <img src={item.thumbnail_pic_s}/>
                      <p>{item.title}</p>
                    </div>
                  </a>
                </Card>
              )
            })
          }
        </div>
    )
  }
}
