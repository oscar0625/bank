/*
 变量的解构赋值：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构

    数组的解构赋值(以下两条对象也是)
     1.如果解构不成功，变量的值就等于undefined 但允许不完全解构 即等号左边的模式，只匹配一部分的等号右边的数组
     2.解构赋值允许指定默认值(默认值生效的条件是，数组的那一项严格等于undefined)。
        let [x, y = 'b'] = ['a']; // x='a', y='b';
        let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

    对象的解构赋值
     1.对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，*****变量必须与属性同名*****，才能取到正确的值。

     2.let { foo, bar } = { foo: "aaa", bar: "bbb" } 实际上是 let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" }
       对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的(是变量的)是后者，而不是前者,前者是模式。
       ps:如果变量名与属性名不一致，必须写成下面这样
            let {first:f,last:l}={ first: 'hello', last: 'world' }
            f//hello l//world
            first//error  last//error 因为first和last并不是变量
     3.不将大括号写在行首，避免JavaScript将其解释为代码块
       e:
         let x; {x} = {x: 1};//出错
         解决：let x; ({x} = {x: 1})


* */
let route = {
    'url':{
        template:'html',
        controller:function(){}
    }
};
let view = 'doc';
let config={route,view}
console.log(config)