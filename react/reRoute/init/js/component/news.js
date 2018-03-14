import React from "react";
export default class News extends React.Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentWillMount(){
        let type=this.props.type;
        let count=this.props.count;
        fetch('http://www.iwen.wiki/sxtstu/news/juhenews.php?type='+type+'&count='+count,{
            method:'get'
        })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                console.log(data);
                this.setState({
                    data:data
                })
            })
    }
    render(){
        return(
            <div>
                {
                    this.state.data.map((x)=>{
                        return (
                            <div key={x.uniquekey}>

                                <img src={x.thumbnail_pic_s}/>
                                <p>{x.title}</p>>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
News.defaultProps={
    type:'top',
    count:'10'
};
News.propTypes={
    type:React.PropTypes.string,
    count:React.PropTypes.string
};