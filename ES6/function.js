/*
*函数 function

    let 函数名 = ()=>{} 相当于 var a = function(){}
    let 函数名 = (a,b)=>{} //包括 形参 a和 b
    当只有一个形参时, 可以不写小括号: let 函数名 = a=>{} //只包括 形参 a
    当函数内只有一行代码时, 可以省略成: let 函数名 = ()=> 代码一行;
    exa:
        var arr = [1,23,3,42,5,6546];
        arr.map(function(data){return data+1})
        arr.map((data)=>{return data+1})
        arr.map(data=>{return data+1})
        arr.map(data => data + 1)

* */
let fn=(a)=>{
    console.log(a)
}
fn(123)