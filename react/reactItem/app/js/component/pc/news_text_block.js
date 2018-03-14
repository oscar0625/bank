import React from "react";

export default class NewsTextBlock extends React.Component{
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
        <div className="ntb-container">
          <ul>
            {
              this.state.data.map(function(item){
                return(
                  <li key={item.uniquekey}>
                    <a href={item.url} target="_blank">
                      {item.title}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
    )
  }
}
