/*
* 1.使用fetch安装
 命令：npm install fetch --save
 2.应用实例
 //get 参数写在url上
 var myFetchOptions = {
 method:"get"
 }
 //post 参数写在 body里
 var myFetchOptions = {
 method:'post',
 body:'type=yule&count=10',
 headers:{
 "Content-Type":"application/x-www-form-urlencoded"
 }
 }
 fetch("url",myFetchOptions)
 .then(response => response.json())
 .then(json =>{
 this.setState({data:json})
 })


 * */